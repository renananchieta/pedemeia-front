<template>
    <v-navigation-drawer v-model="drawer">
      <v-sheet
        class="pa-4 centralizado"
        position="relative"
        color=""
      >
          <v-img src="../../assets/logo-pedemeia.png" />
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item 
        v-for="(item, index) in items"
        :key="index"
        :to="item.to"
        :color="item.color"
        exact 
        >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar 
      app 
      flat 
      density="comfortable">
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-toolbar-title >Pé de meia | Gestão de Estudantes </v-toolbar-title>
        <v-btn
        @click="toggleTheme"
        size="x-large"
        >
        <v-icon>{{ icon }}</v-icon>
        </v-btn>
    </v-app-bar>
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