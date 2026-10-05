import { SICA } from "./sica.js";

export class SICAIntegration {
    constructor({ organismo, mundo, universo, memoria }) {
        this.organismo = organismo;
        this.mundo = mundo;
        this.universo = universo;
        this.memoria = memoria;

        this.sica = new SICA();

        this.ultimoResultado = null;
        this.ciclos = 0;
        this.ativo = true;
    }

    executar() {
        if (!this.ativo) return null;

        const resultado = this.sica.processar(
            this.mundo,
            this.organismo,
            this.universo
        );

        this.ultimoResultado = resultado;
        this.ciclos++;

        this.aplicarDecisao(resultado);
        this.registrarMemoria(resultado);

        return resultado;
    }

    aplicarDecisao(resultado) {
        const decisao =
            resultado?.raciocinio?.melhorOpcao;

        if (!decisao) return;

        switch (decisao.tipo) {

            case "defesa":
                if (this.mundo?.alterarPerigo) {
                    this.mundo.alterarPerigo(-5);
                }

                if (this.organismo?.reduzirAmeaca) {
                    this.organismo.reduzirAmeaca(5);
                }

                break;

            case "recuperacao":
                if (this.organismo?.recuperarEnergia) {
                    this.organismo.recuperarEnergia(5);
                }

                if (this.organismo?.curar) {
                    this.organismo.curar(3);
                }

                break;

            case "exploracao":
                if (this.organismo?.consumirEnergia) {
                    this.organismo.consumirEnergia(2);
                }

                if (this.organismo?.aumentarCuriosidade) {
                    this.organismo.aumentarCuriosidade(2);
                }

                if (this.organismo?.ganharExperiencia) {
                    this.organismo.ganharExperiencia(2);
                }

                break;

            case "aprendizado":
                if (this.organismo?.aprender) {
                    this.organismo.aprender(2);
                }

                if (this.organismo?.ganharExperiencia) {
                    this.organismo.ganharExperiencia(3);
                }

                break;
        }
    }

    registrarMemoria(resultado) {
        if (!this.memoria?.registrar) return;

        const decisao =
            resultado?.raciocinio?.melhorOpcao;

        this.memoria.registrar({
            tipo: "sica",
            ciclo: this.ciclos,
            foco: resultado?.foco || null,
            predicao: resultado?.predicao || null,
            raciocinio: resultado?.raciocinio || null,
            decisao: decisao || null,
            timestamp: Date.now()
        });
    }

    obterDecisao() {
        return this.ultimoResultado
            ?.raciocinio
            ?.melhorOpcao || null;
    }

    getStatus() {
        return {
            ativo: this.ativo,
            ciclos: this.ciclos,
            sica: this.sica.getStatus(),
            ultimaExecucao: this.ultimoResultado
        };
    }

    resetar() {
        this.sica.resetar();
        this.ultimoResultado = null;
        this.ciclos = 0;
    }
}
