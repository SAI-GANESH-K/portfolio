/**
 * KORADA SAI GANESH - PORTFOLIO CORE LOGIC
 * Clean Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== 1. TOAST NOTIFICATIONS ====================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, icon = 'fa-circle-check', duration = 3000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => toast.remove(), 280);
    }, duration);
  }

  // ==================== 2. SUBTLE MOUSE SPOTLIGHT ====================
  const spotlight = document.getElementById('mouseSpotlight');
  if (spotlight && window.innerWidth > 992) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  // ==================== 3. SMOOTH FOCUS ROTATOR ANIMATION ====================
  const typedRole = document.getElementById('typedRole');
  const roles = [
    'Computer Science Engineering',
    'AI Proctoring & Vision Pipelines',
    'Multi-Tenant Institutional Platforms',
    'High-Concurrency Systems & Java',
    'Full-Stack Problem Solving'
  ];
  let roleIndex = 0;

  if (typedRole) {
    setInterval(() => {
      typedRole.classList.add('slide-out');
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        typedRole.textContent = roles[roleIndex];
        typedRole.classList.remove('slide-out');
        typedRole.classList.add('slide-in-prep');
        void typedRole.offsetWidth; // Force CSS reflow
        typedRole.classList.remove('slide-in-prep');
      }, 320);
    }, 3000);
  }

  // ==================== 4. NAVBAR SCROLL & ACTIVE LINKS ====================
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 100;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== 5. PROFESSIONAL THEME PALETTES ====================
  const themeBtn = document.getElementById('themeBtn');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-opt');
  const themeLabel = document.querySelector('.theme-label');

  const savedTheme = localStorage.getItem('ksg_prof_theme') || 'charcoal';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  themeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown?.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    themeDropdown?.classList.remove('show');
  });

  themeOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = opt.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ksg_prof_theme', theme);
      updateThemeUI(theme);
      themeDropdown?.classList.remove('show');
      showToast(`Theme set to ${opt.textContent.trim()}`, 'fa-palette');
    });
  });

  function updateThemeUI(theme) {
    themeOptions.forEach(opt => {
      if (opt.getAttribute('data-theme') === theme) {
        opt.classList.add('active');
        if (themeLabel) themeLabel.textContent = opt.textContent.trim();
      } else {
        opt.classList.remove('active');
      }
    });
  }

  // ==================== 6. MOBILE NAVIGATION DRAWER ====================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerResumeBtn = document.getElementById('drawerResumeBtn');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(l => l.addEventListener('click', closeDrawer));

  // ==================== 7. PROJECT FILTERING ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 8. PROJECT SPECIFICATION MODAL ====================
  const projectData = {
    hiretrue: {
      title: 'HIRETRUE',
      tagline: 'Real-Time AI Proctoring & Candidate Verification Engine',
      category: 'AI & Computer Vision',
      status: 'Production Architecture',
      overview: 'HireTrue is an automated academic integrity verification pipeline engineered to prevent proctoring fraud in distributed remote testing. It continuously analyzes high-frame-rate video feeds through lightweight computer vision models to track candidate presence, 3D facial yaw/pitch/roll orientation, and peripheral intrusions without causing frame lag or video buffer overruns.',
      bullets: [
        '3D Facial Landmark Tracking: Computes real-time 3D facial orientation topology to detect candidate gaze excursions exceeding 35 degrees.',
        'Edge-of-Frame Intrusion Detector: Employs optical flow and boundary geometry to flag secondary persons or unauthorized objects stepping into the camera field.',
        'Continuous Presence Monitoring: Employs frame sampling to verify candidate persistence throughout test sessions.',
        'Optimized Python Video Pipeline: Uses asynchronous processing loops and OpenCV frame buffers to operate smoothly with low CPU overhead.'
      ],
      tech: ['Python', 'OpenCV', '3D Face Mesh', 'NumPy', 'Video Streaming', 'Anomaly Detection']
    },
    eduqueue: {
      title: 'EDUQUEUE',
      tagline: 'A Multi College Smart Queue Based Result Distribution Platform',
      category: 'Distributed Multi-Tenant Platform',
      status: 'Scalable Architecture',
      overview: 'EduQueue is an institutional platform designed to solve server downtime during high-volume semester result announcements. By decoupling result queries through an intelligent prioritized queue and multi-tenant schema isolation, colleges can safely serve tens of thousands of simultaneous students while computing weighted SGPA/CGPA on the fly.',
      bullets: [
        'Multi-Tenant Schema Isolation: Secure institutional boundaries ensuring each college\'s student records, grading schemas, and keys remain strictly segregated.',
        'Asynchronous Batch Processing: Parses bulk academic CSV spreadsheets up to 20,000+ rows with background validation and sanitization.',
        'Dynamic SGPA/CGPA Computation: Real-time mathematical calculation engine supporting variable credit distributions and regulation rules.',
        'Role-Based Access Control (RBAC): Differentiated dashboard access for Super Admins, College Exam Cells, Department Heads, and Students.'
      ],
      tech: ['JavaScript', 'Relational SQL', 'MongoDB', 'CSV Batch Processing', 'Multi-Tenancy', 'RBAC Security']
    },
    quizapp: {
      title: 'Quiz Application',
      tagline: 'Real-Time Assessment Engine with Multithreaded Countdown Timer',
      category: 'High Concurrency & Systems',
      status: 'Thread-Safe Engine',
      overview: 'A high-concurrency real-time assessment platform featuring a specialized multithreaded countdown timer engine. Developed to prevent client-side time-tampering in competitive testing environments, the engine enforces strict per-question time limits on isolated background threads, triggering instant auto-submission when timers expire.',
      bullets: [
        'Multithreaded Isolation: Timer logic executes independently from UI rendering threads to eliminate UI blocking or browser throttling.',
        'Zero-Delay Auto-Submission: Automatically serializes current answer states and dispatches evaluation events the millisecond the countdown reaches zero.',
        'Anti-Tampering Enforcement: Client-side clock manipulation safeguards with synchronized timestamp checkpoints.',
        'Per-Question State Machine: Dynamic progression through questions with instant visual indicators and score tallying.'
      ],
      tech: ['Java Multithreading', 'JavaScript', 'HTML5 & CSS3', 'Thread Synchronization', 'Event Queues']
    }
  };

  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalCategoryPill = document.getElementById('modalCategoryPill');
  const modalStatusPill = document.getElementById('modalStatusPill');
  const modalOverview = document.getElementById('modalOverview');
  const modalBullets = document.getElementById('modalBullets');
  const modalTechTags = document.getElementById('modalTechTags');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline;
    if (modalCategoryPill) modalCategoryPill.textContent = data.category;
    if (modalStatusPill) modalStatusPill.textContent = data.status;
    if (modalOverview) modalOverview.textContent = data.overview;

    if (modalBullets) {
      modalBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
    }

    if (modalTechTags) {
      modalTechTags.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    projectModalBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModalBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalDismissBtn?.addEventListener('click', closeProjectModal);

  projectModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === projectModalBackdrop) closeProjectModal();
  });

  // ==================== 9. RESUME MODAL & PRINT ====================
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResumeModal() {
    closeDrawer();
    resumeModalBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    resumeModalBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openResumeBtn?.addEventListener('click', openResumeModal);
  heroResumeBtn?.addEventListener('click', openResumeModal);
  drawerResumeBtn?.addEventListener('click', openResumeModal);
  resumeCloseBtn?.addEventListener('click', closeResumeModal);

  resumeModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === resumeModalBackdrop) closeResumeModal();
  });

  printResumeBtn?.addEventListener('click', () => {
    window.print();
  });




  // ==================== 11. LIVE SKILL SEARCH & FILTER ====================
  const skillSearchInput = document.getElementById('skillSearchInput');
  const clearSkillSearch = document.getElementById('clearSkillSearch');
  const skillChips = document.querySelectorAll('.skill-chip');

  skillSearchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length > 0) {
      clearSkillSearch?.classList.add('show');
    } else {
      clearSkillSearch?.classList.remove('show');
    }

    skillChips.forEach(chip => {
      const skillName = chip.getAttribute('data-skill-name') || '';
      const title = chip.querySelector('.skill-title')?.textContent.toLowerCase() || '';

      if (query === '') {
        chip.classList.remove('highlight', 'dimmed');
      } else if (skillName.includes(query) || title.includes(query)) {
        chip.classList.add('highlight');
        chip.classList.remove('dimmed');
      } else {
        chip.classList.add('dimmed');
        chip.classList.remove('highlight');
      }
    });
  });

  clearSkillSearch?.addEventListener('click', () => {
    if (skillSearchInput) skillSearchInput.value = '';
    clearSkillSearch?.classList.remove('show');
    skillChips.forEach(chip => chip.classList.remove('highlight', 'dimmed'));
  });

  // ==================== 12. CLIPBOARD COPY UTILITIES ====================
  document.querySelectorAll('.c-copy-btn, .copy-phone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || btn.getAttribute('data-phone');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard`, 'fa-copy');
        }).catch(() => {
          showToast('Failed to copy', 'fa-circle-xmark');
        });
      }
    });
  });

  document.querySelectorAll('.copy-project-summary').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const shareText = `Project: ${title} by Korada Sai Ganesh (B.Tech CSE, Lendi Institute - CGPA 9.2).`;
      navigator.clipboard.writeText(shareText).then(() => {
        showToast(`Summary for ${title} copied`, 'fa-copy');
      });
    });
  });

  // ==================== 13. CONTACT FORM SUBMISSION ====================
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName')?.value.trim();
    const email = document.getElementById('userEmail')?.value.trim();
    const subject = document.getElementById('userSubject')?.value.trim();
    const message = document.getElementById('userMessage')?.value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all required fields.', 'fa-circle-exclamation');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'fa-circle-exclamation');
      return;
    }

    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
    }

    setTimeout(() => {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = '<span>Message Sent</span> <i class="fa-solid fa-check"></i>';
      }

      showToast(`Message from ${name} recorded. Thank you.`, 'fa-envelope-circle-check', 4000);
      contactForm.reset();

      setTimeout(() => {
        if (formSubmitBtn) {
          formSubmitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
        }
      }, 2500);
    }, 800);
  });

  // ==================== 14. INTERSECTION OBSERVER FOR FADE-IN ====================
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
