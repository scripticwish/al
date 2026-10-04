<template>
  <div class="prices-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Pricing & Programs</h1>
        <p class="page-subtitle">Affordable training options for all skill levels</p>
        
        <!-- Main Programs -->
        <div class="programs-section">
          <h2>Training Programs</h2>
          <div class="programs-grid">
            <div 
              v-for="program in programs" 
              :key="program.id"
              class="program-card"
            >
              <div class="program-header">
                <h3>{{ program.name }}</h3>
                <p class="program-description">{{ program.description }}</p>
              </div>
              <div class="program-pricing">
                <div v-if="program.type === 'individual' || program.type === 'group'" class="pricing-options">
                  <div class="price-item">
                    <span class="price-label">Single Session</span>
                    <span class="price-value">{{ program.pricing.single }}{{ program.unit }}</span>
                  </div>
                  <div class="price-item">
                    <span class="price-label">Package (per session)</span>
                    <span class="price-value">{{ program.pricing.package }}{{ program.unit }}</span>
                  </div>
                </div>
                <div v-else-if="program.type === 'program'" class="pricing-options">
                  <div class="price-item">
                    <span class="price-label">Base Price</span>
                    <span class="price-value">{{ program.pricing.base }}{{ program.unit }}</span>
                  </div>
                  <div class="price-item">
                    <span class="price-label">Starting from</span>
                    <span class="price-value">{{ program.pricing.min }}{{ program.unit }}</span>
                  </div>
                </div>
              </div>
              <div class="program-details">
                <p>{{ program.details }}</p>
                <div v-if="program.frequency" class="program-frequency">
                  <span class="frequency-badge">{{ program.frequency }}x per week</span>
                </div>
              </div>
              <router-link to="/booking" class="btn btn-primary btn-block">
                Start This Program
              </router-link>
            </div>
          </div>
        </div>

        <!-- Additional Services -->
        <div class="additional-services-section">
          <h2>Additional Services</h2>
          <div class="services-grid">
            <div 
              v-for="service in additionalServices" 
              :key="service.name"
              class="service-card"
            >
              <h4>{{ service.name }}</h4>
              <div class="service-price">
                <span class="price">{{ service.price }}{{ service.unit }}</span>
                <span class="price-label">per session</span>
              </div>
              <p class="service-description">{{ service.description }}</p>
              <router-link to="/booking" class="btn btn-outline btn-block">
                Book Service
              </router-link>
            </div>
          </div>
        </div>

        <!-- Discounts -->
        <div class="discounts-section">
          <h2>Available Discounts</h2>
          <div class="discounts-grid">
            <div 
              v-for="discount in discounts" 
              :key="discount.type"
              class="discount-card"
            >
              <h4>{{ getDiscountTitle(discount) }}</h4>
              <div class="discount-value">
                <span class="discount-percentage">{{ discount.discount }}%</span>
                <span class="discount-label">discount</span>
              </div>
              <p class="discount-description">{{ discount.description }}</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <h3>Ready to start training?</h3>
          <p>Choose the program that fits your goals and schedule</p>
          <router-link to="/booking" class="btn btn-primary btn-lg">
            Book Your First Session
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import contentService from '../services/contentService.js'

export default {
  name: 'Prices',
  data() {
    return {
      programs: [],
      additionalServices: [],
      discounts: []
    }
  },
  async mounted() {
    await this.loadPricing()
  },
  methods: {
    async loadPricing() {
      try {
        const pricingData = await contentService.loadPrices()
        this.programs = pricingData.programs || []
        this.additionalServices = pricingData.additional_services || []
        this.discounts = pricingData.discounts || []
      } catch (error) {
        console.error('Error loading pricing data:', error)
        this.programs = []
        this.additionalServices = []
        this.discounts = []
      }
    },
    getDiscountTitle(discount) {
      const titles = {
        sibling: 'Family Discount',
        package: 'Package Discount'
      }
      return titles[discount.type] || 'Discount'
    }
  }
}
</script>

<style scoped>
.prices-page {
  padding-top: 60px;
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

.programs-section,
.additional-services-section,
.discounts-section {
  margin-bottom: var(--spacing-xxl);
}

.programs-section h2,
.additional-services-section h2,
.discounts-section h2 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  border-bottom: 2px solid var(--accent-red);
  padding-bottom: var(--spacing-sm);
}

.programs-grid,
.services-grid,
.discounts-grid {
  display: grid;
  gap: var(--spacing-lg);
}

.programs-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.services-grid,
.discounts-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.program-card,
.service-card,
.discount-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.program-card:hover,
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-red);
}

.program-header h3,
.service-card h4,
.discount-card h4 {
  font-size: var(--font-size-h3);
  color: var(--primary-black);
  margin-bottom: var(--spacing-sm);
}

.program-description,
.service-description,
.discount-description {
  color: var(--text-gray);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.program-pricing {
  margin-bottom: var(--spacing-md);
}

.pricing-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--light-gray);
}

.price-item:last-child {
  border-bottom: none;
}

.price-label {
  color: var(--text-gray);
  font-weight: 500;
}

.price-value {
  color: var(--accent-red);
  font-weight: 700;
  font-size: 1.125rem;
}

.program-details {
  margin-bottom: var(--spacing-lg);
}

.program-frequency {
  margin-top: var(--spacing-sm);
}

.frequency-badge {
  display: inline-block;
  background: var(--accent-red);
  color: var(--primary-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

.service-price {
  margin-bottom: var(--spacing-md);
}

.service-price .price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-red);
}

.service-price .price-label {
  color: var(--text-gray);
  margin-left: var(--spacing-sm);
}

.discount-value {
  margin-bottom: var(--spacing-md);
}

.discount-percentage {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--accent-red);
  display: block;
}

.discount-label {
  color: var(--text-gray);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.cta-section {
  background: var(--light-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xxl);
  text-align: center;
  margin-top: var(--spacing-xxl);
}

.cta-section h3 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-md);
}

.cta-section p {
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .programs-grid,
  .services-grid,
  .discounts-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-options {
    gap: var(--spacing-sm);
  }
  
  .price-item {
    flex-direction: column;
    gap: var(--spacing-xs);
    text-align: center;
  }
  
  .cta-section {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .program-card,
  .service-card,
  .discount-card {
    padding: var(--spacing-lg);
  }
  
  .discount-percentage {
    font-size: 2rem;
  }
}
</style>