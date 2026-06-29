'use strict';

const fs = require('fs');
const path = require('path');

// ─── Constants (from alvamind source) ────────────────────────────────────────
const STEMS   = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES= ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ANIMALS = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];

const ELEMENTS = {
  WOOD:  ['甲','乙'],
  FIRE:  ['丙','丁'],
  EARTH: ['戊','己'],
  METAL: ['庚','辛'],
  WATER: ['壬','癸'],
};

const BRANCH_ELEMENTS = {
  WATER: ['子','亥'],
  WOOD:  ['寅','卯'],
  FIRE:  ['巳','午'],
  METAL: ['申','酉'],
  EARTH: ['丑','辰','未','戌'],
};

const HIDDEN_STEMS = {
  子:['癸'], 丑:['己','癸','辛'], 寅:['甲','丙','戊'], 卯:['乙'],
  辰:['戊','乙','癸'], 巳:['丙','庚','戊'], 午:['丁','己'], 未:['己','丁','乙'],
  申:['庚','壬','戊'], 酉:['辛'], 戌:['戊','辛','丁'], 亥:['壬','甲'],
};

const ELEMENT_RELATIONSHIPS = {
  WOOD:  { WATER:'Resource', WOOD:'Companion', FIRE:'Output', EARTH:'Wealth', METAL:'Control' },
  FIRE:  { WOOD:'Resource',  FIRE:'Companion', EARTH:'Output', METAL:'Wealth', WATER:'Control' },
  EARTH: { FIRE:'Resource',  EARTH:'Companion', METAL:'Output', WATER:'Wealth', WOOD:'Control' },
  METAL: { EARTH:'Resource', METAL:'Companion', WATER:'Output', WOOD:'Wealth', FIRE:'Control' },
  WATER: { METAL:'Resource', WATER:'Companion', WOOD:'Output', FIRE:'Wealth', EARTH:'Control' },
};

const RELATIONSHIP_WEIGHTS = { Resource:3, Companion:2.5, Output:2, Wealth:1.2, Control:1.2 };

const HOUR_MAP = [
  [23,1,'子'],[1,3,'丑'],[3,5,'寅'],[5,7,'卯'],[7,9,'辰'],[9,11,'巳'],
  [11,13,'午'],[13,15,'未'],[15,17,'申'],[17,19,'酉'],[19,21,'戌'],[21,23,'亥'],
];

const NOBLEMAN_MAP = {
  WOOD:['丑','未'], FIRE:['亥','巳'], EARTH:['申','寅'], METAL:['寅','午'], WATER:['巳','申'],
};

// ─── Load date mappings lazily ────────────────────────────────────────────────
let _datesMapping = null;
function getDatesMapping() {
  if (!_datesMapping) {
    _datesMapping = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'dates_mapping.json'), 'utf-8')
    );
  }
  return _datesMapping;
}

// ─── Core helpers ─────────────────────────────────────────────────────────────
function getElementFromStem(stem) {
  return Object.entries(ELEMENTS).find(([, stems]) => stems.includes(stem))?.[0] || '';
}

function getBranchElement(branch) {
  return Object.entries(BRANCH_ELEMENTS).find(([, branches]) => branches.includes(branch))?.[0] || '';
}

function translatePillar(pillarStr) {
  const stem   = pillarStr[0];
  const branch = pillarStr[1];
  return {
    chinese:  pillarStr,
    element:  getElementFromStem(stem),
    animal:   ANIMALS[BRANCHES.indexOf(branch)],
    stemName: stem,
    branchName: branch,
    branch: { element: getBranchElement(branch) },
  };
}

function getHourBranch(hour) {
  const match = HOUR_MAP.find(([start, end]) =>
    (hour >= start && hour < end) || (start === 23 && (hour >= 23 || hour < 1))
  );
  return match ? match[2] : '子';
}

function calculateHourStem(dayStem, branch) {
  const stemOffset = (STEMS.indexOf(dayStem) * 2) % 10;
  const branchIndex = BRANCHES.indexOf(branch);
  return STEMS[(stemOffset + branchIndex) % 10];
}

// ─── Pillar calculation ───────────────────────────────────────────────────────
function calculatePillars(year, month, day, hour) {
  const dm = getDatesMapping();
  const mapping = dm[year]?.[month]?.[day];
  if (!mapping) throw new Error(`No mapping for ${year}-${month}-${day}`);

  const yearPillar  = STEMS[mapping.HYear  - 1] + BRANCHES[mapping.EYear  - 1];
  const monthPillar = STEMS[mapping.HMonth - 1] + BRANCHES[mapping.EMonth - 1];
  const dayPillar   = STEMS[mapping.HDay   - 1] + BRANCHES[mapping.EDay   - 1];

  const hourBranch  = getHourBranch(hour);
  const dayStem     = STEMS[mapping.HDay   - 1];
  const hourStem    = calculateHourStem(dayStem, hourBranch);
  const timePillar  = hourStem + hourBranch;

  return {
    year:  translatePillar(yearPillar),
    month: translatePillar(monthPillar),
    day:   translatePillar(dayPillar),
    time:  translatePillar(timePillar),
  };
}

// ─── Five Factors ─────────────────────────────────────────────────────────────
function calculateFiveFactors(pillars) {
  const dayMasterElement = getElementFromStem(pillars.day.chinese[0]);
  const elements = [
    pillars.year.chinese[0], pillars.month.chinese[0],
    pillars.day.chinese[0],  pillars.time.chinese[0],
    ...(HIDDEN_STEMS[pillars.year.chinese[1]]  || []),
    ...(HIDDEN_STEMS[pillars.month.chinese[1]] || []),
    ...(HIDDEN_STEMS[pillars.day.chinese[1]]   || []),
    ...(HIDDEN_STEMS[pillars.time.chinese[1]]  || []),
  ].map(getElementFromStem).filter(Boolean);

  const weights = { WOOD:0, FIRE:0, EARTH:0, METAL:0, WATER:0 };
  elements.forEach(el => {
    const rel = ELEMENT_RELATIONSHIPS[dayMasterElement][el];
    weights[el] += RELATIONSHIP_WEIGHTS[rel] || 0;
  });

  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  return Object.fromEntries(
    Object.entries(weights).map(([k, v]) => [k, Math.round((v * 100) / total)])
  );
}

// ─── Life Gua ─────────────────────────────────────────────────────────────────
function calculateLifeGua(year, gender) {
  const digits = year.toString().split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);

  let gua;
  if (gender === 'male') {
    gua = 11 - sum;
    if (gua === 0) gua = 9;
    if (gua === 5) gua = 2;
  } else {
    gua = sum + 4;
    if (gua > 9) gua -= 9;
    if (gua === 5) gua = 8;
  }
  return gua;
}

// ─── Day Master ───────────────────────────────────────────────────────────────
function calculateDayMaster(dayPillar) {
  const stem = dayPillar.chinese[0];
  return {
    stem,
    element: getElementFromStem(stem),
    nature: STEMS.indexOf(stem) % 2 === 0 ? 'Yang' : 'Yin',
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { year, month, day, hour, gender } = JSON.parse(event.body || '{}');

    if (!year || !month || !day || hour === undefined) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields: year, month, day, hour' }) };
    }

    const pillars      = calculatePillars(Number(year), Number(month), Number(day), Number(hour));
    const fiveFactors  = calculateFiveFactors(pillars);
    const dayMaster    = calculateDayMaster(pillars.day);
    const lifeGua      = calculateLifeGua(Number(year), gender || 'male');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ pillars, fiveFactors, dayMaster, lifeGua }),
    };
  } catch (err) {
    console.error('BaZi error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
