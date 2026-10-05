export class SimulationEngine {

    constructor(mundo, organismo, universo = null, memoria = null) {

        this.mundo = mundo;

        this.organismo = organismo;

        this.universo = universo;

        this.memoria = memoria;

        this.ciclos = 0;

        this.rodando = false;

        this.historico = [];
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

    executarCiclo() {

        this.ciclos++;

        // 1. Mundo
        const evento =
            this.mundo?.ciclo?.();

        // 2. Universo
        this.universo?.ciclo?.();

        // 3. Organismo
        this.organismo?.ciclo?.();

        // 4. Reação aos eventos
        if (evento) {

            if (evento.tipo === "ameaça") {

                this.organismo.aumentarAmeaca(
                    evento.intensidade
                );

                this.organismo.receberDano(
                    evento.intensidade * 0.1
                );

            }

            if (evento.tipo === "recurso") {

                this.organismo.recuperarEnergia(
                    evento.intensidade * 0.3
                );

                this.organismo.aumentarCuriosidade(
                    2
                );

                this.organismo.ganharExperiencia(
                    2
                );
            }

            if (this.memoria) {

                this.memoria.registrar(
                    evento.tipo,
                    {
                        ciclo: this.ciclos,
                        evento
                    },
                    evento.tipo === "ameaça"
                        ? 80
                        : 50
                );
            }
        }

        // 5. Adaptação
        this.organismo.adaptar(0.2);

        // 6. Experiência geral
        this.organismo.ganharExperiencia(1);

        const resultado = {

            ciclo: this.ciclos,

            organismo:
                this.organismo.getStatus(),

            mundo:
                this.mundo.getEstado(),

            evento
        };

        this.historico.push(resultado);

        if (this.historico.length > 100) {
            this.historico.shift();
        }

        return resultado;
    }

    iniciar() {

        this.rodando = true;

        return this.executarCiclo();
    }

    parar() {

        this.rodando = false;
    }

    resetar() {

        this.ciclos = 0;

        this.historico = [];

        this.rodando = false;
    }

    getStatus() {

        return {

            ciclos: this.ciclos,

            rodando: this.rodando,

            historico: this.historico.length
        };
    }
}
