document.addEventListener("DOMContentLoaded", function () {

    /* Mark the current page in both navigation views. */
    function normalizePath(path) {
        const normalized = path.toLowerCase().replace(/\/+$/, "");
        return normalized || "/index.html";
    }

    const currentPath = normalizePath(window.location.pathname);
    const navigationLinks = document.querySelectorAll(
        ".desktop-nav a[href], .mobile-nav a[href]"
    );

    navigationLinks.forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        const linkPath = normalizePath(new URL(href, window.location.href).pathname);

        if (linkPath === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");

            const homeDropdown = link.closest(".home-dropdown, .mobile-home-dropdown");
            if (homeDropdown) {
                homeDropdown.classList.add("has-current-page");
            }
        }
    });

    /* =====================================
       MOBILE MENU TOGGLE
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const menuIcon = menuToggle && menuToggle.querySelector("i");

    function setMobileMenuOpen(isOpen) {
        if (!menuToggle || !mobileNav || !menuIcon) {
            return;
        }

        mobileNav.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuIcon.className = isOpen ? "bi bi-x-lg" : "bi bi-list";
    }

    if (menuToggle && mobileNav && menuIcon) {
        menuToggle.addEventListener("click", function () {
            setMobileMenuOpen(!mobileNav.classList.contains("active"));
        });
    }


    /* =====================================
       MOBILE HOME DROPDOWN
    ===================================== */

    const mobileHomeDropdown =
        document.querySelector(".mobile-home-dropdown");

    const mobileHomeBtn =
        document.querySelector(".mobile-home-btn");

    if (mobileHomeDropdown && mobileHomeBtn) {
        mobileHomeBtn.setAttribute("aria-expanded", "false");
        mobileHomeBtn.addEventListener("click", function () {
            const isOpen = mobileHomeDropdown.classList.toggle("active");
            mobileHomeBtn.setAttribute("aria-expanded", isOpen);
        });
    }


    /* =====================================
       CLOSE MENU AFTER CLICKING LINKS
    ===================================== */

    const mobileLinks = mobileNav
        ? mobileNav.querySelectorAll("a")
        : [];

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            setMobileMenuOpen(false);

        });

    });


    /* =====================================
       CLOSE MENU ON OUTSIDE CLICK
    ===================================== */

    if (mobileNav && menuToggle) {
        document.addEventListener("click", function (event) {
            if (
                !mobileNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                setMobileMenuOpen(false);
            }
        });
    }


    /* =====================================
       DARK MODE
    ===================================== */

    const themeButtons =
        document.querySelectorAll(".theme-toggle");

    const htmlElement = document.documentElement;

    function updateThemeIcon() {

        const isDark =
            htmlElement.classList.contains("dark-mode");

        themeButtons.forEach(function (button) {

            const icon = button.querySelector("i");

            icon.className = isDark
                ? "bi bi-sun"
                : "bi bi-moon";

        });

        const logoPath = isDark ? "images/logo-white.png" : "images/logo.png";
        document.querySelectorAll('img[src="images/logo.png"], img[src="images/logo-white.png"]')
            .forEach(function (logo) {
                logo.setAttribute("src", logoPath);
            });

    }

    // Load saved theme

    const savedTheme =
        localStorage.getItem("beautypro-theme");

    if (savedTheme === "dark") {

        htmlElement.classList.add("dark-mode");

    } else {

        htmlElement.classList.remove("dark-mode");

    }

    updateThemeIcon();

    // Toggle theme

    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            htmlElement.classList.toggle("dark-mode");

            const currentTheme =
                htmlElement.classList.contains("dark-mode")
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "beautypro-theme",
                currentTheme
            );

            updateThemeIcon();

        });

    });


    /* =====================================
       RTL MODE
    ===================================== */

    const rtlButtons =
        document.querySelectorAll(".rtl-toggle");

    function updateRTL() {

        const isRTL =
            htmlElement.getAttribute("dir") === "rtl";

        rtlButtons.forEach(function (button) {

            const icon = button.querySelector("i");

            icon.className = "bi bi-arrow-left-right";

            const span = button.querySelector("span");

            if (span) {
                span.textContent = isRTL ? "LTR Mode" : "RTL Mode";
            }

        });

    }

    // Load saved direction

    const savedDirection =
        localStorage.getItem("beautypro-direction");

    if (savedDirection === "rtl") {

        htmlElement.setAttribute("dir", "rtl");

    } else {

        htmlElement.setAttribute("dir", "ltr");

    }

    updateRTL();

    // Toggle direction

    rtlButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const currentDirection =
                htmlElement.getAttribute("dir");

            const newDirection =
                currentDirection === "ltr" ? "rtl" : "ltr";

            htmlElement.setAttribute("dir", newDirection);

            localStorage.setItem(
                "beautypro-direction",
                newDirection
            );

            updateRTL();

        });

    });


    /* =====================================
       ESCAPE KEY - CLOSE MOBILE MENU
    ===================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            setMobileMenuOpen(false);
            if (mobileHomeDropdown && mobileHomeBtn) {
                mobileHomeDropdown.classList.remove("active");
                mobileHomeBtn.setAttribute("aria-expanded", "false");
            }
        }

    });

});

/* =================================
   PROGRAM LEARNING TABS
================================= */

document.querySelectorAll(".bp-program-learning").forEach(section => {

    const tabs = section.querySelectorAll(".bp-learning-tab");
    const panels = section.querySelectorAll(".bp-learning-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            const selectedProgram = this.dataset.program;

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            panels.forEach(panel => {
                panel.classList.remove("active");
            });

            this.classList.add("active");

            const selectedPanel = section.querySelector(
                `.bp-learning-panel[data-panel="${selectedProgram}"]`
            );

            if (selectedPanel) {
                selectedPanel.classList.add("active");
            }

        });

    });

});

// INSTRUCTORS EXPERTISE TABS

document.querySelectorAll(".bp-expertise-section").forEach(section => {

    const tabs = section.querySelectorAll(".bp-expertise-tab");
    const panels = section.querySelectorAll(".bp-expertise-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            const selected = this.dataset.expertise;

            tabs.forEach(item => item.classList.remove("active"));
            panels.forEach(panel => panel.classList.remove("active"));

            this.classList.add("active");

            const target = section.querySelector(
                `.bp-expertise-panel[data-panel="${selected}"]`
            );

            if (target) {
                target.classList.add("active");
            }

        });

    });

});
