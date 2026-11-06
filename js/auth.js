
document.addEventListener("DOMContentLoaded", function () {

  const root = document.documentElement;

  // Load saved preferences
  function loadPreferences() {
    const savedTheme = localStorage.getItem("beautypro-theme");
    const savedDirection = localStorage.getItem("beautypro-direction");

    root.classList.toggle("dark-mode", savedTheme === "dark");
    root.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

    updateThemeButton();
    updateRTLButton();
  }

  // Dark mode button
  const themeToggle = document.querySelector(".theme-toggle");

  function updateThemeButton() {
    const isDark = root.classList.contains("dark-mode");

    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon"></i>';

      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    const logoPath = isDark ? "images/logo-white.png" : "images/logo.png";
    document.querySelectorAll('img[src="images/logo.png"], img[src="images/logo-white.png"]')
      .forEach(function (logo) {
        if (logo.closest(".footer-logo")) return;
        logo.setAttribute("src", logoPath);
      });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = root.classList.toggle("dark-mode");

      localStorage.setItem(
        "beautypro-theme",
        isDark ? "dark" : "light"
      );

      updateThemeButton();
    });
  }

  // RTL button
  const rtlToggle = document.querySelector(".rtl-toggle");

  function updateRTLButton() {
    const isRTL = root.getAttribute("dir") === "rtl";

    if (rtlToggle) {
      rtlToggle.innerHTML = isRTL
        ? '<i class="bi bi-arrow-left-right"></i>'
        : '<i class="bi bi-arrow-left-right"></i>';

      rtlToggle.setAttribute("aria-pressed", String(isRTL));
    }
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", function () {
      const newDirection =
        root.getAttribute("dir") === "rtl" ? "ltr" : "rtl";

      root.setAttribute("dir", newDirection);

      localStorage.setItem(
        "beautypro-direction",
        newDirection
      );

      updateRTLButton();
    });
  }

  // Password visibility
  document.querySelectorAll(".password-toggle").forEach(function (button) {

    button.addEventListener("click", function () {

      const targetId = button.getAttribute("data-target");
      const passwordInput = document.getElementById(targetId);

      if (!passwordInput) return;

      const isPassword = passwordInput.type === "password";

      passwordInput.type = isPassword ? "text" : "password";

      button.innerHTML = isPassword
        ? '<i class="bi bi-eye-slash"></i>'
        : '<i class="bi bi-eye"></i>';

      button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      button.setAttribute("aria-pressed", String(isPassword));

    });

  });

  // Front-end form handling only
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Login form UI is ready. Backend authentication is not connected yet.");
    });
  }

  loadPreferences();

});


// Login and Register form handling
document.querySelectorAll(".auth-form").forEach(function (form) {

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (form.id === "registerForm") {

      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        document.getElementById("confirmPassword").focus();
        return;
      }

      if (password.length < 8) {
        alert("Password must contain at least 8 characters.");
        return;
      }

      alert("Registration form is ready. Backend registration is not connected yet.");

    } else if (form.id === "loginForm") {

      alert("Login form UI is ready. Backend authentication is not connected yet.");

    }

  });

});
