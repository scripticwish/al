<template>
  <div class="reviews-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Student Reviews</h1>
        <p class="page-subtitle">What our students and parents say about their experience</p>
        
        <!-- Review Statistics -->
        <div class="review-stats">
          <div class="stat-card">
            <div class="stat-number">4.9</div>
            <div class="stat-label">Average Rating</div>
            <div class="stars">★★★★★</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">150+</div>
            <div class="stat-label">Happy Students</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">Years Experience</div>
          </div>
        </div>

        <!-- Filter Options -->
        <div class="review-filters">
          <button 
            v-for="filter in filters" 
            :key="filter"
            @click="activeFilter = filter"
            :class="['filter-btn', { active: activeFilter === filter }]"
          >
            {{ getFilterLabel(filter) }}
          </button>
        </div>

        <!-- Reviews Grid -->
        <div class="reviews-grid">
          <div 
            v-for="review in filteredReviews" 
            :key="review.id"
            class="review-card"
          >
            <div class="review-header">
              <div class="reviewer-info">
                <div class="reviewer-avatar">
                  {{ review.reviewerName.charAt(0) }}
                </div>
                <div class="reviewer-details">
                  <h4 class="reviewer-name">{{ review.reviewerName }}</h4>
                  <div class="review-meta">
                    <span class="student-type">{{ review.studentType }}</span>
                    <span class="review-date">{{ formatDate(review.date) }}</span>
                  </div>
                </div>
              </div>
              <div class="review-rating">
                <div class="stars">★</div>
                <span class="rating-number">{{ review.rating }}</span>
              </div>
            </div>
            <div class="review-content">
              <h5 class="review-title">{{ review.title }}</h5>
              <p class="review-text">{{ review.text }}</p>
            </div>
            <div class="review-footer">
              <div class="coach-tag" v-if="review.coach">
                Coach: {{ review.coach }}
              </div>
              <div class="location-tag" v-if="review.location">
                {{ review.location }}
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <h3>Ready to join our skating family?</h3>
          <p>Start your own success story with Angel Team</p>
          <router-link to="/booking" class="btn btn-primary btn-lg">
            Book Your First Lesson
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Reviews',
  data() {
    return {
      activeFilter: 'all',
      filters: ['all', '5', '4', '3', 'figure-skating', 'hockey'],
      reviews: [
        {
          id: 1,
          reviewerName: 'Anna Petrov',
          studentType: 'Parent',
          rating: 5,
          title: 'Excellent coaching for beginners',
          text: 'My daughter started skating here when she was 5 years old. The coaches are incredibly patient and professional. She has improved so much and now competes in local competitions.',
          date: '2024-10-15',
          coach: 'Nikolaeva Alisa',
          location: 'TRK RAY'
        },
        {
          id: 2,
          reviewerName: 'Mikhail Sokolov',
          studentType: 'Adult Student',
          rating: 5,
          title: 'Best decision I\'ve made',
          text: 'Started as an adult beginner at 25. The coaches never made me feel embarrassed about learning from scratch. Now I can do basic jumps and spins!',
          date: '2024-09-22',
          coach: 'Esina Ekaterina',
          location: 'TRK OKEANIS'
        },
        {
          id: 3,
          reviewerName: 'Elena Kuznetsova',
          studentType: 'Parent',
          rating: 5,
          title: 'Professional and caring approach',
          text: 'Both my kids train here. The individual attention each child gets is amazing. They have grown not just as skaters but as confident individuals.',
          date: '2024-11-01',
          coach: 'Kostycheva Polina',
          location: 'ul. NARTOVA'
        },
        {
          id: 4,
          reviewerName: 'Dmitri Volkov',
          studentType: 'Parent',
          rating: 5,
          title: 'Outstanding hockey program',
          text: 'My son loves the hockey training here. The coaches are former professional players who really know how to motivate young athletes.',
          date: '2024-10-30',
          coach: 'Kuznetsov Vladimir',
          location: 'Moscow'
        },
        {
          id: 5,
          reviewerName: 'Maria Ivanova',
          studentType: 'Teen Student',
          rating: 4,
          title: 'Great for intermediate skaters',
          text: 'I\'ve been skating here for 2 years. The training is challenging but fair. Coaches push you to do your best while ensuring safety.',
          date: '2024-09-10',
          coach: 'Pashintseva Daria',
          location: 'Nizhny Novgorod'
        },
        {
          id: 6,
          reviewerName: 'Sergei Morozov',
          studentType: 'Parent',
          rating: 5,
          title: 'Wonderful atmosphere',
          text: 'The school has such a positive atmosphere. All the kids support each other, and parents are welcomed into the community.',
          date: '2024-08-25',
          coach: 'Meshcheryakova Nadezhda',
          location: 'Dzerzhinsk'
        },
        {
          id: 7,
          reviewerName: 'Natasha Smirnova',
          studentType: 'Adult Student',
          rating: 5,
          title: 'Perfect for busy adults',
          text: 'The flexible schedule is great for working adults. Evening classes fit perfectly into my routine, and the quality of instruction is top-notch.',
          date: '2024-10-05',
          coach: 'Nikitina Irina',
          location: 'Bogorodsk'
        },
        {
          id: 8,
          reviewerName: 'Alexei Popov',
          studentType: 'Parent',
          rating: 5,
          title: 'Competitive edge',
          text: 'The school prepares kids for competitions really well. My daughter placed 2nd in regionals this year thanks to the excellent training.',
          date: '2024-09-15',
          coach: 'Pavlova Anastasia',
          location: 'TRK OKEANIS'
        }
      ]
    }
  },
  computed: {
    filteredReviews() {
      if (this.activeFilter === 'all') {
        return this.reviews
      }
      
      if (['5', '4', '3'].includes(this.activeFilter)) {
        return this.reviews.filter(review => review.rating === parseInt(this.activeFilter))
      }
      
      if (this.activeFilter === 'figure-skating' || this.activeFilter === 'hockey') {
        return this.reviews.filter(review => 
          review.text.toLowerCase().includes(this.activeFilter) ||
          review.coach?.toLowerCase().includes(this.activeFilter)
        )
      }
      
      return this.reviews
    }
  },
  methods: {
    getFilterLabel(filter) {
      const labels = {
        'all': 'All Reviews',
        '5': '5 Stars',
        '4': '4 Stars',
        '3': '3 Stars',
        'figure-skating': 'Figure Skating',
        'hockey': 'Hockey'
      }
      return labels[filter] || filter
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }
}
</script>

<style scoped>
.reviews-page {
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

.review-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.stat-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--accent-red);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  color: var(--text-gray);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.stars {
  color: #ffd700;
  font-size: 1.25rem;
  letter-spacing: 1px;
}

.review-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--primary-white);
  border: 2px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  color: var(--primary-black);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--accent-red);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--accent-red);
  border-color: var(--accent-red);
  color: var(--primary-white);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.review-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-red);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  background: var(--accent-red);
  color: var(--primary-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  color: var(--primary-black);
  margin-bottom: var(--spacing-xs);
  font-size: 1rem;
  font-weight: 600;
}

.review-meta {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.student-type {
  color: var(--accent-red);
  font-size: 0.875rem;
  font-weight: 500;
}

.review-date {
  color: var(--text-gray);
  font-size: 0.75rem;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.review-rating .stars {
  color: #ffd700;
  font-size: 1rem;
}

.rating-number {
  color: var(--accent-red);
  font-weight: 600;
  font-size: 1rem;
}

.review-content {
  margin-bottom: var(--spacing-md);
}

.review-title {
  color: var(--primary-black);
  margin-bottom: var(--spacing-sm);
  font-size: 1.125rem;
  font-weight: 600;
}

.review-text {
  color: var(--text-gray);
  line-height: 1.6;
  font-size: 0.95rem;
}

.review-footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--light-gray);
}

.coach-tag,
.location-tag {
  background: var(--light-gray);
  color: var(--text-gray);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
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
  .review-stats {
    grid-template-columns: 1fr;
  }
  
  .review-filters {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  
  .review-header {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .review-rating {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .stat-card {
    padding: var(--spacing-lg);
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .review-card {
    padding: var(--spacing-md);
  }
  
  .review-footer {
    flex-direction: column;
  }
}
</style>