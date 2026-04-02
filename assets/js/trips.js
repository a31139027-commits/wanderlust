/* ── Shared trip helpers (also used by journal.js / new-entry.js) ── */
function getActiveTripId() {
  let id = localStorage.getItem('wl_active_trip');
  if (!id) {
    // First-time: seed a default trip from any pre-existing data
    id = 'trip_default';
    const trips = JSON.parse(localStorage.getItem('wl_trips') || '[]');
    if (!trips.find(t => t.id === id)) {
      trips.unshift({ id, name: 'Autumn Japan Trip', country: 'Japan', flag: '🇯🇵', createdAt: Date.now() });
      localStorage.setItem('wl_trips', JSON.stringify(trips));
    }
    localStorage.setItem('wl_active_trip', id);
    // Migrate legacy keys
    const legacyEntries = localStorage.getItem('wl_entries');
    if (legacyEntries) localStorage.setItem('wl_entries_' + id, legacyEntries);
    const legacyDays = localStorage.getItem('wl_day_count');
    if (legacyDays) localStorage.setItem('wl_day_count_' + id, legacyDays);
  }
  return id;
}

function getTrips() {
  return JSON.parse(localStorage.getItem('wl_trips') || '[]');
}

/* ── Render trips list ── */
function renderTrips() {
  const trips = getTrips();
  const activeId = getActiveTripId();
  const container = document.getElementById('trips-list');
  const empty = document.getElementById('trips-empty');

  if (!trips.length) {
    container.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  container.innerHTML = '';

  trips.forEach(trip => {
    const isActive = trip.id === activeId;
    const card = document.createElement('div');
    card.className = 'bg-surface-container-lowest rounded-[2rem] p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow';
    card.innerHTML = `
      <div class="text-4xl flex-shrink-0 leading-none">${trip.flag}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-0.5 flex-wrap">
          <p class="font-headline font-bold text-on-surface text-base truncate">${trip.name}</p>
          ${isActive ? '<span class="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full flex-shrink-0">Active</span>' : ''}
        </div>
        <p class="text-on-surface-variant text-sm">${trip.country}</p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button onclick="openTrip('${trip.id}')"
          class="px-5 py-2.5 rounded-full ${isActive ? 'bg-surface-container text-on-surface-variant' : 'bg-primary text-white'} text-sm font-bold hover:opacity-90 transition-opacity">
          ${isActive ? 'View' : 'Open'}
        </button>
        <button onclick="confirmDeleteTrip('${trip.id}', '${trip.name.replace(/'/g,"\\'")}', this)"
          class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-red-100 hover:text-red-400 transition-colors text-on-surface-variant">
          <span class="material-symbols-outlined text-base" translate="no">delete</span>
        </button>
      </div>`;
    container.appendChild(card);
  });
}

function openTrip(id) {
  localStorage.setItem('wl_active_trip', id);
  window.location.href = 'journal.html';
}

function confirmDeleteTrip(id, name, btn) {
  // Simple inline confirm state: first click shows confirm, second click deletes
  if (btn.dataset.confirm === '1') {
    deleteTrip(id);
  } else {
    btn.dataset.confirm = '1';
    btn.innerHTML = '<span class="material-symbols-outlined text-sm text-red-400" translate="no">check</span>';
    btn.classList.add('bg-red-50');
    setTimeout(() => {
      btn.dataset.confirm = '';
      btn.innerHTML = '<span class="material-symbols-outlined text-base" translate="no">delete</span>';
      btn.classList.remove('bg-red-50');
    }, 2500);
  }
}

function deleteTrip(id) {
  let trips = getTrips();
  trips = trips.filter(t => t.id !== id);
  localStorage.setItem('wl_trips', JSON.stringify(trips));

  // If deleted trip was active, switch to first remaining trip
  if (localStorage.getItem('wl_active_trip') === id) {
    if (trips.length > 0) {
      localStorage.setItem('wl_active_trip', trips[0].id);
    } else {
      localStorage.removeItem('wl_active_trip');
    }
  }

  // Remove trip-specific data
  localStorage.removeItem('wl_entries_' + id);
  localStorage.removeItem('wl_day_count_' + id);

  renderTrips();
}

/* ── Init ── */
getActiveTripId(); // ensure default trip exists
renderTrips();
