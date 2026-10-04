<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="logo">ANGEL TEAM</router-link>
      
      <!-- Desktop Navigation -->
      <nav class="nav desktop-nav">
        <a href="#about" @click="scrollToAbout" class="nav-link">{{ $t('nav.about') }}</a>
        <router-link to="/schedule" class="nav-link">{{ $t('nav.schedule') }}</router-link>
        <router-link to="/coaches" class="nav-link">{{ $t('nav.coaches') }}</router-link>
        <router-link to="/reviews" class="nav-link">{{ $t('nav.reviews') }}</router-link>
        <a href="#hockey" @click="scrollToHockey" class="nav-link">{{ $t('nav.hockey') }}</a>
        <router-link to="/contacts" class="nav-link">{{ $t('nav.contacts') }}</router-link>
        <router-link to="/booking" class="btn btn-primary">{{ $t('nav.booking') }}</router-link>
      </nav>
      
      <!-- Language Switcher -->
      <div class="language-switcher">
        <button 
          v-for="lang in languages" 
          :key="lang"
          @click="changeLanguage(lang)"
          :class="['lang-btn', { active: currentLanguage === lang }]"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn" 
        @click="toggleMobileMenu"
        :class="{ active: mobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ open: mobileMenuOpen }">
      <nav class="nav-mobile">
        <a href="#about" @click="scrollToAbout" class="nav-link-mobile">{{ $t('nav.about') }}</a>
        <router-link to="/schedule" class="nav-link-mobile" @click="closeMobileMenu">{{ $t('nav.schedule') }}</router-link>
        <router-link to="/coaches" class="nav-link-mobile" @click="closeMobileMenu">{{ $t('nav.coaches') }}</router-link>
        <router-link to="/reviews" class="nav-link-mobile" @click="closeMobileMenu">{{ $t('nav.reviews') }}</router-link>
        <a href="#hockey" @click="scrollToHockey" class="nav-link-mobile">{{ $t('nav.hockey') }}</a>
        <router-link to="/contacts" class="nav-link-mobile" @click="closeMobileMenu">{{ $t('nav.contacts') }}</router-link>
        <router-link to="/booking" class="btn btn-primary mobile-booking-btn" @click="closeMobileMenu">{{ $t('nav.booking') }}</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'AppHeader',
  setup() {
    const { locale } = useI18n()
    
    return {
      locale
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      languages: ['en', 'ru'],
      currentLanguage: this.$i18n.locale
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
      this.currentLanguage = lang
      localStorage.setItem('angel-team-language', lang)
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    scrollToAbout(e) {
      e.preventDefault()
      this.closeMobileMenu()
      if (this.$route.name === 'Home') {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        this.$router.push({ name: 'Home' })
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    },
    scrollToHockey(e) {
      e.preventDefault()
      this.closeMobileMenu()
      if (this.$route.name === 'Home') {
        document.getElementById('hockey')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        this.$router.push({ name: 'Home' })
        setTimeout(() => {
          document.getElementById('hockey')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  },
  mounted() {
    // Load saved language preference
    const savedLang = localStorage.getItem('angel-team-language')
    if (savedLang && this.languages.includes(savedLang)) {
      this.changeLanguage(savedLang)
    }
    
    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu()
      }
    })
  }
}
</script>

<style scoped>
.desktop-nav {
  display: flex;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.mobile-menu-btn span {
  width: 100%;
  height: 3px;
  background: var(--primary-black);
  transition: all 0.3s;
  transform-origin: center;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--primary-white);
  border-bottom: 1px solid var(--medium-gray);
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 999;
}

.mobile-nav.open {
  transform: translateY(0);
}

.nav-mobile {
  flex-direction: column;
  padding: var(--spacing-lg);
  gap: var(--spacing-md);
}

.nav-link-mobile {
  padding: var(--spacing-sm);
  font-size: 1.125rem;
  text-decoration: none;
  color: var(--primary-black);
  border-bottom: 1px solid var(--light-gray);
  transition: color 0.2s ease-in-out;
}

.nav-link-mobile:hover {
  color: var(--accent-red);
}

.mobile-booking-btn {
  margin-top: var(--spacing-md);
  width: 100%;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .language-switcher {
    margin-left: auto;
    margin-right: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .language-switcher {
    display: none;
  }
  
  .logo {
    font-size: 1.25rem;
  }
}
</style>