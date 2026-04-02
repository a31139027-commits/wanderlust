let activeCategory = 'all';

function selectChip(el, cat) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  activeCategory = cat;
  filterPlaces();
}

function filterPlaces() {
  const q = document.getElementById('city-search').value.toLowerCase().trim();
  const cards = document.querySelectorAll('#place-grid [data-category]');
  let visible = 0;
  cards.forEach(card => {
    const catMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
    const nameMatch = !q || card.dataset.name.includes(q);
    const show = catMatch && nameMatch;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('result-count').textContent = visible;
  document.getElementById('no-results').classList.toggle('hidden', visible > 0);
}

function addToJournal(btn, name) {
  if (btn.classList.contains('saved')) return;
  btn.classList.add('saved');

  const card = btn.closest('[data-category]');
  const img = card?.querySelector('img')?.src || '';
  const catMap = {
    attraction: 'Culture', food: 'Foodie', nature: 'Nature',
    hidden: 'Hidden Gem', nightlife: 'Nightlife'
  };
  const category = catMap[card?.dataset.category] || 'Culture';

  const saved = JSON.parse(localStorage.getItem('wl_saved') || '[]');
  if (!saved.find(p => p.name === name)) {
    saved.push({ name, category, image: img, id: Date.now() });
    localStorage.setItem('wl_saved', JSON.stringify(saved));
  }
  showToast(name + ' saved');
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity = '0'; }, 2200);
}

function toggleSave(btn) {
  const icon = btn.querySelector('.save-icon');
  if (icon.textContent.trim() === 'favorite_border') {
    icon.textContent = 'favorite';
    icon.style.color = '#dcae96';
    showToast('Kyoto saved to favourites');
  } else {
    icon.textContent = 'favorite_border';
    icon.style.color = '';
  }
}
