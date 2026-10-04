<template>
  <div class="shop-page">
    <section class="section">
      <div class="container">
        <h1 class="page-title">Angel Team Shop</h1>
        <p class="page-subtitle">Official merchandise and training gear for figure skaters</p>
        
        <!-- Category Filter -->
        <div class="category-filter">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="['category-btn', { active: activeCategory === category.id }]"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Products Grid -->
        <div class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
          >
            <div class="product-image">
              <div class="placeholder-image">
                {{ product.name }}
              </div>
              <div class="product-badge" v-if="product.category === 'costumes'">
                Professional
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">
                <span class="price">{{ product.price }}{{ product.currency }}</span>
              </div>
              <div class="product-options">
                <div class="size-options" v-if="product.sizes">
                  <label>Size:</label>
                  <select v-model="selectedSizes[product.id]" class="size-select">
                    <option v-for="size in product.sizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>
                <div class="color-options" v-if="product.colors">
                  <label>Color:</label>
                  <select v-model="selectedColors[product.id]" class="color-select">
                    <option v-for="color in product.colors" :key="color" :value="color">
                      {{ color }}
                    </option>
                  </select>
                </div>
              </div>
              <button 
                @click="addToCart(product)"
                class="btn btn-primary btn-block"
                :disabled="!selectedSizes[product.id] && product.sizes"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div v-if="cart.length > 0" class="cart-summary">
          <h2>Cart Summary</h2>
          <div class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <div class="cart-item-info">
                <h4>{{ item.name }}</h4>
                <p>Size: {{ item.size || 'N/A' }} | Color: {{ item.color || 'N/A' }}</p>
                <p>Quantity: {{ item.quantity }}</p>
              </div>
              <div class="cart-item-price">
                <span class="price">{{ item.price * item.quantity }}{{ item.currency }}</span>
                <button @click="removeFromCart(item.id)" class="btn-remove">Remove</button>
              </div>
            </div>
          </div>
          <div class="cart-total">
            <h3>Total: {{ cartTotal }}{{ currency }}</h3>
            <button @click="checkout" class="btn btn-primary btn-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>

        <!-- Contact for Orders -->
        <div class="contact-section">
          <h3>Need Help with Your Order?</h3>
          <p>Contact us for custom orders, sizing advice, or any questions about our products.</p>
          <router-link to="/contacts" class="btn btn-outline">
            Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import contentService from '../services/contentService.js'

export default {
  name: 'Shop',
  data() {
    return {
      products: [],
      categories: [],
      activeCategory: '',
      selectedSizes: {},
      selectedColors: {},
      cart: []
    }
  },
  computed: {
    filteredProducts() {
      if (!this.activeCategory) {
        return this.products
      }
      return this.products.filter(product => product.category === this.activeCategory)
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    currency() {
      return this.products.length > 0 ? this.products[0].currency : '₽'
    }
  },
  async mounted() {
    await this.loadShop()
  },
  methods: {
    async loadShop() {
      try {
        const shopData = await contentService.loadShop()
        this.products = shopData.products || []
        this.categories = shopData.categories || []
        if (this.categories.length > 0) {
          this.activeCategory = this.categories[0].id
        }
      } catch (error) {
        console.error('Error loading shop data:', error)
        this.products = []
        this.categories = []
      }
    },
    addToCart(product) {
      if (product.sizes && !this.selectedSizes[product.id]) {
        alert('Please select a size')
        return
      }
      
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        size: this.selectedSizes[product.id] || null,
        color: this.selectedColors[product.id] || null,
        quantity: 1
      }
      
      // Check if item already exists in cart
      const existingItemIndex = this.cart.findIndex(item => 
        item.id === cartItem.id && 
        item.size === cartItem.size && 
        item.color === cartItem.color
      )
      
      if (existingItemIndex >= 0) {
        this.cart[existingItemIndex].quantity++
      } else {
        this.cart.push(cartItem)
      }
      
      // Clear selections
      this.selectedSizes[product.id] = ''
      this.selectedColors[product.id] = ''
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter(item => {
        // Create unique identifier for cart item
        return `${item.id}-${item.size || 'nosize'}-${item.color || 'nocolor'}` !== itemId
      })
    },
    checkout() {
      alert('Thank you for your order! You will be redirected to complete your purchase.')
      this.cart = []
    }
  }
}
</script>

<style scoped>
.shop-page {
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

.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.category-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--primary-white);
  border: 2px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  color: var(--primary-black);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  border-color: var(--accent-red);
  transform: translateY(-2px);
}

.category-btn.active {
  background: var(--accent-red);
  border-color: var(--accent-red);
  color: var(--primary-white);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.product-card {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-red);
}

.product-image {
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
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.product-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: var(--primary-black);
  color: var(--primary-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.product-info {
  padding: var(--spacing-lg);
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-black);
  margin-bottom: var(--spacing-sm);
}

.product-description {
  color: var(--text-gray);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
  font-size: 0.9rem;
}

.product-price {
  margin-bottom: var(--spacing-md);
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-red);
}

.product-options {
  margin-bottom: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.size-options,
.color-options {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.size-options label,
.color-options label {
  font-weight: 500;
  color: var(--primary-black);
  font-size: 0.9rem;
  min-width: 40px;
}

.size-select,
.color-select {
  flex: 1;
  padding: var(--spacing-xs);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.cart-summary {
  background: var(--light-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.cart-summary h2 {
  font-size: var(--font-size-h2);
  color: var(--primary-black);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.cart-items {
  margin-bottom: var(--spacing-lg);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--primary-white);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-sm);
  border: 1px solid var(--medium-gray);
}

.cart-item-info h4 {
  color: var(--primary-black);
  margin-bottom: var(--spacing-xs);
  font-size: 1rem;
}

.cart-item-info p {
  color: var(--text-gray);
  margin: 0;
  font-size: 0.875rem;
}

.cart-item-price {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.cart-item-price .price {
  color: var(--accent-red);
  font-weight: 600;
}

.btn-remove {
  background: #dc3545;
  color: var(--primary-white);
  border: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  cursor: pointer;
}

.cart-total {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--medium-gray);
}

.cart-total h3 {
  color: var(--primary-black);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-h3);
}

.contact-section {
  background: var(--primary-white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
}

.contact-section h3 {
  color: var(--primary-black);
  margin-bottom: var(--spacing-sm);
}

.contact-section p {
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .category-filter {
    flex-direction: column;
    align-items: center;
  }
  
  .category-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .cart-item-price {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .product-info {
    padding: var(--spacing-md);
  }
  
  .cart-summary {
    padding: var(--spacing-lg);
  }
  
  .contact-section {
    padding: var(--spacing-lg);
  }
}
</style>