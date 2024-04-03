<template>
    <v-container>
        <!-- Ir para página do pé de meia no gov.br -->
        <v-card @click="navegarParaPedemeiaPage()">
            <v-card-title>Conheça o Pé de meia</v-card-title>
            <div class="d-flex justify-space-around align-center bg-grey-lighten-4">
                <v-img
                    class="align-end text-white"
                    src="../../assets/banner-pedemia.png"
                    width="300"
                >
                    <!-- <v-card-title>Conheça o Pé de meia</v-card-title> -->
            </v-img>
            </div>
        </v-card>
    </v-container>
</template>

<script setup>
import { routerKey } from 'vue-router';

// 

/**
 * Methods
 */
const navegarParaPedemeiaPage = () => {
    window.open('https://www.gov.br/mec/pt-br/pe-de-meia', '_blank');
}
</script>

<style scoped>

</style>