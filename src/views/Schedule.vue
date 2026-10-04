<template>
  <div class="schedule-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Training Schedule</h1>
        <p class="page-subtitle">Find the perfect time for your training sessions across all our locations</p>
        
        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button 
            v-for="(venue, name) in schedule.venues" 
            :key="name"
            @click="activeVenue = name"
            :class="['tab-btn', { active: activeVenue === name }]"
          >
            {{ venue.name }}
          </button>
        </div>

        <!-- Schedule Content -->
        <div class="schedule-content" v-if="activeVenue && schedule.venues[activeVenue]">
          <div class="venue-info">
            <h2>{{ schedule.venues[activeVenue].name }}</h2>
            <p class="venue-address">{{ schedule.venues[activeVenue].address }}</p>
          </div>

          <div class="schedule-grid">
            <!-- Children Classes -->
            <div class="schedule-section" v-if="schedule.venues[activeVenue].schedule.children">
              <h3>Children Classes (3-17 years)</h3>
              <div class="schedule-table">
                <div class="schedule-row" v-for="(times, day) in schedule.venues[activeVenue].schedule.children" :key="day">
                  <div class="day-cell">{{ getDayName(day) }}</div>
                  <div class="time-cells">
                    <span v-for="time in times" :key="time" class="time-slot">{{ time }}</span>
                    <span v-if="times.length === 0" class="no-sessions">No sessions</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Adults Classes -->
            <div class="schedule-section" v-if="schedule.venues[activeVenue].schedule.adults">
              <h3>Adult Classes (18+ years)</h3>
              <div class="schedule-table">
                <div class="schedule-row" v-for="(times, day) in schedule.venues[activeVenue].schedule.adults" :key="day">
                  <div class="day-cell">{{ getDayName(day) }}</div>
                  <div class="time-cells">
                    <span v-for="time in times" :key="time" class="time-slot">{{ time }}</span>
                    <span v-if="times.length === 0" class="no-sessions">No sessions</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Special Training -->
            <div class="schedule-section" v-if="schedule.venues[activeVenue].schedule.special_training">
              <h3>Special Training</h3>
              <div class="schedule-table">
                <div class="schedule-row" v-for="(times, day) in schedule.venues[activeVenue].schedule.special_training" :key="day">
                  <div class="day-cell">{{ getDayName(day) }}</div>
                  <div class="time-cells">
                    <span v-for="time in times" :key="time" class="time-slot special">{{ time }}</span>
                    <span v-if="times.length === 0" class="no-sessions">No sessions</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hockey Training -->
            <div class="schedule-section" v-if="schedule.venues[activeVenue].schedule.hockey">
              <h3>Hockey Training</h3>
              <div class="schedule-table">
                <div class="schedule-row" v-for="(times, day) in schedule.venues[activeVenue].schedule.hockey" :key="day">
                  <div class="day-cell">{{ getDayName(day) }}</div>
                  <div class="time-cells">
                    <span v-for="time in times" :key="time" class="time-slot hockey">{{ time }}</span>
                    <span v-if="times.length === 0" class="no-sessions">No sessions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <h3>Ready to start your training?</h3>
          <p>Book your first session at any of our locations</p>
          <router-link to="/booking" class="btn btn-primary btn-lg">
            Book Now
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import contentService from '../services/contentService.js'

export default {
  name: 'Schedule',
  data() {
    return {
      schedule: { venues: {} },
      activeVenue: '',
      loading: true
    }
  },
  async mounted() {
    await this.loadSchedule()
  },
  methods: {
    async loadSchedule() {
      try {
        const scheduleData = await contentService.loadSchedule()
        this.schedule = scheduleData
        // Set first venue as active by default
        const venues = Object.keys(scheduleData.venues)
        if (venues.length > 0) {
          this.activeVenue = venues[0]
        }
      } catch (error) {
        console.error('Error loading schedule:', error)
        this.schedule = { venues: {} }
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
    }
  }
}
</script>

<style scoped>
.schedule-page {
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

.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xxl);
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--primary-white);
  border: 2px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  color: var(--primary-black);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.tab-btn:hover {
  border-color: var(--accent-red);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: var(--accent-red);
  border-color: var(--accent-red);
  color: var(--primary-white);
}

.venue-info {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--light-gray);
  border-radius: var(--border-radius-lg);
}

.venue-info h2 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-xs);
}

.venue-address {
  color: var(--text-gray);
  font-size: 1.125rem;
  margin: 0;
}

.schedule-grid {
  display: grid;
  gap: var(--spacing-xl);
}

.schedule-section {
  background: var(--primary-white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--medium-gray);
}

.schedule-section h3 {
  background: var(--primary-black);
  color: var(--primary-white);
  margin: 0;
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1.25rem;
  font-weight: 600;
}

.schedule-table {
  display: grid;
}

.schedule-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  border-bottom: 1px solid var(--medium-gray);
}

.schedule-row:last-child {
  border-bottom: none;
}

.day-cell {
  background: var(--light-gray);
  padding: var(--spacing-md);
  font-weight: 600;
  color: var(--primary-black);
  display: flex;
  align-items: center;
  border-right: 1px solid var(--medium-gray);
}

.time-cells {
  padding: var(--spacing-md);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
}

.time-slot {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--accent-red);
  color: var(--primary-white);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

.time-slot.special {
  background: var(--text-gray);
}

.time-slot.hockey {
  background: var(--primary-black);
}

.no-sessions {
  color: var(--text-gray);
  font-style: italic;
  font-size: 0.9rem;
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
  .filter-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .schedule-row {
    grid-template-columns: 120px 1fr;
  }
  
  .day-cell {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }
  
  .time-cells {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
  
  .time-slot {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .venue-info {
    padding: var(--spacing-md);
  }
  
  .schedule-section h3 {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 1.125rem;
  }
}
</style>