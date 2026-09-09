/* Tadem — site interactivity (no dependencies) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initBackToTop();
    initReveal();
    initContactForm();
    initFooterYear();
    initMarqueeControls();
  });

  /* Decorative prev/next controls on the client-logo marquee: pause/resume
     the auto-scroll and nudge it, so the arrows shown in the design do
     something rather than sitting there inert. */
  function initMarqueeControls() {
    document.querySelectorAll(".marquee-wrap").forEach(function (wrap) {
      var marquee = wrap.querySelector(".marquee");
      var track = wrap.querySelector(".marquee-track");
      var prev = wrap.querySelector(".marquee-arrow.prev");
      var next = wrap.querySelector(".marquee-arrow.next");
      if (!marquee || !track) return;

      function nudge(dir) {
        marquee.classList.add("paused");
        var style = window.getComputedStyle(track);
        var matrix = style.transform;
        var currentX = 0;
        if (matrix && matrix !== "none") {
          var vals = matrix.match(/matrix\(([^)]+)\)/);
          if (vals) currentX = parseFloat(vals[1].split(",")[4]) || 0;
        }
        var next_x = currentX + dir * 220;
        track.style.transition = "transform .4s ease";
        track.style.transform = "translateX(" + next_x + "px)";
        clearTimeout(track._resumeTimer);
        track._resumeTimer = setTimeout(function () {
          track.style.transition = "";
          track.style.transform = "";
          marquee.classList.remove("paused");
        }, 2600);
      }

      if (prev) prev.addEventListener("click", function () { nudge(1); });
      if (next) next.addEventListener("click", function () { nudge(-1); });
    });
  }

  /* Sticky header shadow on scroll */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile nav toggle */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Back to top button */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("show", window.scrollY > 500);
      },
      { passive: true }
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Gentle fade/slide-in on scroll for elements marked .reveal */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  /*
   * Contact form:
   * Submits to Formspree (https://formspree.io) via fetch/AJAX so visitors
   * never leave the page. If the request fails (e.g. Formspree isn't set
   * up yet), we fall back to opening the visitor's email app with the
   * message pre-filled, so the form never dead-ends.
   *
   * To activate: create a free form at https://formspree.io using
   * contact@tademgroup.com, then replace YOUR_FORM_ID below (see README.md).
   */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var formEndpoint = form.getAttribute("action") || "";
      var notConfigured = formEndpoint.indexOf("YOUR_FORM_ID") !== -1;

      if (notConfigured) {
        openMailFallback(form);
        return;
      }

      var data = new FormData(form);
      var originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending&hellip;";

      fetch(formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            showStatus(status, "success", "Thank you! Your enquiry has been sent — our team will get back to you shortly.");
            form.reset();
          } else {
            throw new Error("submit-failed");
          }
        })
        .catch(function () {
          showStatus(
            status,
            "error",
            "We couldn't send that automatically, so we've opened your email app instead — please hit send there."
          );
          openMailFallback(form);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        });
    });
  }

  function showStatus(el, type, message) {
    if (!el) return;
    el.textContent = message;
    el.className = "form-status " + type;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function openMailFallback(form) {
    var fd = new FormData(form);
    var name = fd.get("name") || "";
    var company = fd.get("company") || "";
    var email = fd.get("email") || "";
    var phone = fd.get("phone") || "";
    var type = fd.get("requirement") || "";
    var message = fd.get("message") || "";

    var body =
      "Name: " + name + "\n" +
      "Company: " + company + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n" +
      "Type of Requirement: " + type + "\n\n" +
      "Project Description:\n" + message;

    var mailto =
      "mailto:contact@tademgroup.com" +
      "?subject=" + encodeURIComponent("Website Enquiry from " + (name || "Website Visitor")) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
  }

  function initFooterYear() {
    document.querySelectorAll(".current-year").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
