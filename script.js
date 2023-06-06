let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

var darkModeIcon = document.getElementById("dark-mode-icon");
var lightModeIcon = document.getElementById("light-mode-icon");

darkModeIcon.addEventListener("click", function () {
  document.documentElement.style.setProperty("--bg-color", "#000000");
  document.documentElement.style.setProperty("--second-bg-color", "#112e42");
  document.documentElement.style.setProperty("--text-color", "#ededed");
  document.documentElement.style.setProperty("--main-color", "#00abf0");
  darkModeIcon.style.display = "none";
  lightModeIcon.style.display = "block";
});

lightModeIcon.addEventListener("click", function () {
  document.documentElement.style.setProperty("--bg-color", "#EAE7DC");
  document.documentElement.style.setProperty("--second-bg-color", "#D8C3A5");
  document.documentElement.style.setProperty("--text-color", "#8E8D8A");
  document.documentElement.style.setProperty("--main-color", "#E98074");
  lightModeIcon.style.display = "none";
  darkModeIcon.style.display = "block";
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  var formData = new FormData(e.target);

  fetch('https://formspree.io/f/mnqykzky', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('confirmation-message').textContent = "Thank you. Your message has been sent.";
    } else {
      document.getElementById('confirmation-message').textContent = "Looks like something went wrong. Please try again.";
    }
  })
  .catch(error => {
    console.error(error);
    document.getElementById('confirmation-message').textContent = "Looks like something went wrong. Please try again.";
  });
});

