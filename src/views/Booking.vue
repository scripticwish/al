<template>
  <div class="booking-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Book Your Training</h1>
        <p class="page-subtitle">Schedule your first lesson with our professional coaches</p>
        
        <form @submit.prevent="submitBooking" class="booking-form">
          <!-- Step 1: Coach Selection -->
          <div class="form-step">
            <h2>1. Choose Your Coach</h2>
            <div class="coach-selection">
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="bookingForm.coachType" 
                  value="specific" 
                  @change="clearCoachSelection"
                >
                <span class="radio-label">Specific Coach</span>
              </label>
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="bookingForm.coachType" 
                  value="any"
                  @change="clearCoachSelection"
                >
                <span class="radio-label">Any Available Coach</span>
              </label>
            </div>
            
            <!-- Specific Coach Selection -->
            <div v-if="bookingForm.coachType === 'specific'" class="coach-grid">
              <div 
                v-for="coach in coaches" 
                :key="coach.id"
                @click="selectCoach(coach)"
                :class="['coach-card', { selected: bookingForm.coach?.id === coach.id }]"
              >
                <div class="coach-image">
                  <div class="placeholder-image">
                    {{ coach.name.split(' ')[0] }}<br>{{ coach.name.split(' ')[1] }}
                  </div>
                </div>
                <div class="coach-info">
                  <h3>{{ coach.name }}</h3>
                  <p>{{ coach.position }}</p>
                  <p>{{ coach.specialization }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Location Selection -->
          <div class="form-step" v-if="bookingForm.coach || bookingForm.coachType === 'any'">
            <h2>2. Choose Location</h2>
            <select v-model="bookingForm.location" class="form-select" required>
              <option value="">Select Location</option>
              <option v-for="location in availableLocations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>
          </div>

          <!-- Step 3: Date and Time -->
          <div class="form-step" v-if="bookingForm.location">
            <h2>3. Date and Time</h2>
            <div class="datetime-grid">
              <div class="date-picker">
                <label>Select Date</label>
                <input 
                  type="date" 
                  v-model="bookingForm.date" 
                  :min="today"
                  class="form-input"
                  required
                >
              </div>
              <div class="time-picker">
                <label>Select Time</label>
                <select v-model="bookingForm.time" class="form-select" required>
                  <option value="">Select Time</option>
                  <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 4: Client Information -->
          <div class="form-step">
            <h2>4. Your Information</h2>
            <div class="form-grid">
              <div class="form-group">
                <label for="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="bookingForm.name" 
                  class="form-input" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="phone">Phone *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="bookingForm.phone" 
                  class="form-input" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="bookingForm.email" 
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <label for="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  v-model="bookingForm.age" 
                  class="form-input"
                  min="3"
                  max="80"
                >
              </div>
              <div class="form-group">
                <label for="skillLevel">Skill Level *</label>
                <select id="skillLevel" v-model="bookingForm.skillLevel" class="form-select" required>
                  <option value="">Select Skill Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 5: Additional Options -->
          <div class="form-step">
            <h2>5. Additional Options</h2>
            <label class="checkbox-option">
              <input 
                type="checkbox" 
                v-model="bookingForm.groupTraining"
              >
              <span>Agree to 2-student training (if available)</span>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="form-submit">
            <button 
              type="submit" 
              class="btn btn-primary btn-lg"
              :disabled="!isFormValid || isSubmitting"
            >
              {{ isSubmitting ? 'Booking...' : 'Book Training Session' }}
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="bookingSuccess" class="success-message">
          <h3>Booking Confirmed!</h3>
          <p>Thank you for your booking. We'll contact you soon to confirm your session.</p>
        </div>

        <!-- Error Message -->
        <div v-if="bookingError" class="error-message">
          <h3>Booking Failed</h3>
          <p>{{ bookingError }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser'
import contentService from '../services/contentService.js'

export default {
  name: 'Booking',
  data() {
    return {
      coaches: [],
      bookingForm: {
        coachType: '',
        coach: null,
        location: '',
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        age: '',
        skillLevel: '',
        groupTraining: false
      },
      isSubmitting: false,
      bookingSuccess: false,
      bookingError: ''
    }
  },
  computed: {
    today() {
      return new Date().toISOString().split('T')[0]
    },
    isFormValid() {
      return this.bookingForm.coachType && 
             (this.bookingForm.coachType === 'any' || this.bookingForm.coach) &&
             this.bookingForm.location &&
             this.bookingForm.date &&
             this.bookingForm.time &&
             this.bookingForm.name &&
             this.bookingForm.phone &&
             this.bookingForm.skillLevel
    },
    availableLocations() {
      if (this.bookingForm.coachType === 'any') {
        // Return all unique locations from all coaches
        const allLocations = new Set()
        this.coaches.forEach(coach => {
          coach.locations.forEach(location => allLocations.add(location))
        })
        return Array.from(allLocations)
      } else if (this.bookingForm.coach) {
        return this.bookingForm.coach.locations
      }
      return []
    },
    availableTimes() {
      // Generate time slots from 10:00 to 22:00 in 1-hour increments
      const times = []
      for (let hour = 10; hour <= 22; hour++) {
        times.push(`${hour.toString().padStart(2, '0')}:00`)
      }
      return times
    }
  },
  async mounted() {
    this.coaches = await contentService.loadCoaches()
  },
  methods: {
    selectCoach(coach) {
      this.bookingForm.coach = coach
    },
    clearCoachSelection() {
      this.bookingForm.coach = null
      this.bookingForm.location = ''
    },
    async submitBooking() {
      if (!this.isFormValid) {
        this.bookingError = 'Please fill in all required fields.'
        return
      }

      this.isSubmitting = true
      this.bookingError = ''

      try {
        // Prepare email content
        const templateParams = {
          to_email: 'vb@peerf.me',
          from_name: this.bookingForm.name,
          from_email: this.bookingForm.email || 'Not provided',
          phone: this.bookingForm.phone,
          age: this.bookingForm.age || 'Not provided',
          skill_level: this.bookingForm.skillLevel,
          coach_type: this.bookingForm.coachType,
          coach_name: this.bookingForm.coach?.name || 'Any available coach',
          location: this.bookingForm.location,
          date: this.bookingForm.date,
          time: this.bookingForm.time,
          group_training: this.bookingForm.groupTraining ? 'Yes' : 'No',
          message: `New training session booking request from ${this.bookingForm.name}.`
        }

        // Send email using EmailJS
        // Note: In a real implementation, you would need to set up your EmailJS service
        // For now, we'll simulate the email sending
        await this.simulateEmailSend(templateParams)
        
        this.bookingSuccess = true
        
        // Reset form
        this.resetForm()
        
      } catch (error) {
        console.error('Booking error:', error)
        this.bookingError = 'There was an error processing your booking. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    },
    async simulateEmailSend(templateParams) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, you would use:
      // await emailjs.send('your_service_id', 'your_template_id', templateParams)
      
      console.log('Email would be sent with params:', templateParams)
      return { success: true }
    },
    resetForm() {
      this.bookingForm = {
        coachType: '',
        coach: null,
        location: '',
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        age: '',
        skillLevel: '',
        groupTraining: false
      }
    }
  }
}
</script>

<style scoped>
.booking-page {
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

.booking-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-step {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.form-step h2 {
  font-size: var(--font-size-h3);
  color: var(--primary-black);
  margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--accent-red);
  padding-bottom: var(--spacing-sm);
}

.coach-selection {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-weight: 500;
}

.radio-option input[type="radio"] {
  width: auto;
  margin: 0;
}

.coach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.coach-card {
  border: 2px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--primary-white);
}

.coach-card:hover {
  border-color: var(--accent-red);
  transform: translateY(-2px);
}

.coach-card.selected {
  border-color: var(--accent-red);
  background: rgba(255, 51, 102, 0.05);
}

.coach-image {
  text-align: center;
  margin-bottom: var(--spacing-sm);
}

.placeholder-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-red) 0%, #ff5c7a 100%);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-white);
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}

.coach-info h3 {
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
  text-align: center;
}

.coach-info p {
  font-size: 0.875rem;
  color: var(--text-gray);
  margin-bottom: var(--spacing-xs);
  text-align: center;
}

.coach-info p:last-child {
  margin-bottom: 0;
  font-style: italic;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--primary-black);
}

.form-input,
.form-select {
  padding: var(--spacing-sm);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--accent-red);
}

.datetime-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-weight: 500;
}

.checkbox-option input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.form-submit {
  text-align: center;
  margin-top: var(--spacing-xl);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.success-message,
.error-message {
  background: var(--light-gray);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  margin-top: var(--spacing-xl);
}

.success-message {
  border-color: #28a745;
  background: #d4edda;
}

.error-message {
  border-color: #dc3545;
  background: #f8d7da;
}

.success-message h3 {
  color: #155724;
  margin-bottom: var(--spacing-sm);
}

.error-message h3 {
  color: #721c24;
  margin-bottom: var(--spacing-sm);
}

@media (max-width: 768px) {
  .coach-grid {
    grid-template-columns: 1fr;
  }
  
  .coach-selection {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .datetime-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-step {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .form-step {
    padding: var(--spacing-md);
  }
}
</style>