<template>
  <v-app>
    <NavBar/>    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import {useTheme} from "vuetify";

/**
 * Data
 */
const drawer = ref(true);
const icon = ref('mdi-weather-night');
const items = ref([
    {title: 'Home', to: '/home'},
    {title: 'Unidades de Ensino', to: '/unidades-ensino'},
    {title: 'Estudantes', to: '/estudantes'},
    {title: 'Lançar Frequência', to: '/frequencia'},
])

/**
 * Methods
 */
const theme = useTheme();
const toggleTheme = () => {
  icon.value = theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night';
  theme.global.name.value = theme.global.current.value.dark ? 'temaClaro' : 'temaEscuro';
}
</script>

<style scoped>
.v-app-bar {
    position: fixed;
    top: 0;
    z-index: 1001; /* Certifique-se de que o v-app-bar esteja acima do drawer */
    width: 100%;
}
</style>
