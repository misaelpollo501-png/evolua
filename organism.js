export class EvoluaOrganism {
  constructor(nome = "Evolua") {
    this.nome = nome;
    this.estado = { energia: 100, experiencia: 0, nivel: 1 };
  }
  evoluir(pontos) {
    this.estado.experiencia += pontos;
    if (this.estado.experiencia >= this.estado.nivel * 100) {
      this.estado.nivel++;
      console.log(`🎉 ${this.nome} subiu para o nível ${this.estado.nivel}!`);
    }
  }
  getStatus() {
    return `${this.nome} — Nível ${this.estado.nivel} | ⚡${this.estado.energia} | ✨${this.estado.experiencia}`;
  }
}
