<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card
        width="344"
        height="132"
        >
          <v-card-title >Estudantes Cadastrados</v-card-title>
          <v-card-title class="float-right  blue-text">{{store.qtdSituacaoEstudantes.totalEstudantesCadastrados}}</v-card-title>
            <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
        width="344"
        height="132"
        >
          <v-card-title >Estudantes Elegíveis</v-card-title>
          <v-card-title class="float-right  green-text">{{store.qtdSituacaoEstudantes.totalElegiveis}}</v-card-title>
            <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
        width="344"
        height="132"
        >
          <v-card-title >Elegíveis com Pendências</v-card-title>
          <v-card-title class="float-right  orange-text">{{store.qtdSituacaoEstudantes.totalElegiveisPendencia}}</v-card-title>
            <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text> -->
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
        width="344"
        height="132"
        >
          <v-card-title >Estudantes Inelegíveis</v-card-title>
          <v-card-title class="float-right  red-text">{{store.qtdSituacaoEstudantes.totalInelegiveis}}</v-card-title>
            <!-- <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from '@/stores/app';

/**
 * Data
 */
const store = useAppStore();


</script>

<style scoped>
/* Definindo estilos para as classes de texto */
.blue-text {
  font-size: 34px;
  color: blue;
}

.green-text {
  font-size: 34px;
  color: green;
}

.orange-text {
  font-size: 34px;
  color: orange;
}

.red-text {
  font-size: 34px;
  color: red;
}
</style>