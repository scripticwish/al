import { createI18n as createVueI18n } from 'vue-i18n'

// Language detection function
function detectUserLanguage() {
  // Get browser language
  const browserLang = navigator.language || navigator.userLanguage
  const lang = browserLang.split('-')[0]
  
  // If Russian, use Russian, otherwise default to English
  if (lang === 'ru') {
    return 'ru'
  }
  return 'en'
}

// Messages object
const messages = {
  en: {
    nav: {
      about: 'About',
      schedule: 'Schedule',
      coaches: 'Coaches',
      reviews: 'Reviews',
      hockey: 'Hockey',
      contacts: 'Contacts',
      booking: 'BOOKING'
    },
    hero: {
      title: 'ANGEL TEAM',
      subtitle: 'From First Steps to Olympic Dreams',
      description: 'Professional figure skating and hockey training for children and adults. Our experienced coaches help you achieve your skating goals, from beginner basics to competitive excellence.',
      bookTraining: 'BOOK A TRAINING'
    },
    achievements: {
      champions: {
        number: '21',
        title: 'Champions and winners of All-Russian competitions'
      },
      masters: {
        number: '3',
        title: 'Candidate Masters of Sports'
      }
    },
    advantages: {
      title: 'Our Advantages',
      coaches: {
        title: 'COACHES',
        description: 'Professional athletes, CMS'
      },
      locations: {
        title: '9 LOCATIONS',
        description: 'Nizhny Novgorod, Moscow, Bogorodsk, Dzerzhinsk'
      },
      training: {
        title: 'PROFESSIONAL TRAINING',
        description: 'Preparation for SOR, choreography, SFP, stretching'
      },
      competitions: {
        title: 'COMPETITIONS',
        description: 'Participation from 2nd month of training'
      },
      pros: {
        title: 'WORK WITH PROS',
        description: 'Program setup, jumps, rotations'
      }
    },
    coach: {
      learnMore: 'Learn More',
      bookWithCoach: 'BOOK WITH COACH'
    },
    common: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    }
  },
  ru: {
    nav: {
      about: 'О нас',
      schedule: 'Расписание',
      coaches: 'Тренеры',
      reviews: 'Отзывы',
      hockey: 'Хоккей',
      contacts: 'Контакты',
      booking: 'ЗАПИСЬ'
    },
    hero: {
      title: 'ANGEL TEAM',
      subtitle: 'От первых шагов до олимпийских мечтаний',
      description: 'Профессиональные тренировки по фигурному катанию и хоккею для детей и взрослых. Наши опытные тренеры помогут вам достичь ваших целей в катании, от основ для начинающих до спортивного мастерства.',
      bookTraining: 'ЗАПИСАТЬСЯ НА ТРЕНИРОВКУ'
    },
    achievements: {
      champions: {
        number: '21',
        title: 'Чемпионы и призеры Всероссийских соревнований'
      },
      masters: {
        number: '3',
        title: 'Кандидаты в мастера спорта'
      }
    },
    advantages: {
      title: 'Наши преимущества',
      coaches: {
        title: 'ТРЕНЕРЫ',
        description: 'Профессиональные спортсмены, КМС'
      },
      locations: {
        title: '9 ЛОКАЦИЙ',
        description: 'Нижний Новгород, Москва, Богородск, Дзержинск'
      },
      training: {
        title: 'ПРОФЕССИОНАЛЬНАЯ ТРЕНИРОВКА',
        description: 'Подготовка к СОР, хореография, СФП, растяжка'
      },
      competitions: {
        title: 'СОРЕВНОВАНИЯ',
        description: 'Участие со 2-го месяца тренировок'
      },
      pros: {
        title: 'РАБОТА С ПРОФИ',
        description: 'Постановка программ, прыжки, вращения'
      }
    },
    coach: {
      learnMore: 'Узнать больше',
      bookWithCoach: 'ЗАПИСАТЬСЯ К ТРЕНЕРУ'
    },
    common: {
      monday: 'Понедельник',
      tuesday: 'Вторник',
      wednesday: 'Среда',
      thursday: 'Четверг',
      friday: 'Пятница',
      saturday: 'Суббота',
      sunday: 'Воскресенье'
    }
  }
}

export function createI18n() {
  const detectedLang = detectUserLanguage()
  
  return createVueI18n({
    legacy: false,
    locale: detectedLang,
    fallbackLocale: 'en',
    messages,
  })
}