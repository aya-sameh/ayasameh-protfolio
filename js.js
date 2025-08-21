document.addEventListener("DOMContentLoaded", () => {
    // القائمة الجانبية (menu)
    const menu = document.getElementById("sidemenu");
    const btn = document.getElementById("menuBtn");
  
    btn.addEventListener("click", () => {
      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
    });
  
    menu.addEventListener("mouseleave", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    });
  
    // أزرار الشريط العلوي
    document.querySelectorAll('.div3 button').forEach(button => {
      button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        if (target) {
          const section = document.querySelector(target);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  
    // أزرار القائمة الجانبية
    document.querySelectorAll('#sidemenu a').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const section = document.querySelector(href);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
          menu.classList.remove("open");
        }
      });
    });
  
    // Resume buttons
    const resumeButtons = document.querySelectorAll(".div_re_btn button");
    const resumeSections = document.querySelectorAll(".div504 .section");
  
    if (resumeSections.length > 0) {
      resumeSections[0].classList.add("active");
      resumeButtons[0].classList.add("active");
    }
  
    // ==== Animation for Skills Section ====
    const skillsSection = document.querySelector(".skills-grid");

    function saveOriginalWidths() {
      if (!skillsSection) return;
      const skillCards = skillsSection.querySelectorAll(".skill-card");
      skillCards.forEach(card => {
        const fill = card.querySelector(".progress-fill");
        if (fill) {
          let percent = fill.getAttribute("data-width") || "0";
          fill.setAttribute("data-target-width", percent + "%");
        }
      });
    }

    function resetSkillCards() {
      if (!skillsSection) return;
      const skillCards = skillsSection.querySelectorAll(".skill-card");
      skillCards.forEach(card => {
        card.classList.remove("visible");
        const fill = card.querySelector(".progress-fill");
        if (fill) fill.style.width = "0%";
      });
    }

    function animateSkillCards() {
      if (!skillsSection) return;
      const skillCards = skillsSection.querySelectorAll(".skill-card");
      skillCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("visible");
          const fill = card.querySelector(".progress-fill");
          if (fill) {
            let percent = fill.getAttribute("data-width") || "0";
            fill.style.width = percent + "%";
          }
        }, 180 * i + 200);
      });
    }

    saveOriginalWidths();
  
    // Intersection Observer
    let lastIntersecting = false;
    let observer;
    if (skillsSection) {
      observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!lastIntersecting) {
              resetSkillCards();
              setTimeout(() => {
                animateSkillCards();
              }, 200);
              lastIntersecting = true;
            }
          } else {
            resetSkillCards();
            lastIntersecting = false;
          }
        });
      }, { threshold: 0.2 });
      observer.observe(skillsSection);
    }
  
    // Resume buttons (للتنقل بين الأقسام داخل Resume)
    resumeButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        resumeButtons.forEach((b) => b.classList.remove("active"));
        resumeSections.forEach((s) => s.classList.remove("active"));
  
        btn.classList.add("active");
        resumeSections[index].classList.add("active");
  
        // Skills section animation on click
        if (index === 0) {
          resetSkillCards();
          saveOriginalWidths();
          setTimeout(() => {
            animateSkillCards();
          }, 200);
        }
      });
    });
  
  });