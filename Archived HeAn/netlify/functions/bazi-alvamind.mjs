import DATES from './dates_mapping.mjs';

// ── Constants ────────────────────────────────────────────────
const STEMS    = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ANIMALS  = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
const ELEMENTS = { WOOD:['甲','乙'], FIRE:['丙','丁'], EARTH:['戊','己'], METAL:['庚','辛'], WATER:['壬','癸'] };
const BRANCH_ELEMENTS = { WATER:['子','亥'], WOOD:['寅','卯'], FIRE:['巳','午'], METAL:['申','酉'], EARTH:['丑','辰','未','戌'] };
const HIDDEN_STEMS = {
  子:['癸'], 丑:['己','癸','辛'], 寅:['甲','丙','戊'], 卯:['乙'],
  辰:['戊','乙','癸'], 巳:['丙','庚','戊'], 午:['丁','己'], 未:['己','丁','乙'],
  申:['庚','壬','戊'], 酉:['辛'], 戌:['戊','辛','丁'], 亥:['壬','甲']
};
const HOUR_MAP = [
  [23,1,'子'],[1,3,'丑'],[3,5,'寅'],[5,7,'卯'],[7,9,'辰'],[9,11,'巳'],
  [11,13,'午'],[13,15,'未'],[15,17,'申'],[17,19,'酉'],[19,21,'戌'],[21,23,'亥']
];
const NOBLEMAN_MAP    = { WOOD:['丑','未'], FIRE:['亥','巳'], EARTH:['申','寅'], METAL:['寅','午'], WATER:['巳','申'] };
const INTELLIGENCE_MAP  = { WOOD:'巳', FIRE:'申', EARTH:'亥', METAL:'子', WATER:'巳' };
const PEACH_BLOSSOM_MAP = { WOOD:'酉', FIRE:'卯', EARTH:'午', METAL:'午', WATER:'申' };

function getHourBranch(hour) {
  const b = HOUR_MAP.find(([s,e]) => (s === 23 && (hour >= 23 || hour < 1)) || (hour >= s && hour < e));
  return b ? b[2] : '子';
}

function getElement(stem) {
  return Object.entries(ELEMENTS).find(([,v]) => v.includes(stem))?.[0] || '';
}

function getBranchElement(branch) {
  return Object.entries(BRANCH_ELEMENTS).find(([,v]) => v.includes(branch))?.[0] || '';
}

function translatePillar(pillar) {
  const stem   = pillar[0];
  const branch = pillar[1];
  return {
    chinese: pillar, stem, branch,
    stemElement:   getElement(stem),
    branchElement: getBranchElement(branch),
    animal:        ANIMALS[BRANCHES.indexOf(branch)],
    hiddenStems:   HIDDEN_STEMS[branch] || []
  };
}

function calculateLifeGua(year, gender) {
  let sum = String(year).slice(-2).split('').reduce((a,b) => a + Number(b), 0);
  if (sum > 9) sum = String(sum).split('').reduce((a,b) => a + Number(b), 0);
  if (gender === 'male') {
    sum = 11 - sum;
    if (sum === 5) sum = 2;
  } else {
    sum = 4 + sum;
    if (sum > 9) sum = String(sum).split('').reduce((a,b) => a + Number(b), 0);
    if (sum === 5) sum = 8;
  }
  return sum;
}

function calculateFiveFactors(pillars) {
  const counts = { WOOD:0, FIRE:0, EARTH:0, METAL:0, WATER:0 };
  ['year','month','day','time'].forEach(key => {
    const p = pillars[key];
    if (counts[p.stemElement]   !== undefined) counts[p.stemElement]++;
    if (counts[p.branchElement] !== undefined) counts[p.branchElement]++;
    p.hiddenStems.forEach(hs => {
      const el = getElement(hs);
      if (counts[el] !== undefined) counts[el] += 0.5;
    });
  });
  return counts;
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const { year, month, day, hour, gender } = JSON.parse(event.body || '{}');

    const m = DATES[year]?.[month]?.[day];
    if (!m) throw new Error(`No mapping for ${year}-${month}-${day}`);

    const yearPillar  = STEMS[Number(m.HYear)  - 1] + BRANCHES[Number(m.EYear)  - 1];
    const monthPillar = STEMS[Number(m.HMonth) - 1] + BRANCHES[Number(m.EMonth) - 1];
    const dayPillar   = STEMS[Number(m.HDay)   - 1] + BRANCHES[Number(m.EDay)   - 1];

    const hourBranch    = getHourBranch(hour);
    const dayStemIndex  = STEMS.indexOf(dayPillar[0]);
    const hourStem      = STEMS[((dayStemIndex * 2) % 10 + BRANCHES.indexOf(hourBranch)) % 10];
    const timePillar    = hourStem + hourBranch;

    const pillars = {
      year:  translatePillar(yearPillar),
      month: translatePillar(monthPillar),
      day:   translatePillar(dayPillar),
      time:  translatePillar(timePillar)
    };

    const dayMasterStem    = pillars.day.stem;
    const dayMasterElement = getElement(dayMasterStem);

    return {
      statusCode: 200, headers,
      body: JSON.stringify({
        source: 'alvamind',
        pillars,
        additionalInfo: {
          dayMaster:    { stem: dayMasterStem, element: dayMasterElement },
          lifeGua:      calculateLifeGua(year, gender || 'male'),
          nobleman:     NOBLEMAN_MAP[dayMasterElement]    || [],
          intelligence: INTELLIGENCE_MAP[dayMasterElement]  || '',
          peachBlossom: PEACH_BLOSSOM_MAP[dayMasterElement] || '',
          fiveFactors:  calculateFiveFactors(pillars),
          chineseString: `${yearPillar}年${monthPillar}月${dayPillar}日${timePillar}時`
        }
      })
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
