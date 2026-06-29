'use strict';

const headers = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const dbUrl = process.env.NEON_DATABASE_URL;
  if (!dbUrl) {
    console.warn('NEON_DATABASE_URL not set — skipping save');
    return { statusCode: 200, headers, body: JSON.stringify({ saved: false, reason: 'db_not_configured' }) };
  }

  try {
    const { neon } = require('@neondatabase/serverless');
    const sql = neon(dbUrl);

    const payload = JSON.parse(event.body || '{}');
    const { name, whatsapp, city, birthDate, birthTime, gender, dayMasterElement, fiveFactors } = payload;

    if (!whatsapp) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'WhatsApp number required' }) };
    }

    await sql`
      INSERT INTO user_records (name, whatsapp, city, birth_date, birth_time, gender, day_master_element, five_factors)
      VALUES (
        ${name || null},
        ${whatsapp},
        ${city || null},
        ${birthDate || null},
        ${birthTime || null},
        ${gender || null},
        ${dayMasterElement || null},
        ${JSON.stringify(fiveFactors || {})}
      )
    `;

    return { statusCode: 200, headers, body: JSON.stringify({ saved: true }) };

  } catch (err) {
    console.error('Save record error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Database error' }) };
  }
};
