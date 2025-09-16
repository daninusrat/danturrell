// nav.js
const links = [...document.querySelectorAll('.nav a[href^="#"]')];

function setActive() {
  const fromTop = window.scrollY + 80;
  let current = null;

  document.querySelectorAll("section[id]").forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (top <= fromTop) current = sec.id;
  });

  links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`));
}
setActive();
window.addEventListener("scroll", setActive);
