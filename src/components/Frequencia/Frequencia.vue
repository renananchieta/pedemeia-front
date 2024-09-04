<template>
    <v-card class="ma-2">
        <v-card-title>Controle de envio de frequência de estudantes por lotes</v-card-title>
        
        <!-- <v-card-text class="text-subtitle-1">Total de lotes enviados: {{ total_lotes }}</v-card-text> -->

        <v-divider></v-divider>

        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.mes"
                        variant="outlined"
                        density="compact"
                        label="Mês de Referência"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.ano"
                        variant="outlined"
                        density="compact"
                        label="Ano de Referência"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select
                        v-model="form.acao"
                        :items="comboAcao"
                        item-title="acao"
                        item-value="acao"
                        variant="outlined"
                        density="compact"
                        label="Ação"/>
                    </v-col>
                </v-row>
                
                <v-card-actions>
                    <v-btn variant="elevated" color="blue" :loading="loadingLotes" @click="carregarLotesAcao()">
                        Pesquisar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

    <v-card class="ma-2">
        <v-data-table
        :headers="headers"
        :items="items">

        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Total de Lotes da ação ' {{ form.acao }} ': {{ totalLoteAcao }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>

        </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
        <v-sheet
        class="pa-4 text-center mx-auto"
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%">
            <v-icon
            class="mb-5"
            :color="color"
            :icon="icon"
            size="112"></v-icon>
            <h2 class="text-h5 mb-6">{{ mensagemTitle }}</h2>

            <v-divider class="mb-4"></v-divider>

            <div class="text-end">
                <v-btn
                v-if="color !== 'red-darken-3'"
                class="text-none mx-1"
                :color="color"
                variant="flat"
                width="150"
                rounded
                @click="AbrirModalDeValidacao()">
                    Validar Acesso
                </v-btn>

                <v-btn
                class="text-none"
                :color="color"
                variant="flat"
                width="90"
                rounded
                @click="dialog = false">
                    Fechar
                </v-btn>
            </div>
        </v-sheet>
    </v-dialog>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted, ref } from 'vue';

/**
 * Data
 */ 
const loadingLotes = ref(false);
const total_lotes = ref(0);
const form = ref({
    mes: "",
    ano: "",
    acao: ""
});

const headers = ref([
    { title: 'Lote', key: 'lote'},
    { title: 'Ação', key: 'acao'},
    { title: 'Envio', key: 'created_at'},
    { title: 'Clique', align: 'end', key: 'action'},
]);
const items = ref([]);
const comboAcao = ref([]);
const totalLoteAcao = ref(0);
const mensagemTitle = ref('');
const color = ref('');
const icon = ref('');
const dialog = ref(false);

/**
 * Methods
 */
const carregarLotesAcao = () => {
    loadingLotes.value = true;

    api.get('lotes-enviados/acao', {params: form.value})
    .then((response) => {
         console.log('teste', response.data);
         if(response.data.error == 'Informe a ação de referência.'){
            icon.value = 'mdi mdi-alert-circle';
            color.value = 'red-darken-3';
            mensagemTitle.value = response.data.error;
            dialog.value = true;
         } else {
            totalLoteAcao.value = response.data.total;
            items.value = response.data.data;
         }
        //  items.value = response.data;
    })
    .catch((error) => {
        console.log(error);
        // icon.value = 'mdi mdi-alert-circle';
        // color.value = 'red-darken-3';
        // mensagemTitle.value = error.error;
        // dialog.value = true;
    })
    .finally(() => {
        loadingLotes.value = false;
    })
}

const getCombos = () => {
    loadingLotes.value = true;

    api.get('lotes-enviados/combos')
    .then((response) => {
        comboAcao.value = response.data.acao;
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loadingLotes.value = false;
    })
}
/**
 * Hooks
 */
onMounted(() => {
    getCombos();
})


</script>

<style scoped>

</style>