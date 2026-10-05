import { PerceptionSystem }
    from "./percepcao.js";

import { AttentionSystem }
    from "./atencao.js";

import { PredictionSystem }
    from "./predicao.js";

import { ReasoningSystem }
    from "./raciocinio.js";


export class SICA {

    constructor() {

        this.percepcao =
            new PerceptionSystem();

        this.atencao =
            new AttentionSystem();

        this.predicao =
            new PredictionSystem();

        this.raciocinio =
            new ReasoningSystem();

        this.estado = {

            ativo: true,

            ciclos: 0,

            ultimaExecucao: null
        };
    }

    processar(
        mundo,
        organismo,
        universo = null
    ) {

        this.estado.ciclos++;

        // 1 — PERCEPÇÃO

        const percepcao =
            this.percepcao.perceber(
                mundo,
                organismo,
                universo
            );


        // 2 — ATENÇÃO

        const foco =
            this.atencao.analisar(
                percepcao
            );


        // 3 — PREDIÇÃO

        const predicao =
            this.predicao.prever(
                percepcao,
                foco
            );


        // 4 — RACIOCÍNIO

        const raciocinio =
            this.raciocinio.analisar(
                percepcao,
                foco,
                predicao,
                organismo
            );


        this.estado.ultimaExecucao = {

            percepcao,

            foco,

            predicao,

            raciocinio,

            timestamp: Date.now()
        };


        return this.estado.ultimaExecucao;
    }

    getStatus() {

        return {

            ativo:
                this.estado.ativo,

            ciclos:
                this.estado.ciclos,

            percepcao:
                this.percepcao.getStatus(),

            atencao:
                this.atencao.getStatus(),

            predicao:
                this.predicao.getStatus(),

            raciocinio:
                this.raciocinio.getStatus()
        };
    }

    resetar() {

        this.percepcao =
            new PerceptionSystem();

        this.atencao =
            new AttentionSystem();

        this.predicao =
            new PredictionSystem();

        this.raciocinio =
            new ReasoningSystem();

        this.estado = {

            ativo: true,

            ciclos: 0,

            ultimaExecucao: null
        };
    }
}
