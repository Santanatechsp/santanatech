// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuBtn.textContent = menu.classList.contains("active") ? "×" : "☰";
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuBtn.textContent = "☰";
    });
  });
}

// Carrossel de projetos
const projectsTrack = document.getElementById("projectsTrack");
const btnLeft = document.querySelector(".carousel-left");
const btnRight = document.querySelector(".carousel-right");

if (projectsTrack && btnLeft && btnRight) {
  btnLeft.addEventListener("click", () => {
    projectsTrack.scrollBy({ left: -320, behavior: "smooth" });
  });
  btnRight.addEventListener("click", () => {
    projectsTrack.scrollBy({ left: 320, behavior: "smooth" });
  });
}

// Filtro de serviços por categoria
const filterBar = document.getElementById("filterBar");
const servicesGrid = document.getElementById("servicesGrid");

if (filterBar && servicesGrid) {
  const cards = servicesGrid.querySelectorAll(".service-card");
  const buttons = filterBar.querySelectorAll(".filter-btn");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const show = filter === "todos" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
}

// Ano no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
