class ContentService {
  async loadCoaches() {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}content/coaches.json`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error loading coaches:', error)
      return []
    }
  }

  async loadSchedule() {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}content/schedule.json`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error loading schedule:', error)
      return { venues: {} }
    }
  }

  async loadPrices() {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}content/prices.json`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error loading prices:', error)
      return { programs: [], additional_services: [] }
    }
  }

  async loadShop() {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}content/shop.json`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error loading shop data:', error)
      return { products: [], categories: [] }
    }
  }

  async getCoachByName(name) {
    const coaches = await this.loadCoaches()
    return coaches.find(coach => 
      coach.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  async getCoachById(id) {
    const coaches = await this.loadCoaches()
    return coaches.find(coach => coach.id === parseInt(id))
  }
}

export default new ContentService()