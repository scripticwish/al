<template>
  <div class="contacts-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Contact Us</h1>
        <p class="page-subtitle">Get in touch with Angel Team for all your questions and inquiries</p>
        
        <div class="contacts-grid">
          <!-- Contact Information -->
          <div class="contact-info">
            <h2>Get In Touch</h2>
            
            <div class="contact-cards">
              <!-- Main Office -->
              <div class="contact-card">
                <h3>Main Office</h3>
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <div class="contact-details">
                    <p><strong>Address</strong></p>
                    <p>Nizhny Novgorod, Russia</p>
                    <p>Multiple locations available</p>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📞</span>
                  <div class="contact-details">
                    <p><strong>Phone</strong></p>
                    <p>+7 (831) 123-45-67</p>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">✉️</span>
                  <div class="contact-details">
                    <p><strong>Email</strong></p>
                    <p>info@angelteam.ru</p>
                    <p>booking@angelteam.ru</p>
                  </div>
                </div>
              </div>

              <!-- Quick Questions -->
              <div class="contact-card">
                <h3>Quick Questions</h3>
                <div class="contact-item">
                  <span class="contact-icon">⏰</span>
                  <div class="contact-details">
                    <p><strong>Response Time</strong></p>
                    <p>Within 24 hours</p>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">💬</span>
                  <div class="contact-details">
                    <p><strong>WhatsApp</strong></p>
                    <p>+7 (831) 123-45-67</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-section">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a href="#" class="social-link">
                  <span class="social-icon">📘</span>
                  <span>Facebook</span>
                </a>
                <a href="#" class="social-link">
                  <span class="social-icon">📷</span>
                  <span>Instagram</span>
                </a>
                <a href="#" class="social-link">
                  <span class="social-icon">🎵</span>
                  <span>TikTok</span>
                </a>
                <a href="#" class="social-link">
                  <span class="social-icon">📺</span>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>Send Us a Message</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="contactForm.name" 
                  class="form-input" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="contactForm.email" 
                  class="form-input" 
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="contactForm.phone" 
                  class="form-input"
                >
              </div>
              
              <div class="form-group">
                <label for="subject">Subject *</label>
                <select id="subject" v-model="contactForm.subject" class="form-select" required>
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="pricing">Pricing Questions</option>
                  <option value="schedule">Schedule Information</option>
                  <option value="coaches">Coach Information</option>
                  <option value="shop">Shop & Merchandise</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  v-model="contactForm.message" 
                  class="form-textarea" 
                  rows="5" 
                  required
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="contactForm.newsletter"
                  >
                  <span>Subscribe to our newsletter for updates and news</span>
                </label>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary btn-lg btn-block"
                :disabled="!isFormValid || isSubmitting"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>

            <!-- Success/Error Messages -->
            <div v-if="formSuccess" class="form-message success">
              <h4>Message Sent!</h4>
              <p>Thank you for contacting us. We'll get back to you soon.</p>
            </div>
            
            <div v-if="formError" class="form-message error">
              <h4>Error</h4>
              <p>{{ formError }}</p>
            </div>
          </div>
        </div>

        <!-- Locations Section -->
        <div class="locations-section">
          <h2>Our Locations</h2>
          <div class="locations-grid">
            <div class="location-card" v-for="venue in venues" :key="venue.name">
              <h3>{{ venue.name }}</h3>
              <p class="location-address">{{ venue.address }}</p>
              <div class="location-details">
                <p><strong>Programs:</strong> {{ venue.programs.join(', ') }}</p>
                <p><strong>Coaches:</strong> {{ venue.coaches.join(', ') }}</p>
              </div>
              <button @click="openInMap(venue.name)" class="btn btn-outline btn-block">
                View on Map
              </button>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-list">
            <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
              <button 
                @click="toggleFaq(index)"
                class="faq-question"
                :class="{ active: openFaq === index }"
              >
                <span>{{ faq.question }}</span>
                <span class="faq-icon">{{ openFaq === index ? '−' : '+' }}</span>
              </button>
              <div v-show="openFaq === index" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
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
  name: 'Contacts',
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      isSubmitting: false,
      formSuccess: false,
      formError: '',
      openFaq: null,
      venues: [
        {
          name: 'TRK RAY',
          address: 'Nizhny Novgorod',
          programs: ['Figure Skating', 'Adult Classes'],
          coaches: ['Nikolaeva Alisa', 'Kostycheva Polina', 'Pashintseva Daria']
        },
        {
          name: 'TRK OKEANIS',
          address: 'Nizhny Novgorod',
          programs: ['Figure Skating', 'Special Training'],
          coaches: ['Nikolaeva Alisa', 'Pavlova Anastasia', 'Meshcheryakova Nadezhda']
        },
        {
          name: 'ul. NARTOVA',
          address: 'Nizhny Novgorod',
          programs: ['Figure Skating', 'Physical Training'],
          coaches: ['Esina Ekaterina', 'Nikitina Irina']
        },
        {
          name: 'Moscow Center',
          address: 'Moscow',
          programs: ['Figure Skating', 'Hockey'],
          coaches: ['Kuznetsov Vladimir']
        },
        {
          name: 'Bogorodsk Ice Arena',
          address: 'Bogorodsk',
          programs: ['Figure Skating'],
          coaches: ['Kuznetsov Vladimir', 'Nikitina Irina']
        },
        {
          name: 'Dzerzhinsk Sports Center',
          address: 'Dzerzhinsk',
          programs: ['Figure Skating', 'Adult Classes'],
          coaches: ['Pavlova Anastasia', 'Meshcheryakova Nadezhda']
        }
      ],
      faqs: [
        {
          question: 'What age can children start figure skating?',
          answer: 'Children can start as young as 3 years old. We have programs designed specifically for different age groups, from toddlers to teens.'
        },
        {
          question: 'Do you offer trial lessons?',
          answer: 'Yes! We offer trial lessons for new students. This allows you to experience our teaching style and see if figure skating is right for you or your child.'
        },
        {
          question: 'What should I bring to the first lesson?',
          answer: 'For the first lesson, just bring comfortable clothing and a willingness to learn. We provide skates and all necessary equipment for beginners.'
        },
        {
          question: 'How do I book a lesson?',
          answer: 'You can book a lesson through our online booking system, call us directly, or visit any of our locations. We recommend booking in advance to secure your preferred time slot.'
        },
        {
          question: 'Do you offer group or individual lessons?',
          answer: 'We offer both! Individual lessons provide personalized attention, while group lessons are great for social learning and are more cost-effective.'
        },
        {
          question: 'What safety measures do you have in place?',
          answer: 'Safety is our top priority. All our coaches are certified, we maintain proper ice conditions, and we follow strict safety protocols. First aid kits are available at all locations.'
        }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.contactForm.name && 
             this.contactForm.email && 
             this.contactForm.subject && 
             this.contactForm.message
    }
  },
  methods: {
    async submitForm() {
      if (!this.isFormValid) {
        this.formError = 'Please fill in all required fields.'
        return
      }

      this.isSubmitting = true
      this.formError = ''

      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // In a real implementation, you would send the form data to your backend
        console.log('Contact form data:', this.contactForm)
        
        this.formSuccess = true
        this.resetForm()
        
      } catch (error) {
        console.error('Form submission error:', error)
        this.formError = 'There was an error sending your message. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    },
    resetForm() {
      this.contactForm = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      }
    },
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index
    },
    openInMap(venueName) {
      // In a real implementation, this would open Google Maps or another mapping service
      alert(`Opening ${venueName} in map... (This would open a map application in a real implementation)`)
    }
  }
}
</script>

<style scoped>
.contacts-page {
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

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  margin-bottom: var(--spacing-xxl);
}

.contact-info h2,
.contact-form-section h2 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--accent-red);
  padding-bottom: var(--spacing-sm);
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.contact-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.contact-card h3 {
  color: var(--primary-black);
  margin-bottom: var(--spacing-md);
  font-size: 1.25rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  font-size: 1.25rem;
  margin-top: 2px;
}

.contact-details p {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-gray);
}

.contact-details p:first-child {
  color: var(--primary-black);
  font-weight: 600;
}

.social-section {
  margin-top: var(--spacing-lg);
}

.social-section h3 {
  color: var(--primary-black);
  margin-bottom: var(--spacing-md);
  font-size: 1.125rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--light-gray);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--primary-black);
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.social-link:hover {
  background: var(--accent-red);
  color: var(--primary-white);
  transform: translateY(-1px);
}

.contact-form {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--primary-black);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-red);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
  margin-top: 2px;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.form-message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  text-align: center;
}

.form-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-message h4 {
  margin-bottom: var(--spacing-sm);
  font-size: 1.125rem;
}

.locations-section,
.faq-section {
  margin-bottom: var(--spacing-xxl);
}

.locations-section h2,
.faq-section h2 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  border-bottom: 2px solid var(--accent-red);
  padding-bottom: var(--spacing-sm);
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.location-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-red);
}

.location-card h3 {
  color: var(--accent-red);
  margin-bottom: var(--spacing-sm);
  font-size: 1.25rem;
}

.location-address {
  color: var(--text-gray);
  margin-bottom: var(--spacing-md);
  font-style: italic;
}

.location-details {
  margin-bottom: var(--spacing-md);
  text-align: left;
}

.location-details p {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-gray);
  font-size: 0.9rem;
}

.location-details strong {
  color: var(--primary-black);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-sm);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  background: var(--primary-white);
  border: none;
  padding: var(--spacing-md);
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary-black);
  transition: background-color 0.2s ease;
}

.faq-question:hover {
  background: var(--light-gray);
}

.faq-question.active {
  background: var(--accent-red);
  color: var(--primary-white);
}

.faq-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.faq-answer {
  background: var(--light-gray);
  padding: var(--spacing-md);
  border-top: 1px solid var(--medium-gray);
}

.faq-answer p {
  margin: 0;
  color: var(--text-gray);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .contact-form {
    padding: var(--spacing-lg);
  }
  
  .locations-grid {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .contact-form {
    padding: var(--spacing-md);
  }
  
  .contact-cards {
    gap: var(--spacing-md);
  }
  
  .social-links {
    flex-direction: column;
  }
  
  .social-link {
    justify-content: center;
  }
  
  .location-card {
    padding: var(--spacing-md);
  }
}
</style>