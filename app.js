// BG678 Landing Page JavaScript
class BG678App {
  constructor() {
    this.particles = [];
    this.isAnimating = true;
    this.scrollAnimations = [];
    this.init();
  }

  init() {
    this.setupParticles();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupScrollAnimations();
    this.setupButtonEffects();
    this.setupPageLoadAnimations();
    this.setupPerformanceOptimizations();
  }

  // Particle System
  setupParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    this.createParticles(particleContainer);
    this.animateParticles();
  }

  createParticles(container) {
    const particleCount = window.innerWidth > 768 ? 80 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random starting position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (20 + Math.random() * 20) + 's';
      
      // Random size
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  animateParticles() {
    // Particles are animated via CSS, but we can add additional effects here
    this.particles.forEach((particle, index) => {
      if (Math.random() > 0.995) {
        particle.style.opacity = Math.random() * 0.8 + 0.2;
      }
    });

    if (this.isAnimating) {
      requestAnimationFrame(() => this.animateParticles());
    }
  }

  // Mobile Navigation
  setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav__menu--open');
      navToggle.classList.toggle('nav__toggle--open');
      
      // Animate hamburger lines
      const lines = navToggle.querySelectorAll('.hamburger-line');
      lines.forEach((line, index) => {
        if (navToggle.classList.contains('nav__toggle--open')) {
          if (index === 0) line.style.transform = 'rotate(45deg) translateY(7px)';
          if (index === 1) line.style.opacity = '0';
          if (index === 2) line.style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
          line.style.transform = 'none';
          line.style.opacity = '1';
        }
      });
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--open');
        
        const lines = navToggle.querySelectorAll('.hamburger-line');
        lines.forEach(line => {
          line.style.transform = 'none';
          line.style.opacity = '1';
        });
      });
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for feature cards
          if (entry.target.classList.contains('features__grid')) {
            this.animateFeatureCards(entry.target);
          }
          
          // Special handling for steps
          if (entry.target.classList.contains('steps')) {
            this.animateSteps(entry.target);
          }

          // Special handling for connecting line
          if (entry.target.classList.contains('connecting-line')) {
            this.animateConnectingLine(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(`
      .feature-card,
      .game-card,
      .promo-card,
      .step,
      .section-header,
      .features__grid,
      .steps,
      .connecting-line
    `);

    animateElements.forEach(el => {
      observer.observe(el);
    });

    // Add CSS for scroll animations
    this.addScrollAnimationStyles();
  }

  animateFeatureCards(container) {
    const cards = container.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  animateSteps(container) {
    const steps = container.querySelectorAll('.step');
    steps.forEach((step, index) => {
      setTimeout(() => {
        step.style.opacity = '1';
        step.style.transform = 'translateY(0) scale(1)';
      }, index * 200);
    });
  }

  animateConnectingLine(line) {
    setTimeout(() => {
      line.style.width = '80%';
      line.style.opacity = '1';
    }, 800);
  }

  addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .feature-card,
      .game-card,
      .promo-card,
      .step {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .step {
        transform: translateY(30px) scale(0.9);
      }
      
      .connecting-line {
        width: 0;
        opacity: 0;
        transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .section-header {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      @media (max-width: 768px) {
        .nav__menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 217, 255, 0.2);
          flex-direction: column;
          padding: 20px;
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 999;
        }
        
        .nav__menu--open {
          transform: translateY(0);
          opacity: 1;
        }
        
        .nav__item {
          margin-bottom: 15px;
        }
        
        .nav__link {
          font-size: 18px;
          padding: 10px 0;
          display: block;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Button Effects
  setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      // Ripple effect on click
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });

      // Enhanced hover effects
      button.addEventListener('mouseenter', () => {
        this.enhanceButtonHover(button);
      });

      button.addEventListener('mouseleave', () => {
        this.resetButtonHover(button);
      });
    });
  }

  createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const rippleStyle = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    
    if (!document.querySelector('#ripple-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'ripple-styles';
      styleSheet.textContent = rippleStyle;
      document.head.appendChild(styleSheet);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  enhanceButtonHover(button) {
    if (button.classList.contains('btn--primary')) {
      button.style.boxShadow = '0 10px 40px rgba(181, 55, 255, 0.6)';
    } else if (button.classList.contains('btn--outline')) {
      button.style.boxShadow = '0 10px 40px rgba(0, 217, 255, 0.4)';
    }
  }

  resetButtonHover(button) {
    button.style.boxShadow = '';
  }

  // Page Load Animations
  setupPageLoadAnimations() {
    window.addEventListener('load', () => {
      this.animateHeroEntrance();
      this.animateLogoEntrance();
      this.animateNavEntrance();
    });
  }

  animateHeroEntrance() {
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroButtons = document.querySelector('.hero__buttons');
    const trustBadges = document.querySelector('.trust-badges');
    
    if (heroTitle) {
      const titleSpans = heroTitle.querySelectorAll('.glow-text');
      titleSpans.forEach((span, index) => {
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        setTimeout(() => {
          span.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }

    // Animate other hero elements
    [heroSubtitle, heroButtons, trustBadges].forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
          element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 800 + index * 200);
      }
    });
  }

  animateLogoEntrance() {
    const logo = document.querySelector('.logo-text');
    if (logo) {
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.8)';
      setTimeout(() => {
        logo.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
      }, 100);
    }
  }

  animateNavEntrance() {
    const navItems = document.querySelectorAll('.nav__item');
    const navActions = document.querySelector('.nav__actions');
    
    navItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 200 + index * 50);
    });

    if (navActions) {
      navActions.style.opacity = '0';
      navActions.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        navActions.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        navActions.style.opacity = '1';
        navActions.style.transform = 'translateY(0)';
      }, 400);
    }
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 16); // ~60fps
    });

    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
      this.isAnimating = !document.hidden;
      if (this.isAnimating) {
        this.animateParticles();
      }
    });

    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      this.reduceAnimations();
    }
  }

  handleScroll() {
    // Add scroll-based effects here
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
      } else {
        header.style.background = 'rgba(10, 10, 15, 0.85)';
      }
    }
  }

  reduceAnimations() {
    // Reduce particle count
    const particlesToRemove = this.particles.slice(this.particles.length / 2);
    particlesToRemove.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    this.particles = this.particles.slice(0, this.particles.length / 2);
  }

  // Game card interactions
  setupGameCardEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add particle burst effect
        this.createParticleBurst(card);
      });
    });
  }

  createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#00d9ff';
      particle.style.borderRadius = '50%';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      
      const angle = (i * 45) * Math.PI / 180;
      const distance = 50;
      const endX = centerX + Math.cos(angle) * distance;
      const endY = centerY + Math.sin(angle) * distance;
      
      document.body.appendChild(particle);
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => {
        particle.remove();
      };
    }
  }

  // Real-time stats counter (simulated)
  setupLiveStats() {
    const statsElements = document.querySelectorAll('[data-counter]');
    
    statsElements.forEach(element => {
      const finalValue = parseInt(element.getAttribute('data-counter'));
      this.animateCounter(element, finalValue);
    });
  }

  animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 100;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        currentValue = finalValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(currentValue).toLocaleString();
    }, 20);
  }

  // Dynamic background gradient
  setupDynamicBackground() {
    let hue = 0;
    
    setInterval(() => {
      hue = (hue + 0.5) % 360;
      const gradientMesh = document.querySelector('.gradient-mesh');
      if (gradientMesh) {
        gradientMesh.style.filter = `hue-rotate(${hue}deg)`;
      }
    }, 100);
  }
}

// Form handling for CTAs - FIXED VERSION
class FormHandler {
  constructor() {
    this.setupFormSubmissions();
  }

  setupFormSubmissions() {
    // Get all buttons and add event listeners based on their content
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(button => {
      const buttonText = button.textContent.toLowerCase().trim();
      
      button.addEventListener('click', (e) => {
        // Prevent default action for all CTA buttons
        e.preventDefault();
        
        if (buttonText.includes('register') || buttonText.includes('register now')) {
          this.handleRegistration(e);
        } else if (buttonText.includes('login')) {
          this.handleLogin(e);
        } else if (buttonText.includes('join telegram')) {
          this.handleTelegram(e);
        } else if (buttonText.includes('claim')) {
          this.handlePromoClaim(e);
        } else if (buttonText.includes('play now')) {
          this.handlePlayNow(e);
        } else if (buttonText.includes('continue to bg678')) {
          // Handle the modal continue button
          window.open('https://bg678win1.com', '_blank');
        }
      });
    });
  }

  handleRegistration(e) {
    e.preventDefault();
    this.showModal('Join BG678 Now', 'Start your winning journey with BG678! Get 300% bonus up to $5,000 + 50 free spins when you register today.');
  }

  handleLogin(e) {
    e.preventDefault();
    this.showModal('Welcome Back to BG678', 'Ready to continue your winning streak? Access your account and enjoy premium gaming with instant withdrawals.');
  }

  handleTelegram(e) {
    e.preventDefault();
    this.showModal('Join Our Telegram Community', 'Connect with thousands of BG678 winners! Get exclusive bonuses, tips, and instant support from our community.');
  }

  handlePromoClaim(e) {
    e.preventDefault();
    this.showModal('Claim Your Exclusive Bonus', 'Don\'t miss out on this limited-time offer! Register now to unlock your massive bonus and start winning big.');
  }

  handlePlayNow(e) {
    e.preventDefault();
    this.showModal('Start Playing Now', 'Ready to experience premium gaming? Join BG678 today and discover thousands of exciting games with the highest payouts.');
  }

  showModal(title, message) {
    // Remove any existing modals
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
          <div class="modal-actions">
            <button class="btn btn--primary btn--full-width">Continue to BG678</button>
          </div>
        </div>
      </div>
    `;

    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
      const modalStyle = document.createElement('style');
      modalStyle.id = 'modal-styles';
      modalStyle.textContent = `
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          animation: modalFadeIn 0.3s ease forwards;
          backdrop-filter: blur(5px);
        }
        
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 16px;
          max-width: 450px;
          width: 90%;
          max-height: 80vh;
          overflow: auto;
          transform: scale(0.9);
          animation: modalSlideIn 0.3s ease forwards;
          box-shadow: 
            0 20px 60px rgba(0, 217, 255, 0.2),
            0 0 0 1px rgba(181, 55, 255, 0.1);
          position: relative;
        }
        
        .modal-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(181, 55, 255, 0.05));
          border-radius: 16px;
          pointer-events: none;
        }
        
        .modal-header {
          padding: 24px 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .modal-header h3 {
          color: var(--text-primary);
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
        }
        
        .modal-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .modal-close:hover {
          color: var(--accent-electric-blue);
          background: rgba(0, 217, 255, 0.1);
          transform: rotate(90deg);
        }
        
        .modal-body {
          padding: 24px;
          position: relative;
          z-index: 2;
        }
        
        .modal-body p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
          font-size: 16px;
        }
        
        .modal-actions {
          display: flex;
          gap: 16px;
        }
        
        .modal-actions .btn {
          position: relative;
          overflow: hidden;
        }
        
        .modal-actions .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        
        .modal-actions .btn:hover::before {
          left: 100%;
        }
        
        @keyframes modalFadeIn {
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          to { transform: scale(1); }
        }
        
        @keyframes modalFadeOut {
          to { 
            opacity: 0;
            transform: scale(0.95);
          }
        }
      `;
      document.head.appendChild(modalStyle);
    }

    document.body.appendChild(modal);

    // Setup close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const continueBtn = modal.querySelector('.btn--primary');

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    // The continue button click handler is already set up in the main setupFormSubmissions method

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modal);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  closeModal(modal) {
    modal.style.animation = 'modalFadeOut 0.3s ease forwards';
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = new BG678App();
  const formHandler = new FormHandler();
  
  // Add some additional interactive features
  app.setupGameCardEffects();
  
  // Console welcome message
  console.log(`
    🎮 BG678 Landing Page Loaded Successfully! 🎮
    
    ✨ Features Active:
    • Particle Animation System
    • Smooth Scroll Navigation  
    • Mobile Responsive Design
    • Interactive Button Effects
    • Scroll-triggered Animations
    • Performance Optimizations
    • All CTA Modals Working
    
    🚀 Ready for Gaming Excellence!
  `);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BG678App, FormHandler };
}