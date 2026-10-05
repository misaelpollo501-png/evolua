export class PerceptionSystem {

    constructor() {
        this.ultimaPercepcao = null;
        this.historico = [];
        this.nivel = 0;
    }

    perceber(mundo, organismo, universo = null) {

        const ambiente = mundo?.getEstado
            ? mundo.getEstado()
            : {};

        const estadoOrganismo = organismo?.getStatus
            ? organismo.getStatus()
            : {};

        const entidades = universo?.getStatus
            ? universo.getStatus().entidades
            : 0;

        const percepcao = {

            ciclo: ambiente.ciclos || 0,

            ambiente: {
                estabilidade:
                    ambiente.estabilidade ?? 0,

                perigo:
                    ambiente.perigo ?? 0,

                recursos:
                    ambiente.recursos ?? 0,

                temperatura:
                    ambiente.temperatura ?? 0,

                energia:
                    ambiente.energia ?? 0
            },

            organismo: {
                energia:
                    estadoOrganismo.energia ?? 0,

                saude:
                    estadoOrganismo.saude ?? 0,

                ameaca:
                    estadoOrganismo.ameaca ?? 0,

                curiosidade:
                    estadoOrganismo.curiosidade ?? 0
            },

            universo: {
                entidades
            },

            timestamp: Date.now()
        };

        this.ultimaPercepcao = percepcao;

        this.historico.push(percepcao);

        if (this.historico.length > 100) {
            this.historico.shift();
        }

        this.nivel = Math.min(
            100,
            this.nivel + 0.5
        );

        return percepcao;
    }

    obterUltima() {
        return this.ultimaPercepcao;
    }

    obterHistorico(limite = 10) {
        return this.historico.slice(-limite);
    }

    getStatus() {
        return {
            nivel: this.nivel,
            historico: this.historico.length,
            ativa: this.ultimaPercepcao !== null
        };
    }
}
