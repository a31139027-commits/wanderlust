/* ── Trip-aware storage helpers ── */
function getActiveTripId() {
  return localStorage.getItem('wl_active_trip') || 'trip_default';
}
function entriesKey() { return 'wl_entries_' + getActiveTripId(); }
function dayCountKey() { return 'wl_day_count_' + getActiveTripId(); }

/* ── Saved places data ── */
const FALLBACK_PLACES = [
  { name: 'Fushimi Inari Shrine',         country: 'Japan',  category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbaILY535eNwr8Cm29ID6NvZCWGrYBbkji4Alm2GPJ_IF_KdgXlFO5yxXLOGf9l4lyTqJhBT35vQyTaULxdrEUsSxO9NE1yiJC1ZMN9t64BAP-XLefT5uTz2rh685VkvtIvS0EHdg-xei9Ak2RnHwnomZwtar35NhHt7IjIkTvAODMf5KIeWrjeBN4RUTLjIu_HJncCK7nwS8x5TX4tmyZGXKXozDyf9nOW7CYaXR5GH31SdX6_mwhSIEfXbEh3aUWw44IicCLCQ' },
  { name: 'Arashiyama Bamboo Grove',       country: 'Japan',  category: 'Nature',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOFj7yWDXlEhtJxs5P0MFhLPdSiyHb7YVUbWOfYqCuJFWHSwOuVEjFI1Z_FT_N_4JXmpiC2-b22IlZVrVh2qzBqkbYVFnmWOhZoTiCn7dUoNn8_SDDM17JrHqFlkuLQFEa2SYDFmO1Kw-0Vw2ZSK-Jm5djFCH2ILsJqOjFbWVxJqDPqOllSsBGBWlDHnKEMXVBMJ7kl9bQT3N9q7oTqn7a5JHVz5t2IyEoY8mnOGdMpD8pXNHr5PJKkOJ1e6w1bO6H8h9SFQ' },
  { name: 'Nishiki Market',               country: 'Japan',  category: 'Foodie',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATuM5hkMFEFf0TBDgwByJ5fIHCjd5EkzZaB1vWHXvk2MFp0E2vCU6JzD7BFgr14_uLRuNRKbk0h-JZPFMRSC6JiA4-FWD2qAkZ4BgUXPRxXqBzrVJXDuP0C9w1ys97AGKAkqR3BKXLZS_AKzHY4gO-FQ3BjSBpFXJk4UZJDkTJCuArtYkEkiAhRaJE7iICO8RqWlnQWGxBsJjgKPHQbY0oJsTCQgU0x5gCqEPwjEcPJRMCBRHM3AkS-0fAY0f6K2wMXMmqfig' },
  { name: 'Pontocho Alley',               country: 'Japan',  category: 'Hidden Gem', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOFj7yWDXlEhtJxs5P0MFhLPdSiyHb7YVUbWOfYqCuJFWHSwOuVEjFI1Z_FT_N_4JXmpiC2-b22IlZVrVh2qzBqkbYVFnmWOhZoTiCn7dUoNn8_SDDM17JrHqFlkuLQFEa2SYDFmO1Kw-0Vw2ZSK-Jm5djFCH2ILsJqOjFbWVxJqDPqOllSsBGBWlDHnKEMXVBMJ7kl9bQT3N9q7oTqn7a5JHVz5t2IyEoY8mnOGdMpD8pXNHr5PJKkOJ1e6w1bO6H8h9SFQ' },
  { name: 'Kinkaku-ji (Golden Pavilion)', country: 'Japan',  category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATuM5hkMFEFf0TBDgwByJ5fIHCjd5EkzZaB1vWHXvk2MFp0E2vCU6JzD7BFgr14_uLRuNRKbk0h-JZPFMRSC6JiA4-FWD2qAkZ4BgUXPRxXqBzrVJXDuP0C9w1ys97AGKAkqR3BKXLZS_AKzHY4gO-FQ3BjSBpFXJk4UZJDkTJCuArtYkEkiAhRaJE7iICO8RqWlnQWGxBsJjgKPHQbY0oJsTCQgU0x5gCqEPwjEcPJRMCBRHM3AkS-0fAY0f6K2wMXMmqfig' },
  { name: "Philosopher's Path",           country: 'Japan',  category: 'Nature',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbaILY535eNwr8Cm29ID6NvZCWGrYBbkji4Alm2GPJ_IF_KdgXlFO5yxXLOGf9l4lyTqJhBT35vQyTaULxdrEUsSxO9NE1yiJC1ZMN9t64BAP-XLefT5uTz2rh685VkvtIvS0EHdg-xei9Ak2RnHwnomZwtar35NhHt7IjIkTvAODMf5KIeWrjeBN4RUTLjIu_HJncCK7nwS8x5TX4tmyZGXKXozDyf9nOW7CYaXR5GH31SdX6_mwhSIEfXbEh3aUWw44IicCLCQ' },
  { name: 'Gion District at Night',       country: 'Japan',  category: 'Nightlife',  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOFj7yWDXlEhtJxs5P0MFhLPdSiyHb7YVUbWOfYqCuJFWHSwOuVEjFI1Z_FT_N_4JXmpiC2-b22IlZVrVh2qzBqkbYVFnmWOhZoTiCn7dUoNn8_SDDM17JrHqFlkuLQFEa2SYDFmO1Kw-0Vw2ZSK-Jm5djFCH2ILsJqOjFbWVxJqDPqOllSsBGBWlDHnKEMXVBMJ7kl9bQT3N9q7oTqn7a5JHVz5t2IyEoY8mnOGdMpD8pXNHr5PJKkOJ1e6w1bO6H8h9SFQ' },
  { name: 'teamLab Planets',              country: 'Japan',  category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJtOwyAwHmCrbKbPbBjd8TYZPyjxEOYwgwlyiF1Dfk9zB-myRGeVEw3d0SgVKY7VbPIRvD7qt0UiwPjLhXDdG5R9ZzijZa7xesWJsu6O9Hnf0znrKgAxf8Q9aNNeIcHY0sECJ1Wjgkm0wRQlXmPDtKqQ3cL7uubpexZYQkFfHPlVEMY03dmholbAPz5hE6gYeZ2AoKmXtrYNWDluK-5tTIqGYRUrQ5Rrb5ZT2hcPRofgInm_YuQTwspjqh664__aN1QGyZFs2twg' },
  { name: 'Reynisfjara Black Beach',      country: 'Iceland', category: 'Nature',    image: '' },
  { name: 'Hallgrímskirkja Church',       country: 'Iceland', category: 'Culture',   image: '' },
  { name: 'Colosseum',                    country: 'Italy',  category: 'Culture',    image: '' },
  { name: 'Amalfi Coast',                 country: 'Italy',  category: 'Nature',     image: '' },
  { name: 'Jemaa el-Fna Square',          country: 'Morocco', category: 'Culture',   image: '' },
];

function getSavedPlaces() {
  const fallbackByName = {};
  FALLBACK_PLACES.forEach(p => { fallbackByName[p.name] = p; });

  const stored = JSON.parse(localStorage.getItem('wl_saved') || '[]').map(p => {
    if (!p.country && fallbackByName[p.name]) p.country = fallbackByName[p.name].country;
    if (!p.image && fallbackByName[p.name]) p.image = fallbackByName[p.name].image;
    return p;
  });

  const names = new Set(stored.map(p => p.name));
  return [...stored, ...FALLBACK_PLACES.filter(p => !names.has(p.name))];
}

let ALL_SAVED = [];

function renderSaved(list) {
  const container = document.getElementById('saved-list');
  const empty = document.getElementById('saved-empty');
  container.innerHTML = '';
  if (!list.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');

  // Group by country
  const groups = {};
  list.forEach(p => {
    const key = p.country || 'Other';
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  Object.entries(groups).forEach(([country, places]) => {
    // Country header
    const header = document.createElement('p');
    header.className = 'text-xs font-bold tracking-widest uppercase text-on-surface-variant/50 ml-1 mt-5 mb-2 first:mt-0';
    header.textContent = country;
    container.appendChild(header);

    places.forEach(p => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'w-full flex items-center gap-4 bg-surface-container-lowest rounded-[1.5rem] px-5 py-4 hover:bg-surface-container transition-colors text-left';
      const thumb = p.image
        ? `<img src="${p.image}" class="w-12 h-12 rounded-xl object-cover flex-shrink-0"/>`
        : `<div class="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-on-secondary-container text-base" translate="no" style="font-variation-settings:'FILL' 1;">place</span></div>`;
      el.innerHTML = `
        ${thumb}
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-on-surface text-sm truncate">${p.name}</p>
          <p class="text-on-surface-variant text-xs">${p.category}</p>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant text-sm" translate="no">chevron_right</span>`;
      el.onclick = () => pickSaved(p);
      container.appendChild(el);
    });
  });
}

function filterSaved(q) {
  q = q.toLowerCase().trim();
  renderSaved(q ? ALL_SAVED.filter(p =>
    p.name.toLowerCase().includes(q) || (p.country || '').toLowerCase().includes(q)
  ) : ALL_SAVED);
}

function pickSaved(p) {
  showTab('manual');
  const id = addBlock('activity');
  const block = document.getElementById('block-' + id);
  block.querySelector('.b-name').value = p.name;
  if (p.image) block.dataset.image = p.image;
  const catMap = { 'Culture':'culture', 'Foodie':'food', 'Nature':'nature', 'Nightlife':'night', 'Hidden Gem':'hidden' };
  const radio = block.querySelector(`input[value="${catMap[p.category] || 'culture'}"]`);
  if (radio) radio.checked = true;
  if (p.image) {
    const header = block.querySelector('[data-type]').previousElementSibling;
    const preview = document.createElement('img');
    preview.src = p.image;
    preview.className = 'w-full h-28 object-cover rounded-xl mt-3 mb-0';
    header.appendChild(preview);
  }
  block.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ── Tab switcher ── */
function showTab(tab) {
  const isSaved = tab === 'saved';
  document.getElementById('panel-saved').classList.toggle('hidden', !isSaved);
  document.getElementById('panel-manual').classList.toggle('hidden', isSaved);
  document.getElementById('tab-saved').className = 'flex-1 py-3 rounded-full text-sm font-bold transition-all ' +
    (isSaved ? 'bg-primary text-white shadow' : 'text-on-surface-variant');
  document.getElementById('tab-manual').className = 'flex-1 py-3 rounded-full text-sm font-bold transition-all ' +
    (!isSaved ? 'bg-primary text-white shadow' : 'text-on-surface-variant');
}

/* ── Day buttons ── */
function buildDayButtons() {
  const count = parseInt(localStorage.getItem(dayCountKey()) || '4');
  const row = document.getElementById('day-btn-row');
  row.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.day = i;
    btn.className = 'day-btn px-6 py-3 rounded-full text-sm font-bold flex-shrink-0 ' +
      (i === 1 ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant');
    btn.textContent = 'Day ' + i;
    btn.onclick = () => selectDay(btn, i);
    row.appendChild(btn);
  }
}

function selectDay(btn, n) {
  document.querySelectorAll('.day-btn').forEach(b => {
    b.className = 'day-btn px-6 py-3 rounded-full text-sm font-bold flex-shrink-0 bg-surface-container text-on-surface-variant';
  });
  btn.className = 'day-btn px-6 py-3 rounded-full text-sm font-bold flex-shrink-0 bg-primary text-white';
  document.getElementById('selected-day').value = n;
}

/* ── Block builder ── */
let blockCounter = 0;
const addedTypes = {};
const TYPE_META = {
  activity: { label: 'Activity / Stay', color: 'bg-[#dcae96]/20 text-primary',   icon: 'place' },
  protip:   { label: 'Pro Tip',         color: 'bg-[#f5e6d3]/60 text-[#b07844]', icon: 'lightbulb' },
  location: { label: 'Location Pin',    color: 'bg-[#c9e6d7]/40 text-[#334c41]', icon: 'map' },
};

function syncTypePicker() {
  const total = Object.keys(addedTypes).length;
  document.getElementById('type-picker').style.display = total >= 3 ? 'none' : '';
  ['activity', 'protip', 'location'].forEach(t => {
    const btn = document.querySelector(`[onclick="addBlock('${t}')"]`);
    if (!btn) return;
    btn.disabled = !!addedTypes[t];
    btn.style.opacity = addedTypes[t] ? '0.35' : '1';
    btn.style.pointerEvents = addedTypes[t] ? 'none' : '';
  });
}

function addBlock(type) {
  if (addedTypes[type]) return;
  blockCounter++;
  const id = blockCounter;
  addedTypes[type] = id;
  const meta = TYPE_META[type];
  const list = document.getElementById('blocks-list');

  const wrap = document.createElement('div');
  wrap.id = 'block-' + id;
  wrap.className = 'block-card rounded-[2rem] bg-surface-container-lowest shadow-sm overflow-hidden';

  let fields = '';
  if (type === 'activity') {
    fields = `
      <div class="space-y-2">
        <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Place Name</label>
        <input class="b-name w-full px-6 py-4 rounded-full bg-surface-container border-none focus:bg-background transition-all placeholder:text-on-surface-variant/30" type="text" placeholder="e.g. Fushimi Inari Shrine"/>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Time</label>
          <input class="b-time w-full px-6 py-4 rounded-full bg-surface-container border-none focus:bg-background transition-all" type="time" value="09:00"/>
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Duration</label>
          <input class="b-duration w-full px-6 py-4 rounded-full bg-surface-container border-none focus:bg-background transition-all placeholder:text-on-surface-variant/30" type="text" placeholder="e.g. 2 Hours"/>
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Category</label>
        <div class="chip-row flex flex-wrap gap-2">
          <input type="radio" name="cat-${id}" id="cat-${id}-culture" value="culture" checked/>
          <label for="cat-${id}-culture" class="chip cursor-pointer text-xs">Culture</label>
          <input type="radio" name="cat-${id}" id="cat-${id}-food" value="food"/>
          <label for="cat-${id}-food" class="chip cursor-pointer text-xs">Foodie</label>
          <input type="radio" name="cat-${id}" id="cat-${id}-nature" value="nature"/>
          <label for="cat-${id}-nature" class="chip cursor-pointer text-xs">Nature</label>
          <input type="radio" name="cat-${id}" id="cat-${id}-night" value="night"/>
          <label for="cat-${id}-night" class="chip cursor-pointer text-xs">Nightlife</label>
          <input type="radio" name="cat-${id}" id="cat-${id}-hidden" value="hidden"/>
          <label for="cat-${id}-hidden" class="chip cursor-pointer text-xs">Hidden Gem</label>
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Notes</label>
        <textarea class="b-notes w-full px-6 py-4 rounded-[1.5rem] bg-surface-container border-none focus:bg-background transition-all resize-none placeholder:text-on-surface-variant/30" rows="3" placeholder="Tips, vibe, what to see…"></textarea>
      </div>`;
  } else if (type === 'protip') {
    fields = `
      <div class="space-y-2">
        <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Tip Content</label>
        <textarea class="b-notes w-full px-6 py-4 rounded-[1.5rem] bg-surface-container border-none focus:bg-background transition-all resize-none placeholder:text-on-surface-variant/30" rows="4" placeholder="Write a helpful tip for your crew…"></textarea>
      </div>`;
  } else {
    fields = `
      <div class="space-y-2">
        <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Location Name</label>
        <input class="b-name w-full px-6 py-4 rounded-full bg-surface-container border-none focus:bg-background transition-all placeholder:text-on-surface-variant/30" type="text" placeholder="e.g. Chuo City, Tokyo"/>
      </div>
      <div class="space-y-2">
        <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant/60 ml-1">Area / District</label>
        <input class="b-area w-full px-6 py-4 rounded-full bg-surface-container border-none focus:bg-background transition-all placeholder:text-on-surface-variant/30" type="text" placeholder="e.g. Kansai Region"/>
      </div>`;
  }

  wrap.innerHTML = `
    <div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${meta.color}">
          <span class="material-symbols-outlined text-sm" translate="no" style="font-variation-settings:'FILL' 1;">${meta.icon}</span>
          ${meta.label}
        </span>
      </div>
      <button type="button" onclick="removeBlock(${id})" class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-outline-variant/20 transition-colors text-on-surface-variant">
        <span class="material-symbols-outlined text-base" translate="no">close</span>
      </button>
    </div>
    <div class="p-6 space-y-5" data-type="${type}">${fields}</div>`;

  list.appendChild(wrap);
  syncTypePicker();
  updateSaveBtn();
  return id;
}

function removeBlock(id) {
  const el = document.getElementById('block-' + id);
  if (!el) return;
  for (const [t, bid] of Object.entries(addedTypes)) {
    if (bid === id) { delete addedTypes[t]; break; }
  }
  el.remove();
  syncTypePicker();
  updateSaveBtn();
}

function updateSaveBtn() {
  const count = document.querySelectorAll('#blocks-list .block-card').length;
  const btn = document.getElementById('save-btn');
  btn.disabled = count === 0;
  document.getElementById('save-label').textContent =
    count === 0 ? 'Save to Journal' :
    count === 1 ? 'Save 1 Card to Journal' :
    `Save ${count} Cards to Journal`;
}

/* ── Save all entries ── */
const CAT_LABEL = { culture: 'Culture', food: 'Foodie', nature: 'Nature', night: 'Nightlife', hidden: 'Hidden Gem' };

function saveAllEntries() {
  const day = parseInt(document.getElementById('selected-day').value);
  const blocks = document.querySelectorAll('#blocks-list .block-card');
  if (!blocks.length) return;

  const entries = JSON.parse(localStorage.getItem(entriesKey()) || '[]');
  const groupId = Date.now();

  blocks.forEach(block => {
    const fields = block.querySelector('[data-type]');
    const type = fields.dataset.type;
    const entry = { type, day, groupId, id: Date.now() + Math.random() };

    if (type === 'activity') {
      const name = fields.querySelector('.b-name').value.trim();
      if (!name) return;
      const timeVal = fields.querySelector('.b-time').value;
      const [h, m] = timeVal.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      entry.name     = name;
      entry.time     = `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
      entry.category = CAT_LABEL[fields.querySelector('input[type="radio"]:checked')?.value] || 'Culture';
      entry.duration = fields.querySelector('.b-duration').value.trim();
      entry.notes    = fields.querySelector('.b-notes').value.trim();
      entry.image    = block.dataset.image || '';
    } else if (type === 'protip') {
      const notes = fields.querySelector('.b-notes').value.trim();
      if (!notes) return;
      entry.notes = notes;
    } else {
      const name = fields.querySelector('.b-name').value.trim();
      if (!name) return;
      entry.name = name;
      entry.area = fields.querySelector('.b-area').value.trim();
    }
    entries.push(entry);
  });

  localStorage.setItem(entriesKey(), JSON.stringify(entries));
  // Ensure day count is at least the selected day
  const currentCount = parseInt(localStorage.getItem(dayCountKey()) || '1');
  if (day > currentCount) localStorage.setItem(dayCountKey(), day);
  window.location.href = 'journal.html?day=' + day;
}

/* ── Init ── */
ALL_SAVED = getSavedPlaces();
renderSaved(ALL_SAVED);
buildDayButtons();
