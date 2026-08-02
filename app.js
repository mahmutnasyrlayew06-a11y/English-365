// ===================== 365 Kun English - app.js =====================
const LS_KEYS = {
  START: 'eng365_start_date',
  DONE: 'eng365_done_days',
  NOTIF_ON: 'eng365_notif_on',
  NOTIF_TIMES: 'eng365_notif_times',
  TRANSLATION_CACHE: 'eng365_tr_cache'
};

const DEFAULT_TIMES = ['09:00', '13:30', '18:00', '21:00'];

// ---------- State ----------
function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10);
}
function getStartDate() {
  let v = localStorage.getItem(LS_KEYS.START);
  if (!v) {
    v = todayStr();
    localStorage.setItem(LS_KEYS.START, v);
  }
  return new Date(v + 'T00:00:00');
}
function getCurrentDayNumber() {
  const start = getStartDate();
  const now = new Date(todayStr() + 'T00:00:00');
  const diff = Math.floor((now - start) / 86400000);
  return Math.min(Math.max(diff + 1, 1), 365);
}
function getDoneDays() {
  try { return JSON.parse(localStorage.getItem(LS_KEYS.DONE) || '[]'); } catch (e) { return []; }
}
function markDone(dayNum) {
  const done = getDoneDays();
  if (!done.includes(dayNum)) {
    done.push(dayNum);
    localStorage.setItem(LS_KEYS.DONE, JSON.stringify(done));
  }
}
function getStreak() {
  const done = new Set(getDoneDays());
  let streak = 0;
  let d = getCurrentDayNumber();
  // count consecutive done days ending at the most recent completed day
  if (!done.has(d) && d > 1) d -= 1;
  while (d >= 1 && done.has(d)) { streak++; d--; }
  return streak;
}

// ---------- Translation (best-effort, cached, graceful fallback) ----------
function getTrCache() {
  try { return JSON.parse(localStorage.getItem(LS_KEYS.TRANSLATION_CACHE) || '{}'); } catch (e) { return {}; }
}
function saveTrCache(cache) {
  try { localStorage.setItem(LS_KEYS.TRANSLATION_CACHE, JSON.stringify(cache)); } catch (e) {}
}
async function translateWord(word) {
  const cache = getTrCache();
  if (cache[word]) return cache[word];
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|uz`);
    const data = await res.json();
    let tr = data && data.responseData && data.responseData.translatedText;
    if (tr) {
      tr = tr.charAt(0).toLowerCase() + tr.slice(1);
      cache[word] = tr;
      saveTrCache(cache);
      return tr;
    }
  } catch (e) { /* offline or blocked - fail gracefully */ }
  return null;
}

// ---------- Rendering ----------
const POS_UZ = { noun: 'ot', verb: "fe'l", adj: 'sifat', phrase: 'ibora', number: 'son', adv: "bog'lovchi" };

function highlightWordsInSentence(sentence, words) {
  let out = sentence;
  words.forEach(w => {
    const re = new RegExp(`\\b(${w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*)\\b`, 'i');
    out = out.replace(re, '<b>$1</b>');
  });
  return out;
}

function renderHome() {
  const dayNum = getCurrentDayNumber();
  const day = CURRICULUM[dayNum - 1];
  if (!day) return;

  document.getElementById('heroDay').textContent = String(dayNum).padStart(3, '0');
  document.getElementById('levelBadge').textContent = day.level;
  document.getElementById('grammarFocus').textContent = day.grammarFocus;

  const done = getDoneDays();
  const pct = Math.round((done.length / 365) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${pct}% bajarildi (${done.length}/365)`;
  document.getElementById('daysLeftText').textContent = `${365 - dayNum} kun qoldi`;
  document.getElementById('streakCount').textContent = getStreak();

  // words
  const grid = document.getElementById('wordGrid');
  grid.innerHTML = '';
  day.words.forEach(w => {
    const card = document.createElement('div');
    card.className = 'wordcard';
    card.innerHTML = `
      <div class="wordcard-inner">
        <div class="wordcard-face wordcard-front">
          <div class="w">${w.word}</div>
          <div class="pos">${POS_UZ[w.pos] || w.pos}</div>
        </div>
        <div class="wordcard-face wordcard-back">
          <div class="tr">…</div>
          <div class="hint">tarjima</div>
        </div>
      </div>`;
    card.addEventListener('click', async () => {
      card.classList.toggle('flipped');
      if (card.classList.contains('flipped')) {
        const trEl = card.querySelector('.tr');
        const tr = await translateWord(w.word);
        trEl.textContent = tr || '(tarjima topilmadi)';
      }
    });
    grid.appendChild(card);
  });

  // sentences
  const list = document.getElementById('sentenceList');
  list.innerHTML = '';
  day.sentences.forEach(s => {
    const el = document.createElement('div');
    el.className = 'sentence';
    el.innerHTML = highlightWordsInSentence(s, day.words);
    list.appendChild(el);
  });

  const btn = document.getElementById('btnDone');
  if (done.includes(dayNum)) {
    btn.textContent = '✓ Bugun bajarilgan';
    btn.disabled = true;
  } else {
    btn.textContent = "✓ Bugungi darsni tugatdim";
    btn.disabled = false;
  }
}

function renderPath() {
  const container = document.getElementById('pathContainer');
  container.innerHTML = '';
  const done = new Set(getDoneDays());
  const today = getCurrentDayNumber();

  const months = {};
  CURRICULUM.forEach(d => { (months[d.month] = months[d.month] || []).push(d); });

  document.getElementById('pathSummary').textContent = `${done.size}/365 kun tugatildi`;

  Object.keys(months).sort((a, b) => a - b).forEach(m => {
    const days = months[m];
    const block = document.createElement('div');
    block.className = 'month-block';
    block.innerHTML = `<div class="month-label">${m}-oy <span class="lvl">${days[0].level}</span></div>`;
    const grid = document.createElement('div');
    grid.className = 'day-grid';
    days.forEach(d => {
      const dot = document.createElement('div');
      let cls = 'day-dot';
      if (done.has(d.day)) cls += ' done';
      if (d.day === today) cls += ' today';
      if (d.day > today) cls += ' locked';
      dot.className = cls;
      dot.textContent = d.day;
      if (d.day <= today) {
        dot.addEventListener('click', () => openDayPreview(d));
      }
      grid.appendChild(dot);
    });
    block.appendChild(grid);
    container.appendChild(block);
  });
}

function openDayPreview(day) {
  const isToday = day.day === getCurrentDayNumber();
  if (isToday) { switchScreen('home'); return; }
  const words = day.words.map(w => w.word).join(', ');
  showToast(`${day.day}-kun (${day.level}): ${words}`, 4000);
}

// ---------- Screens ----------
function switchScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.screen === name));
  if (name === 'path') renderPath();
  if (name === 'settings') renderSettings();
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => switchScreen(tab.dataset.screen));
});

document.getElementById('btnDone').addEventListener('click', () => {
  const dayNum = getCurrentDayNumber();
  markDone(dayNum);
  renderHome();
  showToast('Zo\'r! Bugungi dars yakunlandi 🎉');
});

// ---------- Toast ----------
let toastTimer;
function showToast(msg, ms = 2200) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

// ---------- Settings / Notifications ----------
function getNotifTimes() {
  try {
    const v = JSON.parse(localStorage.getItem(LS_KEYS.NOTIF_TIMES));
    return Array.isArray(v) && v.length ? v : DEFAULT_TIMES.slice();
  } catch (e) { return DEFAULT_TIMES.slice(); }
}
function saveNotifTimes(times) {
  times.sort();
  localStorage.setItem(LS_KEYS.NOTIF_TIMES, JSON.stringify(times));
  scheduleNotifications();
}

function renderSettings() {
  document.getElementById('startDateText').textContent = todayStr(getStartDate());
  const on = localStorage.getItem(LS_KEYS.NOTIF_ON) === '1';
  document.getElementById('notifToggle').checked = on;
  renderTimeChips();
}

function renderTimeChips() {
  const wrap = document.getElementById('timeChips');
  wrap.innerHTML = '';
  getNotifTimes().forEach(t => {
    const chip = document.createElement('div');
    chip.className = 'time-chip';
    chip.innerHTML = `<span>${t}</span><button aria-label="o'chirish">✕</button>`;
    chip.querySelector('button').addEventListener('click', () => {
      const times = getNotifTimes().filter(x => x !== t);
      saveNotifTimes(times);
      renderTimeChips();
    });
    wrap.appendChild(chip);
  });
}

document.getElementById('addTimeBtn').addEventListener('click', () => {
  const val = document.getElementById('timeInput').value;
  if (!val) return;
  const times = getNotifTimes();
  if (!times.includes(val)) {
    times.push(val);
    saveNotifTimes(times);
    renderTimeChips();
  }
});

document.getElementById('notifToggle').addEventListener('change', async (e) => {
  if (e.target.checked) {
    if (!('Notification' in window)) {
      showToast("Brauzeringiz bildirishnomani qo'llamaydi");
      e.target.checked = false;
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
      showToast('Ruxsat berilmadi');
      e.target.checked = false;
      return;
    }
    localStorage.setItem(LS_KEYS.NOTIF_ON, '1');
    scheduleNotifications();
    showToast('Bildirishnomalar yoqildi ✅');
  } else {
    localStorage.setItem(LS_KEYS.NOTIF_ON, '0');
    showToast("Bildirishnomalar o'chirildi");
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm("Haqiqatan ham 1-kundan qayta boshlamoqchimisiz? Barcha progress o'chadi.")) return;
  localStorage.removeItem(LS_KEYS.START);
  localStorage.removeItem(LS_KEYS.DONE);
  getStartDate();
  renderHome();
  showToast('Dastur 1-kundan qayta boshlandi');
  switchScreen('home');
});

// ---------- Notification scheduling (best-effort, foreground + SW) ----------
let notifCheckInterval = null;
function scheduleNotifications() {
  if (notifCheckInterval) clearInterval(notifCheckInterval);
  const on = localStorage.getItem(LS_KEYS.NOTIF_ON) === '1';
  if (!on) return;

  const firedTodayKey = 'eng365_fired_' + todayStr();

  function checkAndFire() {
    const times = getNotifTimes();
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5);
    let fired = [];
    try { fired = JSON.parse(sessionStorage.getItem(firedTodayKey) || '[]'); } catch (e) {}
    if (times.includes(hhmm) && !fired.includes(hhmm)) {
      fired.push(hhmm);
      sessionStorage.setItem(firedTodayKey, JSON.stringify(fired));
      fireReminder();
    }
  }
  notifCheckInterval = setInterval(checkAndFire, 20000);
  checkAndFire();
}

function fireReminder() {
  const dayNum = getCurrentDayNumber();
  const day = CURRICULUM[dayNum - 1];
  if (!day) return;
  const sampleWord = day.words[Math.floor(Math.random() * day.words.length)];
  const title = `📘 ${dayNum}-kun · Ingliz tili vaqti!`;
  const body = `Bugungi so'z: "${sampleWord.word}" — kelib mashq qiling.`;
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, {
        body, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png',
        tag: 'eng365-reminder', renotify: true
      });
    });
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: 'icons/icon-192.png' });
  }
}

// ---------- Service worker ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// ---------- Init ----------
getStartDate();
renderHome();
if (localStorage.getItem(LS_KEYS.NOTIF_ON) === '1') scheduleNotifications();
