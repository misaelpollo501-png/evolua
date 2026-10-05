export class ConstitutionEngine {
  constructor() {
    this.diretrizes = [
      "Evolução contínua e progressiva",
      "Crescimento com propósito",
      "Equilíbrio entre esforço e descanso",
      "Conhecimento gera poder",
      "Persistência transforma potencial em realidade"
    ];
  }

  getPrincipios() {
    return this.diretrizes;
  }

  adicionar(regra) {
    this.diretrizes.push(regra);
  }
}


