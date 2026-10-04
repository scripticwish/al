<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Angel Team</h4>
          <p>{{ $t('hero.description') }}</p>
        </div>
        
        <div class="footer-section">
          <h4>{{ $t('nav.contacts') }}</h4>
          <p>Email: info@angelteam.ru</p>
          <p>Phone: +7 (831) 123-45-67</p>
        </div>
        
        <div class="footer-section">
          <h4>{{ $t('nav.schedule') }}</h4>
          <router-link to="/schedule">View Schedule</router-link>
          <router-link to="/booking">{{ $t('nav.booking') }}</router-link>
        </div>
        
        <div class="footer-section">
          <h4>{{ $t('nav.coaches') }}</h4>
          <router-link to="/coaches">Our Team</router-link>
          <router-link to="/reviews">{{ $t('nav.reviews') }}</router-link>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Angel Team - Figure Skating and Hockey School. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background: var(--dark-gray);
  color: var(--primary-white);
  padding: var(--spacing-xxl) 0 var(--spacing-lg);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-section h4 {
  color: var(--accent-red);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-h4);
}

.footer-section p,
.footer-section a {
  color: var(--medium-gray);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  margin-bottom: var(--spacing-xs);
  display: block;
}

.footer-section a:hover {
  color: var(--accent-red);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--text-gray);
  color: var(--text-gray);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}
</style>