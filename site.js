/* =========================================================
   1) קישור התשלום – מדביקים כאן פעם אחת.
      כל כפתורי ההצטרפות בדף יובילו אליו אוטומטית.
   ========================================================= */
const PAYMENT_LINK = '#price'; // ← להחליף בקישור התשלום האמיתי

/* =========================================================
   2) המלצות – כל עוד הרשימה ריקה, הסקשן מוסתר באתר.
      כשיש המלצה אמיתית (באישור המשתתפת), מוסיפים כך:
      { quote: 'הטקסט של ההמלצה', name: 'שם המשתתפת' },
   ========================================================= */
const TESTIMONIALS = [
];

/* ---------- מכאן והלאה אין צורך לשנות ---------- */

document.querySelectorAll('.js-join').forEach(a => { a.href = PAYMENT_LINK; });

// המלצות: מוצגות רק אם יש. בתצוגה מקדימה (‎?preview‎) מוצגים מצייני המקום.
(function () {
  const sec = document.getElementById('testimonials');
  if (!sec) return;
  const preview = new URLSearchParams(location.search).has('preview');
  if (TESTIMONIALS.length) {
    const wrap = sec.querySelector('.quotes');
    wrap.innerHTML = '';
    TESTIMONIALS.forEach(t => {
      const f = document.createElement('figure');
      f.className = 'quote';
      const q = document.createElement('blockquote'); q.textContent = t.quote;
      const c = document.createElement('figcaption'); c.textContent = t.name;
      f.append(q, c); wrap.append(f);
    });
    sec.hidden = false;
  } else if (preview) {
    sec.hidden = false;
    sec.classList.add('is-placeholder');
  }
})();

// תפריט בטלפון
(function () {
  const btn = document.querySelector('.burger');
  if (!btn) return;
  const toggle = (force) => {
    const open = document.body.classList.toggle('menu-open', force);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'סגירת התפריט' : 'פתיחת התפריט');
  };
  btn.addEventListener('click', () => toggle());
  document.querySelector('.mshade').addEventListener('click', () => toggle(false));
  document.querySelectorAll('.mmenu a').forEach(a => a.addEventListener('click', () => toggle(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  matchMedia('(min-width:900px)').addEventListener('change', () => toggle(false));
})();

// שיעורים: במחשב כולם פתוחים, בטלפון אקורדיון
(function () {
  const wide = matchMedia('(min-width:760px)');
  const sync = () => document.querySelectorAll('details.lesson').forEach(d => { d.open = wide.matches; });
  sync();
  wide.addEventListener('change', sync);
  document.querySelectorAll('details.lesson summary').forEach(s =>
    s.addEventListener('click', e => { if (wide.matches) e.preventDefault(); }));
})();
