const COUNTRIES = [
  { name: 'Japan',    flag: '🇯🇵' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'France',   flag: '🇫🇷' },
  { name: 'Italy',    flag: '🇮🇹' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Spain',    flag: '🇪🇸' },
  { name: 'Morocco',  flag: '🇲🇦' },
  { name: 'Taiwan',   flag: '🇹🇼' },
  { name: 'USA',      flag: '🇺🇸' },
  { name: 'UK',       flag: '🇬🇧' },
];

let selectedCountryIdx = 0;

function renderCountries() {
  const grid = document.getElementById('country-grid');
  grid.innerHTML = '';
  COUNTRIES.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'country-opt flex flex-col items-center gap-2 py-4 px-3 rounded-[1.5rem] border-2 transition-all ' +
      (i === 0 ? 'border-primary bg-primary/5' : 'border-transparent bg-surface-container hover:border-outline-variant');
    btn.dataset.idx = i;
    btn.innerHTML = `<span class="text-3xl leading-none">${c.flag}</span><span class="text-xs font-semibold text-on-surface">${c.name}</span>`;
    btn.onclick = () => selectCountry(i);
    grid.appendChild(btn);
  });
}

function selectCountry(i) {
  selectedCountryIdx = i;
  document.querySelectorAll('.country-opt').forEach((btn, idx) => {
    const active = idx === i;
    btn.className = 'country-opt flex flex-col items-center gap-2 py-4 px-3 rounded-[1.5rem] border-2 transition-all ' +
      (active ? 'border-primary bg-primary/5' : 'border-transparent bg-surface-container hover:border-outline-variant');
  });
  updateCreateBtn();
}

function updateCreateBtn() {
  const name = document.getElementById('trip-name').value.trim();
  document.getElementById('create-btn').disabled = !name;
}

function createTrip() {
  const name = document.getElementById('trip-name').value.trim();
  if (!name) return;

  const country = COUNTRIES[selectedCountryIdx];
  const id = 'trip_' + Date.now();
  const trip = { id, name, country: country.name, flag: country.flag, createdAt: Date.now() };

  const trips = JSON.parse(localStorage.getItem('wl_trips') || '[]');
  trips.push(trip);
  localStorage.setItem('wl_trips', JSON.stringify(trips));
  localStorage.setItem('wl_active_trip', id);
  localStorage.setItem('wl_day_count_' + id, '1');

  window.location.href = 'journal.html';
}

/* ── Init ── */
renderCountries();
document.getElementById('trip-name').addEventListener('input', updateCreateBtn);
