/* ===================================
   VOLT RACERZ - INTERACTIVE FEATURES
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================
  // SMOOTH SCROLLING
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const animateElements = document.querySelectorAll('.info-card, .value-item, .requirement-item');
  animateElements.forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
  });

  // ===================================
  // HEADER SCROLL EFFECT
  // ===================================
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ===================================
  // DYNAMIC STATS COUNTER
  // ===================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }

  // ===================================
  // REQUIREMENT CARDS INTERACTION
  // ===================================
  const requirementItems = document.querySelectorAll('.requirement-item');
  
  requirementItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0) scale(1)';
    });
  });

  // ===================================
  // LIGHTNING BOLT CURSOR EFFECT (Optional)
  // ===================================
  let cursorTrail = [];
  const maxTrailLength = 10;

  document.addEventListener('mousemove', function(e) {
    // Only create effect on hero and CTA sections
    const isSpecialSection = e.target.closest('.hero, .cta-section');
    if (!isSpecialSection) return;

    const bolt = document.createElement('div');
    bolt.className = 'cursor-bolt';
    bolt.style.left = e.pageX + 'px';
    bolt.style.top = e.pageY + 'px';
    bolt.textContent = '⚡';
    document.body.appendChild(bolt);

    cursorTrail.push(bolt);

    if (cursorTrail.length > maxTrailLength) {
      const oldBolt = cursorTrail.shift();
      oldBolt.remove();
    }

    setTimeout(() => {
      bolt.remove();
      cursorTrail = cursorTrail.filter(b => b !== bolt);
    }, 800);
  });

  // ===================================
  // DYNAMIC GREETING MESSAGE
  // ===================================
  function updateGreeting() {
    const hour = new Date().getHours();
    const heroTitle = document.querySelector('.hero-content h2');
    
    if (heroTitle) {
      let greeting = 'Welcome to Volt Racerz';
      
      if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning, Racer!';
      } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon, Racer!';
      } else if (hour >= 17 && hour < 22) {
        greeting = 'Good Evening, Racer!';
      } else {
        greeting = 'Late Night Racing? Let\'s Go!';
      }
      
      heroTitle.textContent = greeting;
    }
  }

  updateGreeting();

  // ===================================
  // PARALLAX EFFECT ON SCROLL
  // ===================================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .cta-section');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===================================
  // TYPING EFFECT FOR TAGLINE
  // ===================================
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const originalText = tagline.textContent;
    typeWriter(tagline, originalText, 80);
  }

  // ===================================
  // INFO CARDS FLIP EFFECT
  // ===================================
  const infoCards = document.querySelectorAll('.info-card');
  
  infoCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });

  // ===================================
  // REQUIREMENT PROGRESS TRACKER (Demo)
  // ===================================
  function createProgressBar(requirement) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `
      <div class="progress-fill" style="width: 0%"></div>
    `;
    return progressBar;
  }

  // ===================================
  // EASTER EGG: KONAMI CODE
  // ===================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
      alert('⚡ ULTRA VOLT MODE ACTIVATED! ⚡\nYou\'ve unlocked the secret racer power!');
      document.body.style.animation = '';
    }, 100);
  }

  // ===================================
  // PERFORMANCE OPTIMIZATION
  // ===================================
  // Lazy load images if any are added later
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ===================================
  // CONSOLE MESSAGE
  // ===================================
  console.log('%c⚡ VOLT RACERZ ⚡', 'font-size: 30px; font-weight: bold; color: #2563eb;');
  console.log('%cWelcome to the team! Charge up and race fast!', 'font-size: 14px; color: #10b981;');
  console.log('%cTry the Konami code for a surprise! ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #6b7280;');

});

// ===================================
// UTILITY FUNCTIONS
// ===================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
