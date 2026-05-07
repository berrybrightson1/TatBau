(function () {
  var ready = function (fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  };

  var locale = function () {
    return location.pathname.indexOf("/de/") === 0 ? "de" : "en";
  };

  var text = {
    en: {
      menu: "Menu",
      close: "Close",
      faqTitle: "Frequently Asked Questions",
      faqIntro: "Quick answers about TAT Bau services.",
      contact: "Contact us",
      enquiryTitle: "Send an enquiry",
      enquiryIntro: "Tell us a few details and we will continue the conversation on WhatsApp.",
      name: "Name",
      contactField: "Phone or email",
      service: "Service",
      message: "Project details",
      sendWhatsapp: "Submit to WhatsApp",
      serviceOptions: ["Entrance door", "Windows", "Roller shutters", "Sun protection", "Installation", "Other"],
      questions: [
        ["Where does TAT Bau work?", "We are based in Delmenhorst and support projects across the Bremen region and nearby areas."],
        ["Can I design my door online?", "Yes. Use the door configurator to choose a model and send us your preferred design for consultation."],
        ["Do you handle installation?", "Yes. We provide measurement, consultation, and professional fitting on site."],
        ["How can I request a quote?", "Contact us by phone, email, WhatsApp, or the contact page with a few details about your project."]
      ]
    },
    de: {
      menu: "Menü",
      close: "Schließen",
      faqTitle: "Häufig gestellte Fragen",
      faqIntro: "Kurze Antworten zu den Leistungen von TAT Bau.",
      contact: "Kontakt aufnehmen",
      enquiryTitle: "Anfrage senden",
      enquiryIntro: "Geben Sie ein paar Details ein, dann geht es direkt per WhatsApp weiter.",
      name: "Name",
      contactField: "Telefon oder E-Mail",
      service: "Leistung",
      message: "Projektdetails",
      sendWhatsapp: "Per WhatsApp senden",
      serviceOptions: ["Haustür", "Fenster", "Rollläden", "Sonnenschutz", "Montage", "Sonstiges"],
      questions: [
        ["Wo arbeitet TAT Bau?", "Wir sitzen in Delmenhorst und betreuen Projekte in der Region Bremen und Umgebung."],
        ["Kann ich meine Tür online gestalten?", "Ja. Nutzen Sie den Türkonfigurator und senden Sie uns Ihr Wunschdesign zur Beratung."],
        ["Übernehmen Sie die Montage?", "Ja. Wir übernehmen Aufmaß, Beratung und die professionelle Montage vor Ort."],
        ["Wie bekomme ich ein Angebot?", "Kontaktieren Sie uns per Telefon, E-Mail, WhatsApp oder über die Kontaktseite mit ein paar Projektdetails."]
      ]
    }
  };

  function makeIcon(pathD) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + pathD + "</svg>";
  }

  function setupMobileMenu() {
    var lang = locale();
    document.querySelectorAll('button[aria-label="Menu"], button[aria-label="Menü"]').forEach(function (button) {
      if (button.dataset.staticReady) return;
      button.dataset.staticReady = "true";
      var header = button.closest("header");
      var nav = header && header.querySelector("nav");
      if (!header || !nav) return;

      var panel = document.createElement("div");
      panel.hidden = true;
      panel.setAttribute("data-static-mobile-menu", "");
      panel.style.cssText = "position:absolute;top:100%;left:0;right:0;z-index:80;background:#2b2b2b;padding:16px 24px 24px;border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 18px 40px rgba(0,0,0,.42);";

      var links = document.createElement("div");
      links.style.cssText = "display:flex;flex-direction:column;gap:10px;";
      nav.querySelectorAll("a").forEach(function (a) {
        var clone = a.cloneNode(true);
        clone.className = "";
        clone.style.cssText = "display:flex;align-items:center;min-height:48px;padding:0 4px;color:#f5f5f5;font-size:18px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;";
        links.appendChild(clone);
      });

      var cta = header.querySelector('a[href*="doordesigner"]');
      if (cta) {
        var ctaClone = cta.cloneNode(true);
        ctaClone.className = "";
        ctaClone.style.cssText = "display:flex;align-items:center;justify-content:center;gap:8px;margin-top:18px;min-height:52px;border-radius:8px;background:#ebd346;color:#2b2b2b;font-weight:800;";
        links.appendChild(ctaClone);
      }

      panel.appendChild(links);
      header.appendChild(panel);

      var originalIcon = button.innerHTML;
      var closeIcon = makeIcon('<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>');

      function openMenu() {
        panel.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.innerHTML = closeIcon;
        document.documentElement.style.overflow = "hidden";
      }
      function closeMenu() {
        panel.hidden = true;
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = originalIcon;
        document.documentElement.style.overflow = "";
      }
      button.addEventListener("click", function() {
        if (panel.hidden) openMenu();
        else closeMenu();
      });
      panel.addEventListener("click", function (event) {
        if (event.target.tagName === "A" || event.target.closest("a")) closeMenu();
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !panel.hidden) closeMenu();
      });
    });
  }

  function setupFaq() {
    var lang = locale();
    document.querySelectorAll('button[aria-label="Frequently Asked Questions"], button[aria-label="Häufig gestellte Fragen"]').forEach(function (button) {
      if (button.dataset.staticReady) return;
      button.dataset.staticReady = "true";
      button.addEventListener("click", function () {
        var existing = document.querySelector("[data-static-faq]");
        if (existing) {
          existing.remove();
          button.setAttribute("aria-expanded", "false");
          return;
        }

        var copy = text[lang];
        var overlay = document.createElement("div");
        overlay.setAttribute("data-static-faq", "");
        overlay.style.cssText = "position:fixed;inset:0;z-index:90;background:transparent;pointer-events:none;";

        var dialog = document.createElement("section");
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-label", copy.faqTitle);
        dialog.style.cssText = "position:absolute;right:16px;bottom:92px;width:min(380px,calc(100vw - 32px));max-height:min(70vh,520px);overflow:auto;border:1px solid rgba(235,211,70,.28);border-radius:12px;background:#2b2b2b;color:#f5f5f5;padding:18px;box-shadow:0 18px 46px rgba(0,0,0,.42);pointer-events:auto;";

        var items = copy.questions.map(function (q) {
          return '<details style="border-top:1px solid rgba(255,255,255,.12);padding:14px 0;"><summary style="cursor:pointer;font-weight:700;">' + q[0] + '</summary><p style="margin-top:10px;color:#cfcfcf;line-height:1.55;">' + q[1] + "</p></details>";
        }).join("");

        dialog.innerHTML =
          '<div style="display:flex;align-items:start;justify-content:space-between;gap:16px;margin-bottom:10px;"><div><h2 style="font-size:18px;font-weight:800;margin:0 0 5px;">' +
          copy.faqTitle +
          '</h2><p style="margin:0;color:#b0b0b0;font-size:13px;line-height:1.45;">' +
          copy.faqIntro +
          '</p></div><button type="button" data-static-faq-close aria-label="' + copy.close + '" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#3a3a3a;color:#f5f5f5;flex:0 0 auto;">' +
          makeIcon('<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>') +
          "</button></div>" +
          items +
          '<a href="/' + lang + '/kontakt/" style="display:flex;align-items:center;justify-content:center;margin-top:16px;min-height:48px;border-radius:8px;background:#ebd346;color:#2b2b2b;font-weight:800;">' + copy.contact + "</a>";

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        function closeFaq() {
          overlay.remove();
          button.setAttribute("aria-expanded", "false");
        }
        button.setAttribute("aria-expanded", "true");
        overlay.addEventListener("click", function (event) {
          if (event.target.closest("[data-static-faq-close]")) closeFaq();
        });
        document.addEventListener("click", function outsideClick(event) {
          if (!document.body.contains(overlay)) {
            document.removeEventListener("click", outsideClick);
            return;
          }
          if (event.target === button || button.contains(event.target) || dialog.contains(event.target)) return;
          closeFaq();
          document.removeEventListener("click", outsideClick);
        });
        document.addEventListener("keydown", function esc(event) {
          if (event.key === "Escape") {
            closeFaq();
            document.removeEventListener("keydown", esc);
          }
        });
      });
    });
  }

  function setupLanguageButtons() {
    // Equivalent route slugs between EN and DE
    var routeMap = {
      en: { "kontakt": "kontakt", "galerie": "galerie", "produkte": "produkte", "ueber-uns": "ueber-uns", "turen": "turen", "solidwood": "solidwood", "living-rooms": "living-rooms", "impressum": "impressum", "datenschutz": "datenschutz", "about": "ueber-uns", "contact": "kontakt" },
      de: { "kontakt": "kontakt", "galerie": "galerie", "produkte": "produkte", "ueber-uns": "ueber-uns", "turen": "turen", "solidwood": "solidwood", "living-rooms": "living-rooms", "impressum": "impressum", "datenschutz": "datenschutz", "about": "ueber-uns", "contact": "kontakt" }
    };

    document.querySelectorAll('button[aria-label="Deutsch"], button[aria-label="English"]').forEach(function (button) {
      if (button.dataset.staticReady) return;
      button.dataset.staticReady = "true";
      button.addEventListener("click", function () {
        var target = button.getAttribute("aria-label") === "Deutsch" ? "de" : "en";
        var current = locale();
        if (target === current) return;

        var path = location.pathname;
        var prefix = "/" + current + "/";
        var newPath = "/" + target + "/";

        if (path.indexOf(prefix) === 0) {
          // Strip the locale prefix and get the rest of the path
          var rest = path.slice(prefix.length);
          // Get the first slug segment
          var slug = rest.split("/")[0];
          var subPath = rest.indexOf("/") > -1 ? rest.slice(rest.indexOf("/")) : "/";
          // Map the slug to the target locale equivalent
          var mapped = (routeMap[current] && routeMap[current][slug]) ? routeMap[current][slug] : slug;
          newPath = "/" + target + "/" + (mapped ? mapped + subPath : "");
        }

        // Ensure trailing slash
        if (newPath.slice(-1) !== "/") newPath += "/";
        location.href = newPath + location.search + location.hash;
      });
    });
  }

  function setupSocialLinks() {
    var socialSelectors = [
      'a[aria-label="Facebook"]',
      'a[aria-label="Instagram"]',
      'a[aria-label="LinkedIn"]'
    ];
    socialSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (link) {
        if (link.dataset.staticSocialReady) return;
        link.dataset.staticSocialReady = "true";
        // Visually dim the link
        link.style.opacity = "0.4";
        link.style.cursor = "default";
        link.style.pointerEvents = "auto";
        link.removeAttribute("href");
        link.setAttribute("title", locale() === "de" ? "Demnächst verfügbar" : "Coming soon");
        link.addEventListener("click", function (event) {
          event.preventDefault();
          // Show brief tooltip
          var existing = document.querySelector("[data-social-tooltip]");
          if (existing) return;
          var tooltip = document.createElement("span");
          tooltip.setAttribute("data-social-tooltip", "");
          tooltip.textContent = locale() === "de" ? "Demnächst verfügbar" : "Coming soon";
          tooltip.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#2b2b2b;color:#f5f5f5;font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.15);z-index:200;pointer-events:none;white-space:nowrap;";
          document.body.appendChild(tooltip);
          setTimeout(function () { tooltip.remove(); }, 2200);
        });
      });
    });
  }

  function setupHeroSlides() {
    document.querySelectorAll('button[aria-label^="Go to slide"]').forEach(function (button) {
      if (button.dataset.staticReady) return;
      var controls = button.parentElement;
      var section = controls && controls.closest("section");
      var track = section && section.querySelector(".flex.h-full");
      if (!controls || !track) return;
      var buttons = Array.prototype.slice.call(controls.querySelectorAll('button[aria-label^="Go to slide"]'));
      buttons.forEach(function (btn, index) {
        btn.dataset.staticReady = "true";
        btn.addEventListener("click", function () {
          track.style.transition = "transform .35s ease";
          track.style.transform = "translateX(-" + index * 100 + "%)";
          buttons.forEach(function (b, i) {
            b.setAttribute("aria-current", i === index ? "true" : "false");
            b.style.width = i === index ? "2rem" : ".625rem";
            b.style.backgroundColor = i === index ? "#ebd346" : "rgba(255,255,255,.3)";
          });
        });
      });
    });
  }

  function setupReviewSelectors() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('button[aria-label]')).filter(function (button) {
      return button.querySelector("img") && button.closest("section") && button.closest("section").querySelector("blockquote");
    });
    buttons.forEach(function (button) {
      if (button.dataset.staticReady) return;
      button.dataset.staticReady = "true";
      button.addEventListener("click", function () {
        var section = button.closest("section");
        var title = section.querySelector("h3.text-accent");
        var quote = section.querySelector("blockquote");
        var name = button.getAttribute("aria-label") || "";
        if (title) title.textContent = name;
        if (quote) quote.textContent = locale() === "de" ? "Gute Kommunikation und saubere Arbeit." : "Clear communication and clean workmanship.";
        buttons.forEach(function (b) {
          var wrap = b.querySelector("div");
          b.style.width = "";
          b.style.height = "";
          if (wrap) wrap.style.opacity = b === button ? "1" : ".7";
        });
      });
    });
  }

  function setupWhatsappEnquiry() {
    document.querySelectorAll('a[href*="wa.me/4917662161501"]').forEach(function (link) {
      if (link.dataset.staticWhatsappReady) return;
      link.dataset.staticWhatsappReady = "true";
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openWhatsappEnquiry(link.href);
      });
    });
  }

  function openWhatsappEnquiry(originalHref) {
    var lang = locale();
    var copy = text[lang];
    var existing = document.querySelector("[data-static-whatsapp-enquiry]");
    if (existing) existing.remove();

    var isMobile = window.matchMedia("(max-width: 767px)").matches;
    var overlay = document.createElement("div");
    overlay.setAttribute("data-static-whatsapp-enquiry", "");
    overlay.style.cssText = "position:fixed;inset:0;z-index:95;background:rgba(0,0,0,.68);display:flex;align-items:" + (isMobile ? "flex-end" : "center") + ";justify-content:center;padding:" + (isMobile ? "0" : "20px") + ";overflow:visible;";

    var panel = document.createElement("section");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", copy.enquiryTitle);
    panel.style.cssText = "width:" + (isMobile ? "100%" : "min(720px,calc(100vw - 40px))") + ";min-height:" + (isMobile ? "94vh" : "auto") + ";max-height:" + (isMobile ? "96vh" : "calc(100vh - 40px)") + ";overflow:visible;border:1px solid rgba(255,255,255,.14);border-radius:" + (isMobile ? "18px 18px 0 0" : "14px") + ";background:#2b2b2b;color:#f5f5f5;padding:" + (isMobile ? "18px" : "26px") + ";box-shadow:0 20px 60px rgba(0,0,0,.45);";

    panel.innerHTML =
      '<div style="display:flex;align-items:start;justify-content:space-between;gap:16px;margin-bottom:' + (isMobile ? "12px" : "16px") + ';">' +
      '<div><h2 style="font-size:' + (isMobile ? "21px" : "24px") + ';font-weight:800;margin:0 0 6px;">' + copy.enquiryTitle + '</h2>' +
      '<p style="margin:0;color:#b0b0b0;line-height:1.45;font-size:' + (isMobile ? "14px" : "16px") + ';">' + copy.enquiryIntro + '</p></div>' +
      '<button type="button" data-static-whatsapp-close aria-label="' + copy.close + '" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#3a3a3a;color:#f5f5f5;flex:0 0 auto;">' +
      makeIcon('<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>') +
      '</button></div>' +
      '<form data-static-whatsapp-form style="display:grid;gap:' + (isMobile ? "9px" : "12px") + ';">' +
      field(copy.name, '<input name="name" required autocomplete="name" style="' + inputStyle() + '">') +
      field(copy.contactField, '<input name="contact" required autocomplete="tel" style="' + inputStyle() + '">') +
      field(copy.service, brandedServiceDropdown(copy)) +
      field(copy.message, '<textarea name="message" required rows="' + (isMobile ? "3" : "4") + '" style="' + inputStyle() + 'resize:vertical;"></textarea>') +
      '<button type="submit" style="min-height:52px;border-radius:8px;background:#ebd346;color:#2b2b2b;font-weight:800;font-size:16px;">' + copy.sendWhatsapp + '</button>' +
      '</form>';

    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    document.documentElement.style.overflow = "hidden";

    function closeEnquiry() {
      overlay.remove();
      document.documentElement.style.overflow = "";
    }

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay || event.target.closest("[data-static-whatsapp-close]")) closeEnquiry();
    });

    panel.querySelector("[data-static-whatsapp-form]").addEventListener("submit", function (event) {
      event.preventDefault();
      var form = event.currentTarget;
      var data = new FormData(form);
      var message = buildWhatsappMessage(lang, data);
      var url = "https://wa.me/4917662161501?text=" + encodeURIComponent(message);
      closeEnquiry();
      window.open(url || originalHref, "_blank", "noopener");
    });

    var firstInput = panel.querySelector("input, select, textarea");
    if (firstInput && !isMobile) firstInput.focus();
    setupBrandedDropdown(panel);
  }

  function field(label, control) {
    return '<label style="display:grid;gap:6px;font-weight:700;color:#f5f5f5;">' +
      '<span style="font-size:13px;">' + label + '</span>' + control + '</label>';
  }

  function inputStyle() {
    return "width:100%;min-height:44px;border:1px solid rgba(255,255,255,.18);border-radius:8px;background:#242424;color:#f5f5f5;padding:10px 12px;outline:none;";
  }

  function brandedServiceDropdown(copy) {
    var first = copy.serviceOptions[0];
    var options = copy.serviceOptions.map(function (option, index) {
      return '<button type="button" role="option" aria-selected="' + (index === 0 ? "true" : "false") + '" data-static-option="' + option + '" style="width:100%;min-height:42px;padding:0 14px;text-align:left;color:#f5f5f5;background:' + (index === 0 ? "rgba(235,211,70,.16)" : "transparent") + ';font-weight:800;border-left:3px solid ' + (index === 0 ? "#ebd346" : "transparent") + ';">' + option + '</button>';
    }).join("");
    return '<div data-static-dropdown style="position:relative;">' +
      '<input type="hidden" name="service" value="' + first + '">' +
      '<button type="button" data-static-dropdown-trigger aria-haspopup="listbox" aria-expanded="false" style="' + inputStyle() + 'display:flex;align-items:center;justify-content:space-between;gap:12px;font-weight:800;border-color:#ebd34680;background:linear-gradient(180deg,#303030,#242424);box-shadow:inset 0 0 0 1px rgba(235,211,70,.08);">' +
      '<span style="display:flex;align-items:center;gap:10px;min-width:0;"><span aria-hidden="true" style="width:9px;height:9px;border-radius:999px;background:#ebd346;box-shadow:0 0 0 4px rgba(235,211,70,.14);flex:0 0 auto;"></span><span data-static-dropdown-label style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + first + '</span></span>' +
      '<span data-static-dropdown-chevron style="display:flex;color:#ebd346;transition:transform .18s ease;">' + makeIcon('<path d="m6 9 6 6 6-6"></path>') + '</span>' +
      '</button>' +
      '<div data-static-dropdown-menu role="listbox" hidden style="position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:20;overflow:hidden;border:1px solid #ebd34680;border-radius:10px;background:#202020;box-shadow:0 18px 40px rgba(0,0,0,.42);padding:6px 0;">' + options + '</div>' +
      '</div>';
  }

  function setupBrandedDropdown(root) {
    root.querySelectorAll("[data-static-dropdown]").forEach(function (dropdown) {
      var trigger = dropdown.querySelector("[data-static-dropdown-trigger]");
      var menu = dropdown.querySelector("[data-static-dropdown-menu]");
      var label = dropdown.querySelector("[data-static-dropdown-label]");
      var input = dropdown.querySelector('input[type="hidden"]');
      var chevron = dropdown.querySelector("[data-static-dropdown-chevron]");
      if (!trigger || !menu || !label || !input) return;
      function setOpen(open) {
        if (open) {
          var rect = trigger.getBoundingClientRect();
          var spaceBelow = window.innerHeight - rect.bottom;
          var spaceAbove = rect.top;
          var shouldOpenUp = spaceBelow < 280 && spaceAbove > spaceBelow;
          menu.style.top = shouldOpenUp ? "auto" : "calc(100% + 6px)";
          menu.style.bottom = shouldOpenUp ? "calc(100% + 6px)" : "auto";
        }
        menu.hidden = !open;
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
        if (chevron) chevron.style.transform = open ? "rotate(180deg)" : "";
      }
      trigger.addEventListener("click", function () {
        setOpen(menu.hidden);
      });
      menu.querySelectorAll("[data-static-option]").forEach(function (option) {
        option.addEventListener("mouseenter", function () {
          if (option.getAttribute("aria-selected") !== "true") option.style.background = "rgba(255,255,255,.07)";
        });
        option.addEventListener("mouseleave", function () {
          if (option.getAttribute("aria-selected") !== "true") option.style.background = "transparent";
        });
        option.addEventListener("click", function () {
          input.value = option.dataset.staticOption;
          label.textContent = option.dataset.staticOption;
          menu.querySelectorAll("[data-static-option]").forEach(function (item) {
            var selected = item === option;
            item.setAttribute("aria-selected", selected ? "true" : "false");
            item.style.background = selected ? "rgba(235,211,70,.16)" : "transparent";
            item.style.borderLeftColor = selected ? "#ebd346" : "transparent";
          });
          setOpen(false);
        });
      });
      document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
          setOpen(false);
        }
      });
    });
  }

  function buildWhatsappMessage(lang, data) {
    var labels = text[lang];
    var prefix = lang === "de" ? "Neue Anfrage von der TAT Bau Website" : "New enquiry from the TAT Bau website";
    return [
      prefix,
      "",
      labels.name + ": " + (data.get("name") || ""),
      labels.contactField + ": " + (data.get("contact") || ""),
      labels.service + ": " + (data.get("service") || ""),
      labels.message + ": " + (data.get("message") || ""),
      "",
      "Page: " + location.href
    ].join("\n");
  }

  function setupGalleryLightbox() {
    var heading = document.querySelector("main h1");
    if (!heading || !/^(Gallery|Galerie)$/.test(heading.textContent.trim())) return;
    document.addEventListener("click", function (event) {
      var button = event.target.closest("main button");
      if (!button || !button.querySelector("img") || !button.querySelector("span")) return;
      var galleryButtons = Array.prototype.slice.call(document.querySelectorAll("main button")).filter(function (item) {
        return item.querySelector("img") && item.querySelector("span");
      });
      var index = galleryButtons.indexOf(button);
      if (index < 0) return;
      event.preventDefault();
      openGalleryLightbox(galleryButtons, index);
    });
  }

  function openGalleryLightbox(items, startIndex) {
    var index = startIndex;
    var zoom = 1;

    // Build overlay — use explicit top/left/right/bottom instead of inset shorthand
    // and flex column instead of grid for reliable mobile height propagation
    var overlay = document.createElement("div");
    overlay.setAttribute("data-static-gallery", "");
    overlay.style.position   = "fixed";
    overlay.style.top        = "0";
    overlay.style.left       = "0";
    overlay.style.right      = "0";
    overlay.style.bottom     = "0";
    overlay.style.width      = "100%";
    overlay.style.height     = "100%";
    overlay.style.zIndex     = "9999";
    overlay.style.background = "rgba(0,0,0,.94)";
    overlay.style.display    = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.color      = "#f5f5f5";
    overlay.style.boxSizing  = "border-box";

    // Header — fixed height, never shrinks
    var header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.12);flex:0 0 auto;box-sizing:border-box;width:100%;min-width:0;";
    header.innerHTML =
      '<div style="min-width:0;flex:1 1 auto;">' +
        '<strong data-gallery-title style="display:block;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></strong>' +
        '<div data-gallery-count style="color:#b0b0b0;font-size:11px;margin-top:1px;"></div>' +
      '</div>' +
      '<div style="display:flex;gap:6px;flex:0 0 auto;">' +
        galleryButton("data-gallery-zoom-out", "Zoom out",  '<path d="M5 12h14"></path>') +
        galleryButton("data-gallery-zoom-in",  "Zoom in",   '<path d="M5 12h14"></path><path d="M12 5v14"></path>') +
        galleryButton("data-gallery-reset",    "Reset zoom",'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>') +
        galleryButton("data-gallery-close",    "Close",     '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>') +
      '</div>';

    // Viewer — flex:1 takes all remaining height; min-height:0 is CRITICAL for
    // percentage heights to resolve inside a flex child
    var viewerWrap = document.createElement("div");
    viewerWrap.style.cssText = "position:relative;flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden;box-sizing:border-box;width:100%;";
    viewerWrap.innerHTML =
      '<button type="button" data-gallery-prev aria-label="Previous image" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);z-index:2;width:40px;height:40px;border-radius:999px;background:rgba(40,40,40,.9);color:#f5f5f5;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + makeIcon('<path d="m15 18-6-6 6-6"></path>') + '</button>' +
      '<img data-gallery-image alt="" style="display:block;max-width:calc(100% - 100px);max-height:100%;width:auto;height:auto;object-fit:contain;transition:transform .18s ease;transform-origin:center;cursor:zoom-in;">' +
      '<button type="button" data-gallery-next aria-label="Next image" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:2;width:40px;height:40px;border-radius:999px;background:rgba(40,40,40,.9);color:#f5f5f5;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + makeIcon('<path d="m9 18 6-6-6-6"></path>') + '</button>';

    // Thumbs strip — fixed height, never shrinks
    var thumbsBar = document.createElement("div");
    thumbsBar.style.cssText = "flex:0 0 auto;border-top:1px solid rgba(255,255,255,.12);box-sizing:border-box;width:100%;";
    thumbsBar.innerHTML = '<div data-gallery-thumbs style="display:flex;gap:6px;overflow-x:auto;padding:8px 12px;-webkit-overflow-scrolling:touch;"></div>';

    overlay.appendChild(header);
    overlay.appendChild(viewerWrap);
    overlay.appendChild(thumbsBar);
    document.body.appendChild(overlay);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    function render() {
      var item = items[index];
      var img = item.querySelector("img");
      var caption = item.querySelector("span");
      var galleryImg = viewerWrap.querySelector("[data-gallery-image]");
      zoom = Math.max(1, Math.min(3, zoom));
      galleryImg.src = img.getAttribute("src");
      galleryImg.alt = img.getAttribute("alt") || "";
      galleryImg.style.transform = "scale(" + zoom + ")";
      galleryImg.style.cursor = zoom > 1 ? "zoom-out" : "zoom-in";
      header.querySelector("[data-gallery-title]").textContent = (caption && caption.textContent.trim()) || galleryImg.alt || "Gallery image";
      header.querySelector("[data-gallery-count]").textContent = (index + 1) + " / " + items.length;
      renderThumbs();
    }
    function renderThumbs() {
      var thumbs = thumbsBar.querySelector("[data-gallery-thumbs]");
      thumbs.innerHTML = items.map(function (item, itemIndex) {
        var img = item.querySelector("img");
        var active = itemIndex === index;
        return '<button type="button" data-gallery-thumb="' + itemIndex + '" aria-label="Show image ' + (itemIndex + 1) + '" style="width:56px;height:42px;flex:0 0 auto;border-radius:6px;overflow:hidden;border:2px solid ' + (active ? "#ebd346" : "rgba(255,255,255,.18)") + ';opacity:' + (active ? "1" : ".6") + ';background:#242424;padding:0;"><img alt="" src="' + img.getAttribute("src") + '" style="width:100%;height:100%;object-fit:cover;display:block;"></button>';
      }).join("");
      var activeThumb = thumbs.querySelector('[data-gallery-thumb="' + index + '"]');
      if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    function close() {
      overlay.remove();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
    function next(delta) {
      index = (index + delta + items.length) % items.length;
      zoom = 1;
      render();
    }
    function onKey(event) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next(1);
      if (event.key === "ArrowLeft") next(-1);
      if (event.key === "+" || event.key === "=") { zoom += 0.25; render(); }
      if (event.key === "-") { zoom -= 0.25; render(); }
    }

    // Touch swipe support
    var touchStartX = 0;
    var touchStartY = 0;
    viewerWrap.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    viewerWrap.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].screenX - touchStartX;
      var dy = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) next(dx < 0 ? 1 : -1);
    }, { passive: true });

    header.querySelector("[data-gallery-close]").addEventListener("click", close);
    viewerWrap.querySelector("[data-gallery-next]").addEventListener("click", function () { next(1); });
    viewerWrap.querySelector("[data-gallery-prev]").addEventListener("click", function () { next(-1); });
    header.querySelector("[data-gallery-zoom-in]").addEventListener("click",  function () { zoom += 0.25; render(); });
    header.querySelector("[data-gallery-zoom-out]").addEventListener("click", function () { zoom -= 0.25; render(); });
    header.querySelector("[data-gallery-reset]").addEventListener("click",    function () { zoom = 1; render(); });
    viewerWrap.querySelector("[data-gallery-image]").addEventListener("click", function () {
      zoom = zoom > 1 ? 1 : 2;
      render();
    });
    thumbsBar.addEventListener("click", function (event) {
      var thumb = event.target.closest("[data-gallery-thumb]");
      if (!thumb) return;
      index = Number(thumb.getAttribute("data-gallery-thumb")) || 0;
      zoom = 1;
      render();
    });
    document.addEventListener("keydown", onKey);
    render();
  }

  function galleryButton(attr, label, icon) {
    return '<button type="button" ' + attr + ' aria-label="' + label + '" style="width:40px;height:40px;border-radius:8px;background:#3a3a3a;color:#f5f5f5;display:flex;align-items:center;justify-content:center;">' + makeIcon(icon) + '</button>';
  }

  ready(function () {
    setupMobileMenu();
    setupFaq();
    setupLanguageButtons();
    setupHeroSlides();
    setupReviewSelectors();
    setupWhatsappEnquiry();
    setupGalleryLightbox();
    setupSocialLinks();
  });
}());
