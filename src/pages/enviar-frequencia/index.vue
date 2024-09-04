<template>
    <v-card class="ma-2">
        <v-card-title>Envio de frequência RAND. de estudantes por lotes</v-card-title>
        
        <v-card-text class="text-subtitle-1">Enviar frequências rand. dos estudantes.</v-card-text>

        <v-divider></v-divider>

        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                        v-model="form.mesReferencia"
                        variant="outlined"
                        density="compact"
                        maxlength="2"
                        :rules="[rules.required, rules.counterMes]"
                        label="Mês de Referência"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                        v-model="form.anoReferencia"
                        variant="outlined"
                        density="compact"
                        maxlength="4"
                        :rules="[rules.required, rules.counterAno]"
                        label="Ano de Referência"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                        v-model="form.paginaAtual"
                        variant="outlined"
                        density="compact"
                        maxlength="4"
                        :rules="[rules.required]"
                        label="Página atual"/>
                    </v-col>
                </v-row>
                
                <v-card-actions>
                    <v-btn variant="elevated" color="blue" :loading="loadingLotes" @click="enviarFrequenciaRand()">
                        Enviar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
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
            size="112"
            ></v-icon>
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

    <v-dialog v-model="dialogConfirm" max-width="600px">
        <v-card>
            <v-card-text class="text-center font-weight-bold">VOCÊ TEM CERTEZA QUE DESEJA ENVIAR FREQUÊNCIA RAND.?</v-card-text>
            <v-card-actions class="d-flex justify-center align-center">
                <v-btn
                class="mr-1"
                color="success"
                variant="elevated"
                :loading="loadingLotes"
                @click="ajaxEnviarFrequenciaConfirm()">
                    confirmar
                </v-btn>
                <v-btn
                class="mr-1"
                color="warning"
                variant="elevated"
                @click="dialogConfirm=false">
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAlert" max-width="600px">
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
            <p class="mb-4 text-medium-emphasis text-body-2">{{ mensagemBody }}</p>

            <v-divider class="mb-4"></v-divider>
            <div class="text-end">
                <v-btn
                class="text-none"
                :color="color"
                variant="flat"
                width="90"
                rounded
                @click="fecharTudo()"
                >
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
    mesReferencia: "",
    anoReferencia: "",
    paginaAtual: "",
});

const items = ref([]);
const totalLoteAcao = ref(0);
const mensagemTitle = ref('');
const mensagemBody = ref('');
const color = ref('');
const icon = ref('');
const dialog = ref(false);
const dialogAlert = ref(false);
const dialogConfirm = ref(false);

/**
 * Rules
 */
 const rules = {
  required: value => {
    return !!value || 'Campo Obrigatório.';
  },
  counterMes: value => {
    return value.length >= 2 || 'Informe 2 dígitos';
  },
  counterAno: value => {
    return value.length >= 4 || 'Informe 4 dígitos';
  },
//   email: value => {
//     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return pattern.test(value) || 'E-mail inválido.';
//   },
//   confirmEmail: value => value === formDadosEdit.value.email || 'Os e-mails devem ser iguais.'
};

/**
 * Methods
 */

const ajaxEnviarFrequenciaConfirm = () => {
    // console.log('Enviado', form.value);
    
    loadingLotes.value = true;

    api.get('mec-api/frequencias-mensais/lote/envio', { params: form.value})
    .then((response) => {
         console.log(response.data);
        //  if(response.data.error == 'Informe a ação de referência.'){
        //     icon.value = 'mdi mdi-alert-circle';
        //     color.value = 'red-darken-3';
        //     mensagemTitle.value = response.data.error;
        //     dialog.value = true;
        //  } else {
        //     totalLoteAcao.value = response.data.total;
        //     items.value = response.data.data;
        //  }
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
        fecharTudo();
    })
}

const enviarFrequenciaRand = () => {
    const mesReferenciaValidate = rules.required(form.value.mesReferencia);
    const anoReferenciaValidate = rules.required(form.value.anoReferencia);
    const mesReferenciaCounterValidate = rules.counterMes(form.value.mesReferencia);
    const anoReferenciaCounterValidate = rules.counterAno(form.value.anoReferencia);
    const paginaAtualValidate = rules.required(form.value.paginaAtual);

    if(mesReferenciaValidate !== true) {
        icon.value = 'mdi mdi-alert-circle';
        color.value = 'red-darken-3';
        mensagemTitle.value = 'Mês de referência é obrigatório.';
        mensagemBody.value = 'Informe seu mês de referência.';
        dialogAlert.value = true;
        loadingLotes.value = false;
        return;
    }

    if(form.value.mesReferencia.length < 2) {
        icon.value = 'mdi mdi-alert-circle';
        color.value = 'red-darken-3';
        mensagemTitle.value = 'Mês de referência deve conter 2 dígitos.';
        mensagemBody.value = 'Informe seu mês de referência com 2 dígitos.';
        dialogAlert.value = true;
        loadingLotes.value = false;
        return;
    }

    if(anoReferenciaValidate !== true) {
        icon.value = 'mdi mdi-alert-circle';
        color.value = 'red-darken-3';
        mensagemTitle.value = 'Ano de referência é obrigatório.';
        mensagemBody.value = 'Informe o ano de referência.';
        dialogAlert.value = true;
        loadingLotes.value = false;
        return;
    }

    if(form.value.anoReferencia.length < 4) {
        icon.value = 'mdi mdi-alert-circle';
        color.value = 'red-darken-3';
        mensagemTitle.value = 'Ano de referência deve conter 4 dígitos.';
        mensagemBody.value = 'Informe seu ano de referência com 4 dígitos.';
        dialogAlert.value = true;
        loadingLotes.value = false;
        return;
    }

    if(paginaAtualValidate !== true) {
        icon.value = 'mdi mdi-alert-circle';
        color.value = 'red-darken-3';
        mensagemTitle.value = 'Página atual é obrigatório.';
        mensagemBody.value = 'Informe a págiina atual de envio.';
        dialogAlert.value = true;
        loadingLotes.value = false;
        return;
    }

    // if(form.value.paginaAtual.length =) {
    //     icon.value = 'mdi mdi-alert-circle';
    //     color.value = 'red-darken-3';
    //     mensagemTitle.value = 'Ano de referência deve conter 4 dígitos.';
    //     mensagemBody.value = 'Informe seu ano de referência com 4 dígitos.';
    //     dialogAlert.value = true;
    //     loadingLotes.value = false;
    //     return;
    // }

    dialogConfirm.value = true;
}

const fecharTudo = () => {
    dialog.value = false;
    dialogConfirm.value = false;
    dialogAlert.value = false;
}

/**
 * Hooks
 */
onMounted(() => {

})


</script>

<style scoped>

</style>