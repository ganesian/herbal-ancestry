// Self-contained reimplementation of tinytinydev/bazi-converter
// All data inlined — zero external imports needed

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Inlined data from bazi-converter/data/ ────────────────────
const TIANGAN = { H1:'甲',H2:'乙',H3:'丙',H4:'丁',H5:'戊',H6:'己',H7:'庚',H8:'辛',H9:'壬',H10:'癸' };
const DIZHI   = { E1:'子',E2:'丑',E3:'寅',E4:'卯',E5:'辰',E6:'巳',E7:'午',E8:'未',E9:'申',E10:'酉',E11:'戌',E12:'亥' };

const HEAVENLY_STEMS_EN = {
  '甲':{ element:'Wood',  organ:'Gall Bladder' },
  '乙':{ element:'Wood',  organ:'Liver' },
  '丙':{ element:'Fire',  organ:'Small Intestine' },
  '丁':{ element:'Fire',  organ:'Heart' },
  '戊':{ element:'Earth', organ:'Stomach' },
  '己':{ element:'Earth', organ:'Spleen' },
  '庚':{ element:'Gold',  organ:'Large Intestine' },
  '辛':{ element:'Gold',  organ:'Lung' },
  '壬':{ element:'Water', organ:'Urinary Bladder' },
  '癸':{ element:'Water', organ:'Kidney' }
};

const EARTHLY_BRANCHES_EN = {
  '子':{ animal_mnemonic:'Rat',     element:'Water' },
  '丑':{ animal_mnemonic:'Ox',      element:'Earth' },
  '寅':{ animal_mnemonic:'Tiger',   element:'Wood' },
  '卯':{ animal_mnemonic:'Rabbit',  element:'Wood' },
  '辰':{ animal_mnemonic:'Dragon',  element:'Earth' },
  '巳':{ animal_mnemonic:'Snake',   element:'Fire' },
  '午':{ animal_mnemonic:'Horse',   element:'Fire' },
  '未':{ animal_mnemonic:'Goat',    element:'Earth' },
  '申':{ animal_mnemonic:'Monkey',  element:'Gold' },
  '酉':{ animal_mnemonic:'Rooster', element:'Gold' },
  '戌':{ animal_mnemonic:'Dog',     element:'Earth' },
  '亥':{ animal_mnemonic:'Pig',     element:'Water' }
};

// Hour mapping: earthly branch key → { day_stem_number → heavenly_stem_key }
const HOUR_MAPPING = {
  E1:  {'1':'H1','2':'H3','3':'H5','4':'H7','5':'H9','6':'H1','7':'H3','8':'H5','9':'H7','10':'H9'},
  E2:  {'1':'H2','2':'H4','3':'H6','4':'H8','5':'H10','6':'H2','7':'H4','8':'H6','9':'H8','10':'H10'},
  E3:  {'1':'H3','2':'H5','3':'H7','4':'H9','5':'H1','6':'H3','7':'H5','8':'H7','9':'H9','10':'H1'},
  E4:  {'1':'H4','2':'H6','3':'H8','4':'H10','5':'H2','6':'H4','7':'H6','8':'H8','9':'H10','10':'H2'},
  E5:  {'1':'H5','2':'H7','3':'H9','4':'H1','5':'H3','6':'H5','7':'H7','8':'H9','9':'H1','10':'H3'},
  E6:  {'1':'H6','2':'H8','3':'H10','4':'H2','5':'H4','6':'H6','7':'H8','8':'H10','9':'H2','10':'H4'},
  E7:  {'1':'H7','2':'H9','3':'H1','4':'H3','5':'H5','6':'H7','7':'H9','8':'H1','9':'H3','10':'H5'},
  E8:  {'1':'H8','2':'H10','3':'H2','4':'H4','5':'H6','6':'H8','7':'H10','8':'H2','9':'H4','10':'H6'},
  E9:  {'1':'H9','2':'H1','3':'H3','4':'H5','5':'H7','6':'H9','7':'H1','8':'H3','9':'H5','10':'H7'},
  E10: {'1':'H10','2':'H2','3':'H4','4':'H6','5':'H8','6':'H10','7':'H2','8':'H4','9':'H6','10':'H8'},
  E11: {'1':'H1','2':'H3','3':'H5','4':'H7','5':'H9','6':'H1','7':'H3','8':'H5','9':'H7','10':'H9'},
  E12: {'1':'H2','2':'H4','3':'H6','4':'H8','5':'H10','6':'H2','7':'H4','8':'H6','9':'H8','10':'H10'}
};

// ── Load dates_mapping.json (shared with alvamind, same format) ──
let dateMappings = null;
function getDateMappings() {
  if (!dateMappings) {
    const tries = [
      path.join(__dirname, 'dates_mapping.json'),
      path.join(process.cwd(), 'netlify/functions/dates_mapping.json'),
    ];
    for (const p of tries) {
      try { dateMappings = JSON.parse(readFileSync(p, 'utf-8')); break; } catch {}
    }
  }
  return dateMappings;
}

function getEarthKeyFromHour(hour) {
  if (hour >= 23 || hour < 1)  return 'E1';
  if (hour < 3)  return 'E2';
  if (hour < 5)  return 'E3';
  if (hour < 7)  return 'E4';
  if (hour < 9)  return 'E5';
  if (hour < 11) return 'E6';
  if (hour < 13) return 'E7';
  if (hour < 15) return 'E8';
  if (hour < 17) return 'E9';
  if (hour < 19) return 'E10';
  if (hour < 21) return 'E11';
  return 'E12';
}

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
    const mappings = getDateMappings();
    if (!mappings) throw new Error('Date mappings unavailable');

    const baziDate = mappings[year]?.[month]?.[day];
    if (!baziDate) throw new Error(`No mapping for ${year}-${month}-${day}`);

    const earthHourKey = getEarthKeyFromHour(hour);
    const hourHeavenlyKey = HOUR_MAPPING[earthHourKey]?.[String(baziDate.HDay)];

    const yearChinese  = TIANGAN['H' + baziDate.HYear]  + DIZHI['E' + baziDate.EYear];
    const monthChinese = TIANGAN['H' + baziDate.HMonth] + DIZHI['E' + baziDate.EMonth];
    const dayChinese   = TIANGAN['H' + baziDate.HDay]   + DIZHI['E' + baziDate.EDay];
    const timeChinese  = hourHeavenlyKey ? TIANGAN[hourHeavenlyKey] + DIZHI[earthHourKey] : '吉';

    function parsePillar(ch) {
      const stem   = ch[0];
      const branch = ch[1];
      const stemEn   = HEAVENLY_STEMS_EN[stem]   || {};
      const branchEn = EARTHLY_BRANCHES_EN[branch] || {};
      return {
        chinese:       ch,
        stem,
        branch,
        stemElement:   stemEn.element   || '',
        stemOrgan:     stemEn.organ     || '',
        branchElement: branchEn.element || '',
        animal:        branchEn.animal_mnemonic || '',
        stemEnglish:   stemEn.element   || '',
        branchEnglish: branchEn.animal_mnemonic || ''
      };
    }

    const pillars = {
      year:  parsePillar(yearChinese),
      month: parsePillar(monthChinese),
      day:   parsePillar(dayChinese),
      time:  timeChinese.length === 2 ? parsePillar(timeChinese) : { chinese: timeChinese, stem:'', branch:'', stemElement:'', branchElement:'', animal:'' }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        source: 'tinytinydev',
        pillars,
        additionalInfo: {
          chineseString: `${yearChinese}年${monthChinese}月${dayChinese}日${timeChinese}时`
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
