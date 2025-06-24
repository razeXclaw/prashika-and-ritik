// DOM Elements
const loadingScreen = document.getElementById("loading-screen")
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const langToggle = document.getElementById("lang-toggle")
const scrollTopBtn = document.getElementById("scroll-top")

// Language state
let currentLang = "en"

// Theme state
let currentTheme = localStorage.getItem("theme") || "light"

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  // Show loading screen
  showLoadingScreen()

  // Initialize theme
  initializeTheme()

  // Initialize language
  initializeLanguage()

  // Initialize animations
  initializeAnimations()

  // Initialize navigation
  initializeNavigation()

  // Initialize scroll effects
  initializeScrollEffects()

  // Initialize counters
  initializeCounters()

  // Initialize form handling
  initializeFormHandling()

  // Hide loading screen after everything is loaded
  setTimeout(hideLoadingScreen, 2000)
})

// Loading Screen Functions
function showLoadingScreen() {
  loadingScreen.classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function hideLoadingScreen() {
  loadingScreen.classList.add("hidden")
  document.body.style.overflow = "auto"

  // Trigger entrance animations
  setTimeout(() => {
    triggerEntranceAnimations()
  }, 500)
}

// Theme Functions
function initializeTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme)
  updateThemeIcon()
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.documentElement.setAttribute("data-theme", currentTheme)
  localStorage.setItem("theme", currentTheme)
  updateThemeIcon()

  // Add theme transition effect
  document.body.style.transition = "all 0.3s ease"
  setTimeout(() => {
    document.body.style.transition = ""
  }, 300)
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector("i")
  if (currentTheme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
}

// Language Functions
function initializeLanguage() {
  updateLanguageText()
  updateLanguageToggle()
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "np" : "en"
  updateLanguageText()
  updateLanguageToggle()

  // Add language transition effect
  const elements = document.querySelectorAll("[data-en][data-np]")
  elements.forEach((el) => {
    el.style.opacity = "0.5"
    setTimeout(() => {
      el.style.opacity = "1"
    }, 150)
  })
}

function updateLanguageText() {
  const elements = document.querySelectorAll("[data-en][data-np]")
  elements.forEach((element) => {
    const text = element.getAttribute(`data-${currentLang}`)
    if (text) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = text
      } else {
        element.textContent = text
      }
    }
  })
}

function updateLanguageToggle() {
  const langText = langToggle.querySelector(".lang-text")
  langText.textContent = currentLang === "en" ? "नेपाली" : "English"
}

// Navigation Functions
function initializeNavigation() {
  // Hamburger menu toggle
  hamburger.addEventListener("click", toggleMobileMenu)

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Language toggle
  langToggle.addEventListener("click", toggleLanguage)

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick)
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      closeMobileMenu()
    }
  })
}

function toggleMobileMenu() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
}

function closeMobileMenu() {
  hamburger.classList.remove("active")
  navMenu.classList.remove("active")
}

function handleNavClick(e) {
  e.preventDefault()
  const targetId = e.target.getAttribute("href")
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })
    e.target.classList.add("active")

    // Smooth scroll to section
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    // Close mobile menu
    closeMobileMenu()
  }
}

// Scroll Effects
function initializeScrollEffects() {
  window.addEventListener("scroll", handleScroll)

  // Scroll to top button
  scrollTopBtn.addEventListener("click", scrollToTop)
}

function handleScroll() {
  const scrollY = window.scrollY

  // Navbar scroll effect
  if (scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Show/hide scroll to top button
  if (scrollY > 500) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }

  // Update active navigation based on scroll position
  updateActiveNavigation()

  // Trigger scroll animations
  triggerScrollAnimations()
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Animation Functions
function initializeAnimations() {
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions)

  // Observe all animatable elements
  const animatableElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")

  animatableElements.forEach((el) => {
    observer.observe(el)
  })
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}

function triggerEntranceAnimations() {
  // Add animation classes to elements
  const heroText = document.querySelector(".hero-text")
  const heroImage = document.querySelector(".hero-image")

  if (heroText) heroText.classList.add("fade-in", "visible")
  if (heroImage) heroImage.classList.add("slide-in-right", "visible")

  // Stagger animation for navigation items
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "0"
      item.style.transform = "translateY(-20px)"
      item.style.transition = "all 0.3s ease"

      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, 100)
    }, index * 100)
  })
}

function triggerScrollAnimations() {
  // Add scroll-based animations
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number")
  const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5,
  })

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounters(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target
      const target = Number.parseInt(counter.getAttribute("data-count"))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString()
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target.toLocaleString()
        }
      }

      updateCounter()
    }
  })
}

// Form Handling
function initializeFormHandling() {
  const contactForm = document.querySelector(".form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  // Add input animations
  const inputs = document.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus)
    input.addEventListener("blur", handleInputBlur)
  })
}

function handleFormSubmit(e) {
  e.preventDefault()

  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.textContent = currentLang === "en" ? "Sending..." : "पठाउँदै..."
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    // Show success message
    showNotification(currentLang === "en" ? "Message sent successfully!" : "सन्देश सफलतापूर्वक पठाइयो!", "success")

    // Reset form
    e.target.reset()

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

function handleInputFocus(e) {
  e.target.parentElement.classList.add("focused")
}

function handleInputBlur(e) {
  if (!e.target.value) {
    e.target.parentElement.classList.remove("focused")
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#6366f1"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimizations
const debouncedScroll = debounce(handleScroll, 10)
window.addEventListener("scroll", debouncedScroll)

// Preload images
function preloadImages() {
  const images = [
    "/placeholder.svg?height=400&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=80&width=80",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading
preloadImages()

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu()
  }

  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Add focus styles for keyboard navigation
const style = document.createElement("style")
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
`
document.head.appendChild(style)

// Error handling
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error)
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Add smooth scrolling polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js"
  document.head.appendChild(script)
}

// Initialize everything when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeWebsite)
} else {
  initializeWebsite()
}

function initializeWebsite() {
  console.log("🚀 Parshika & Ritika Mobile Electronics Store - Website Initialized")

  // Add any additional initialization code here
  addCustomAnimations()
  setupLazyLoading()
  initializeParallax()
}

// Custom animations for enhanced UX
function addCustomAnimations() {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".about-card, .category-card, .dealer-card, .contact-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Lazy loading for images
function setupLazyLoading() {
  const images = document.querySelectorAll('img[src*="placeholder"]')

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.classList.add("loaded")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }
}

// Parallax effect for hero section
function initializeParallax() {
  const heroShapes = document.querySelectorAll(".shape")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    heroShapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.2
      shape.style.transform = `translateY(${rate * speed}px)`
    })
  })
}

console.log("✨ All systems ready! Welcome to Parshika & Ritika Mobile Electronics Store")

// Photo Modal Functionality
let currentImageIndex = 0;
let modalImages = [];

function initializePhotoModal() {
  // Create modal HTML
  const modalHTML = `
    <div id="photo-modal" class="photo-modal">
      <div class="modal-content">
        <button class="modal-close" id="modal-close">
          <i class="fas fa-times"></i>
        </button>
        <button class="modal-nav modal-prev" id="modal-prev">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="modal-nav modal-next" id="modal-next">
          <i class="fas fa-chevron-right"></i>
        </button>
        <img id="modal-image" class="modal-image" src="" alt="">
        <div class="modal-info">
          <h3 id="modal-title"></h3>
          <p id="modal-description"></p>
        </div>
        <div class="modal-counter" id="modal-counter"></div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Get modal elements
  const modal = document.getElementById('photo-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalCounter = document.getElementById('modal-counter');
  const closeBtn = document.getElementById('modal-close');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  
  // Collect all clickable images
  collectModalImages();
  
  // Add click listeners to images
  addImageClickListeners();
  
  // Modal event listeners
  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPreviousImage);
  nextBtn.addEventListener('click', showNextImage);
  
  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          showPreviousImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    }
  });
  
  function collectModalImages() {
    modalImages = [];
    
    // Collect product images
    const productImages = document.querySelectorAll('.product-image img, .showcase-item .product-image img');
    productImages.forEach((img, index) => {
      const parentCard = img.closest('.showcase-item') || img.closest('.product-image').parentElement;
      const title = parentCard.querySelector('h4')?.textContent || 'Product Image';
      const description = parentCard.querySelector('p')?.textContent || 'Product description';
      
      modalImages.push({
        src: img.src,
        alt: img.alt,
        title: title,
        description: description,
        element: img
      });
    });
    
    // Collect gallery images if on gallery page
    const galleryImages = document.querySelectorAll('.gallery .product-image img');
    galleryImages.forEach((img, index) => {
      const parentCard = img.closest('.showcase-item');
      const title = parentCard.querySelector('h4')?.textContent || 'Gallery Image';
      const description = parentCard.querySelector('p')?.textContent || 'Store gallery image';
      
      if (!modalImages.find(item => item.src === img.src)) {
        modalImages.push({
          src: img.src,
          alt: img.alt,
          title: title,
          description: description,
          element: img
        });
      }
    });
  }
  
  function addImageClickListeners() {
    modalImages.forEach((imageData, index) => {
      imageData.element.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
      });
      
      // Add visual indicator that image is clickable
      imageData.element.style.cursor = 'pointer';
      imageData.element.title = 'Click to view larger image';
    });
  }
  
  function openModal(index) {
    currentImageIndex = index;
    const imageData = modalImages[currentImageIndex];
    
    modalImage.src = imageData.src;
    modalImage.alt = imageData.alt;
    modalTitle.textContent = imageData.title;
    modalDescription.textContent = imageData.description;
    
    updateModalCounter();
    updateNavigationButtons();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Preload adjacent images for smooth navigation
    preloadAdjacentImages();
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  function showPreviousImage() {
    if (modalImages.length > 1) {
      currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
      updateModalContent();
    }
  }
  
  function showNextImage() {
    if (modalImages.length > 1) {
      currentImageIndex = (currentImageIndex + 1) % modalImages.length;
      updateModalContent();
    }
  }
  
  function updateModalContent() {
    const imageData = modalImages[currentImageIndex];
    
    // Add fade effect
    modalImage.style.opacity = '0.5';
    
    setTimeout(() => {
      modalImage.src = imageData.src;
      modalImage.alt = imageData.alt;
      modalTitle.textContent = imageData.title;
      modalDescription.textContent = imageData.description;
      
      updateModalCounter();
      updateNavigationButtons();
      
      modalImage.style.opacity = '1';
    }, 150);
    
    preloadAdjacentImages();
  }
  
  function updateModalCounter() {
    modalCounter.textContent = `${currentImageIndex + 1} / ${modalImages.length}`;
  }
  
  function updateNavigationButtons() {
    if (modalImages.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }
  
  function preloadAdjacentImages() {
    // Preload previous and next images for smooth navigation
    const prevIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
    const nextIndex = (currentImageIndex + 1) % modalImages.length;
    
    [prevIndex, nextIndex].forEach(index => {
      if (index !== currentImageIndex && modalImages[index]) {
        const img = new Image();
        img.src = modalImages[index].src;
      }
    });
  }
  
  // Re-collect images when page content changes (for dynamic content)
  function refreshModalImages() {
    collectModalImages();
    addImageClickListeners();
  }
  
  // Expose refresh function globally
  window.refreshModalImages = refreshModalImages;
}

// Initialize photo modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for images to load
  setTimeout(initializePhotoModal, 1000);
});

// Re-initialize modal images when navigating between pages
window.addEventListener('load', () => {
  setTimeout(() => {
    if (window.refreshModalImages) {
      window.refreshModalImages();
    }
  }, 500);
});

console.log("📸 Photo modal functionality initialized");

