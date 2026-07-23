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
