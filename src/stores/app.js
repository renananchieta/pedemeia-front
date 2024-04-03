// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    qtdSituacaoEstudantes: {
      totalEstudantesCadastrados: '',
      totalElegiveis: '',
      totalElegiveisPendencia: '',
      totalInelegiveis: '',
    }
  }),
})
