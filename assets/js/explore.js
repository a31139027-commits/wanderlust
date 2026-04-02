/* ── Dynamic collapsible trip banner ── */
let tripsExpanded = false;

function renderTripBanner() {
  const area = document.getElementById('trip-banner-area');
  if (!area) return;

  const trips = JSON.parse(localStorage.getItem('wl_trips') || '[]');
  const activeId = localStorage.getItem('wl_active_trip');
  const activeTrip = trips.find(t => t.id === activeId);

  if (!trips.length) {
    area.innerHTML = `
      <a href="new-trip.html" class="flex items-center gap-4 border-2 border-dashed border-primary/30 rounded-[2rem] px-6 py-4 mb-10 hover:border-primary/60 hover:bg-primary/5 transition-all">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-primary" translate="no">add</span>
        </div>
        <div>
          <p class="font-bold text-on-surface text-sm">Plan your first trip</p>
          <p class="text-xs text-on-surface-variant">Pick a destination and start your itinerary</p>
        </div>
        <span class="material-symbols-outlined text-primary" translate="no">chevron_right</span>
      </a>`;
    return;
  }

  // Active trip row
  let activePart = '';
  if (activeTrip) {
    const dayCount = parseInt(localStorage.getItem('wl_day_count_' + activeId) || '4');
    activePart = `
      <a href="journal.html" class="flex items-center gap-4 px-6 py-4 hover:bg-secondary-container transition-colors rounded-[2rem]">
        <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 font-bold text-sm text-on-secondary-container">${activeTrip.country.slice(0,2).toUpperCase()}</div>
        <div class="flex-1 min-w-0">
          <p class="font-headline font-bold text-on-surface text-sm truncate">${activeTrip.name} <span class="text-secondary font-normal text-xs">· Active</span></p>
          <p class="text-on-surface-variant text-xs">${dayCount} day${dayCount !== 1 ? 's' : ''} · ${activeTrip.country}</p>
        </div>
        <span class="material-symbols-outlined text-primary" translate="no">chevron_right</span>
      </a>`;
  }

  // All-trips list (shown when expanded)
  let tripRows = '';
  trips.forEach(t => {
    const isActive = t.id === activeId;
    const dc = parseInt(localStorage.getItem('wl_day_count_' + t.id) || '1');
    tripRows += `
      <div class="flex items-center gap-3 px-5 py-3 rounded-[1.5rem] ${isActive ? 'bg-secondary-container/40' : 'hover:bg-surface-container'} transition-colors">
        <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface-variant flex-shrink-0">${t.country.slice(0,2).toUpperCase()}</div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-on-surface text-sm truncate">${t.name}${isActive ? ' <span class="text-xs font-normal text-secondary">· Active</span>' : ''}</p>
          <p class="text-on-surface-variant text-xs">${dc} day${dc !== 1 ? 's' : ''} · ${t.country}</p>
        </div>
        <a href="journal.html" onclick="localStorage.setItem('wl_active_trip','${t.id}')"
          class="text-xs font-bold text-primary hover:underline">${isActive ? 'Open' : 'Switch'}</a>
      </div>`;
  });

  const expandedSection = `
    <div id="trips-drawer" class="${tripsExpanded ? '' : 'hidden'} border-t border-outline-variant/20 pt-3 mt-1 space-y-1 pb-2">
      ${tripRows}
      <a href="new-trip.html" class="flex items-center gap-3 px-5 py-3 rounded-[1.5rem] hover:bg-surface-container transition-colors text-primary">
        <span class="material-symbols-outlined text-base" translate="no">add</span>
        <span class="text-sm font-semibold">New Trip</span>
      </a>
    </div>`;

  area.innerHTML = `
    <div class="bg-secondary-container/50 rounded-[2rem] mb-10 overflow-hidden">
      ${activePart}
      <button onclick="toggleTripsDrawer()" class="w-full flex items-center justify-between px-6 py-2.5 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors">
        <span id="drawer-label">${tripsExpanded ? 'Hide trips' : 'My trips (' + trips.length + ')'}</span>
        <span class="material-symbols-outlined transition-transform ${tripsExpanded ? 'rotate-180' : ''}" translate="no" style="font-size:16px" id="drawer-chevron">expand_more</span>
      </button>
      ${expandedSection}
    </div>`;
}

function toggleTripsDrawer() {
  tripsExpanded = !tripsExpanded;
  const drawer = document.getElementById('trips-drawer');
  const label = document.getElementById('drawer-label');
  const chevron = document.getElementById('drawer-chevron');
  const trips = JSON.parse(localStorage.getItem('wl_trips') || '[]');
  if (drawer) drawer.classList.toggle('hidden', !tripsExpanded);
  if (label) label.textContent = tripsExpanded ? 'Hide trips' : 'My trips (' + trips.length + ')';
  if (chevron) chevron.style.transform = tripsExpanded ? 'rotate(180deg)' : '';
}

function filterCountries(q) {
  const cards = document.querySelectorAll('#country-grid [data-name]');
  const rows = document.querySelectorAll('#country-grid .grid');
  q = q.toLowerCase().trim();
  let visible = 0;
  cards.forEach(card => {
    const show = !q || card.dataset.name.includes(q);
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  rows.forEach(row => {
    const anyVisible = [...row.querySelectorAll('[data-name]')].some(c => c.style.display !== 'none');
    row.style.display = anyVisible ? '' : 'none';
  });
  document.getElementById('result-count').textContent = visible + ' countr' + (visible === 1 ? 'y' : 'ies');
  document.getElementById('no-results').classList.toggle('hidden', visible > 0);
}

/* ── Init ── */
renderTripBanner();
