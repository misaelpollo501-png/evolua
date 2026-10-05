export class EvoluaWorld {

    constructor(nome = "Mundo Inicial") {

        this.nome = nome;

        this.estado = {
            ambiente: 50,
            recursos: 100,
            estabilidade: 100,
            perigo: 0,
            temperatura: 50,
            energia: 100
        };

        this.ciclos = 0;

        this.eventos = [];
    }

    adicionarEvento(tipo, intensidade = 1, descricao = "") {

        const evento = {

            id: `event_${Date.now()}`,

            ciclo: this.ciclos,

            tipo,

            intensidade,

            descricao,

            timestamp: Date.now()
        };

        this.eventos.push(evento);

        if (this.eventos.length > 100) {
            this.eventos.shift();
        }

        return evento;
    }

    alterarRecursos(valor) {

        this.estado.recursos = Math.max(
            0,
            Math.min(
                100,
                this.estado.recursos + valor
            )
        );
    }

    alterarPerigo(valor) {

        this.estado.perigo = Math.max(
            0,
            Math.min(
                100,
                this.estado.perigo + valor
            )
        );
    }

    atualizarAmbiente() {

        const variacao =
            (Math.random() - 0.5) * 4;

        this.estado.ambiente = Math.max(
            0,
            Math.min(
                100,
                this.estado.ambiente + variacao
            )
        );
    }

    gerarEvento() {

        const chance = Math.random();

        if (chance < 0.15) {

            this.alterarPerigo(10);

            return this.adicionarEvento(
                "ameaça",
                10,
                "Uma ameaça surgiu no ambiente."
            );
        }

        if (chance < 0.30) {

            this.alterarRecursos(15);

            return this.adicionarEvento(
                "recurso",
                15,
                "Novos recursos foram encontrados."
            );
        }

        if (chance < 0.40) {

            this.estado.estabilidade =
                Math.max(
                    0,
                    this.estado.estabilidade - 5
                );

            return this.adicionarEvento(
                "instabilidade",
                5,
                "O ambiente tornou-se instável."
            );
        }

        return null;
    }

    ciclo() {

        this.ciclos++;

        this.atualizarAmbiente();

        const evento = this.gerarEvento();

        this.estado.energia =
            Math.max(
                0,
                this.estado.energia - 0.5
            );

        if (this.estado.perigo > 0) {

            this.estado.perigo =
                Math.max(
                    0,
                    this.estado.perigo - 0.5
                );
        }

        return evento;
    }

    getEstado() {

        return {
            nome: this.nome,

            ...this.estado,

            ciclos: this.ciclos,

            eventos: this.eventos.length
        };
    }
}
