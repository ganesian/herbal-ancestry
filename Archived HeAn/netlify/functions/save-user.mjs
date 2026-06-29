// Saves user to Supabase via direct REST API — zero npm dependencies

const SUPABASE_URL = 'https://zgegvnioarzjkkdpkdko.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZWd2bmlvYXJ6amtrZHBrZGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODMzOTcsImV4cCI6MjA5NTQ1OTM5N30.34E6fiYs5nykzTwer8PSe1skMZ2-9wn2dp64q67F_rE';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { name, whatsapp, city_of_birth, date_of_birth, time_of_birth, gender } = JSON.parse(event.body || '{}');

    if (!whatsapp) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'WhatsApp number required' }) };
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/bazi_users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: name || null,
        whatsapp,
        city_of_birth,
        date_of_birth,
        time_of_birth,
        gender,
        created_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
