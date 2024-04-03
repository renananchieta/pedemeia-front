<template>
  <v-container>
    <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    >

    <!-- Dialog que exibe detalhes do estudante -->
    <template v-slot:top>
      <v-dialog
      v-model="dialog"
      max-width="1024px"
      >
          <v-card>
            <v-card-title>
              <span class="text-h5">Detalhes do Estudante</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Nome: {{ estudanteCurrent.nome_aluno }}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">CPF: {{ estudanteCurrent.cpf }}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Número NIS: {{estudanteCurrent.numero_nis}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Data de Nascimento: {{estudanteCurrent.data_nascimento}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Nome da Mãe: {{estudanteCurrent.nome_mae}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Código da Escola: {{estudanteCurrent.cod_escola}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Nome da Escola: {{estudanteCurrent.nome_escola}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">DRE: {{estudanteCurrent.dre}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Município: {{estudanteCurrent.nome_municipio}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Etapa de Ensino: {{estudanteCurrent.etapa_ensino}}</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-2">Elegibilidade: {{estudanteCurrent.status_elegibilidade}}</p>
                  </v-col>
                  <v-col cols="12" md="12">
                    <p class="mb-2">Motivo: {{estudanteCurrent.motivo}}</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="elevated"
                @click="dialog=false"
              >
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </template>

      <template v-slot:item.status_elegibilidade="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
        class="me-2"
        size="small"
        @click="verDetalhes(item)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import api from "@/plugins/api";
import { onMounted, ref } from "vue";
import { useAppStore } from '@/stores/app';


/**
 * Data
 */
const store = useAppStore();
const items = ref([]);
const headers = ref([
    {title:'Aluno', key: 'nome_aluno'},
    {title:'CPF', key: 'cpf'},
    {title:'Unidade de Ensino', key: 'nome_escola'},
    {title:'Elegibilidade', key: 'status_elegibilidade'},
    {title:'Detalhes', key: 'action'},
]);
const loading = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1);
const estudanteCurrent = ref({
  nome_aluno: '',
  cpf: '',
  numero_nis: '',
  data_nascimento: '',
  nome_mae: '',
  cod_escola: '',
  nome_escola: '',
  dre: '',
  nome_municipio: '',
  etapa_ensino: '',
  status_elegibilidade: '',
  motivo: '',
});
const defaultItem = ref({
  nome_aluno: '',
  cpf: '',
  numero_nis: '',
  data_nascimento: '',
  nome_mae: '',
  cod_escola: '',
  nome_escola: '',
  dre: '',
  nome_municipio: '',
  etapa_ensino: '',
  status_elegibilidade: '',
  motivo: '',
});

/**
 * Methods
 */
const getColor = (status_elegibilidade) => {
    if(status_elegibilidade == 'Não elegível') return 'red'
    else if(status_elegibilidade == 'Elegibilidade indefinida') return 'orange'
    else if(status_elegibilidade == 'Elegível') return 'green'
}

const getEstudantes = () => {
    loading.value = true;

    api.get('/estudantes-mec')
    .then((response) => {
        console.log(response.data);
        items.value = response.data.data
        store.qtdSituacaoEstudantes.totalEstudantesCadastrados = response.data.total_registros;
        store.qtdSituacaoEstudantes.totalElegiveis = response.data.total_elegiveis;
        store.qtdSituacaoEstudantes.totalElegiveisPendencia = response.data.total_pendencia;
        store.qtdSituacaoEstudantes.totalInelegiveis = response.data.total_inelegiveis;
    })   
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loading.value = false;
    })
}

const verDetalhes = (item) => {
  console.log(item);
  editedIndex.value = items.value.indexOf(item)
  estudanteCurrent.value = Object.assign({}, item)
  dialog.value = true;
}

/**
 * Hooks
 */
onMounted(() => {
    getEstudantes();
})

</script>

<style scoped>

</style>