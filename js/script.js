document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const projectsTrack = document.getElementById("projectsTrack");
  const btnLeft = document.querySelector(".carousel-left");
  const btnRight = document.querySelector(".carousel-right");
  const anoAtual = document.getElementById("anoAtual");

  if (anoAtual) {
    anoAtual.textContent = String(new Date().getFullYear());
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const aberto = menu.classList.toggle("active");

      menuBtn.textContent = aberto ? "×" : "☰";
      menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");
      menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("click", (event) => {
      const clicouDentroMenu = menu.contains(event.target);
      const clicouNoBotao = menuBtn.contains(event.target);

      if (!clicouDentroMenu && !clicouNoBotao) {
        menu.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        menu.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (projectsTrack && btnLeft && btnRight) {
    const calcularDeslocamento = () => {
      const card = projectsTrack.querySelector(".project-card");

      if (!card) {
        return 320;
      }

      const gap = parseFloat(getComputedStyle(projectsTrack).columnGap || "19");
      return card.getBoundingClientRect().width + gap;
    };

    btnLeft.addEventListener("click", () => {
      projectsTrack.scrollBy({
        left: -calcularDeslocamento(),
        behavior: "smooth"
      });
    });

    btnRight.addEventListener("click", () => {
      projectsTrack.scrollBy({
        left: calcularDeslocamento(),
        behavior: "smooth"
      });
    });
  }

  const elementosAnimados = document.querySelectorAll(
    ".service-card, .project-card, .result-stat, .pipeline-panel, .automation-copy"
  );

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas, observer) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) {
            return;
          }

          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        });
      },
      {
        threshold: 0.12
      }
    );

    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("reveal-item");
      observador.observe(elemento);
    });
  } else {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("is-visible");
    });
  }
});


// Modal de novo projeto
const projectModal = document.getElementById("projectModal");
const openProjectModal = document.getElementById("openProjectModal");
const projectForm = document.getElementById("projectForm");
const projectType = document.getElementById("projectType");
const otherProjectWrap = document.getElementById("otherProjectWrap");
const otherProjectType = document.getElementById("otherProjectType");

function setProjectModal(open) {
  if (!projectModal) return;
  projectModal.hidden = !open;
  projectModal.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.classList.toggle("modal-open", open);
  if (open) setTimeout(() => document.getElementById("projectName")?.focus(), 50);
}

openProjectModal?.addEventListener("click", () => setProjectModal(true));
document.querySelectorAll("[data-close-project-modal]").forEach((el) => el.addEventListener("click", () => setProjectModal(false)));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setProjectModal(false); });

projectType?.addEventListener("change", () => {
  const isOther = projectType.value === "Outros";
  otherProjectWrap.hidden = !isOther;
  if (otherProjectType) otherProjectType.required = isOther;
});

projectForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = projectType.value === "Outros" ? otherProjectType.value.trim() : projectType.value;
  const message = [
    "Olá, gostaria de conversar sobre um novo projeto.",
    "",
    `Nome do projeto: ${document.getElementById("projectName").value.trim()}`,
    `Tipo de projeto: ${type}`,
    `Prazo: ${document.getElementById("projectDeadline").value}`,
    `Meu WhatsApp: ${document.getElementById("projectWhatsapp").value.trim()}`,
    "",
    "Descrição:",
    document.getElementById("projectDescription").value.trim()
  ].join("\\n");
  window.open(`https://wa.me/5511956919990?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

// Filtros simples das avaliações
const reviewFilters = document.querySelectorAll(".review-filter");
const reviewItems = Array.from(document.querySelectorAll(".review-item"));
reviewFilters.forEach((button) => button.addEventListener("click", () => {
  reviewFilters.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.reviewFilter;
  reviewItems.forEach((item) => { item.hidden = filter !== "all" && item.dataset.category !== filter; });
}));

document.getElementById("reviewSort")?.addEventListener("change", (event) => {
  const feed = document.getElementById("reviewsFeed");
  if (!feed) return;
  const compose = feed.querySelector(".review-compose");
  const items = [...reviewItems];
  if (event.target.value === "recent") items.reverse();
  items.forEach((item) => feed.appendChild(item));
  if (compose) feed.prepend(compose);
});
