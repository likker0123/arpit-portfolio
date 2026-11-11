/**
 * ARPIT PORTFOLIO - FULL ANIMATION ENGINE
 * High-End Animations: Cosmic Particles, 3D Tilt, Card Spotlights,
 * Magnetic Buttons, Scroll Reveal, Testimonial Carousel & Modal Controls.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================
     1. COSMIC PARTICLES BACKGROUND CANVAS
  ==================================================== */
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 28), 45);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.speedY = -(Math.random() * 0.45 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.006 + 0.002;
        this.growing = Math.random() > 0.5;
        // Subtle purple / indigo / cyan color accents
        const colors = ['168, 85, 247', '139, 92, 246', '192, 132, 252', '6, 182, 212'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.7) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.1) this.growing = true;
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ====================================================
     2. INTERACTIVE CURSOR FOLLOWER & GLOW
  ==================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorDot && cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      // Lerp smoothing for silky movement
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Scale dot on hovering interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .service-card, .stat-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform += ' scale(2.2)';
        cursorDot.style.backgroundColor = 'var(--primary-light)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.backgroundColor = '#ffffff';
      });
    });
  }

  /* ====================================================
     3. CARD SPOTLIGHT EFFECT (Dynamic Cursor Coordinates)
  ==================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ====================================================
     4. 3D TILT EFFECT ON HOVER
  ==================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 860) return; // Skip on mobile for smoothness
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ====================================================
     5. MAGNETIC BUTTON EFFECT
  ==================================================== */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 860) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ====================================================
     6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  ==================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ====================================================
     7. STICKY HEADER & ACTIVE SECTION HIGHLIGHT
  ==================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header Blur on Scroll
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to Top Button Visibility
    if (backToTop) {
      if (scrollY > 450) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Active Section Detection
    let currentSection = '';
    const scrollPos = scrollY + 220;

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

  // Back to Top Click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ====================================================
     8. MOBILE NAVIGATION DRAWER
  ==================================================== */
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

  /* ====================================================
     9. PORTFOLIO FILTERING WITH SMOOTH FADE
  ==================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92) translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ====================================================
     10. ANIMATED STATS COUNTER ON SCROLL
  ==================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1600;
    const start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease out
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
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(stat => countUp(stat));
        }
      });
    }, { threshold: 0.35 });

    statsObserver.observe(statsSection);
  }

  /* ====================================================
     11. TESTIMONIALS SLIDER & DOTS INTERACTION
  ==================================================== */
  const testimonialDots = document.querySelectorAll('.t-dot');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentSlide = 0;

  function switchTestimonial(index) {
    testimonialDots.forEach(d => d.classList.remove('active'));
    testimonialCards.forEach(c => c.classList.remove('active'));

    currentSlide = index;
    if (testimonialDots[currentSlide]) testimonialDots[currentSlide].classList.add('active');
    if (testimonialCards[currentSlide]) testimonialCards[currentSlide].classList.add('active');
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      switchTestimonial(index);
    });
  });

  // Auto-cycle testimonials every 6 seconds
  let testimonialInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % testimonialDots.length;
    switchTestimonial(nextSlide);
  }, 6000);

  const testimonialsContainer = document.querySelector('.testimonials-slider-container');
  if (testimonialsContainer) {
    testimonialsContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialsContainer.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % testimonialDots.length;
        switchTestimonial(nextSlide);
      }, 6000);
    });
  }

  /* ====================================================
     12. ESC KEY LISTENER & BACKDROP CLICK FOR MODALS
  ==================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeProjectModal();
      closeProfileModal();
    }
  });

  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  /* ====================================================
     13. REALISTIC HERO ROPE WITH PULL-TO-OPEN-PROFILE
  ==================================================== */
  (() => {
    const canvas = document.getElementById("hero-rope");
    const hero = document.getElementById("hero");
    const pullHint = document.getElementById("ropePullHint");
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width, height, dpr;
    let points = [];
    let mouseX = 0;

    const segments = 32;
    const gravity = 0.22;
    const stiffness = 0.85;

    let anchorX = 0;
    let anchorY = 0;
    let ropeLength = 280;

    // Interactive Dragging & Pull State
    let isDragging = false;
    let dragStartY = 0;
    let pullDistance = 0;
    const PULL_THRESHOLD = 52; // Pixels needed to trigger profile
    let restingEndY = 0;

    function setup() {
      const rect = hero.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      anchorX = width > 860 ? width * 0.84 : width * 0.80;
      anchorY = 0;
      ropeLength = Math.min(320, height * 0.58);

      points = [];

      for (let i = 0; i <= segments; i++) {
        const y = anchorY + (ropeLength / segments) * i;

        points.push({
          x: anchorX,
          y: y,
          oldX: anchorX,
          oldY: y
        });
      }

      restingEndY = points[segments].y;
      updateHintPosition();
      draw();
    }

    function updateHintPosition() {
      if (!pullHint || points.length === 0) return;
      const end = points[segments];
      // Position pull hint right next to the handle
      pullHint.style.top = `${end.y - 12}px`;
      if (width > 860) {
        pullHint.style.left = `${end.x + 28}px`;
        pullHint.style.right = 'auto';
      }
    }

    function triggerRopeSnap() {
      // Satisfying spring recoil twang
      for (let i = 1; i <= segments; i++) {
        const influence = i / segments;
        points[i].oldY = points[i].y + (24 * influence);
        points[i].oldX = points[i].x + ((Math.random() - 0.5) * 16 * influence);
      }

      if (pullHint) {
        pullHint.classList.add('pulling');
        pullHint.innerHTML = '<span class="hint-pulse-dot"></span><span>Opening Profile... ✦</span>';
      }

      setTimeout(() => {
        openProfileModal();
        if (pullHint) {
          pullHint.classList.remove('pulling');
          pullHint.innerHTML = '<span class="hint-pulse-dot"></span><span>Pull rope to view profile</span><span class="hint-arrow">⇣</span>';
        }
      }, 220);
    }

    function update(time) {
      const wind = reduceMotion ? 0 :
        Math.sin(time * 0.0007) * 0.055 +
        Math.sin(time * 0.0013) * 0.025;

      for (let i = 1; i <= segments; i++) {
        const p = points[i];

        const vx = (p.x - p.oldX) * 0.985;
        const vy = (p.y - p.oldY) * 0.985;

        p.oldX = p.x;
        p.oldY = p.y;

        const influence = i / segments;

        p.x += vx + (wind + mouseX * 0.000018) * influence;
        p.y += vy + gravity;
      }

      // If user is currently dragging the end handle down
      if (isDragging) {
        const end = points[segments];
        end.y = restingEndY + pullDistance;
        end.oldY = end.y;
      }

      // Relaxation iterations for Verlet constraints
      for (let j = 0; j < 5; j++) {
        points[0].x = anchorX;
        points[0].y = anchorY;

        for (let i = 1; i <= segments; i++) {
          const a = points[i - 1];
          const b = points[i];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy) || 1;

          const correction =
            (distance - ropeLength / segments) / distance;

          if (i === 1) {
            b.x -= dx * correction * stiffness;
            b.y -= dy * correction * stiffness;
          } else {
            const ax = dx * correction * stiffness * 0.5;
            const ay = dy * correction * stiffness * 0.5;

            a.x += ax;
            a.y += ay;
            b.x -= ax;
            b.y -= ay;
          }
        }
      }

      if (!isDragging) {
        updateHintPosition();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      if (points.length < 2) return;

      // 1. Rope shadow
      ctx.beginPath();
      ctx.moveTo(points[0].x + 3.5, points[0].y);

      for (let i = 1; i <= segments; i++) {
        ctx.lineTo(points[i].x + 3.5, points[i].y);
      }

      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.stroke();

      // 2. Rope body
      const gradient = ctx.createLinearGradient(
        anchorX - 8, 0, anchorX + 8, ropeLength
      );

      gradient.addColorStop(0, "#d4b58b");
      gradient.addColorStop(0.35, "#795338");
      gradient.addColorStop(0.65, "#c39a69");
      gradient.addColorStop(1, "#60402c");

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i <= segments; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // 3. Rope highlight (specular reflection)
      ctx.beginPath();
      ctx.moveTo(points[0].x - 1.5, points[0].y);

      for (let i = 1; i <= segments; i++) {
        ctx.lineTo(points[i].x - 1.5, points[i].y);
      }

      ctx.strokeStyle = "rgba(255,225,185,0.7)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // 4. Metallic chrome ring & Interactive Pull Handle
      const end = points[segments];
      const isPulledState = pullDistance >= PULL_THRESHOLD;

      ctx.beginPath();
      ctx.arc(end.x, end.y + 8, isDragging ? 9 : 7.5, 0, Math.PI * 2);

      const metal = ctx.createLinearGradient(
        end.x - 8, end.y, end.x + 8, end.y
      );

      metal.addColorStop(0, "#777");
      metal.addColorStop(0.3, "#eee");
      metal.addColorStop(0.5, "#ffffff");
      metal.addColorStop(0.7, "#eee");
      metal.addColorStop(1, "#777");

      ctx.fillStyle = metal;
      ctx.fill();

      ctx.strokeStyle = isPulledState ? "#22c55e" : (isDragging ? "#a855f7" : "rgba(168, 85, 247, 0.6)");
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Hanging weight / glowing metallic tag
      ctx.beginPath();
      ctx.arc(end.x, end.y + 26, isDragging ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isPulledState ? "#22c55e" : "#e2e8f0";
      ctx.shadowBlur = isDragging ? 18 : 10;
      ctx.shadowColor = isPulledState ? "rgba(34, 197, 94, 0.9)" : "rgba(168, 85, 247, 0.85)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // 6. Tactile Pull Label On Ring
      if (isDragging) {
        ctx.font = "bold 11px sans-serif";
        ctx.fillStyle = isPulledState ? "#22c55e" : "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(isPulledState ? "RELEASE! ✦" : "PULL ⇣", end.x, end.y + 44);
      }
    }

    function animate(time) {
      update(time);
      draw();

      if (!reduceMotion) {
        requestAnimationFrame(animate);
      }
    }

    // Check if mouse / touch is near the pull handle
    function isNearHandle(clientX, clientY) {
      if (points.length === 0) return false;
      const rect = hero.getBoundingClientRect();
      const hx = rect.left + points[segments].x;
      const hy = rect.top + points[segments].y + 12;
      return Math.hypot(clientX - hx, clientY - hy) < 45;
    }

    // Pointer Events on Hero
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left - anchorX;

      if (!isDragging) {
        if (isNearHandle(e.clientX, e.clientY)) {
          hero.style.cursor = "grab";
        } else {
          hero.style.cursor = "";
        }
      }
    });

    hero.addEventListener("mouseleave", () => {
      mouseX = 0;
      hero.style.cursor = "";
    });

    // Start Dragging on Handle
    function startPull(clientY) {
      isDragging = true;
      dragStartY = clientY;
      pullDistance = 0;
      restingEndY = points[segments].y;
      hero.style.cursor = "grabbing";
    }

    // Update Dragging
    function movePull(clientY) {
      if (!isDragging) return;
      const rawDelta = clientY - dragStartY;
      // Elastic resistance formula
      pullDistance = Math.max(0, rawDelta * 0.85);

      if (pullHint) {
        if (pullDistance >= PULL_THRESHOLD) {
          pullHint.classList.add('pulling');
          pullHint.innerHTML = '<span class="hint-pulse-dot"></span><span>Release to open profile! ✓</span>';
        } else {
          pullHint.classList.remove('pulling');
          pullHint.innerHTML = '<span class="hint-pulse-dot"></span><span>Keep pulling down... ⇣</span>';
        }
      }
    }

    // End Dragging
    function endPull() {
      if (!isDragging) return;
      isDragging = false;
      hero.style.cursor = "";

      if (pullDistance >= PULL_THRESHOLD) {
        triggerRopeSnap();
      } else {
        if (pullHint) {
          pullHint.classList.remove('pulling');
          pullHint.innerHTML = '<span class="hint-pulse-dot"></span><span>Pull rope to view profile</span><span class="hint-arrow">⇣</span>';
        }
      }
      pullDistance = 0;
    }

    hero.addEventListener("mousedown", (e) => {
      if (isNearHandle(e.clientX, e.clientY)) {
        e.preventDefault();
        startPull(e.clientY);
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (isDragging) {
        movePull(e.clientY);
      }
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        endPull();
      }
    });

    // Touch Support for Mobile
    hero.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0] && isNearHandle(e.touches[0].clientX, e.touches[0].clientY)) {
        startPull(e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches && e.touches[0]) {
        movePull(e.touches[0].clientY);
      } else if (e.touches && e.touches[0]) {
        const rect = hero.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left - anchorX;
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      if (isDragging) {
        endPull();
      }
      mouseX = 0;
    });

    // Also clicking directly on the pullHint triggers the rope pull animation
    if (pullHint) {
      pullHint.style.cursor = "pointer";
      pullHint.style.pointerEvents = "auto";
      pullHint.addEventListener("click", () => {
        triggerRopeSnap();
      });
    }

    window.addEventListener("resize", setup);

    setup();

    if (!reduceMotion) {
      requestAnimationFrame(animate);
    }
  })();

});

/* ====================================================
   CONTACT MODAL CONTROLS
==================================================== */
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
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  
  const name = document.getElementById('clientName').value.trim();
  const email = document.getElementById('clientEmail').value.trim();
  const phone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value.trim() : '';
  const service = document.getElementById('projectType').value;
  const message = document.getElementById('projectMessage').value.trim();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending... ✦';
  }

  if (status) {
    status.style.color = '#c084fc';
    status.textContent = 'Sending inquiry to anshulsingh11110@gmail.com...';
  }

  // Send asynchronously via FormSubmit AJAX API directly to user's Gmail
  fetch("https://formsubmit.co/ajax/anshulsingh11110@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone || 'Not provided',
      service: service,
      message: message,
      _subject: `New Portfolio Inquiry from ${name} - ${service}`
    })
  })
  .then(response => response.json())
  .then(data => {
    if (status) {
      status.style.color = '#34d399';
      status.innerHTML = `✓ Thank you ${name}! Your inquiry has been sent to anshulsingh11110@gmail.com. Arpit will reach out shortly.`;
    }
    if (form) form.reset();
    setTimeout(() => {
      closeContactModal();
      if (status) status.textContent = '';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send to Email ✦';
      }
    }, 3200);
  })
  .catch(error => {
    // Graceful offline / fallback handler
    if (status) {
      status.style.color = '#34d399';
      status.innerHTML = `✓ Thank you ${name}! Opening email & WhatsApp for instant delivery...`;
    }
    // Fallback: Trigger mailto & offer WhatsApp
    const mailtoUrl = `mailto:anshulsingh11110@gmail.com?subject=${encodeURIComponent('Project Inquiry: ' + service + ' from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nService: ' + service + '\n\nDetails:\n' + message)}`;
    window.location.href = mailtoUrl;

    if (form) form.reset();
    setTimeout(() => {
      closeContactModal();
      if (status) status.textContent = '';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send to Email ✦';
      }
    }, 2800);
  });
}

// Instant WhatsApp Sender
function sendViaWhatsApp() {
  const name = document.getElementById('clientName').value.trim() || 'Client';
  const email = document.getElementById('clientEmail').value.trim() || 'Not specified';
  const phone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value.trim() : '';
  const service = document.getElementById('projectType').value;
  const message = document.getElementById('projectMessage').value.trim() || 'I want to discuss a new video project.';

  const text = `Hi Arpit!\n\nI visited your portfolio and want to discuss a project.\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${service}\n\n*Project Details:*\n${message}`;
  
  const waUrl = `https://wa.me/918303287176?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

/* ====================================================
   PROJECT LIGHTBOX CONTROLS
==================================================== */
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

/* ====================================================
   PROFILE DOSSIER MODAL CONTROLS (ROPE TRIGGERED)
==================================================== */
function openProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
