export class MemorySystem {

    constructor(capacidade = 1000) {

        this.registros = [];

        this.capacidade = capacidade;

        this.estatisticas = {
            total: 0,
            positivas: 0,
            negativas: 0,
            importantes: 0
        };
    }

    registrar(tipo, dado = {}, importancia = 1) {

        const memoria = {

            id: `memory_${Date.now()}_${Math.random()
                .toString(36)
                .slice(2, 6)}`,

            tipo,

            dado,

            importancia: Math.max(
                0,
                Math.min(100, importancia)
            ),

            ciclo: dado.ciclo ?? null,

            timestamp: Date.now()
        };

        this.registros.push(memoria);

        this.estatisticas.total++;

        if (
            tipo === "sucesso" ||
            tipo === "recompensa"
        ) {
            this.estatisticas.positivas++;
        }

        if (
            tipo === "falha" ||
            tipo === "ameaça"
        ) {
            this.estatisticas.negativas++;
        }

        if (importancia >= 70) {
            this.estatisticas.importantes++;
        }

        this._limitar();

        return memoria;
    }

    _limitar() {

        if (this.registros.length <= this.capacidade) {
            return;
        }

        this.registros.sort(
            (a, b) => a.importancia - b.importancia
        );

        this.registros.shift();
    }

    buscarPorTipo(tipo) {

        return this.registros.filter(
            memoria => memoria.tipo === tipo
        );
    }

    buscarRecentes(limite = 10) {

        return this.registros
            .slice(-limite)
            .reverse();
    }

    buscarImportantes(limite = 10) {

        return [...this.registros]
            .sort(
                (a, b) =>
                    b.importancia - a.importancia
            )
            .slice(0, limite);
    }

    lembrar() {

        return this.buscarRecentes(10);
    }

    aprenderComExperiencia(experiencia) {

        if (!experiencia) return;

        const sucesso = experiencia.sucesso === true;

        this.registrar(
            sucesso ? "sucesso" : "falha",
            experiencia,
            sucesso ? 60 : 80
        );
    }

    obterMemorias() {

        return [...this.registros];
    }

    getStatus() {

        return {

            quantidade: this.registros.length,

            capacidade: this.capacidade,

            estatisticas: {
                ...this.estatisticas
            },

            recentes: this.buscarRecentes(5)
        };
    }
}
