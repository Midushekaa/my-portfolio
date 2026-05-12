document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Header and Back to Top scroll effects
  const header = document.querySelector('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.style.padding = '15px 80px';
      header.style.background = 'rgba(2, 6, 23, 0.98)';
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.padding = '20px 80px';
      header.style.background = 'rgba(2, 6, 23, 0.8)';
      header.style.boxShadow = 'none';
    }

    // Back to top visibility
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Skill bar animation with Intersection Observer
  const skillLevels = document.querySelectorAll('.skill-level');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-percent');
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          bar.style.width = targetWidth;
        }, 100);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillLevels.forEach(level => skillObserver.observe(level));

  // Image Modal Logic
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".project-box img").forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modalImg.src = img.src;
      captionText.textContent = img.alt || "";
    });
  });

  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
  }

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
});
