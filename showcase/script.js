// Theme Management
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Initialize theme
const savedTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// Smooth Scrolling Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active navigation link
      updateActiveNavLink(this.getAttribute("href"));
    }
  });
});

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === targetId) {
      link.classList.add("active");
    }
  });
}

// Scroll-based navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Mobile Navigation
const hamburger = document.querySelector(".nav-hamburger");
const navMenu = document.querySelector(".nav-menu");
const navContainer = document.querySelector(".nav-container");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Animate hamburger
  const spans = hamburger.querySelectorAll("span");
  if (hamburger.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navContainer.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");

    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");

    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Module Cards Interaction
document.addEventListener("DOMContentLoaded", function () {
  // Module card hover effects and interactions
  const moduleCards = document.querySelectorAll(".module-card");
  const moduleCtaBtns = document.querySelectorAll(".module-cta-btn");

  // Add hover effects to module cards
  moduleCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add subtle animation on hover
      const icon = this.querySelector(".module-icon i");
      if (icon) {
        icon.style.transform = "rotate(5deg) scale(1.1)";
      }

      // Enhance preview visibility
      const preview = this.querySelector(".module-preview");
      if (preview) {
        preview.style.opacity = "1";
        preview.style.transform = "translateY(-2px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      // Reset animations
      const icon = this.querySelector(".module-icon i");
      if (icon) {
        icon.style.transform = "";
      }

      const preview = this.querySelector(".module-preview");
      if (preview) {
        preview.style.opacity = "";
        preview.style.transform = "";
      }
    });
  });

  // CTA button interactions
  moduleCtaBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Handle the navigation based on target
      switch (target) {
        case "chat":
          // Navigate to chat section (placeholder)
          console.log("Navigate to AI Chat Assistant");
          break;
        case "notes":
          // Navigate to notes section (placeholder)
          console.log("Navigate to Notes Manager");
          break;
        case "flashcards":
          // Navigate to flashcards section (placeholder)
          console.log("Navigate to Flashcard Decks");
          break;
        case "audio":
          // Navigate to audio section (placeholder)
          console.log("Navigate to Audio Narration");
          break;
        case "den":
          // Navigate to den section (placeholder)
          console.log("Navigate to The Den");
          break;
      }

      // You can replace the console.log with actual navigation logic
      // For example: window.location.href = `#${target}`;
    });
  });

  // Animated elements initialization
  initializeAnimatedElements();

  // Observe module cards for scroll animations
  moduleCards.forEach((card) => {
    observer.observe(card);
  });
});

// Initialize animated elements
function initializeAnimatedElements() {
  // Animate audio waves
  const audioWaves = document.querySelectorAll(".wave-bar");
  audioWaves.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.1}s`;
  });

  // Animate progress circles
  const progressCircles = document.querySelectorAll(".stat-circle");
  progressCircles.forEach((circle) => {
    // Add a subtle rotation animation
    circle.addEventListener("mouseenter", function () {
      this.style.transform = "rotate(10deg) scale(1.05)";
    });

    circle.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Integration flow animation
  const flowSteps = document.querySelectorAll(".flow-step");
  flowSteps.forEach((step, index) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(20px)";

    // Animate in sequence
    setTimeout(() => {
      step.style.transition = "all 0.5s ease";
      step.style.opacity = "1";
      step.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Hero Animation Effects
function initializeHeroEffects() {
  const heroParticles = document.querySelector(".hero-particles");
  const heroDevice = document.querySelector(".hero-device");

  // Parallax effect on scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroParticles) {
      heroParticles.style.transform = `translateY(${rate}px)`;
    }

    if (heroDevice && scrolled < window.innerHeight) {
      const deviceRate = scrolled * 0.2;
      heroDevice.style.transform = `translateY(${deviceRate}px) rotateY(${
        scrolled * 0.05
      }deg)`;
    }
  });
}

// Initialize hero effects
initializeHeroEffects();

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animations
document
  .querySelectorAll(".feature-card, .tech-item, .module-visual, .module-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Flashcard flip functionality
document.querySelectorAll(".flashcard").forEach((card) => {
  let isFlipped = false;

  card.addEventListener("click", () => {
    const front = card.querySelector(".card-front");
    const back = card.querySelector(".card-back");

    if (!isFlipped) {
      front.style.transform = "rotateY(-180deg)";
      back.style.transform = "rotateY(0)";
    } else {
      front.style.transform = "rotateY(0)";
      back.style.transform = "rotateY(180deg)";
    }

    isFlipped = !isFlipped;
  });
});

// Audio player simulation
document.querySelectorAll(".audio-item").forEach((item) => {
  item.addEventListener("click", () => {
    // Remove playing class from all items
    document
      .querySelectorAll(".audio-item")
      .forEach((i) => i.classList.remove("playing"));

    // Add playing class to clicked item
    item.classList.add("playing");

    // Update player info
    const title = item.querySelector("h5").textContent;
    const playerTitle = document.querySelector(".player-info h4");
    if (playerTitle) {
      playerTitle.textContent = `Now Playing: ${title}`;
    }

    // Update play button
    const playPause = document.querySelector(".play-pause i");
    if (playPause) {
      playPause.className = "fas fa-pause";
    }
  });
});

// Play/pause button functionality
document.querySelector(".play-pause")?.addEventListener("click", function () {
  const icon = this.querySelector("i");
  const isPlaying = icon.classList.contains("fa-pause");

  icon.className = isPlaying ? "fas fa-play" : "fas fa-pause";
});

// Speed control functionality
document
  .querySelector(".speed-control")
  ?.addEventListener("click", function () {
    const speeds = ["1x", "1.25x", "1.5x", "2x"];
    const currentSpeed = this.textContent;
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;

    this.textContent = speeds[nextIndex];
  });

// Progress bar click functionality
document.querySelectorAll(".progress-bar").forEach((bar) => {
  bar.addEventListener("click", (e) => {
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    const fill = bar.querySelector(".progress-fill");
    if (fill) {
      fill.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
    }
  });
});

// Enhanced scroll effects
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const navbar = document.querySelector(".navbar");

  // Add/remove scrolled class to navbar
  if (scrolled > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Parallax effects for various elements
  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Button hover effects
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-2px) scale(1.02)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0) scale(1)";
  });
});

// Feature card hover effects
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.borderColor = "var(--primary-color)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.borderColor = "var(--border-color)";
  });
});

// Tech item hover effects with rotation
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const icon = item.querySelector("i");
    if (icon) {
      icon.style.transform = "rotate(10deg) scale(1.1)";
    }
  });

  item.addEventListener("mouseleave", () => {
    const icon = item.querySelector("i");
    if (icon) {
      icon.style.transform = "rotate(0deg) scale(1)";
    }
  });
});

// Initialize typewriter effect for hero title
function initTypewriter() {
  const heroTitle = document.querySelector(".hero-title-main");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.opacity = "1";

  let index = 0;
  const timer = setInterval(() => {
    heroTitle.textContent += text[index];
    index++;

    if (index === text.length) {
      clearInterval(timer);
      // Add cursor blink effect
      heroTitle.style.borderRight = "3px solid var(--primary-color)";
      heroTitle.style.animation = "blink 1s infinite";

      // Remove cursor after 3 seconds
      setTimeout(() => {
        heroTitle.style.borderRight = "none";
        heroTitle.style.animation = "none";
      }, 3000);
    }
  }, 100);
}

// Add cursor blink animation
const style = document.createElement("style");
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: var(--primary-color); }
        51%, 100% { border-color: transparent; }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-lg);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            border-top: 1px solid var(--border-color);
            flex-direction: column;
            padding: var(--spacing-lg);
            gap: var(--spacing-md);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-20px);
            transition: all var(--transition-normal);
            z-index: 999;
            box-shadow: var(--shadow-lg);
        }
        
        .nav-menu.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .nav-link {
            padding: var(--spacing-sm) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-link:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize typewriter effect when page loads
window.addEventListener("load", () => {
  setTimeout(initTypewriter, 1000);
});

// Add loading animation
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
  // Scroll-based animations and effects
  const scrolled = window.pageYOffset;
  const navbar = document.querySelector(".navbar");

  if (scrolled > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, 10);

window.addEventListener("scroll", debouncedScroll);

console.log("Retro AI Smart Study Companion - Showcase Site Initialized 🚀");
