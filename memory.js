export class MemorySystem {
  constructor() {
    this.registros = [];
    this.capacidade = 100;
  }

  guardar(tipo, dado) {
    this.registros.push({
      tipo,
      dado,
      data: new Date().toLocaleString()
    });
    if (this.registros.length > this.capacidade) {
      this.registros.shift();
    }
  }

  listar() {
    return this.registros;
  }
}

