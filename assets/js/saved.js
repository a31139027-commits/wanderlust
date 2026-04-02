const FALLBACK_SAVED = [
  { name: 'Tokyo Metropolis',             country: 'Japan',   category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQjvRKnwqOVmctDOnq4xj42IZ0qQV5BOaGfwJfXwcLVjlcX6lKQFaFcjTIiv2Ec7l2-UYhQibWy0lrZ3BRneP38xxPjcXdXaXOJRgJ1OrMavE5f0GCcGzPPG3LWjkfMPqvuUYBzusUF5Sdl64M_KHbFdI2rrjKlED4kbKoSOUgiO_97er6MY6zqAFpw88NQZhBvWyfdA3-Rv9bN63FiXVSbQEZSl0-hoDj94MCJLpgllMQmla6U-PvQ28xGWE0z0a_MbaCbzU_Eg' },
  { name: 'Kyoto Temples',                country: 'Japan',   category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcDK09Hfk8_2riIWZU4cIi8znhfbH4SvNd5dbcX44Xs4ltp7yV2SxhPtGK2uOHiIl9zpNprHhYhLFb76d9Z2XDWwpOoiDC15YcWo4MLKhQZTI5EYXX_-t_oVPKySOr4jl7KT--GI8zlxLS6mVIRqs3aYhHWpflcAXpu_poKsfK4he6RlSxg7-iH1OQDw83ZBUy8Uw5NuET63J4Yya0n_w_b-QXYYcznds-9OcIZJEGaU-9lr_sYJ5Om3Q6njWcnAWKqBXx6IhO5g' },
  { name: 'Fushimi Inari Path',           country: 'Japan',   category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Vo87BSGyVxIkkj3R4n9EbqOHsj8tbEFclVQ6Za0z9HvPnncjygF6LKBXzNs6H2D33SO6i7Fns3QnSFRgXEKhxDW75SY1FOAAj1JjBzgZd9wBxMsBUJYy5EB8CZzs2qbHjKY2z78CK890WQd-ezxNbi8rcu1-G9vOrvxLRYuJuuAfbQ9I8nij-2fAhvDKl4a9CTiznJhdBKDmYrH3aKEX3VUbywJCBfaDYGBeZMzYu6lV53p8_3ZHPQIOrw86UeSUZcd7_cisMQ' },
  { name: 'Fushimi Inari Shrine',         country: 'Japan',   category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbaILY535eNwr8Cm29ID6NvZCWGrYBbkji4Alm2GPJ_IF_KdgXlFO5yxXLOGf9l4lyTqJhBT35vQyTaULxdrEUsSxO9NE1yiJC1ZMN9t64BAP-XLefT5uTz2rh685VkvtIvS0EHdg-xei9Ak2RnHwnomZwtar35NhHt7IjIkTvAODMf5KIeWrjeBN4RUTLjIu_HJncCK7nwS8x5TX4tmyZGXKXozDyf9nOW7CYaXR5GH31SdX6_mwhSIEfXbEh3aUWw44IicCLCQ' },
  { name: 'Arashiyama Bamboo Grove',      country: 'Japan',   category: 'Nature',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOFj7yWDXlEhtJxs5P0MFhLPdSiyHb7YVUbWOfYqCuJFWHSwOuVEjFI1Z_FT_N_4JXmpiC2-b22IlZVrVh2qzBqkbYVFnmWOhZoTiCn7dUoNn8_SDDM17JrHqFlkuLQFEa2SYDFmO1Kw-0Vw2ZSK-Jm5djFCH2ILsJqOjFbWVxJqDPqOllSsBGBWlDHnKEMXVBMJ7kl9bQT3N9q7oTqn7a5JHVz5t2IyEoY8mnOGdMpD8pXNHr5PJKkOJ1e6w1bO6H8h9SFQ' },
  { name: 'Nishiki Market',               country: 'Japan',   category: 'Foodie',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATuM5hkMFEFf0TBDgwByJ5fIHCjd5EkzZaB1vWHXvk2MFp0E2vCU6JzD7BFgr14_uLRuNRKbk0h-JZPFMRSC6JiA4-FWD2qAkZ4BgUXPRxXqBzrVJXDuP0C9w1ys97AGKAkqR3BKXLZS_AKzHY4gO-FQ3BjSBpFXJk4UZJDkTJCuArtYkEkiAhRaJE7iICO8RqWlnQWGxBsJjgKPHQbY0oJsTCQgU0x5gCqEPwjEcPJRMCBRHM3AkS-0fAY0f6K2wMXMmqfig' },
  { name: "Philosopher's Path",           country: 'Japan',   category: 'Nature',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbaILY535eNwr8Cm29ID6NvZCWGrYBbkji4Alm2GPJ_IF_KdgXlFO5yxXLOGf9l4lyTqJhBT35vQyTaULxdrEUsSxO9NE1yiJC1ZMN9t64BAP-XLefT5uTz2rh685VkvtIvS0EHdg-xei9Ak2RnHwnomZwtar35NhHt7IjIkTvAODMf5KIeWrjeBN4RUTLjIu_HJncCK7nwS8x5TX4tmyZGXKXozDyf9nOW7CYaXR5GH31SdX6_mwhSIEfXbEh3aUWw44IicCLCQ' },
  { name: 'Gion District at Night',       country: 'Japan',   category: 'Nightlife',  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOFj7yWDXlEhtJxs5P0MFhLPdSiyHb7YVUbWOfYqCuJFWHSwOuVEjFI1Z_FT_N_4JXmpiC2-b22IlZVrVh2qzBqkbYVFnmWOhZoTiCn7dUoNn8_SDDM17JrHqFlkuLQFEa2SYDFmO1Kw-0Vw2ZSK-Jm5djFCH2ILsJqOjFbWVxJqDPqOllSsBGBWlDHnKEMXVBMJ7kl9bQT3N9q7oTqn7a5JHVz5t2IyEoY8mnOGdMpD8pXNHr5PJKkOJ1e6w1bO6H8h9SFQ' },
  { name: 'teamLab Planets',              country: 'Japan',   category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJtOwyAwHmCrbKbPbBjd8TYZPyjxEOYwgwlyiF1Dfk9zB-myRGeVEw3d0SgVKY7VbPIRvD7qt0UiwPjLhXDdG5R9ZzijZa7xesWJsu6O9Hnf0znrKgAxf8Q9aNNeIcHY0sECJ1Wjgkm0wRQlXmPDtKqQ3cL7uubpexZYQkFfHPlVEMY03dmholbAPz5hE6gYeZ2AoKmXtrYNWDluK-5tTIqGYRUrQ5Rrb5ZT2hcPRofgInm_YuQTwspjqh664__aN1QGyZFs2twg' },
  { name: 'Reynisfjara Black Beach',      country: 'Iceland', category: 'Nature',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpXBP38ve92GcADkC29I2MJbZHVR3jmzqF6EK_H4gxEWNouqyWbk3nc0kxgYLYChEudw-_vLpDplhmstXvfMvY-0MGJKLv_7UCIdd3dBaDXo7qVVWdqIVll3ue5LAJAGdr1uL_m0t33GG38R68j_RFypRUWr2FUnQtnxx_-D4gNuXjQJxIMaySOzPqUWLRn_s9BhA6rwq2IZY6tSCO9VVfNLqEugHl-GyWUTM_gaSNd66jSunet6DaZNprLnVDyq7Ywxh0yWGWIw' },
  { name: 'Hallgrímskirkja Church',       country: 'Iceland', category: 'Culture',    image: '' },
  { name: 'Colosseum',                    country: 'Italy',   category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdkBcKlWgMR9H3NIYVU9NmTENsaZcjjACOueV_bTmLPVM0ZT3oOZ97ifPgMeR_uw9SIGSOiVB7QhR2HKGIuzBoixZWrau43WNZzs36K0gaTVVv10eRwHDp6s9Y8qVj9M5Nccz2fGdrpI-1ApsPkF89MSabkjPhLrEUV8X81w80v7jimijXEcfIGqN7F0LmcdceWTDUoWpMgOdJX5GomvoMAGhbvhS-h_XlwVldE-B_KCwOSGsGDRr0qLAR5GrtJRaJSwFMgPa9Mw' },
  { name: 'Amalfi Coast',                 country: 'Italy',   category: 'Nature',     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP5wL5r24y-BPLlv82vJ018Ck3dFmniqimqcuLdyNhUe2TKdIvPVoStne09P-lp8FKNDAOJMSfotfiZTMH2Cxl2RdA6fdkCpYL5k79bs7BiPl0271Tn-92Cm5at7kCVoDKmUlv8VtOgLi3OO0JeW5AMPAK6FDnp4mgnEI4RQ881jiT-EBYCtB0UZu0i3JOK9Y9mEGnFZUyYFheoZbJtBED6O0NyG9kFcUBslloasp4UL2STI6z-fkyzO7KOTn6NZP65KEak8zwzg' },
  { name: 'Jemaa el-Fna Square',          country: 'Morocco', category: 'Culture',    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADznerA57zBClu942RK0uQRW6KOpoyQD7gmPfm05gOgnJbBAcUgfxzYmMwboIpfefe3unIvGOoqxdjZ0Jp-Go8hqtiG2OrfvytDkyPq6pcLXGVY02yhgkEWxSpAfUtDqL4VPR-yOxnvPCGKs-RfQmhBAX-DS6Jj6Y9-gvXHOBmaeaoUl4aOVG3vGAePR1HfNvOogCgHsiYh9QnsIRVy-DxvAkVldp6TNjmBfXCX7_yuz_vngtvQ7X0Ofnb9RzgSQVy4WFTl4Of3A' },
];

let editMode = false;

function getSavedPlaces() {
  const fallbackByName = {};
  FALLBACK_SAVED.forEach(p => { fallbackByName[p.name] = p; });
  const stored = JSON.parse(localStorage.getItem('wl_saved') || '[]').map(p => {
    if (!p.country && fallbackByName[p.name]) p.country = fallbackByName[p.name].country;
    if (!p.image && fallbackByName[p.name]) p.image = fallbackByName[p.name].image;
    return p;
  }).filter(p => p.country);
  const names = new Set(stored.map(p => p.name));
  return [...stored, ...FALLBACK_SAVED.filter(p => !names.has(p.name))];
}

function unsavePlace(name) {
  // Mark as manually removed so fallback won't re-add it
  const removed = JSON.parse(localStorage.getItem('wl_saved_removed') || '[]');
  if (!removed.includes(name)) removed.push(name);
  localStorage.setItem('wl_saved_removed', JSON.stringify(removed));

  const stored = JSON.parse(localStorage.getItem('wl_saved') || '[]');
  localStorage.setItem('wl_saved', JSON.stringify(stored.filter(p => p.name !== name)));
  renderSavedPage();
}

function toggleEdit() {
  editMode = !editMode;
  renderSavedPage();
}

function buildGroupCard(country, items, large) {
  const count = items.length;
  const withImg = items.filter(p => p.image);

  const badge = `<span class="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3">${count} Place${count !== 1 ? 's' : ''}</span>`;
  const title = `<h2 class="text-2xl font-headline font-bold text-on-surface">Saved in ${country}</h2>`;

  // Horizontal scrollable photo strip
  let photoStrip = '';
  if (withImg.length > 0) {
    const slides = withImg.map(p => `
      <div class="flex-shrink-0 relative" style="width:130px">
        <div class="rounded-2xl overflow-hidden" style="height:170px">
          <img class="w-full h-full object-cover" src="${p.image}"/>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end p-3">
          <p class="text-white font-bold text-xs leading-tight">${p.name}</p>
        </div>
        ${editMode ? `<button onclick="unsavePlace('${p.name.replace(/'/g, "\\'")}')" class="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg z-10">
          <span class="material-symbols-outlined text-sm" translate="no">close</span>
        </button>` : ''}
      </div>`).join('');

    photoStrip = `<div class="flex gap-3 overflow-x-auto pb-2 mt-4" style="scrollbar-width:none;-webkit-overflow-scrolling:touch">${slides}</div>`;
  }

  // Place list (edit mode shows remove button per row)
  const placeList = items.map(p => `
    <div class="flex items-center justify-between py-2.5 border-b border-outline-variant/10 last:border-0">
      <div class="flex-1 min-w-0">
        <span class="text-sm font-medium text-on-surface">${p.name}</span>
      </div>
      <div class="flex items-center gap-3 ml-2 flex-shrink-0">
        <span class="text-xs text-on-surface-variant">${p.category}</span>
        ${editMode ? `<button onclick="unsavePlace('${p.name.replace(/'/g, "\\'")}')" class="w-7 h-7 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors">
          <span class="material-symbols-outlined text-sm" translate="no">close</span>
        </button>` : ''}
      </div>
    </div>`).join('');

  const card = document.createElement('div');
  card.className = (large ? 'md:col-span-8' : 'md:col-span-4') + ' bg-surface-container-lowest rounded-[2rem] p-6';
  card.innerHTML = `
    <div class="flex items-start justify-between mb-1">
      <div>${badge}${title}</div>
      <button onclick="toggleEdit()" class="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${editMode ? 'bg-red-100 text-red-500' : 'bg-primary-container/30 text-primary'}">
        <span class="material-symbols-outlined text-base" translate="no" style="font-variation-settings:'FILL' 1;">${editMode ? 'close' : 'edit'}</span>
      </button>
    </div>
    ${photoStrip}
    <div class="mt-3">${placeList}</div>`;
  return card;
}

function renderSavedPage() {
  const grid = document.getElementById('saved-grid');
  const empty = document.getElementById('saved-empty');

  const removed = JSON.parse(localStorage.getItem('wl_saved_removed') || '[]');
  const places = getSavedPlaces().filter(p => !removed.includes(p.name));

  if (!places.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  grid.innerHTML = '';

  const groups = {};
  places.forEach(p => {
    const key = p.country || 'Other';
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  const entries = Object.entries(groups);
  entries.forEach(([country, items], i) => {
    const large = items.length >= 3 || i % 2 === 0;
    grid.appendChild(buildGroupCard(country, items, large));
  });
}

renderSavedPage();
