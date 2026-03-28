const https = require('https');
const http = require('http');
const zlib = require('zlib');

function fetchBuffer(url) {
  const mod = url.startsWith('https') ? https : http;
  return new Promise((resolve, reject) => {
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Encoding': 'identity' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(25000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractCSVFromZip(buf) {
  let offset = 0;
  while (offset < buf.length - 4) {
    if (buf[offset] === 0x50 && buf[offset + 1] === 0x4b &&
        buf[offset + 2] === 0x03 && buf[offset + 3] === 0x04) {
      break;
    }
    offset++;
  }
  if (offset >= buf.length - 30) throw new Error('No ZIP local file header found');
  const compressionMethod = buf.readUInt16LE(offset + 8);
  const compressedSize = buf.readUInt32LE(offset + 18);
  const fileNameLength = buf.readUInt16LE(offset + 26);
  const extraFieldLength = buf.readUInt16LE(offset + 28);
  const dataOffset = offset + 30 + fileNameLength + extraFieldLength;
  const compressedData = buf.slice(dataOffset, dataOffset + compressedSize);
  if (compressionMethod === 0) {
    return compressedData.toString('utf-8');
  } else if (compressionMethod === 8) {
    const decompressed = zlib.inflateRawSync(compressedData);
    return decompressed.toString('utf-8');
  } else {
    throw new Error(`Unsupported compression method: ${compressionMethod}`);
  }
}

function normalizeCNPJ(cnpj) {
  return cnpj.replace(/[.\-\/]/g, '');
}

function getMonthKeys(meses) {
  const keys = [];
  const now = new Date();
  for (let i = 0; i < meses; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    keys.push(`${yyyy}${mm}`);
  }
  return keys;
}

function parseCSVForCNPJ(csvText, cnpj) {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const header = lines[0].split(';').map(h => h.trim());
  const cnpjIdx = header.indexOf('CNPJ_FUNDO_CLASSE');
  const dateIdx = header.indexOf('DT_COMPTC');
  const quotaIdx = header.indexOf('VL_QUOTA');

  if (cnpjIdx === -1 || dateIdx === -1 || quotaIdx === -1) return [];

  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = line.split(';');
    if (cols.length <= Math.max(cnpjIdx, dateIdx, quotaIdx)) continue;
    const rowCnpj = normalizeCNPJ(cols[cnpjIdx].trim());
    if (rowCnpj !== cnpj) continue;
    const date = cols[dateIdx].trim();
    const quota = parseFloat(cols[quotaIdx].trim());
    if (date && !isNaN(quota)) {
      results.push({ date, quota });
    }
  }
  return results;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const params = event.queryStringParameters || {};
  const rawCnpj = params.cnpj;
  if (!rawCnpj) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing required query param: cnpj' }),
    };
  }

  const cnpj = normalizeCNPJ(rawCnpj);
  const meses = Math.min(Math.max(parseInt(params.meses) || 3, 1), 12);
  const monthKeys = getMonthKeys(meses);

  const urls = monthKeys.map(
    key => `https://dados.cvm.gov.br/dados/FI/DOC/INF_DIARIO/DADOS/inf_diario_fi_${key}.zip`
  );

  try {
    const results = await Promise.allSettled(urls.map(async (url) => {
      const buf = await fetchBuffer(url);
      const csv = extractCSVFromZip(buf);
      return parseCSVForCNPJ(csv, cnpj);
    }));

    const allRows = [];
    for (const r of results) {
      if (r.status === 'fulfilled' && Array.isArray(r.value)) {
        allRows.push(...r.value);
      }
    }

    // Deduplicate by date
    const seen = new Map();
    for (const row of allRows) {
      seen.set(row.date, row);
    }
    const historico = Array.from(seen.values()).sort((a, b) => a.date.localeCompare(b.date));

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=21600',
      },
      body: JSON.stringify({
        cnpj,
        historico,
        meses,
        updated: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
