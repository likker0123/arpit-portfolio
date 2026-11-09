/**
 * ARPIT PORTFOLIO - SCRIPT
 * High Performance Vanilla JS for Interactions, Filtering, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------
     1. STICKY HEADER & ACTIVE SECTION HIGHLIGHT
  ---------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow & blur on scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Detection
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ----------------------------------------------------
     2. MOBILE MENU DRAWER
  ---------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  /* ----------------------------------------------------
     3. PORTFOLIO FILTERING
  ---------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ----------------------------------------------------
     4. ANIMATED STATS COUNTER ON SCROLL
  ---------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function outQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(ease * (target - start) + start);

      const formatted = current < 10 ? `0${current}+` : `${current}+`;
      element.textContent = formatted;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        const finalFormatted = target < 10 ? `0${target}+` : `${target}+`;
        element.textContent = finalFormatted;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(stat => countUp(stat));
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  /* ----------------------------------------------------
     5. TESTIMONIAL DOTS INTERACTION
  ---------------------------------------------------- */
  const dots = document.querySelectorAll('.t-dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  /* ----------------------------------------------------
     6. ESC KEY LISTENER TO CLOSE ALL MODALS
  ---------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeProjectModal();
    }
  });

  // Close modals when clicking backdrop
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

});

/* ----------------------------------------------------
   CONTACT MODAL CONTROLS
---------------------------------------------------- */
function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileDrawer) {
    mobileDrawer.classList.remove('active');
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('formStatus');
  const name = document.getElementById('clientName').value;
  
  if (status) {
    status.style.color = '#34d399';
    status.textContent = `Thanks ${name}! Your inquiry has been sent. Arpit will reach out shortly.`;
    
    setTimeout(() => {
      event.target.reset();
      status.textContent = '';
      closeContactModal();
    }, 2200);
  }
}

/* ----------------------------------------------------
   PROJECT LIGHTBOX CONTROLS
---------------------------------------------------- */
function openProjectModal(title, category, imageSrc, description) {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');

  if (modal && modalTitle && modalCategory && modalImg && modalDesc) {
    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalImg.src = imageSrc;
    modalImg.alt = title;
    modalDesc.textContent = description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

