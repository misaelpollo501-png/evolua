export class SimulationEngine {
  constructor(mundo, organismo) {
    this.mundo = mundo;
    this.organismo = organismo;
    this.rodando = false;
    this.ciclos = 0;
  }

  executar(ciclos = 1) {
    this.rodando = true;
    for (let i = 0; i < ciclos; i++) {
      this.ciclos++;
      this.organismo.evoluir(Math.floor(10 * this.mundo.condicoes.crescimento));
    }
    this.rodando = false;
    return `✅ ${ciclos} ciclo(s) executado(s)!`;
  }
}

