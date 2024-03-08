// declarações dos elementos a serem utilziados no script
const toggleSideBarElements = document.querySelectorAll(".__toggle-sidebar"),
  buttonsDocument = document.querySelectorAll(["a", "button"]),
  containerSideBar = document.querySelector(".container-sidebar"),
  toggleThemeButton = document.querySelector(".__toggle-theme"),
  body = document.body;

// permite o usuário usar o menu responsivo com sidebar
function toggleContainerSideBar() {
  containerSideBar.classList.toggle("show-container-sidebar");

  if (containerSideBar.classList.contains("show-container-sidebar")) {
    buttonsDocument.forEach((element) => {
      if (!element.classList.contains("__button-sidebar")) {
        element.setAttribute("tabindex", "-1");
      }
    });
  } else {
    buttonsDocument.forEach((element) => {
      if (!element.classList.contains("__button-sidebar")) {
        element.removeAttribute("tabindex");
      }
    });
  }
}

toggleSideBarElements.forEach((element) => {
  element.addEventListener("click", toggleContainerSideBar);
});

// seta o tema inicial do site para o usuário
(function () {
  (m = localStorage.getItem("doc_theme")), (wm = window.matchMedia);
  if (
    m === "light" ||
    (!m && wm && !wm("(prefers-color-scheme: dark)").matches)
  ) {
    body.classList.add("light");
    toggleThemeButton.classList.add("light");
  } else {
    body.classList.remove("light");
    toggleThemeButton.classList.remove("light");
  }
})();

// permite o usuário alterar o tema
toggleThemeButton.addEventListener("click", () => {
  body.classList.toggle("light");
  toggleThemeButton.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("doc_theme", "light");
  } else {
    localStorage.setItem("doc_theme", "dark");
  }
});
