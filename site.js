// Header shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggler
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu on clicking any navigation anchor
  document.querySelectorAll('.mobile-menu-dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// Hero Carousel Banner (Automatic sliding & manual controls)
const slides = document.querySelectorAll('.banner-carousel .banner-items');
const dots = document.querySelectorAll('.carousel-controls .dot');
const counter = document.getElementById('carouselCounter');
const prevBtn = document.getElementById('carouselPrevBtn');
const nextBtn = document.getElementById('carouselNextBtn');
let currentSlide = 0;
const slideIntervalTime = 6000;
let slideInterval;

function showSlide(index) {
  if (!slides.length) return;
  // Loop wrapping
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      if (dots[i]) dots[i].classList.add('active');
    } else {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    }
  });

  // Update counter text
  if (counter) {
    counter.textContent = `0${index + 1} / 0${slides.length}`;
  }
  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlide() {
  showSlide(currentSlide - 1);
}

// Auto autoplay
function startAutoSlide() {
  if (!slides.length) return;
  stopAutoSlide();
  slideInterval = setInterval(nextSlide, slideIntervalTime);
}
function stopAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
}

// Button controls click listeners
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
  });
}
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startAutoSlide();
  });
});

// Init slider
startAutoSlide();

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const header = item.querySelector('.faq-header');
  const content = item.querySelector('.faq-content');

  if (header && content) {
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(el => {
        el.classList.remove('active');
        const c = el.querySelector('.faq-content');
        if (c) c.style.maxHeight = null;
      });

      // Toggle selected item
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }
});

// Scroll reveal animation triggers
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealOnScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -10% 0px'
});

revealElements.forEach(el => {
  revealOnScrollObserver.observe(el);
  // fallback in case observer fails to trigger (or page scroll starts in the middle)
  if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
    el.classList.add('revealed');
  }
});

// Compass graphic pointer interaction parallax
const compassWrappers = document.querySelectorAll('.compass-wrapper');
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 50;
  const y = (window.innerHeight / 2 - e.clientY) / 50;
  compassWrappers.forEach(wrapper => {
    wrapper.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Intercept Formspree form submissions to prevent redirect to formspree.io
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.innerHTML : "Send Message →";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";
    }
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        window.location.href = 'thank-you.html';
      } else {
        alert('There was a problem submitting your form. Please try again.');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }
      }
    } catch (error) {
      alert('There was a connection issue. Please try again.');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    }
  });
}

const checklistForm = document.getElementById('checklistForm');
if (checklistForm) {
  checklistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(checklistForm);
    const submitButton = checklistForm.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.innerHTML : "Submit Assessment →";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Submitting...";
    }
    
    try {
      const response = await fetch(checklistForm.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        window.location.href = 'thank-you.html';
      } else {
        alert('There was a problem submitting your assessment. Please try again.');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }
      }
    } catch (error) {
      alert('There was a connection issue. Please try again.');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    }
  });
}

// Interactive Mind-Blowing 3D Tilt & Spotlight Engine (Desktop width > 991px)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.innerWidth > 991 && !prefersReducedMotion) {
  const tiltElements = document.querySelectorAll('.industry-stat-card, .case-image-item, .stat-item, .solution-grid-item');
  tiltElements.forEach(el => {
    el.style.transformStyle = 'preserve-3d';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.5s ease';
    
    let rafId = null;

    el.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const px = (x / rect.width) * 2 - 1;
        const py = (y / rect.height) * 2 - 1;
        
        const rotX = -py * 4.5;
        const rotY = px * 4.5;
        
        el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px) translateY(-6px)`;
        el.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
        
        el.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
        el.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
      });
    });
    
    el.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
      el.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s ease, border-color 0.7s ease';
      el.style.setProperty('--mouse-x', '-999px');
      el.style.setProperty('--mouse-y', '-999px');
    });
  });
}

