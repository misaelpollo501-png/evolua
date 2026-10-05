export class EvoluaWorld {
  constructor() {
    this.ambiente = "desenvolvimento";
    this.condicoes = {
      crescimento: 1.0,
      desafio: 0.5
    };
  }

  definirAmbiente(nome, fator) {
    this.ambiente = nome;
    this.condicoes.crescimento = fator;
  }

  getEstado() {
    return `🌍 Ambiente: ${this.ambiente} | Fator: ${this.condicoes.crescimento}`;
  }
}

