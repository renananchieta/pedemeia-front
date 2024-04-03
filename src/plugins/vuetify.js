/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const temaEscuro = {
  dark: true,
    colors: {
        background: '#565454',
        primary: '#FFEA00',
        botao: '#FFEA00',
        // surface: '#FFFFFF',
        // secondary: '#03DAC6',
        // 'secondary-darken-1': '#018786',
        // error: '#B00020',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FB8C00',
        //       'cor-menu-background': '#424242',
        //       'cor-card-background': '#424242',

    }
}

const temaClaro = {
  dark: false,
    colors: {
        background: '#ECEFF1',
        primary: '#FFEA00',
        botao: '#3700B3',
        // surface: '#FFFFFF',
        // secondary: '#03DAC6',
        // 'secondary-darken-1': '#018786',
        // error: '#B00020',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FB8C00',
        //       'cor-menu-background': '#424242',
        //       'cor-card-background': '#424242',

    }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'temaEscuro',
    themes: {
      temaEscuro,
      temaClaro,
    }
  },
})
