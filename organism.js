export class EvoluaOrganism {

    constructor(nome = "STARK") {
        this.nome = nome;

        this.estado = {
            energia: 100,
            saude: 100,
            experiencia: 0,
            nivel: 1,

            curiosidade: 50,
            aprendizagem: 0,

            ameaca: 0,
            dividaEvolutiva: 0,

            estabilidade: 100,
            adaptacao: 0,

            idade: 0,
            ciclos: 0
        };

        this.necessidades = {
            energia: 100,
            seguranca: 100,
            conhecimento: 50,
            estabilidade: 100
        };

        this.capacidades = {
            percepcao: 0,
            atencao: 0,
            predicao: 0,
            raciocinio: 0,
            memoria: 0,
            adaptacao: 0
        };

        this.historico = [];
    }

    consumirEnergia(valor = 1) {
        this.estado.energia = Math.max(
            0,
            this.estado.energia - valor
        );
    }

    recuperarEnergia(valor = 1) {
        this.estado.energia = Math.min(
            100,
            this.estado.energia + valor
        );
    }

    receberDano(valor = 1) {
        this.estado.saude = Math.max(
            0,
            this.estado.saude - valor
        );

        this.estado.ameaca = Math.min(
            100,
            this.estado.ameaca + valor
        );
    }

    curar(valor = 1) {
        this.estado.saude = Math.min(
            100,
            this.estado.saude + valor
        );
    }

    ganharExperiencia(valor = 1) {
        this.estado.experiencia += valor;

        const experienciaNecessaria =
            this.estado.nivel * 100;

        if (this.estado.experiencia >= experienciaNecessaria) {
            this.estado.experiencia -= experienciaNecessaria;
            this.estado.nivel++;

            this.estado.adaptacao += 5;
        }
    }

    aprender(valor = 1) {
        this.estado.aprendizagem = Math.min(
            100,
            this.estado.aprendizagem + valor
        );

        this.capacidades.memoria =
            Math.min(100, this.capacidades.memoria + valor * 0.2);
    }

    aumentarCuriosidade(valor = 1) {
        this.estado.curiosidade = Math.min(
            100,
            this.estado.curiosidade + valor
        );
    }

    reduzirCuriosidade(valor = 1) {
        this.estado.curiosidade = Math.max(
            0,
            this.estado.curiosidade - valor
        );
    }

    aumentarAmeaca(valor = 1) {
        this.estado.ameaca = Math.min(
            100,
            this.estado.ameaca + valor
        );
    }

    reduzirAmeaca(valor = 1) {
        this.estado.ameaca = Math.max(
            0,
            this.estado.ameaca - valor
        );
    }

    adaptar(valor = 1) {
        this.estado.adaptacao = Math.min(
            100,
            this.estado.adaptacao + valor
        );

        this.estado.dividaEvolutiva = Math.max(
            0,
            this.estado.dividaEvolutiva
          );
    }

    registrarEvento(evento) {
        this.historico.push({
            ciclo: this.estado.ciclos,
            evento,
            timestamp: Date.now()
        });

        if (this.historico.length > 100) {
            this.historico.shift();
        }
    }

    ciclo() {
        this.estado.ciclos++;
        this.estado.idade++;

        this.consumirEnergia(0.5);

        if (this.estado.energia < 20) {
            this.estado.dividaEvolutiva += 0.5;
        }

        if (this.estado.ameaca > 70) {
            this.estado.estabilidade =
                Math.max(0, this.estado.estabilidade - 1);
        } else {
            this.estado.estabilidade =
                Math.min(100, this.estado.estabilidade + 0.2);
        }

        this.registrarEvento("Ciclo executado");
    }

    getStatus() {
        return {
            nome: this.nome,
            ...this.estado,
            capacidades: { ...this.capacidades }
        };
    }
}
