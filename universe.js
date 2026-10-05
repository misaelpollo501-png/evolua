export class EvoluaUniverse {
  constructor() {
    this.leis = {
      evolucaoContinua: true,
      causaEfeito: true,
      crescimentoExponencial: false
    };
    this.versao = "1.0.0";
  }

  getLeis() {
    return Object.entries(this.leis)
      .map(([lei, ativa]) => `${ativa ? '✅' : '❌'} ${lei}`)
      .join('\n');
  }
}

