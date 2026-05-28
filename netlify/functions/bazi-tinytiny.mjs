import BaziConverter from 'bazi-converter';

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
    const { year, month, day, hour } = JSON.parse(event.body || '{}');

    const bazi = new BaziConverter(year, month, day, hour);
    const chinese = bazi.getBaziJson();
    const english = bazi.translateBaziEnglish();
    const fullString = bazi.getBaziChineseFullString();

    // Map each pillar to structured format
    function parsePillar(chineseStr, englishStr) {
      const [stem, branch] = chineseStr.split('');
      const [stemEn, branchEn] = englishStr ? englishStr.split(' ') : ['', ''];
      return { chinese: chineseStr, stem, branch, stemEnglish: stemEn, branchEnglish: branchEn };
    }

    const pillars = {
      year: parsePillar(chinese.year, english.year),
      month: parsePillar(chinese.month, english.month),
      day: parsePillar(chinese.day, english.day),
      time: parsePillar(chinese.time, english.time)
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        source: 'tinytinydev',
        pillars,
        additionalInfo: {
          chineseString: fullString
        }
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
