<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">{{ $t('hero.title') }}</h1>
        <h2 class="hero-subtitle">{{ $t('hero.subtitle') }}</h2>
        <p class="hero-description">{{ $t('hero.description') }}</p>
        <router-link to="/booking" class="btn btn-primary btn-lg">
          {{ $t('hero.bookTraining') }}
        </router-link>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="achievements">
      <div class="container">
        <div class="achievement-cards">
          <div class="achievement-card">
            <span class="achievement-number">{{ $t('achievements.champions.number') }}</span>
            <p class="achievement-title">{{ $t('achievements.champions.title') }}</p>
          </div>
          <div class="achievement-card">
            <span class="achievement-number">{{ $t('achievements.masters.number') }}</span>
            <p class="achievement-title">{{ $t('achievements.masters.title') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
      <div class="container">
        <div class="advantages">
          <h2 class="section-title">{{ $t('advantages.title') }}</h2>
          <div class="advantages-grid">
            <div class="advantage-card">
              <h3 class="advantage-title">{{ $t('advantages.coaches.title') }}</h3>
              <p class="advantage-description">{{ $t('advantages.coaches.description') }}</p>
            </div>
            <div class="advantage-card">
              <h3 class="advantage-title">{{ $t('advantages.locations.title') }}</h3>
              <p class="advantage-description">{{ $t('advantages.locations.description') }}</p>
            </div>
            <div class="advantage-card">
              <h3 class="advantage-title">{{ $t('advantages.training.title') }}</h3>
              <p class="advantage-description">{{ $t('advantages.training.description') }}</p>
            </div>
            <div class="advantage-card">
              <h3 class="advantage-title">{{ $t('advantages.competitions.title') }}</h3>
              <p class="advantage-description">{{ $t('advantages.competitions.description') }}</p>
            </div>
            <div class="advantage-card">
              <h3 class="advantage-title">{{ $t('advantages.pros.title') }}</h3>
              <p class="advantage-description">{{ $t('advantages.pros.description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Schedule Preview Section -->
    <section class="section schedule-preview">
      <div class="container">
        <h2 class="section-title">{{ $t('nav.schedule') }}</h2>
        <div class="preview-grid">
          <div class="preview-card">
            <h3>Children Classes</h3>
            <p>Age 3-12 | Beginner to Intermediate</p>
            <router-link to="/schedule" class="btn btn-outline">View Schedule</router-link>
          </div>
          <div class="preview-card">
            <h3>Adult Classes</h3>
            <p>Age 18+ | All levels welcome</p>
            <router-link to="/schedule" class="btn btn-outline">View Schedule</router-link>
          </div>
          <div class="preview-card">
            <h3>Hockey Training</h3>
            <p>Professional hockey development</p>
            <router-link to="/schedule" class="btn btn-outline">View Schedule</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Hockey Section -->
    <section id="hockey" class="section hockey-section">
      <div class="container">
        <div class="hockey-content">
          <div class="hockey-text">
            <h2 class="section-title">Hockey Program</h2>
            <p>Our comprehensive hockey program is designed for young athletes who want to develop their skills in one of the most exciting sports. From basic skating techniques to advanced game strategies, our professional coaches provide expert training.</p>
            <ul class="hockey-features">
              <li>Technical skating development</li>
              <li>Stick handling and puck control</li>
              <li>Game strategy and teamwork</li>
              <li>Competition preparation</li>
            </ul>
            <router-link to="/booking" class="btn btn-primary">Start Hockey Training</router-link>
          </div>
          <div class="hockey-image">
            <div class="placeholder-image">Hockey Training</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section cta-section">
      <div class="container text-center">
        <h2>Ready to Start Your Skating Journey?</h2>
        <p>Join Angel Team today and discover the joy of figure skating and hockey</p>
        <router-link to="/booking" class="btn btn-primary btn-lg">
          Book Your First Training
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      mounted: false
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped>
.hero {
  padding: calc(80px + var(--spacing-xxl)) 0 var(--spacing-xxl);
  background: linear-gradient(135deg, var(--primary-white) 0%, var(--light-gray) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23FF3366" fill-opacity="0.03"><circle cx="30" cy="30" r="4"/></g></g></svg>') repeat;
  pointer-events: none;
}

.hero .container {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-h1);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-black) 0%, var(--accent-red) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-size: var(--font-size-h3);
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
  font-weight: 500;
}

.hero-description {
  font-size: var(--font-size-body);
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.7;
  font-weight: 300;
}

.achievements {
  background: linear-gradient(135deg, var(--dark-gray) 0%, #1a1a1a 100%);
  color: var(--primary-white);
  padding: var(--spacing-xxl) 0;
  position: relative;
}

.achievements::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23FF3366" fill-opacity="0.05"><polygon points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/></g></g></svg>') repeat;
  pointer-events: none;
}

.achievement-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.achievement-card {
  background: var(--accent-red);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255, 51, 102, 0.3);
}

.achievement-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.5s ease;
  opacity: 0;
}

.achievement-card:hover::before {
  animation: shimmer 0.8s ease-in-out;
  opacity: 1;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.achievement-number {
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary-white);
  display: block;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.achievement-title {
  font-size: var(--font-size-h4);
  font-weight: 500;
  color: var(--primary-white);
  line-height: 1.3;
  margin: 0;
}

.advantages {
  padding: var(--spacing-xl) 0;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.advantage-card {
  text-align: center;
  padding: var(--spacing-xl);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  transition: all 0.3s ease;
  background: var(--primary-white);
  position: relative;
  overflow: hidden;
}

.advantage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 51, 102, 0.1), transparent);
  transition: left 0.5s ease;
}

.advantage-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-red);
}

.advantage-card:hover::before {
  left: 100%;
}

.advantage-title {
  font-size: var(--font-size-h3);
  font-weight: 600;
  color: var(--accent-red);
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 1;
}

.advantage-description {
  color: var(--text-gray);
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.schedule-preview {
  background: var(--light-gray);
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.preview-card {
  background: var(--primary-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.preview-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-red);
}

.preview-card h3 {
  color: var(--primary-black);
  margin-bottom: var(--spacing-sm);
}

.preview-card p {
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
}

.hockey-section {
  background: var(--primary-white);
}

.hockey-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
}

.hockey-text h2 {
  text-align: left;
  margin-bottom: var(--spacing-lg);
}

.hockey-features {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0;
}

.hockey-features li {
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-lg);
  position: relative;
  color: var(--text-gray);
}

.hockey-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent-red);
  font-weight: bold;
}

.hockey-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-image {
  width: 100%;
  max-width: 400px;
  height: 300px;
  background: linear-gradient(135deg, var(--light-gray) 0%, var(--medium-gray) 100%);
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  font-size: 1.25rem;
  font-weight: 500;
}

.cta-section {
  background: var(--accent-red);
  color: var(--primary-white);
  text-align: center;
}

.cta-section h2 {
  color: var(--primary-white);
  margin-bottom: var(--spacing-md);
}

.cta-section p {
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--font-size-body);
  margin-bottom: var(--spacing-lg);
}

.cta-section .btn-primary {
  background: var(--primary-white);
  color: var(--accent-red);
}

.cta-section .btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero {
    padding: calc(60px + var(--spacing-lg)) 0 var(--spacing-lg);
  }
  
  .achievement-cards {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .preview-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .hockey-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .hockey-text h2 {
    text-align: center;
  }
  
  .achievement-number {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .advantage-card,
  .preview-card {
    padding: var(--spacing-md);
  }
}
</style>