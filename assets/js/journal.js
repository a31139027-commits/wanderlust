/* ── Trip-aware storage helpers ── */
function getActiveTripId() {
  let id = localStorage.getItem('wl_active_trip');
  if (!id) {
    id = 'trip_default';
    const trips = JSON.parse(localStorage.getItem('wl_trips') || '[]');
    if (!trips.find(t => t.id === id)) {
      trips.unshift({ id, name: 'Autumn Japan Trip', country: 'Japan', flag: '🇯🇵', createdAt: Date.now() });
      localStorage.setItem('wl_trips', JSON.stringify(trips));
    }
    localStorage.setItem('wl_active_trip', id);
    const leg = localStorage.getItem('wl_entries');
    if (leg) localStorage.setItem('wl_entries_' + id, leg);
    const legD = localStorage.getItem('wl_day_count');
    if (legD) localStorage.setItem('wl_day_count_' + id, legD);
  }
  return id;
}
function entriesKey() { return 'wl_entries_' + getActiveTripId(); }
function dayCountKey() { return 'wl_day_count_' + getActiveTripId(); }

const CAT_META = {
  'Culture':    { chip: 'bg-[#dcae96]/20 text-primary',                       icon: 'temple_buddhist', circle: 'bg-[#dcae96]/30' },
  'Foodie':     { chip: 'bg-secondary-container text-on-secondary-container',  icon: 'restaurant',      circle: 'bg-secondary-container' },
  'Nature':     { chip: 'bg-[#c9e6d7]/60 text-[#334c41]',                     icon: 'park',            circle: 'bg-[#c9e6d7]' },
  'Nightlife':  { chip: 'bg-indigo-100 text-indigo-700',                       icon: 'nightlife',       circle: 'bg-indigo-100' },
  'Hidden Gem': { chip: 'bg-purple-100 text-purple-700',                       icon: 'explore',         circle: 'bg-purple-100' },
};

let activeDayNum = 1;

/* ── Day tab switching ── */
function switchDay(n) {
  activeDayNum = n;
  document.querySelectorAll('.day-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.day-tab').forEach(btn => {
    const active = parseInt(btn.dataset.day) === n;
    btn.classList.toggle('bg-primary',                active);
    btn.classList.toggle('text-white',                active);
    btn.classList.toggle('shadow-lg',                 active);
    btn.classList.toggle('bg-surface-container-high', !active);
    btn.classList.toggle('text-on-surface-variant',   !active);
  });
  const dayEl = document.getElementById('day-' + n);
  if (dayEl) dayEl.classList.remove('hidden');

  // Show/hide delete bar
  const bar = document.getElementById('delete-day-bar');
  if (bar) {
    if (n > 1) {
      bar.classList.remove('hidden');
      document.getElementById('delete-day-text').textContent = 'Remove Day ' + n;
    } else {
      bar.classList.add('hidden');
    }
  }
}

/* ── Delete active day + renumber subsequent days ── */
function deleteActiveDay() {
  const n = activeDayNum;
  if (n <= 1) return;

  // Get current max day
  const allTabs = [...document.querySelectorAll('.day-tab[data-day]')];
  const maxDay = Math.max(...allTabs.map(t => parseInt(t.dataset.day)));

  // Remove this day's entries from localStorage
  let entries = JSON.parse(localStorage.getItem(entriesKey()) || '[]');
  entries = entries.filter(e => e.day !== n);

  // Remove the tab and content div for day n
  document.querySelector(`.day-tab[data-day="${n}"]`)?.remove();
  document.getElementById('day-' + n)?.remove();

  // Renumber days n+1 → maxDay down by 1
  for (let m = n + 1; m <= maxDay; m++) {
    // Remap entries
    entries = entries.map(e => e.day === m ? { ...e, day: m - 1 } : e);

    // Rename tab
    const tab = document.querySelector(`.day-tab[data-day="${m}"]`);
    if (tab) {
      tab.dataset.day = m - 1;
      tab.textContent = 'Day ' + (m - 1);
      // Rebind onclick to use new day number via dataset (dynamic read)
      tab.onclick = () => switchDay(parseInt(tab.dataset.day));
    }

    // Rename content div
    const div = document.getElementById('day-' + m);
    if (div) div.id = 'day-' + (m - 1);
  }

  localStorage.setItem(entriesKey(), JSON.stringify(entries));
  localStorage.setItem(dayCountKey(), maxDay - 1);

  // Switch to day before the deleted one (or day 1)
  switchDay(Math.max(1, n - 1));
}

/* ── Create a new day tab + content div ── */
function ensureDayExists(n) {
  if (document.getElementById('day-' + n)) return;

  const tabRow = document.getElementById('day-tabs');
  const plusBtn = tabRow.querySelector('[data-action="add-day"]');
  const tab = document.createElement('button');
  tab.className = 'day-tab px-8 py-4 bg-surface-container-high text-on-surface-variant rounded-full font-bold hover:bg-surface-container-highest transition-all flex-shrink-0';
  tab.dataset.day = n;
  tab.textContent = 'Day ' + n;
  tab.onclick = () => switchDay(parseInt(tab.dataset.day));
  tabRow.insertBefore(tab, plusBtn);

  const main = document.querySelector('main');
  const div = document.createElement('div');
  div.id = 'day-' + n;
  div.className = 'day-content hidden';
  div.innerHTML = `<div class="bento-container"></div>
    <div class="day-empty-state col-span-12 text-center py-16 text-on-surface-variant/50">
      <span class="material-symbols-outlined text-4xl mb-3 block" translate="no">add_circle</span>
      <p class="text-sm">Tap <strong>+</strong> to add your first stop for Day ${n}</p>
    </div>`;
  // Insert before delete-day-bar so it always stays at the bottom
  const bar = document.getElementById('delete-day-bar');
  main.insertBefore(div, bar || null);
}

/* ── Add a new day ── */
function addDay() {
  const count = parseInt(localStorage.getItem(dayCountKey()) || '4') + 1;
  localStorage.setItem(dayCountKey(), count);
  ensureDayExists(count);
  switchDay(count);
}

/* ── Entry rendering ── */
const TYPE_ORDER = { location: 0, activity: 1, protip: 2 };

function renderEntries() {
  const entries = JSON.parse(localStorage.getItem(entriesKey()) || '[]');

  const groups = {};
  entries.forEach(e => {
    const key = e.groupId ?? e.id;
    if (!groups[key]) groups[key] = { day: e.day, cards: [] };
    groups[key].cards.push(e);
  });

  Object.values(groups)
    .sort((a, b) => a.cards[0].id - b.cards[0].id)
    .forEach(group => {
      ensureDayExists(group.day);
      const container = document.querySelector('#day-' + group.day + ' .bento-container');
      if (!container) return;

      group.cards.sort((a, b) => (TYPE_ORDER[a.type] ?? 9) - (TYPE_ORDER[b.type] ?? 9));
      const n = group.cards.length;
      const span = n >= 3 ? 4 : n === 2 ? 6 : 12;
      group.cards.forEach(entry => renderCard(entry, container, span));
    });
}

function renderCard(entry, container, span) {
  const card = document.createElement('div');
  card.dataset.entryId = entry.id;

  if (entry.type === 'protip') {
    card.className = `col-span-12 md:col-span-${span} bg-primary-container/30 p-8 rounded-xl border-2 border-dashed border-primary-container flex flex-col justify-between min-h-[200px]`;
    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between mb-4">
          <h4 class="font-headline font-bold text-on-primary-container">Pro Tip</h4>
          <button onclick="deleteEntry(${entry.id}, this)" class="w-8 h-8 rounded-full bg-primary-container/40 flex items-center justify-center hover:bg-primary-container transition-colors flex-shrink-0">
            <span class="material-symbols-outlined text-on-primary-container text-base" translate="no">close</span>
          </button>
        </div>
        <p class="text-on-primary-container/80 text-sm italic font-body leading-relaxed">${entry.notes}</p>
      </div>
      <div class="mt-8 flex justify-end">
        <span class="material-symbols-outlined text-primary-container text-4xl" translate="no" style="font-variation-settings:'FILL' 1;">lightbulb</span>
      </div>`;

  } else if (entry.type === 'location') {
    card.className = `col-span-12 md:col-span-${span} bg-surface-container rounded-xl overflow-hidden relative min-h-[240px]`;
    card.innerHTML = `
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="material-symbols-outlined text-on-surface/[0.06] select-none" translate="no" style="font-size:160px;font-variation-settings:'FILL' 1;">map</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
      <div class="absolute top-3 right-3">
        <button onclick="deleteEntry(${entry.id}, this)" class="w-8 h-8 rounded-full bg-surface-container/80 backdrop-blur-sm flex items-center justify-center hover:bg-surface-container transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant text-base" translate="no">close</span>
        </button>
      </div>
      <div class="absolute bottom-6 left-6">
        <span class="text-xs font-bold text-primary block mb-1">LOCATION</span>
        <span class="text-lg font-bold text-on-surface block">${entry.name}</span>
        ${entry.area ? `<span class="text-sm text-on-surface-variant">${entry.area}</span>` : ''}
      </div>`;

  } else {
    const meta = CAT_META[entry.category] || CAT_META['Culture'];
    card.className = `col-span-12 md:col-span-${span} bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden`;

    if (entry.image) {
      card.innerHTML = `
        <div class="flex gap-0 flex-col sm:flex-row h-full">
          <div class="w-full sm:w-40 flex-shrink-0 overflow-hidden" style="min-height:160px">
            <img class="w-full h-full object-cover" src="${entry.image}" alt="${entry.name}"/>
          </div>
          <div class="flex-1 p-6 flex flex-col justify-between border-l-4 border-primary">
            <div class="flex items-start justify-between gap-2 mb-3">
              <div>
                <span class="text-primary font-bold text-xs tracking-widest uppercase mb-1 block">${entry.time}</span>
                <h3 class="text-xl font-headline font-bold text-on-surface leading-tight">${entry.name}</h3>
              </div>
              <button onclick="deleteEntry(${entry.id}, this)" title="Remove"
                class="flex-shrink-0 w-8 h-8 rounded-full border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-sm" translate="no">delete</span>
              </button>
            </div>
            ${entry.notes ? `<p class="text-on-surface-variant text-sm leading-relaxed line-clamp-2 mb-3">${entry.notes}</p>` : ''}
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 text-xs font-bold rounded-full ${meta.chip}">${entry.category}</span>
              ${entry.duration ? `<span class="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-full">${entry.duration}</span>` : ''}
            </div>
          </div>
        </div>`;
    } else {
      card.classList.add('p-8', 'border-l-4', 'border-primary');
      card.innerHTML = `
        <div class="flex flex-col justify-between h-full gap-4">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full ${meta.circle} flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-2xl" translate="no" style="font-variation-settings:'FILL' 1;color:#7a5642">${meta.icon}</span>
              </div>
              <div class="min-w-0">
                <span class="text-primary font-bold text-xs tracking-widest uppercase mb-1 block">${entry.time}</span>
                <h3 class="text-xl font-headline font-bold text-on-surface leading-tight">${entry.name}</h3>
              </div>
            </div>
            <button onclick="deleteEntry(${entry.id}, this)" title="Remove"
              class="flex-shrink-0 w-8 h-8 rounded-full border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-center">
              <span class="material-symbols-outlined text-sm" translate="no">delete</span>
            </button>
          </div>
          ${entry.notes ? `<p class="text-on-surface-variant text-sm leading-relaxed line-clamp-3">${entry.notes}</p>` : ''}
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 text-xs font-bold rounded-full ${meta.chip}">${entry.category}</span>
            ${entry.duration ? `<span class="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-full">${entry.duration}</span>` : ''}
          </div>
        </div>`;
    }
  }

  container.appendChild(card);
  // Hide empty state for this day once a card is added
  const dayEl = container.closest('.day-content');
  if (dayEl) dayEl.querySelector('.day-empty-state')?.classList.add('hidden');
}

/* ── Delete a single entry card ── */
function deleteEntry(id, btn) {
  let entries = JSON.parse(localStorage.getItem(entriesKey()) || '[]');
  entries = entries.filter(e => e.id !== id);
  localStorage.setItem(entriesKey(), JSON.stringify(entries));
  btn.closest('[data-entry-id]').remove();
}

/* ── Init ── */
// Rebind static tab onclicks to use dataset.day dynamically (safe for renaming)
document.querySelectorAll('.day-tab[data-day]').forEach(tab => {
  tab.onclick = () => switchDay(parseInt(tab.dataset.day));
});
// Wire up the + button
const addDayBtn = document.querySelector('[data-action="add-day"]');
if (addDayBtn) addDayBtn.onclick = addDay;

// Show active trip name in header
const activeTrip = (JSON.parse(localStorage.getItem('wl_trips') || '[]'))
  .find(t => t.id === getActiveTripId());
if (activeTrip) {
  const titleEl = document.getElementById('trip-title');
  const subtitleEl = document.getElementById('trip-subtitle');
  if (titleEl) titleEl.textContent = activeTrip.name;
  if (subtitleEl) subtitleEl.textContent = activeTrip.country + ' journey';
}

const savedDayCount = parseInt(localStorage.getItem(dayCountKey()) || '4');
for (let i = 5; i <= savedDayCount; i++) ensureDayExists(i);
renderEntries();
const urlDay = parseInt(new URLSearchParams(location.search).get('day')) || 1;
switchDay(urlDay);
