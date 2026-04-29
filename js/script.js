const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

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
const projectsTrack = document.getElementById("projectsTrack");
const btnLeft = document.querySelector(".carousel-left");
const btnRight = document.querySelector(".carousel-right");

if (projectsTrack && btnLeft && btnRight) {
  btnLeft.addEventListener("click", () => {
    projectsTrack.scrollBy({
      left: -320,
      behavior: "smooth"
    });
  });

  btnRight.addEventListener("click", () => {
    projectsTrack.scrollBy({
      left: 320,
      behavior: "smooth"
    });
  });
}