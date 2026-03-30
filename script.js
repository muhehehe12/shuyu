/* =============================================
   SHUYU 蜀渔 – script.js
   ============================================= */

// ===== LANGUAGE =====
let currentLang = 'ro';
function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-ro][data-en]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll('[data-placeholder-ro][data-placeholder-en]').forEach(el => {
    el.placeholder = el.dataset['placeholder' + (lang === 'ro' ? 'Ro' : 'En')];
  });
  document.getElementById('langToggle').textContent = lang === 'ro' ? 'EN' : 'RO';
  buildMenuCards();
  buildReviews();
}
document.getElementById('langToggle').addEventListener('click', () => {
  setLang(currentLang === 'ro' ? 'en' : 'ro');
});

function t(ro, en) { return currentLang === 'ro' ? ro : en; }

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE BURGER =====
document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-card').forEach(el => cardObserver.observe(el));

// ===== MENU DATA =====
const menuData = [
  // Principale
  { id: 1, ro: "Picioare De Pui În Oala De Lut", en: "Clay Pot Chicken Feet", price: 121, cat: "principale" },
  { id: 2, ro: "Pește Fiert", en: "Boiled Fish", price: 194, cat: "principale" },
  { id: 3, ro: "Porc Dulce Acrișor Pane", en: "Sweet & Sour Breaded Pork", price: 96, cat: "principale" },
  { id: 4, ro: "Chongqing Maoxuewang", en: "Chongqing Maoxuewang", price: 194, cat: "principale" },
  { id: 5, ro: "Picioare De Porc", en: "Pork Trotters", price: 84, cat: "principale" },
  { id: 6, ro: "Pește Cu Varză Murată", en: "Fish with Sauerkraut", price: 194, cat: "principale" },
  { id: 7, ro: "Pulpe De Pui Chili", en: "Chili Chicken Legs", price: 96, cat: "principale" },
  { id: 8, ro: "Limbă De Vită Sichuan", en: "Sichuan Beef Tongue", price: 121, cat: "principale" },
  { id: 9, ro: "Pui Chongqing", en: "Chongqing Chicken", price: 108, cat: "principale" },
  { id: 10, ro: "Miel La Grătar", en: "Grilled Lamb", price: 244, cat: "principale" },
  { id: 11, ro: "Pui De Baltă", en: "Frog Legs", price: 121, cat: "principale" },
  { id: 12, ro: "Pește La Grătar", en: "Grilled Fish", price: 194, cat: "principale" },
  { id: 13, ro: "Dovleac Cu Gălbenuș", en: "Pumpkin with Egg Yolk", price: 85, cat: "principale" },
  // Fructe de mare
  { id: 14, ro: "Creveți Cu Nuci", en: "Walnut Shrimp", price: 108, cat: "fructe-de-mare" },
  { id: 15, ro: "Ciuperci & Creveți", en: "Mushrooms & Shrimp", price: 231, cat: "fructe-de-mare" },
  { id: 16, ro: "Chiftele De Creveți", en: "Shrimp Meatballs", price: 108, cat: "fructe-de-mare" },
  { id: 17, ro: "Creveți Xiang La", en: "Xiang La Shrimp", price: 108, cat: "fructe-de-mare" },
  { id: 18, ro: "Abalon", en: "Abalone", price: 317, cat: "fructe-de-mare" },
  { id: 19, ro: "Calamar", en: "Squid", price: 170, cat: "fructe-de-mare" },
  { id: 20, ro: "Stridii", en: "Oysters", price: 92, cat: "fructe-de-mare" },
  { id: 21, ro: "Biban De Mare", en: "Sea Bass", price: 317, cat: "fructe-de-mare" },
  { id: 22, ro: "Creveți Vermicelli", en: "Vermicelli Shrimp", price: 133, cat: "fructe-de-mare" },
  // Carne
  { id: 23, ro: "Vită Cu Tofu", en: "Beef with Tofu", price: 105, cat: "carne" },
  { id: 24, ro: "Coada De Vită", en: "Oxtail", price: 108, cat: "carne" },
  { id: 25, ro: "Pește Dulce Acrișor", en: "Sweet & Sour Fish", price: 317, cat: "carne" },
  { id: 26, ro: "Rață Crocantă", en: "Crispy Duck", price: 194, cat: "carne" },
  { id: 27, ro: "Cotlete De Miel", en: "Lamb Chops", price: 121, cat: "carne" },
  // Aperitive
  { id: 28, ro: "Salată Urechi Porc", en: "Pig Ear Salad", price: 47, cat: "aperitive" },
  { id: 29, ro: "Pui Rece Picant", en: "Spicy Cold Chicken", price: 47, cat: "aperitive" },
  { id: 30, ro: "Urechi De Lemn", en: "Wood Ear Mushrooms", price: 34, cat: "aperitive" },
  { id: 31, ro: "Platou Lo-Mei", en: "Lo-Mei Platter", price: 57, cat: "aperitive" },
  { id: 32, ro: "Coaste Crocante", en: "Crispy Ribs", price: 52, cat: "aperitive" },
  { id: 33, ro: "Vită Aromată", en: "Aromatic Beef", price: 47, cat: "aperitive" },
  { id: 34, ro: "Edamame", en: "Edamame", price: 39, cat: "aperitive" },
  { id: 35, ro: "Castraveți Striviți", en: "Smashed Cucumbers", price: 34, cat: "aperitive" },
  // Noodles
  { id: 36, ro: "Fidea Fructe De Mare", en: "Seafood Noodles", price: 68, cat: "noodles" },
  { id: 37, ro: "Fidea Legume", en: "Vegetable Noodles", price: 59, cat: "noodles" },
  { id: 38, ro: "Tăiței", en: "Plain Noodles", price: 59, cat: "noodles" },
  { id: 39, ro: "Orez Cu Cârnați", en: "Rice with Sausage", price: 59, cat: "noodles" },
  { id: 40, ro: "Tăiței Coaste", en: "Rib Noodles", price: 157, cat: "noodles" },
  { id: 41, ro: "Tăiței Fructe De Mare", en: "Seafood Noodle Soup", price: 84, cat: "noodles" },
  { id: 42, ro: "Udon", en: "Udon", price: 59, cat: "noodles" },
  { id: 43, ro: "Orez Simplu", en: "Plain Rice", price: 6, cat: "noodles" },
  { id: 44, ro: "Colțunași", en: "Dumplings", price: 47, cat: "noodles" },
  { id: 45, ro: "Chongqing Noodles", en: "Chongqing Noodles", price: 59, cat: "noodles" },
  { id: 46, ro: "Orez Fructe De Mare", en: "Seafood Rice", price: 71, cat: "noodles" },
  // Sosuri
  { id: 47, ro: "Oțet balsamic", en: "Balsamic Vinegar", price: 5, cat: "sosuri" },
  { id: 48, ro: "Sos dulce acrișor", en: "Sweet & Sour Sauce", price: 5, cat: "sosuri" },
  { id: 49, ro: "Ulei picant", en: "Chilli Oil", price: 5, cat: "sosuri" },
  { id: 50, ro: "Sos de soia", en: "Soy Sauce", price: 5, cat: "sosuri" },
  // Bauturi
  { id: 51, ro: "Limonadă Pomelo", en: "Pomelo Lemonade", price: 15, cat: "bauturi" },
  { id: 52, ro: "Limonadă Kumquat", en: "Kumquat Lemonade", price: 15, cat: "bauturi" },
  { id: 53, ro: "Ceai Piersică", en: "Peach Tea", price: 15, cat: "bauturi" },
  { id: 54, ro: "Ceai Iasomie", en: "Jasmine Tea", price: 15, cat: "bauturi" },
  { id: 55, ro: "Ceai WLJ", en: "WLJ Tea", price: 15, cat: "bauturi" },
  { id: 56, ro: "Pepsi / Pepsi Zero", en: "Pepsi / Pepsi Zero", price: 12, cat: "bauturi" },
  { id: 57, ro: "Mirinda / 7UP", en: "Mirinda / 7UP", price: 10, cat: "bauturi" },
  { id: 58, ro: "Apă", en: "Water", price: 10, cat: "bauturi" },
  { id: 59, ro: "Lapte cocos / caramel", en: "Coconut / Caramel Milk", price: 15, cat: "bauturi" },
];

const catLabels = {
  principale: { ro: "Preparate Principale", en: "Main Dishes" },
  "fructe-de-mare": { ro: "Fructe de Mare", en: "Seafood" },
  carne: { ro: "Carne & Specialități", en: "Meat & Specialties" },
  aperitive: { ro: "Aperitive / Rece", en: "Starters / Cold" },
  noodles: { ro: "Noodles & Orez", en: "Noodles & Rice" },
  sosuri: { ro: "Sosuri", en: "Sauces" },
  bauturi: { ro: "Băuturi", en: "Drinks" },
};

let activeFilter = 'all';
let searchQuery = '';
let showFullMenu = false;

function toggleFullMenu() {
  showFullMenu = true;
  buildMenuCards();
}

function buildMenuCards() {
  const grid = document.getElementById('menuGrid');
  const filtered = menuData.filter(item => {
    const matchCat = activeFilter === 'all' || item.cat === activeFilter;
    const name = currentLang === 'ro' ? item.ro : item.en;
    const matchSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  document.getElementById('noResults').style.display = filtered.length === 0 ? 'block' : 'none';

  // Group by category when showing all
  if (activeFilter === 'all' && searchQuery === '') {
    const cats = ['principale','fructe-de-mare','carne','aperitive','noodles','sosuri','bauturi'];
    const catsToShow = showFullMenu ? cats : ['principale', 'fructe-de-mare'];
    
    grid.innerHTML = catsToShow.map(cat => {
      let items = filtered.filter(i => i.cat === cat);
      if (!items.length) return '';
      if (!showFullMenu) {
        items = items.slice(0, 8); // show max 8 items per category initially
      }
      const label = catLabels[cat][currentLang];
      return `
        <div class="menu-category-block">
          <div class="menu-cat-title">${label}</div>
          <ul class="menu-list">
            ${items.map(item => {
              const name = currentLang === 'ro' ? item.ro : item.en;
              return `<li class="menu-list-item" data-id="${item.id}">
                <span class="menu-list-name">${name}</span>
                <span class="menu-list-dots"></span>
                <span class="menu-list-price">${item.price} RON</span>
              </li>`;
            }).join('')}
          </ul>
        </div>`;
    }).join('');

    const toggleWrap = document.getElementById('menuToggleWrap');
    if (toggleWrap) {
       toggleWrap.style.display = showFullMenu ? 'none' : 'block';
    }
  } else {
    // When searching or filtering, show all matching items in a flat list
    const toggleWrap = document.getElementById('menuToggleWrap');
    if (toggleWrap) toggleWrap.style.display = 'none';

    grid.innerHTML = `<ul class="menu-list">${filtered.map(item => {
      const name = currentLang === 'ro' ? item.ro : item.en;
      const catLabel = catLabels[item.cat][currentLang];
      return `<li class="menu-list-item" data-id="${item.id}">
        <span class="menu-list-name">${name}</span>
        <span class="menu-list-cat">${catLabel}</span>
        <span class="menu-list-dots"></span>
        <span class="menu-list-price">${item.price} RON</span>
      </li>`;
    }).join('')}</ul>`;
  }
}

// Filters
document.getElementById('menuFilters').addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeFilter = e.target.dataset.cat;
  buildMenuCards();
});

// Search
document.getElementById('menuSearch').addEventListener('input', e => {
  searchQuery = e.target.value;
  buildMenuCards();
});

buildMenuCards();

// ===== PERSONS PICKER =====
let persons = 2;
function changePersons(delta) {
  persons = Math.max(1, Math.min(20, persons + delta));
  document.getElementById('personsCount').textContent = persons;
  const inputEl = document.getElementById('rezPersons');
  if (inputEl) inputEl.value = persons;
}

// ===== RESERVATION =====
// Set min date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('rezData').min = today;

function submitReservation(e) {
  e.preventDefault();
  const name = document.getElementById('rezNume').value;
  const date = document.getElementById('rezData').value;
  const time = document.getElementById('rezOra').value;
  const form = document.getElementById('rezForm');
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      const d = new Date(date);
      const dateStr = d.toLocaleDateString(currentLang === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const msg = currentLang === 'ro'
        ? `Rezervare pentru ${name}, ${persons} persoane, pe ${dateStr} la ora ${time}. Vă confirmăm în curând!`
        : `Reservation for ${name}, ${persons} guests, on ${dateStr} at ${time}. We will confirm shortly!`;
      form.style.display = 'none';
      const s = document.getElementById('rezSuccess');
      s.style.display = 'block';
      document.getElementById('rezSuccessMsg').textContent = msg;
      showToast(t('Rezervare trimisă cu succes!', 'Reservation sent successfully!'));
    } else {
      showToast(t('Eroare la trimiterea rezervării.', 'Error sending reservation.'));
    }
  }).catch(error => {
    showToast(t('Eroare rețea. Vă rugăm să ne sunați.', 'Network error. Please call us.'));
  });
}

const rezFormEl = document.getElementById('rezForm');
if (rezFormEl) {
  rezFormEl.addEventListener('submit', submitReservation);
}

function resetReservation() {
  document.getElementById('rezForm').reset();
  persons = 2;
  document.getElementById('personsCount').textContent = '2';
  const inputEl = document.getElementById('rezPersons');
  if (inputEl) inputEl.value = 2;
  document.getElementById('rezForm').style.display = 'flex';
  document.getElementById('rezSuccess').style.display = 'none';
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    fetch(contactForm.action, {
      method: contactForm.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        contactForm.style.display = 'none';
        document.getElementById('contactSuccess').style.display = 'block';
        showToast(t('Mesaj trimis cu succes!', 'Message sent successfully!'));
      } else {
        showToast(t('A apărut o problemă.', 'There was a problem.'));
      }
    }).catch(error => {
      showToast(t('Eroare rețea.', 'Network error.'));
    });
  });
}

// ===== REVIEWS DATA =====
const reviewsData = [
  { name: "Ana M.", date: "martie 2025", stars: 5, ro: "Un restaurant cu adevărat excepțional! Peștele fiert a fost o revelație — aromatic, picant, exact cum l-am gustat în Chongqing. O să revin neapărat.", en: "A truly exceptional restaurant! The boiled fish was a revelation — aromatic, spicy, exactly as I tasted it in Chongqing. I will definitely return." },
  { name: "Mihai D.", date: "februarie 2025", stars: 5, ro: "Am venit cu o grupă de 8 prieteni pentru hot pot. Personalul a fost atent și amabil, iar mâncarea... wow. Bulionul Sichuan e de neegalat.", en: "Came with a group of 8 friends for hot pot. Staff was attentive and kind, and the food... wow. The Sichuan broth is unmatched." },
  { name: "Elena P.", date: "ianuarie 2025", stars: 4, ro: "Atmosphere superb, food delicious. Creveții xiang la au fost favoritul meu. Singurul minus — timp de așteptare puțin mai lung seara.", en: "Superb atmosphere, delicious food. The xiang la shrimp was my favourite. Only downside — slightly longer wait times in the evening." },
  { name: "Radu C.", date: "decembrie 2024", stars: 5, ro: "Cel mai bun restaurant chinezesc din București, fără dubii. Chongqing Maoxuewang este un must-try. Prețurile sunt corecte pentru calitate.", en: "Best Chinese restaurant in Bucharest, no doubt. The Chongqing Maoxuewang is a must-try. Prices are fair for the quality." },
  { name: "Irina S.", date: "noiembrie 2024", stars: 5, ro: "De când l-am descoperit, nu mai am nevoie de alt restaurant. Calmar la grătar + ceai de iasomie = perfecțiune pură. Mulțumim, Shuyu!", en: "Since discovering it, I need no other restaurant. Grilled squid + jasmine tea = pure perfection. Thank you, Shuyu!" },
  { name: "Andrei L.", date: "octombrie 2024", stars: 4, ro: "Ambianță minunată, mâncare autentică. Am încercat rața crocantă — absolut delicioasă. Recomand tuturor iubitorilor de bucătărie asiatică.", en: "Wonderful ambiance, authentic food. I tried the crispy duck — absolutely delicious. I recommend it to all Asian food lovers." },
];

let currentSlide = 0;

function buildReviews() {
  const track = document.getElementById('reviewsTrack');
  track.innerHTML = reviewsData.map((r, i) => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <div class="review-text">${r[currentLang]}</div>
    </div>
  `).join('');

  const dots = document.getElementById('sliderDots');
  dots.innerHTML = reviewsData.map((_, i) => `<div class="dot ${i === currentSlide ? 'active' : ''}" onclick="goToSlide(${i})"></div>`).join('');
  moveSlider();
}

function moveSlider() {
  const track = document.getElementById('reviewsTrack');
  track.style.transform = `translateX(calc(-${currentSlide * 344}px))`;
}

function goToSlide(i) {
  currentSlide = i;
  buildReviews();
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + reviewsData.length) % reviewsData.length;
  buildReviews();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % reviewsData.length;
  buildReviews();
});

// Auto advance
setInterval(() => {
  currentSlide = (currentSlide + 1) % reviewsData.length;
  buildReviews();
}, 5000);

buildReviews();

// ===== GALLERY (real food images) =====
const galleryItems = [
  { src: 'hotpot.jpg', label: 'Hot Pot' },
  { src: 'meat.jpg', label: t('Carne', 'Meat') },
  { src: 'noodles.jpg', label: 'Noodles' },
  { src: 'dumplings.jpg', label: t('Colțunași', 'Dumplings') },
  { src: 'crevetisicalamarganguo.jpg', label: t('Creveți & Calamar', 'Shrimp & Squid') },
  { src: 'cucumbersalad.jpg', label: t('Salată Castravete', 'Cucumber Salad') },
  { src: 'chiftelutegogosicususan.jpg', label: t('Chiftele cu Susan', 'Sesame Meatballs') },
  { src: 'noodelswithpaneshrimps.jpg', label: t('Noodles cu Creveți', 'Noodles with Shrimp') },
  { src: 'pieptdeporcpicantculegume.jpg', label: t('Piept de Porc cu Legume', 'Spicy Pork with Veg') },
  { src: 'puidulceacrisor.jpg', label: t('Pui Dulce Acrișor', 'Sweet & Sour Chicken') },
  { src: 'puiiutechongqing.jpg', label: t('Pui Chongqing', 'Chongqing Chicken') },
  { src: 'supadelegumemuratecucarne.jpg', label: t('Supă de Legume Murate', 'Pickled Veg Soup') },
  { src: 'varzachinezeasca.jpg', label: t('Varză Chinezească', 'Chinese Cabbage') },
  { src: 'ceaiwlj.jpg', label: t('Ceai WLJ', 'WLJ Tea') },
];

const galleryGrid = document.getElementById('galleryGrid');
galleryItems.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'gallery-item';
  div.innerHTML = `
    <div class="gallery-item-inner">
      <img src="${item.src}" alt="${item.label}" loading="lazy" />
      <div class="gallery-item-overlay"><span>${item.label}</span></div>
    </div>`;
  div.addEventListener('click', () => openLightbox(i));
  galleryGrid.appendChild(div);
});

let lightboxIndex = 0;
function openLightbox(i) {
  lightboxIndex = i;
  document.getElementById('lightbox').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  updateLightbox();
}
function updateLightbox() {
  const item = galleryItems[lightboxIndex];
  document.getElementById('lightboxInner').innerHTML = `<img src="${item.src}" alt="${item.label}" style="max-width:90vw;max-height:80vh;border-radius:12px;object-fit:contain" />`;
}
document.getElementById('lightboxClose').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = '';
});
document.getElementById('lightboxPrev').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
});
document.getElementById('lightboxNext').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % galleryItems.length;
  updateLightbox();
});
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
  }
});

// ===== CHAT =====
const chatWidget = document.getElementById('chatWidget');
const chatFab = document.getElementById('chatFab');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

document.getElementById('openChat').addEventListener('click', toggleChat);
document.getElementById('chatFab').addEventListener('click', toggleChat);
document.getElementById('closeChat').addEventListener('click', () => {
  chatWidget.style.display = 'none';
  chatFab.style.display = 'flex';
});

function toggleChat() {
  const visible = chatWidget.style.display !== 'none';
  chatWidget.style.display = visible ? 'none' : 'flex';
  chatFab.style.display = visible ? 'flex' : 'none';
}

const chatResponses = {
  program: {
    ro: "Programul nostru:\n• Luni – Vineri: 12:00 – 23:00\n• Sâmbătă – Duminică: 11:00 – 24:00\n\nVă așteptăm!",
    en: "Our hours:\n• Monday – Friday: 12:00 – 23:00\n• Saturday – Sunday: 11:00 – 24:00\n\nWe look forward to seeing you!"
  },
  meniu: {
    ro: "Avem peste 80 de preparate autentice Sichuan: pește fiert, hot pot, creveți, rață crocantă, noodles și mult mai mult! Vedeți meniul complet în secțiunea Meniu de pe această pagină.",
    en: "We offer over 80 authentic Sichuan dishes: boiled fish, hot pot, shrimp, crispy duck, noodles and much more! See the full menu in the Menu section on this page."
  },
  rezervare: {
    ro: "Puteți face o rezervare direct pe site în secțiunea 'Rezervare', sau ne puteți suna la +40 763 758 758. Vă confirmăm în cel mai scurt timp!",
    en: "You can make a reservation directly on the site in the 'Reservation' section, or call us at +40 763 758 758. We'll confirm as soon as possible!"
  },
  locatie: {
    ro: "Ne găsiți la: Șoseaua Fundeni 204, 077086 București.\n\nParcare disponibilă în apropiere. Suntem accesibili cu metroul și autobuzul.",
    en: "You can find us at: Șoseaua Fundeni 204, 077086 Bucharest.\n\nParking available nearby. Accessible by metro and bus."
  },
};

function quickMsg(type) {
  addMsg(t(type === 'program' ? 'Program' : type === 'meniu' ? 'Meniu' : type === 'rezervare' ? 'Rezervare' : 'Locație',
           type.charAt(0).toUpperCase() + type.slice(1)), 'user');
  setTimeout(() => {
    addMsg(chatResponses[type][currentLang], 'bot');
  }, 600);
}

function addMsg(text, role) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChatSend() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg(msg, 'user');
  chatInput.value = '';
  const lower = msg.toLowerCase();
  setTimeout(() => {
    let resp;
    if (lower.match(/program|ore|orar|deschis|închis|open|hours|schedule/)) resp = chatResponses.program[currentLang];
    else if (lower.match(/meniu|menu|mancare|dish|food|preparat|pret|price/)) resp = chatResponses.meniu[currentLang];
    else if (lower.match(/rezerv|book|booking|masa|table|seat/)) resp = chatResponses.rezervare[currentLang];
    else if (lower.match(/adresa|locati|unde|where|address|location|street/)) resp = chatResponses.locatie[currentLang];
    else resp = t(
      "Mulțumesc pentru mesaj! Puteți întreba despre program, meniu, rezervări sau locație. Pentru alte întrebări, ne sunați la +40 763 758 758.",
      "Thank you for your message! You can ask about our hours, menu, reservations or location. For other questions, call us at +40 763 758 758."
    );
    addMsg(resp, 'bot');
  }, 700);
}

document.getElementById('chatSend').addEventListener('click', handleChatSend);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleChatSend(); });

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== LAZY IMAGE LOAD SIMULATION =====
if ('IntersectionObserver' in window) {
  const lazyObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        lazyObs.unobserve(e.target);
      }
    });
  });
  document.querySelectorAll('.pop-img, .about-img-main, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease';
    lazyObs.observe(el);
  });
}

// ===== INIT =====
setLang('ro');
