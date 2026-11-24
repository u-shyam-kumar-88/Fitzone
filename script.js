document.addEventListener("DOMContentLoaded", () => {
  // Responsive navigation
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    };
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navLinks.classList.toggle("is-open", open);
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  }

  // Coach card selection works with mouse, Enter and Space
  document.querySelectorAll(".coach-card").forEach(card => {
    const selectCard = () => {
      document.querySelectorAll(".coach-card").forEach(item => {
        const selected = item === card;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    };
    card.addEventListener("click", selectCard);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCard();
      }
    });
  });

  // Sample class timetable
  const timetable = {
    mon: [
      ["07:00 AM", "Strength Foundations", "Strength Studio · Alex Vance"],
      ["05:30 PM", "Conditioning Circuit", "Performance Floor · Marcus Cole"],
      ["06:30 PM", "Mobility Flow", "Movement Room · Elena Rostova"]
    ],
    wed: [
      ["07:30 AM", "Full Body Basics", "Strength Studio · Alex Vance"],
      ["05:00 PM", "Interval Training", "Performance Floor · Marcus Cole"],
      ["06:15 PM", "Stretch & Restore", "Movement Room · Elena Rostova"]
    ],
    fri: [
      ["07:00 AM", "Technique Workshop", "Strength Studio · Alex Vance"],
      ["05:30 PM", "Team Conditioning", "Performance Floor · Marcus Cole"],
      ["06:30 PM", "Evening Yoga", "Movement Room · Elena Rostova"]
    ],
    sat: [
      ["08:00 AM", "Weekend Strength", "Strength Studio · Alex Vance"],
      ["09:15 AM", "Community Circuit", "Performance Floor · Marcus Cole"],
      ["10:30 AM", "Mindful Mobility", "Movement Room · Elena Rostova"]
    ]
  };
  const scheduleList = document.getElementById("schedule-list");
  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".day-tab").forEach(button => {
        const active = button === tab;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
      });
      if (!scheduleList) return;
      scheduleList.innerHTML = timetable[tab.dataset.day].map(session => `
        <article class="schedule-row">
          <span class="schedule-time">${session[0]}</span>
          <div><h3>${session[1]}</h3><p>${session[2]}</p></div>
          <span class="schedule-level">ALL LEVELS</span>
        </article>`).join("");
    });
  });

  // Demo contact form: validate locally, never pretend to send or store data
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("contact-status");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      contactStatus.textContent = "Thanks! This demo form is working locally, but no message was sent or stored.";
      contactStatus.classList.add("status-success");
      contactForm.reset();
    });
  }

  // Demo login feedback and password visibility toggle
  const loginForm = document.getElementById("login-form");
  const loginStatus = document.getElementById("login-status");
  if (loginForm && loginStatus) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;
      loginStatus.textContent = "Demo complete: authentication is not connected. No credentials were sent or stored.";
      loginStatus.classList.add("status-success");
      loginForm.reset();
      const password = document.getElementById("login-password");
      if (password) password.type = "password";
      const toggle = document.getElementById("toggle-password");
      if (toggle) { toggle.textContent = "Show"; toggle.setAttribute("aria-pressed", "false"); }
    });
  }
  const passwordInput = document.getElementById("login-password");
  const passwordToggle = document.getElementById("toggle-password");
  if (passwordInput && passwordToggle) {
    passwordToggle.addEventListener("click", () => {
      const show = passwordInput.type === "password";
      passwordInput.type = show ? "text" : "password";
      passwordToggle.textContent = show ? "Hide" : "Show";
      passwordToggle.setAttribute("aria-pressed", String(show));
      passwordToggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
