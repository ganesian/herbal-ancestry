/* ═══════════════════════════════════════════════════════════════
   喝安 Herbal Ancestry — Frontend Application
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── Language Strings ─────────────────────────────────────────────────────────
const LANG = {
  EN: {
    tagline:         'Discover your elemental balance. Choose your drink.',
    subtagline:      'Ancient Ba Zi wisdom meets everyday herbal wellness.',
    cityPlaceholder: 'City of birth',
    namePlaceholder: 'Your name (optional)',
    waPlaceholder:   'WhatsApp number (optional)',
    genderLabel:     'Gender',
    male:            'Male',
    female:          'Female',
    analyze:         'Analyze My Ba Zi',
    analyzing:       'Analyzing...',
    solarTime:       'True Solar Time used',
    pillarYear:      'Year Pillar',
    pillarMonth:     'Month Pillar',
    pillarDay:       'Day Pillar',
    pillarHour:      'Hour Pillar',
    element:         'Stem Element',
    branchEl:        'Branch Element',
    animal:          'Animal',
    fiveEl:          'Five Elements Balance',
    dayMaster:       'Day Master',
    nature:          'Nature',
    lifeGua:         'Life Gua',
    weakElements:    'Weakest Elements',
    drinkRec:        'Your Drink Recommendations',
    drinkSubtitle:   'Based on your elemental profile, these drinks support your balance.',
    bestSeason:      'Best Season',
    precautions:     'Precautions',
    constitutionNote:'Constitution Note',
    savePdf:         'Save to PDF',
    contactCta:      'Contact Us for 1-on-1 Ba Zi Exclusive Reading',
    footerNote:      'Ba Zi readings are for wellness guidance only. Consult a licensed practitioner for medical decisions.',
    savedMsg:        'Your profile has been saved.',
    errorMsg:        'Something went wrong. Please try again.',
    selectCity:      'Please enter your city of birth.',
    selectDate:      'Please select your date of birth.',
    strong:          'Strong',
    moderate:        'Moderate',
    weak:            'Weak',
    targetedFor:     'Supports',
    yang:            'Yang',
    yin:             'Yin',
    scrollDown:      'Scroll down for your reading',
  },
  ID: {
    tagline:         'Temukan keseimbangan elemenmu. Pilih minumanmu.',
    subtagline:      'Kearifan Ba Zi kuno bertemu kesehatan herbal sehari-hari.',
    cityPlaceholder: 'Kota kelahiran',
    namePlaceholder: 'Nama Anda (opsional)',
    waPlaceholder:   'Nomor WhatsApp (opsional)',
    genderLabel:     'Jenis Kelamin',
    male:            'Pria',
    female:          'Wanita',
    analyze:         'Analisis Ba Zi Saya',
    analyzing:       'Menganalisis...',
    solarTime:       'Waktu Surya Sejati digunakan',
    pillarYear:      'Pilar Tahun',
    pillarMonth:     'Pilar Bulan',
    pillarDay:       'Pilar Hari',
    pillarHour:      'Pilar Jam',
    element:         'Elemen Batang',
    branchEl:        'Elemen Cabang',
    animal:          'Zodiak',
    fiveEl:          'Keseimbangan Lima Elemen',
    dayMaster:       'Day Master',
    nature:          'Sifat',
    lifeGua:         'Life Gua',
    weakElements:    'Elemen Terlemah',
    drinkRec:        'Rekomendasi Minuman Anda',
    drinkSubtitle:   'Berdasarkan profil elemen Anda, minuman ini mendukung keseimbangan Anda.',
    bestSeason:      'Musim Terbaik',
    precautions:     'Perhatian',
    constitutionNote:'Catatan Konstitusi',
    savePdf:         'Simpan ke PDF',
    contactCta:      'Hubungi Kami untuk Konsultasi Ba Zi Eksklusif',
    footerNote:      'Pembacaan Ba Zi hanya untuk panduan kesehatan. Konsultasikan dengan praktisi berlisensi untuk keputusan medis.',
    savedMsg:        'Profil Anda telah disimpan.',
    errorMsg:        'Terjadi kesalahan. Silakan coba lagi.',
    selectCity:      'Masukkan kota kelahiran Anda.',
    selectDate:      'Pilih tanggal lahir Anda.',
    strong:          'Kuat',
    moderate:        'Sedang',
    weak:            'Lemah',
    targetedFor:     'Mendukung',
    yang:            'Yang',
    yin:             'Yin',
    scrollDown:      'Gulir ke bawah untuk hasil bacaan',
  },
};

// ─── Element Display ──────────────────────────────────────────────────────────
const ELEMENT_DISPLAY = {
  WOOD:  { EN: 'Wood',  ID: 'Kayu',  color: '#4a7c59', emoji: '🌿', symbol: '木' },
  FIRE:  { EN: 'Fire',  ID: 'Api',   color: '#c0392b', emoji: '🔥', symbol: '火' },
  EARTH: { EN: 'Earth', ID: 'Tanah', color: '#c8a84b', emoji: '⛰',  symbol: '土' },
  METAL: { EN: 'Metal', ID: 'Logam', color: '#7f8c8d', emoji: '⚙',  symbol: '金' },
  WATER: { EN: 'Water', ID: 'Air',   color: '#2980b9', emoji: '💧', symbol: '水' },
};

const ANIMAL_DISPLAY = {
  Rat:'鼠', Ox:'牛', Tiger:'虎', Rabbit:'兔', Dragon:'龍', Snake:'蛇',
  Horse:'馬', Goat:'羊', Monkey:'猴', Rooster:'雞', Dog:'狗', Pig:'豬',
};

// ─── Drink Recommendations Database ──────────────────────────────────────────
const DRINKS = [
  {
    id: 'golden_bloom',
    nameEN: 'Golden Bloom',
    nameID: 'Golden Bloom',
    altNameEN: 'Amber Petal',
    altNameID: 'Amber Petal',
    element: 'WOOD',
    targetElements: ['WOOD'],
    targetConditions: ['excess_fire'],
    bestSeason: { EN: 'Spring, Summer', ID: 'Semi, Musim Panas' },
    whyHelpsEN: 'Clears Liver heat, soothes eyes and irritability. Supports Wood growth.',
    whyHelpsID: 'Membersihkan panas Hati, menenangkan mata dan iritabilitas. Mendukung pertumbuhan Wood.',
    precautionsEN: 'Chrysanthemum allergy risk. Goji: caution during pregnancy.',
    precautionsID: 'Risiko alergi krisan. Goji: hati-hati saat hamil.',
    constitutionEN: 'Cold constitution: not ideal. Heat constitution: good choice.',
    constitutionID: 'Konstitusi dingin: kurang ideal. Konstitusi panas: pilihan baik.',
  },
  {
    id: 'moon_drop',
    nameEN: 'Moon Drop',
    nameID: 'Moon Drop',
    altNameEN: 'Clear Dusk',
    altNameID: 'Clear Dusk',
    element: 'METAL',
    targetElements: ['METAL', 'WOOD'],
    targetConditions: ['heat'],
    bestSeason: { EN: 'Autumn, Spring', ID: 'Musim Gugur, Semi' },
    whyHelpsEN: 'Clears Lung heat and sore throat. Supports Wood while moistening.',
    whyHelpsID: 'Membersihkan panas Paru-paru dan sakit tenggorokan. Mendukung Wood sambil melembabkan.',
    precautionsEN: 'Chrysanthemum allergy risk. Goji: caution during pregnancy.',
    precautionsID: 'Risiko alergi krisan. Goji: hati-hati saat hamil.',
    constitutionEN: 'Cold constitution: not ideal. Heat constitution: suitable.',
    constitutionID: 'Konstitusi dingin: kurang ideal. Konstitusi panas: sesuai.',
  },
  {
    id: 'meadow_field',
    nameEN: 'Meadow Field',
    nameID: 'Meadow Field',
    altNameEN: 'Jade Breeze',
    altNameID: 'Jade Breeze',
    element: 'WATER',
    targetElements: ['WATER'],
    targetConditions: ['excess_heat'],
    bestSeason: { EN: 'Summer', ID: 'Musim Panas' },
    whyHelpsEN: 'Strongly cooling and diuretic. Reduces body heat significantly.',
    whyHelpsID: 'Sangat mendinginkan dan diuretik. Mengurangi panas tubuh secara signifikan.',
    precautionsEN: 'Very cooling — caution if you tend to feel cold. Limited data in pregnancy.',
    precautionsID: 'Sangat mendinginkan — hati-hati jika sering merasa kedinginan. Data terbatas untuk kehamilan.',
    constitutionEN: 'Cold constitution: avoid. Heat constitution: excellent.',
    constitutionID: 'Konstitusi dingin: hindari. Konstitusi panas: sangat baik.',
  },
  {
    id: 'ember_grass',
    nameEN: 'Ember Grass',
    nameID: 'Ember Grass',
    altNameEN: 'Warm Grove',
    altNameID: 'Warm Grove',
    element: 'EARTH',
    targetElements: ['EARTH'],
    targetConditions: ['cold', 'damp'],
    bestSeason: { EN: 'Winter, Late Summer', ID: 'Musim Dingin, Akhir Musim Panas' },
    whyHelpsEN: 'Warms and strengthens the Spleen. Aids digestion and dispels cold.',
    whyHelpsID: 'Menghangatkan dan menguatkan Limpa. Membantu pencernaan dan mengusir dingin.',
    precautionsEN: 'Generally the safest option. Ginger: caution in large amounts during pregnancy.',
    precautionsID: 'Umumnya pilihan paling aman. Jahe: hati-hati dalam jumlah besar saat hamil.',
    constitutionEN: 'Cold constitution: excellent (warming). Heat constitution: use cautiously.',
    constitutionID: 'Konstitusi dingin: sangat baik (menghangatkan). Konstitusi panas: gunakan dengan hati-hati.',
  },
  {
    id: 'midnight_silk',
    nameEN: 'Midnight Silk',
    nameID: 'Midnight Silk',
    altNameEN: 'Dark Velvet',
    altNameID: 'Dark Velvet',
    element: 'WATER',
    targetElements: ['WATER'],
    targetConditions: ['kidney_deficiency'],
    bestSeason: { EN: 'Winter', ID: 'Musim Dingin' },
    whyHelpsEN: 'Deeply nourishes Kidney essence. Supports vitality, hair, and bone strength.',
    whyHelpsID: 'Menutrisi esensi Ginjal secara mendalam. Mendukung vitalitas, rambut, dan kekuatan tulang.',
    precautionsEN: 'Goji: caution during pregnancy. Rare sesame allergy possible.',
    precautionsID: 'Goji: hati-hati saat hamil. Kemungkinan alergi wijen yang jarang.',
    constitutionEN: 'Cold constitution: very good (neutral-nourishing). Heat constitution: suitable in moderation.',
    constitutionID: 'Konstitusi dingin: sangat baik (netral-nutritif). Konstitusi panas: sesuai dalam jumlah sedang.',
  },
  {
    id: 'rosy_glow',
    nameEN: 'Rosy Glow',
    nameID: 'Rosy Glow',
    altNameEN: 'Red Dawn',
    altNameID: 'Red Dawn',
    element: 'FIRE',
    targetElements: ['FIRE'],
    targetConditions: ['circulation'],
    bestSeason: { EN: 'Summer', ID: 'Musim Panas' },
    whyHelpsEN: 'Moves qi, supports blood circulation and radiant skin. Uplifts mood.',
    whyHelpsID: 'Menggerakkan qi, mendukung sirkulasi darah dan kulit bercahaya. Meningkatkan suasana hati.',
    precautionsEN: 'Goji: caution during pregnancy.',
    precautionsID: 'Goji: hati-hati saat hamil.',
    constitutionEN: 'Cold constitution: good gentle option. Heat constitution: okay in moderation.',
    constitutionID: 'Konstitusi dingin: pilihan lembut yang baik. Konstitusi panas: oke dalam jumlah sedang.',
  },
  {
    id: 'serenity_brew',
    nameEN: 'Serenity Brew',
    nameID: 'Serenity Brew',
    altNameEN: 'Snow Lily',
    altNameID: 'Snow Lily',
    element: 'METAL',
    targetElements: ['METAL'],
    targetConditions: ['dryness', 'anxiety'],
    bestSeason: { EN: 'Autumn', ID: 'Musim Gugur' },
    whyHelpsEN: 'Moistens Lungs and calms the mind. Best for dryness and anxiety.',
    whyHelpsID: 'Melembabkan Paru-paru dan menenangkan pikiran. Terbaik untuk kekeringan dan kecemasan.',
    precautionsEN: 'Goji: caution during pregnancy.',
    precautionsID: 'Goji: hati-hati saat hamil.',
    constitutionEN: 'Cold constitution: use cautiously. Heat constitution: suitable.',
    constitutionID: 'Konstitusi dingin: gunakan dengan hati-hati. Konstitusi panas: sesuai.',
  },
  {
    id: 'lotus_veil',
    nameEN: 'Lotus Veil',
    nameID: 'Lotus Veil',
    altNameEN: 'Morning Light',
    altNameID: 'Morning Light',
    element: 'WOOD',
    targetElements: ['WOOD'],
    targetConditions: ['liver_heat'],
    bestSeason: { EN: 'Spring, Summer', ID: 'Semi, Musim Panas' },
    whyHelpsEN: 'Clears heat from Wood and Metal. Refreshes and lightens.',
    whyHelpsID: 'Membersihkan panas dari Wood dan Metal. Menyegarkan dan meringankan.',
    precautionsEN: 'Goji: caution during pregnancy.',
    precautionsID: 'Goji: hati-hati saat hamil.',
    constitutionEN: 'Cold constitution: not ideal. Heat constitution: good choice.',
    constitutionID: 'Konstitusi dingin: kurang ideal. Konstitusi panas: pilihan baik.',
  },
];

// ─── Indonesian Cities ────────────────────────────────────────────────────────
const ID_CITIES = [
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
  { name: 'Surabaya', lat: -7.2575, lng: 112.7521 },
  { name: 'Bandung', lat: -6.9175, lng: 107.6191 },
  { name: 'Medan', lat: 3.5952, lng: 98.6722 },
  { name: 'Semarang', lat: -6.9932, lng: 110.4203 },
  { name: 'Makassar', lat: -5.1477, lng: 119.4327 },
  { name: 'Palembang', lat: -2.9761, lng: 104.7754 },
  { name: 'Tangerang', lat: -6.178, lng: 106.63 },
  { name: 'Depok', lat: -6.4025, lng: 106.7942 },
  { name: 'Bekasi', lat: -6.2383, lng: 106.9756 },
  { name: 'Bogor', lat: -6.5971, lng: 106.806 },
  { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695 },
  { name: 'Malang', lat: -7.9797, lng: 112.6304 },
  { name: 'Denpasar', lat: -8.6705, lng: 115.2126 },
  { name: 'Padang', lat: -0.9471, lng: 100.4172 },
  { name: 'Pekanbaru', lat: 0.5333, lng: 101.45 },
  { name: 'Banjarmasin', lat: -3.3186, lng: 114.5944 },
  { name: 'Pontianak', lat: -0.0263, lng: 109.3425 },
  { name: 'Samarinda', lat: -0.5016, lng: 117.1537 },
  { name: 'Balikpapan', lat: -1.2654, lng: 116.8312 },
  { name: 'Batam', lat: 1.1301, lng: 104.0529 },
  { name: 'Manado', lat: 1.4748, lng: 124.8421 },
  { name: 'Jayapura', lat: -2.5333, lng: 140.7 },
  { name: 'Ambon', lat: -3.6557, lng: 128.1905 },
  { name: 'Kupang', lat: -10.1772, lng: 123.6074 },
  { name: 'Mataram', lat: -8.5833, lng: 116.1167 },
  { name: 'Kendari', lat: -3.9721, lng: 122.5146 },
  { name: 'Palu', lat: -0.9003, lng: 119.8779 },
  { name: 'Cirebon', lat: -6.7063, lng: 108.5571 },
  { name: 'Tasikmalaya', lat: -7.3274, lng: 108.2207 },
  { name: 'Sukabumi', lat: -6.9255, lng: 106.9276 },
  { name: 'Tegal', lat: -6.8797, lng: 109.1256 },
  { name: 'Purwokerto', lat: -7.4306, lng: 109.2478 },
  { name: 'Salatiga', lat: -7.3306, lng: 110.498 },
  { name: 'Magelang', lat: -7.4797, lng: 110.2177 },
  { name: 'Surakarta', lat: -7.5755, lng: 110.8243 },
  { name: 'Klaten', lat: -7.7071, lng: 110.6089 },
  { name: 'Kudus', lat: -6.8049, lng: 110.8401 },
  { name: 'Pekalongan', lat: -6.8884, lng: 109.6753 },
  { name: 'Kediri', lat: -7.8273, lng: 112.018 },
  { name: 'Blitar', lat: -8.0957, lng: 112.1608 },
  { name: 'Madiun', lat: -7.6298, lng: 111.523 },
  { name: 'Mojokerto', lat: -7.4721, lng: 112.4337 },
  { name: 'Probolinggo', lat: -7.7543, lng: 113.2159 },
  { name: 'Pasuruan', lat: -7.6453, lng: 112.9075 },
  { name: 'Batu', lat: -7.8694, lng: 112.5271 },
  { name: 'Jember', lat: -8.1845, lng: 113.6670 },
  { name: 'Banyuwangi', lat: -8.2194, lng: 114.3691 },
  { name: 'Palangkaraya', lat: -2.2136, lng: 113.9108 },
  { name: 'Singkawang', lat: 0.9022, lng: 108.9759 },
  { name: 'Tarakan', lat: 3.3265, lng: 117.5785 },
  { name: 'Ternate', lat: 0.7919, lng: 127.3803 },
  { name: 'Sorong', lat: -0.8667, lng: 131.25 },
  { name: 'Merauke', lat: -8.4896, lng: 140.4019 },
  { name: 'Pangkal Pinang', lat: -2.1292, lng: 106.1169 },
  { name: 'Jambi', lat: -1.5906, lng: 103.5997 },
  { name: 'Bengkulu', lat: -3.7928, lng: 102.2608 },
  { name: 'Banda Aceh', lat: 5.5483, lng: 95.3238 },
  { name: 'Lhokseumawe', lat: 5.18, lng: 97.15 },
  { name: 'Gorontalo', lat: 0.5435, lng: 123.0596 },
  { name: 'Mamuju', lat: -2.6754, lng: 118.8879 },
  { name: 'Poso', lat: -1.3983, lng: 120.7549 },
  { name: 'Bima', lat: -8.4637, lng: 118.7236 },
  { name: 'Singaraja', lat: -8.1119, lng: 115.0884 },
  { name: 'Cilegon', lat: -6.0028, lng: 106.0529 },
  { name: 'Serang', lat: -6.1187, lng: 106.1503 },
  { name: 'Tangerang Selatan', lat: -6.2887, lng: 106.7144 },
  { name: 'Karawang', lat: -6.3056, lng: 107.3256 },
];

// ─── True Solar Time ──────────────────────────────────────────────────────────
function equationOfTime(dayOfYear) {
  const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff  = date - start;
  return Math.floor(diff / 86400000);
}

function toTrueSolarTime(localDateTime, longitude) {
  const tz = getTimezoneOffsetMinutes(longitude);
  const stdMeridian = Math.round(tz / 60) * 15;
  const dayOfYear   = getDayOfYear(localDateTime);
  const eot         = equationOfTime(dayOfYear);
  const correction  = (longitude - stdMeridian) * 4 + eot; // minutes
  const solar = new Date(localDateTime.getTime() + correction * 60000);
  return solar;
}

function getTimezoneOffsetMinutes(longitude) {
  if (longitude >= 107.5 && longitude < 120) return 7 * 60;  // WIB
  if (longitude >= 120  && longitude < 127.5) return 8 * 60; // WITA
  return 7 * 60; // default WIB
}

// ─── Nominatim Geocoding ──────────────────────────────────────────────────────
async function geocodeCity(cityName) {
  const local = ID_CITIES.find(c => c.name.toLowerCase().includes(cityName.toLowerCase()));
  if (local) return local;
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName + ', Indonesia')}&format=json&limit=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    if (data[0]) {
      return { name: data[0].display_name, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (e) { /* fallback silently */ }
  return null;
}

// ─── Drink Recommendation ─────────────────────────────────────────────────────
function getCurrentSeason() {
  const m = new Date().getMonth() + 1; // Indonesia: near equator, use N hemisphere for TCM
  if (m >= 3 && m <= 5) return 'spring';
  if (m >= 6 && m <= 8) return 'summer';
  if (m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}

function recommendDrinks(fiveFactors, lang) {
  const sorted = Object.entries(fiveFactors).sort((a, b) => a[1] - b[1]);
  const weakElements = sorted.slice(0, 2).map(([el]) => el);
  const season = getCurrentSeason();

  let matched = DRINKS.filter(d => d.targetElements.some(el => weakElements.includes(el)));
  if (matched.length === 0) matched = DRINKS.slice(0, 3);

  // Deduplicate and cap at 3
  const seen = new Set();
  const result = [];
  for (const d of matched) {
    if (!seen.has(d.id) && result.length < 3) { seen.add(d.id); result.push(d); }
  }
  // Fill up to 3 if needed
  for (const d of DRINKS) {
    if (!seen.has(d.id) && result.length < 3) { seen.add(d.id); result.push(d); }
  }
  return result;
}

// ─── State ────────────────────────────────────────────────────────────────────
let currentLang = 'EN';
let baziResult  = null;
let cityCoords  = null;
let cityName    = '';
let autocompleteTimer = null;

// ─── DOM Helpers ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const t  = key => LANG[currentLang][key] || key;
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

// ─── Language Toggle ──────────────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-en]').forEach(node => {
    node.textContent = lang === 'EN' ? node.dataset.en : node.dataset.id;
  });
  $('btn-en').classList.toggle('active', lang === 'EN');
  $('btn-id').classList.toggle('active', lang === 'ID');
  $('city-input').placeholder = t('cityPlaceholder');
  $('name-input').placeholder  = t('namePlaceholder');
  $('wa-input').placeholder    = t('waPlaceholder');
  $('analyze-btn').textContent = t('analyze');
  if (baziResult) renderResults(baziResult);
}

// ─── City Autocomplete ────────────────────────────────────────────────────────
function initAutocomplete() {
  const input = $('city-input');
  const dropdown = $('city-dropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim();
    cityCoords = null;
    cityName = q;
    clearTimeout(autocompleteTimer);
    if (q.length < 2) { dropdown.classList.add('hidden'); return; }

    const matches = ID_CITIES.filter(c => c.name.toLowerCase().startsWith(q.toLowerCase())).slice(0, 8);
    if (matches.length === 0) { dropdown.classList.add('hidden'); return; }

    dropdown.innerHTML = '';
    matches.forEach(city => {
      const item = el('div', 'autocomplete-item', city.name);
      item.addEventListener('click', () => {
        input.value = city.name;
        cityCoords  = { lat: city.lat, lng: city.lng };
        cityName    = city.name;
        dropdown.classList.add('hidden');
      });
      dropdown.appendChild(item);
    });
    dropdown.classList.remove('hidden');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.city-wrap')) dropdown.classList.add('hidden');
  });
}

// ─── Form Validation ──────────────────────────────────────────────────────────
function validate() {
  const city  = $('city-input').value.trim();
  const year  = $('birth-year').value;
  const month = $('birth-month').value;
  const day   = $('birth-day').value;
  if (!city) { showToast(t('selectCity'), 'warn'); return false; }
  if (!year || !month || !day) { showToast(t('selectDate'), 'warn'); return false; }
  return true;
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const toast = $('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── Date Pickers ─────────────────────────────────────────────────────────────
function populateDateSelects() {
  const yearSel  = $('birth-year');
  const monthSel = $('birth-month');
  const daySel   = $('birth-day');

  const now = new Date();
  for (let y = now.getFullYear(); y >= 1930; y--) {
    yearSel.appendChild(new Option(y, y));
  }
  for (let m = 1; m <= 12; m++) {
    monthSel.appendChild(new Option(String(m).padStart(2, '0'), m));
  }
  for (let d = 1; d <= 31; d++) {
    daySel.appendChild(new Option(String(d).padStart(2, '0'), d));
  }

  yearSel.addEventListener('change',  updateDays);
  monthSel.addEventListener('change', updateDays);
}

function updateDays() {
  const year  = parseInt($('birth-year').value);
  const month = parseInt($('birth-month').value);
  const daySel = $('birth-day');
  const cur   = parseInt(daySel.value);
  const maxDay = year && month ? new Date(year, month, 0).getDate() : 31;

  daySel.innerHTML = '';
  for (let d = 1; d <= maxDay; d++) {
    daySel.appendChild(new Option(String(d).padStart(2, '0'), d));
  }
  if (cur && cur <= maxDay) daySel.value = cur;
}

function populateTimeSelects() {
  const hourSel = $('birth-hour');
  const minSel  = $('birth-min');
  for (let h = 0; h <= 23; h++) hourSel.appendChild(new Option(String(h).padStart(2, '0'), h));
  for (let m = 0; m <= 59; m++) minSel.appendChild(new Option(String(m).padStart(2, '0'), m));
  hourSel.value = 12;
  minSel.value  = 0;
}

// ─── Main Analysis ────────────────────────────────────────────────────────────
async function analyze() {
  if (!validate()) return;

  const btn = $('analyze-btn');
  btn.textContent = t('analyzing');
  btn.disabled = true;

  try {
    const year  = parseInt($('birth-year').value);
    const month = parseInt($('birth-month').value);
    const day   = parseInt($('birth-day').value);
    const hour  = parseInt($('birth-hour').value);
    const min   = parseInt($('birth-min').value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
    const name   = $('name-input').value.trim();
    const wa     = $('wa-input').value.trim();
    const cc     = $('cc-select').value;

    // Get city coordinates
    if (!cityCoords) {
      cityCoords = await geocodeCity($('city-input').value.trim());
    }

    // True Solar Time
    const localDt = new Date(year, month - 1, day, hour, min, 0);
    let solarHour = hour;
    let solarMin  = min;
    let solarTimeStr = '';

    if (cityCoords) {
      const solar = toTrueSolarTime(localDt, cityCoords.lng);
      solarHour   = solar.getHours();
      solarMin    = solar.getMinutes();
      solarTimeStr = `${String(solarHour).padStart(2,'0')}:${String(solarMin).padStart(2,'0')}`;
    }

    // Call Ba Zi function
    const response = await fetch('/api/bazi', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ year, month, day, hour: solarHour, gender }),
    });

    if (!response.ok) throw new Error('Ba Zi calculation failed');
    const data = await response.json();

    baziResult = { ...data, solarTimeStr, gender, name, year };
    renderResults(baziResult);

    // Save if WhatsApp provided
    if (wa) {
      const fullWa = `${cc}${wa.replace(/^0/, '')}`;
      fetch('/api/save-record', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, whatsapp: fullWa,
          city: $('city-input').value.trim(),
          birthDate: `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
          birthTime: `${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}`,
          gender,
          dayMasterElement: data.dayMaster?.element,
          fiveFactors: data.fiveFactors,
        }),
      }).then(r => r.json()).then(r => { if (r.saved) showToast(t('savedMsg'), 'success'); }).catch(() => {});
    }

    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    console.error(err);
    showToast(t('errorMsg'), 'error');
  } finally {
    btn.textContent = t('analyze');
    btn.disabled = false;
  }
}

// ─── Render Results ───────────────────────────────────────────────────────────
function renderResults({ pillars, fiveFactors, dayMaster, lifeGua, solarTimeStr, gender, year }) {
  const section = $('results-section');
  section.classList.remove('hidden');

  // Solar time badge
  $('solar-time-badge').innerHTML = solarTimeStr
    ? `<span>${t('solarTime')}: <strong>${solarTimeStr}</strong></span>`
    : '';

  // Pillars
  const pillarKeys = ['year','month','day','time'];
  const pillarLabels = [t('pillarYear'), t('pillarMonth'), t('pillarDay'), t('pillarHour')];
  const pillarsContainer = $('pillars-container');
  pillarsContainer.innerHTML = '';

  pillarKeys.forEach((key, i) => {
    const p   = pillars[key];
    const elD = ELEMENT_DISPLAY[p.element] || {};
    const bEl = ELEMENT_DISPLAY[p.branch?.element] || {};
    const card = el('div', 'pillar-card');
    card.style.setProperty('--pillar-color', elD.color || '#c8a84b');
    card.innerHTML = `
      <div class="pillar-label">${pillarLabels[i]}</div>
      <div class="pillar-chinese">${p.chinese}</div>
      <div class="pillar-element-badge" style="background:${elD.color}20;color:${elD.color}">
        ${elD.symbol || ''} ${elD[currentLang] || p.element}
      </div>
      <div class="pillar-details">
        <div class="detail-row"><span class="detail-key">${t('animal')}</span><span>${ANIMAL_DISPLAY[p.animal] || ''} ${p.animal}</span></div>
        <div class="detail-row"><span class="detail-key">${t('branchEl')}</span><span style="color:${bEl.color}">${bEl[currentLang] || p.branch?.element || ''}</span></div>
      </div>
    `;
    pillarsContainer.appendChild(card);
  });

  // Day Master + Life Gua
  const dmEl = ELEMENT_DISPLAY[dayMaster?.element] || {};
  $('daymaster-display').innerHTML = `
    <div class="dm-item">
      <div class="dm-label">${t('dayMaster')}</div>
      <div class="dm-value" style="color:${dmEl.color}">${dayMaster?.stem || ''} — ${dmEl[currentLang] || dayMaster?.element || ''}</div>
    </div>
    <div class="dm-item">
      <div class="dm-label">${t('nature')}</div>
      <div class="dm-value">${dayMaster?.nature === 'Yang' ? t('yang') : t('yin')} ${dayMaster?.nature || ''}</div>
    </div>
    <div class="dm-item">
      <div class="dm-label">${t('lifeGua')}</div>
      <div class="dm-value">${lifeGua}</div>
    </div>
  `;

  // Five Factors Chart
  renderFiveFactors(fiveFactors);

  // Drink Recommendations
  renderDrinks(fiveFactors);
}

function renderFiveFactors(fiveFactors) {
  const container = $('five-factors-bars');
  container.innerHTML = '';
  const max = Math.max(...Object.values(fiveFactors));

  ['WOOD','FIRE','EARTH','METAL','WATER'].forEach(el2 => {
    const val = fiveFactors[el2] || 0;
    const d   = ELEMENT_DISPLAY[el2];
    const strength = val >= 30 ? t('strong') : val >= 15 ? t('moderate') : t('weak');
    const row = el('div', 'ff-row');
    row.innerHTML = `
      <div class="ff-label">
        <span class="ff-symbol" style="color:${d.color}">${d.symbol}</span>
        <span>${d[currentLang]}</span>
      </div>
      <div class="ff-bar-wrap">
        <div class="ff-bar" style="width:${max > 0 ? (val/max)*100 : 0}%;background:${d.color}"></div>
      </div>
      <div class="ff-pct" style="color:${d.color}">${val}%</div>
      <div class="ff-strength">${strength}</div>
    `;
    container.appendChild(row);
  });
}

function renderDrinks(fiveFactors) {
  const drinks = recommendDrinks(fiveFactors, currentLang);
  const container = $('drink-cards');
  container.innerHTML = '';

  // Weak elements chips
  const sorted = Object.entries(fiveFactors).sort((a, b) => a[1] - b[1]);
  const weakElements = sorted.slice(0, 2);
  $('weak-elements').innerHTML = weakElements.map(([el2, val]) => {
    const d = ELEMENT_DISPLAY[el2];
    return `<span class="el-chip" style="background:${d.color}20;color:${d.color};border:1px solid ${d.color}40">${d.symbol} ${d[currentLang]} (${val}%)</span>`;
  }).join('');

  drinks.forEach(drink => {
    const elD = ELEMENT_DISPLAY[drink.element] || {};
    const name = currentLang === 'EN' ? drink.nameEN : drink.nameID;
    const alt  = currentLang === 'EN' ? drink.altNameEN : drink.altNameID;
    const why  = currentLang === 'EN' ? drink.whyHelpsEN : drink.whyHelpsID;
    const prec = currentLang === 'EN' ? drink.precautionsEN : drink.precautionsID;
    const cons = currentLang === 'EN' ? drink.constitutionEN : drink.constitutionID;
    const seas = drink.bestSeason[currentLang];

    const card = el('div', 'drink-card');
    card.style.setProperty('--drink-color', elD.color || '#c8a84b');
    card.innerHTML = `
      <div class="drink-header">
        <div>
          <div class="drink-name">${name}</div>
          <div class="drink-alt">/ ${alt}</div>
        </div>
        <div class="drink-el-badge" style="background:${elD.color}20;color:${elD.color}">
          ${elD.symbol} ${elD[currentLang] || drink.element}
        </div>
      </div>
      <p class="drink-why">${why}</p>
      <div class="drink-meta">
        <div class="meta-row"><strong>${t('bestSeason')}:</strong> ${seas}</div>
        <div class="meta-row warn"><strong>${t('precautions')}:</strong> ${prec}</div>
        <div class="meta-row note"><strong>${t('constitutionNote')}:</strong> ${cons}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ─── PDF Export ───────────────────────────────────────────────────────────────
async function exportPDF() {
  const btn = $('pdf-btn');
  btn.disabled = true;
  btn.textContent = '...';

  try {
    const { jsPDF } = window.jspdf;
    const canvas = await html2canvas($('results-section'), {
      scale: 2, useCORS: true, backgroundColor: '#f7f3ec',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height / canvas.width) * w;

    let y = 0;
    const pageH = pdf.internal.pageSize.getHeight();
    while (y < h) {
      if (y > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, -y, w, h);
      y += pageH;
    }
    pdf.save('HE_BaZi_Reading.pdf');
  } catch (e) {
    console.error(e);
    showToast(t('errorMsg'), 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = t('savePdf');
  }
}

// ─── Country Code Picker ──────────────────────────────────────────────────────
function populateCountryCodes() {
  const sel = $('cc-select');
  const codes = [
    ['+62','🇮🇩 +62'], ['+1','🇺🇸 +1'], ['+44','🇬🇧 +44'], ['+65','🇸🇬 +65'],
    ['+60','🇲🇾 +60'], ['+61','🇦🇺 +61'], ['+81','🇯🇵 +81'], ['+86','🇨🇳 +86'],
    ['+82','🇰🇷 +82'], ['+91','🇮🇳 +91'], ['+971','🇦🇪 +971'], ['+966','🇸🇦 +966'],
  ];
  codes.forEach(([val, label]) => {
    const opt = new Option(label, val);
    if (val === '+62') opt.selected = true;
    sel.appendChild(opt);
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateDateSelects();
  populateTimeSelects();
  populateCountryCodes();
  initAutocomplete();

  $('btn-en').addEventListener('click', () => setLang('EN'));
  $('btn-id').addEventListener('click', () => setLang('ID'));
  $('analyze-btn').addEventListener('click', analyze);
  $('pdf-btn').addEventListener('click', exportPDF);
  $('contact-cta').addEventListener('click', () => window.open('https://wa.me/6282126221527', '_blank'));

  setLang('EN');
});
