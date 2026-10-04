<template>
  <div class="coaches-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Our Coaches</h1>
        <p class="page-subtitle">Meet our professional coaching team dedicated to your success</p>
        
        <div class="coaches-grid">
          <div 
            v-for="coach in coaches" 
            :key="coach.id" 
            class="coach-card"
          >
            <div class="coach-image">
              <div class="placeholder-image">
                {{ coach.name.split(' ')[0] }}<br>{{ coach.name.split(' ')[1] }}
              </div>
            </div>
            <div class="coach-info">
              <h3 class="coach-name">{{ coach.name }}</h3>
              <p class="coach-position">{{ coach.position }}</p>
              <p class="coach-specialization">{{ coach.specialization }}</p>
              <div class="coach-bio">
                <p v-for="(item, index) in coach.biography.slice(0, 2)" :key="index" class="bio-item">
                  {{ item }}
                </p>
              </div>
              <router-link 
                :to="`/coach/${encodeURIComponent(coach.name.toLowerCase().replace(/\s+/g, '-'))}`"
                class="btn btn-outline"
              >
                {{ $t('coach.learnMore') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import contentService from '../services/contentService.js'

export default {
  name: 'Coaches',
  data() {
    return {
      coaches: []
    }
  },
  async mounted() {
    this.coaches = await contentService.loadCoaches()
  }
}
</script>

<style scoped>
.coaches-page {
  padding-top: 60px; /* Account for fixed header */
}

.page-title {
  text-align: center;
  font-size: var(--font-size-h1);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: var(--primary-black);
}

.page-subtitle {
  text-align: center;
  font-size: var(--font-size-h3);
  color: var(--text-gray);
  margin-bottom: var(--spacing-xxl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.coaches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.coach-card {
  background: var(--primary-white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid var(--medium-gray);
}

.coach-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-red);
}

.coach-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-red) 0%, #ff5c7a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-white);
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
}

.coach-info {
  padding: var(--spacing-lg);
}

.coach-name {
  font-size: var(--font-size-h3);
  font-weight: 600;
  color: var(--primary-black);
  margin-bottom: var(--spacing-xs);
}

.coach-position {
  font-size: 1rem;
  color: var(--accent-red);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.coach-specialization {
  font-size: 0.9rem;
  color: var(--text-gray);
  margin-bottom: var(--spacing-md);
  font-style: italic;
}

.coach-bio {
  margin-bottom: var(--spacing-lg);
}

.bio-item {
  font-size: 0.9rem;
  color: var(--text-gray);
  line-height: 1.4;
  margin-bottom: var(--spacing-xs);
  padding-left: var(--spacing-sm);
  position: relative;
}

.bio-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-red);
  font-weight: bold;
}

.bio-item:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .coaches-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .page-title {
    font-size: 2.5rem;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
  }
  
  .coach-card {
    margin: 0 var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .coach-info {
    padding: var(--spacing-md);
  }
}
</style>