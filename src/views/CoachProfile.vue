<template>
  <div class="coach-profile-page" v-if="coach">
    <section class="section">
      <div class="container">
        <!-- Coach Header -->
        <div class="coach-header">
          <div class="coach-image">
            <div class="placeholder-image">
              {{ coach.name.split(' ')[0] }}<br>{{ coach.name.split(' ')[1] }}
            </div>
          </div>
          <div class="coach-details">
            <h1 class="coach-name">{{ coach.name }}</h1>
            <p class="coach-position">{{ coach.position }}</p>
            <p class="coach-specialization">{{ coach.specialization }}</p>
            <router-link to="/booking" class="btn btn-primary btn-lg">
              {{ $t('coach.bookWithCoach') }}
            </router-link>
          </div>
        </div>

        <!-- Biography Section -->
        <div class="biography-section">
          <h2>Biography & Achievements</h2>
          <ul class="biography-list">
            <li v-for="(item, index) in coach.biography" :key="index">{{ item }}</li>
          </ul>
        </div>

        <!-- Schedule Section -->
        <div class="schedule-section">
          <h2>Weekly Schedule</h2>
          <div class="schedule-container">
            <div class="schedule-table">
              <div class="schedule-header">
                <div class="day-header">Day</div>
                <div class="time-header">Time Slots</div>
              </div>
              <div class="schedule-row" v-for="(times, day) in coach.schedule" :key="day">
                <div class="day-cell">
                  <strong>{{ getDayName(day) }}</strong>
                </div>
                <div class="time-slots">
                  <span 
                    v-for="time in times" 
                    :key="time"
                    class="time-slot"
                    :class="getTimeSlotStatus(time)"
                  >
                    {{ time }}
                  </span>
                  <span v-if="times.length === 0" class="no-slots">No sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Locations Section -->
        <div class="locations-section">
          <h2>Working Locations</h2>
          <div class="locations-list">
            <div 
              v-for="location in coach.locations" 
              :key="location"
              class="location-card"
            >
              <h4>{{ location }}</h4>
              <p>Available for training sessions</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <h3>Ready to train with {{ coach.name }}?</h3>
          <p>Book your session now and start your skating journey</p>
          <router-link to="/booking" class="btn btn-primary btn-lg">
            Book with {{ coach.name.split(' ')[0] }}
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <!-- Loading State -->
  <div class="loading-state" v-else-if="loading">
    <div class="container text-center">
      <div class="loading-spinner"></div>
      <p>Loading coach information...</p>
    </div>
  </div>

  <!-- Error State -->
  <div class="error-state" v-else>
    <div class="container text-center">
      <h2>Coach Not Found</h2>
      <p>The requested coach profile could not be found.</p>
      <router-link to="/coaches" class="btn btn-primary">
        Back to Coaches
      </router-link>
    </div>
  </div>
</template>

<script>
import contentService from '../services/contentService.js'

export default {
  name: 'CoachProfile',
  data() {
    return {
      coach: null,
      loading: true
    }
  },
  async mounted() {
    await this.loadCoach()
  },
  methods: {
    async loadCoach() {
      this.loading = true
      try {
        const coachName = this.$route.params.name
        this.coach = await contentService.getCoachByName(coachName)
      } catch (error) {
        console.error('Error loading coach:', error)
        this.coach = null
      } finally {
        this.loading = false
      }
    },
    getDayName(day) {
      const dayNames = {
        monday: this.$t('common.monday'),
        tuesday: this.$t('common.tuesday'),
        wednesday: this.$t('common.wednesday'),
        thursday: this.$t('common.thursday'),
        friday: this.$t('common.friday'),
        saturday: this.$t('common.saturday'),
        sunday: this.$t('common.sunday')
      }
      return dayNames[day] || day
    },
    getTimeSlotStatus(time) {
      // This would typically check against a real schedule
      // For demo purposes, we'll randomly assign status
      const statuses = ['available', 'booked', 'pending']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      return {
        'status-available': randomStatus === 'available',
        'status-booked': randomStatus === 'booked',
        'status-pending': randomStatus === 'pending'
      }
    }
  }
}
</script>

<style scoped>
.coach-profile-page {
  padding-top: 60px;
}

.coach-header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-xxl);
  align-items: center;
  margin-bottom: var(--spacing-xxl);
}

.coach-image {
  display: flex;
  justify-content: center;
}

.placeholder-image {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--accent-red) 0%, #ff5c7a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-white);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
  border: 8px solid var(--primary-white);
  box-shadow: var(--shadow-lg);
}

.coach-name {
  font-size: var(--font-size-h1);
  font-weight: 800;
  color: var(--primary-black);
  margin-bottom: var(--spacing-sm);
}

.coach-position {
  font-size: var(--font-size-h3);
  color: var(--accent-red);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.coach-specialization {
  font-size: 1.125rem;
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
  font-style: italic;
}

.biography-section,
.schedule-section,
.locations-section {
  margin-bottom: var(--spacing-xxl);
}

.biography-section h2,
.schedule-section h2,
.locations-section h2 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--accent-red);
  padding-bottom: var(--spacing-sm);
}

.biography-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.biography-list li {
  padding: var(--spacing-md);
  background: var(--light-gray);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--accent-red);
  font-size: 1rem;
  color: var(--text-gray);
  line-height: 1.6;
}

.schedule-container {
  overflow-x: auto;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--medium-gray);
}

.schedule-table {
  display: grid;
  grid-template-columns: 200px 1fr;
  background: var(--primary-white);
}

.schedule-header {
  display: contents;
}

.day-header,
.time-header {
  padding: var(--spacing-md);
  background: var(--primary-black);
  color: var(--primary-white);
  font-weight: 600;
  font-size: 1rem;
}

.time-header {
  text-align: center;
}

.schedule-row {
  display: contents;
}

.day-cell {
  padding: var(--spacing-md);
  background: var(--light-gray);
  border-bottom: 1px solid var(--medium-gray);
  display: flex;
  align-items: center;
  font-weight: 500;
  color: var(--primary-black);
}

.time-slots {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--medium-gray);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
}

.time-slot {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid;
}

.status-available {
  background: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.status-booked {
  background: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
  border-color: #ffeaa7;
}

.no-slots {
  color: var(--text-gray);
  font-style: italic;
}

.locations-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.location-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  transition: all 0.3s ease;
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-red);
}

.location-card h4 {
  color: var(--accent-red);
  margin-bottom: var(--spacing-xs);
}

.location-card p {
  color: var(--text-gray);
  margin: 0;
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

.loading-state,
.error-state {
  padding-top: 80px;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--light-gray);
  border-top: 4px solid var(--accent-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .coach-header {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-lg);
  }
  
  .placeholder-image {
    width: 200px;
    height: 200px;
    font-size: 1.25rem;
  }
  
  .schedule-table {
    grid-template-columns: 150px 1fr;
  }
  
  .day-header,
  .time-header,
  .day-cell,
  .time-slots {
    padding: var(--spacing-sm);
  }
  
  .biography-list {
    grid-template-columns: 1fr;
  }
  
  .locations-list {
    grid-template-columns: 1fr;
  }
  
  .cta-section {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .coach-name {
    font-size: 2rem;
  }
  
  .time-slots {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>