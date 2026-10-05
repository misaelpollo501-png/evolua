import { SICAIntegration } from "./sica-integracao.js";

export class StarkCore {

    constructor(sistema = {}) {

        this.organismo = sistema.organismo || null;
        this.mundo = sistema.mundo || null;
        this.universo = sistema.universo || null;
        this.memoria = sistema.memoria || null;
        this.simulacao = sistema.simulacao || null;
        this.constituicao = sistema.constituicao || null;

        this.cicloAtual = 0;
        this.ativo = false;

        this.historico = [];

        this.sica = new SICAIntegration({
            organismo: this.organismo,
            mundo: this.mundo,
            universo: this.universo,
            memoria: this.memoria
        });

        this.estado = {
            energia: 0,
            saude: 0,
            curiosidade: 0,
            aprendizagem: 0,
            ameaca: 0,
            decisao: null
        };
    }


    iniciar() {

        if (this.ativo) return;

        this.ativo = true;

        this.registrarEvento({
            tipo: "sistema",
            mensagem: "S.T.A.R.K. iniciado."
        });

        return this.getStatus();
    }


    parar() {

        this.ativo = false;

        this.registrarEvento({
            tipo: "sistema",
            mensagem: "S.T.A.R.K. pausado."
        });
    }


    executarCiclo() {

        if (!this.ativo) {
            this.iniciar();
        }


        /*
         * 1 — SIMULAÇÃO
         */

        if (this.simulacao?.executarCiclo) {

            this.simulacao.executarCiclo();

        } else if (this.organismo?.ciclo) {

            this.organismo.ciclo();

        }


        /*
         * 2 — SICA
         */

        const resultado =
            this.sica.executar();


        /*
         * 3 — ATUALIZA ESTADO
         */

        this.cicloAtual++;

        this.atualizarEstado(resultado);


        /*
         * 4 — HISTÓRICO
         */

        this.historico.push({
            ciclo: this.cicloAtual,
            resultado,
            timestamp: Date.now()
        });

        if (this.historico.length > 100) {
            this.historico.shift();
        }


        /*
         * 5 — EVENTO
         */

        this.registrarEvento({
            tipo: "ciclo",
            mensagem:
                `Ciclo ${this.cicloAtual} executado.`
        });


        return resultado;
    }


    executar(ciclos = 1) {

        const resultados = [];

        for (let i = 0; i < ciclos; i++) {

            resultados.push(
                this.executarCiclo()
            );
        }

        return resultados;
    }


    atualizarEstado(resultado) {

        const estado =
            this.organismo?.estado || {};

        this.estado = {

            energia:
                estado.energia ?? 0,

            saude:
                estado.saude ?? 0,

            curiosidade:
                estado.curiosidade ?? 0,

            aprendizagem:
                estado.aprendizagem ?? 0,

            ameaca:
                estado.ameaca ?? 0,

            decisao:
                resultado
                    ?.raciocinio
                    ?.melhorOpcao || null
        };
    }


    registrarEvento(evento) {

        if (this.organismo?.registrarEvento) {

            this.organismo.registrarEvento(
                evento
            );
        }
    }


    obterDecisao() {

        return this.sica.obterDecisao();
    }


    getStatus() {

        return {

            ativo: this.ativo,

            ciclo: this.cicloAtual,

            estado: {
                ...this.estado
            },

            sica:
                this.sica.getStatus(),

            organismo:
                this.organismo?.getStatus
                    ? this.organismo.getStatus()
                    : null,

            mundo:
                this.mundo?.getEstado
                    ? this.mundo.getEstado()
                    : null,

            universo:
                this.universo?.getStatus
                    ? this.universo.getStatus()
                    : null,

            memoria:
                this.memoria?.getStatus
                    ? this.memoria.getStatus()
                    : null
        };
    }


    resetar() {

        this.cicloAtual = 0;
        this.historico = [];

        this.sica.resetar();

        this.estado = {
            energia: 0,
            saude: 0,
            curiosidade: 0,
            aprendizagem: 0,
            ameaca: 0,
            decisao: null
        };

        this.ativo = false;
    }
}
