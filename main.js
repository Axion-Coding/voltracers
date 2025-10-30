/* ===================================
   {VLT} VOLT RACERZ - INTERACTIVE JS
   The most electrifying NT team website
   =================================== */

(function() {
  'use strict';

  // ===================================
  // DOM READY
  // ===================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupNavigation();
    setupScrollAnimations();
    setupCounters();
    setupScrollToTop();
    setupParallax();
    setupTypewriter();
    setupEasterEgg();
    logWelcome();
  }

  // ===================================
  // NAVIGATION
  // ===================================
  function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Sticky navbar on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, 100));

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const elements = document.querySelectorAll(`
      .info-card, 
      .value-card, 
      .requirement-card,
      .hero-visual,
      .hero-content
    `);
    
    elements.forEach(el => {
      el.classList.add('fade-in-element');
      observer.observe(el);
    });
  }

  // ===================================
  // ANIMATED COUNTERS
  // ===================================
  function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    let hasAnimated = false;

    const animateCounters = () => {
      if (hasAnimated) return;
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = formatNumber(target);
            clearInterval(timer);
          } else {
            counter.textContent = formatNumber(Math.floor(current));
          }
        }, 16);
      });
      
      hasAnimated = true;
    };

    // Trigger when header stats are in view
    const statsSection = document.querySelector('.header-stats');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(statsSection);
    }
  }

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }

  // ===================================
  // SCROLL TO TOP BUTTON
  // ===================================
  function setupScrollToTop() {
    const scrollBtn = document.getElementById('scrollTop');
    
    if (!scrollBtn) return;

    window.addEventListener('scroll', throttle(() => {
      if (window.pageYOffset > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, 100));

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===================================
  // PARALLAX EFFECT
  // ===================================
  function setupParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .cta-section');
    
    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10));
  }

  // ===================================
  // TYPEWRITER EFFECT
  // ===================================
  function setupTypewriter() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    let index = 0;

    function type() {
      if (index < text.length) {
        tagline.textContent += text.charAt(index);
        index++;
        setTimeout(type, 60);
      }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
  }

  // ===================================
  // INTERACTIVE CARDS
  // ===================================
  const cards = document.querySelectorAll('.info-card, .value-card, .requirement-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ===================================
  // DYNAMIC GREETING
  // ===================================
  function updateGreeting() {
    const hour = new Date().getHours();
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;

    let greeting = 'Welcome to the <span class="text-highlight">Fastest Team</span> on Nitro Type';
    
    if (hour >= 5 && hour < 12) {
      greeting = 'Good Morning, <span class="text-highlight">Future Champion!</span>';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good Afternoon, <span class="text-highlight">Speed Racer!</span>';
    } else if (hour >= 17 && hour < 22) {
      greeting = 'Good Evening, <span class="text-highlight">Elite Racer!</span>';
    } else {
      greeting = 'Late Night Racing? <span class="text-highlight">Let\'s Go!</span>';
    }
    
    heroTitle.innerHTML = greeting;
  }

  // Uncomment to enable dynamic greeting
  // updateGreeting();

  // ===================================
  // EASTER EGG - KONAMI CODE
  // ===================================
  function setupEasterEgg() {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateVoltMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  function activateVoltMode() {
    // Create lightning effect
    const body = document.body;
    body.style.animation = 'none';
    setTimeout(() => {
      body.style.animation = 'rainbow 2s ease-in-out';
    }, 10);

    // Show alert
    setTimeout(() => {
      alert('⚡ ULTRA VOLT MODE ACTIVATED! ⚡\n\nYou\'ve unlocked the secret racer power!\n\nYour speed has been electrified! ⚡⚡⚡');
      body.style.animation = '';
      
      // Add special effect to all cards
      const allCards = document.querySelectorAll('.info-card, .value-card, .requirement-card');
      allCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transform = 'scale(1.1) rotate(2deg)';
          setTimeout(() => {
            card.style.transform = '';
          }, 300);
        }, index * 100);
      });
    }, 100);
  }

  // Rainbow animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      50% { filter: hue-rotate(180deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // ===================================
  // CONSOLE WELCOME
  // ===================================
  function logWelcome() {
    const styles = [
      'font-size: 40px',
      'font-weight: bold',
      'background: linear-gradient(135deg, #0066ff, #00d9ff)',
      'color: white',
      'padding: 20px 40px',
      'border-radius: 10px',
      'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
    ].join(';');

    console.log('%c⚡ VLT VOLT RACERZ ⚡', styles);
    console.log('%c🏁 Welcome to the fastest team on Nitro Type!', 'font-size: 16px; color: #00d9ff; font-weight: bold;');
    console.log('%c💡 Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 14px; color: #6b7280;');
    console.log('%c🔧 Interested in our code? Check out our GitHub!', 'font-size: 12px; color: #10b981;');
  }

  // ===================================
  // UTILITY FUNCTIONS
  // ===================================
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ===================================
  // PERFORMANCE MONITORING
  // ===================================
  window.addEventListener('load', () => {
    // Log page load time
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
  });

})();
