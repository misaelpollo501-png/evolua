export class AttentionSystem {

    constructor() {

        this.focoAtual = null;

        this.nivel = 0;

        this.historico = [];
    }

    analisar(percepcao) {

        if (!percepcao) {
            return null;
        }

        const sinais = [];

        const perigo =
            percepcao.ambiente?.perigo || 0;

        const ameaca =
            percepcao.organismo?.ameaca || 0;

        const recursos =
            percepcao.ambiente?.recursos || 0;

        const saude =
            percepcao.organismo?.saude || 0;

        const energia =
            percepcao.organismo?.energia || 0;

        // Ameaça
        if (perigo > 60 || ameaca > 60) {

            sinais.push({
                alvo: "ameaca",
                prioridade:
                    Math.max(perigo, ameaca) + 20,
                motivo:
                    "Existe uma ameaça significativa."
            });
        }

        // Saúde
        if (saude < 30) {

            sinais.push({
                alvo: "sobrevivencia",
                prioridade: 95,
                motivo:
                    "A saúde do organismo está baixa."
            });
        }

        // Energia
        if (energia < 25) {

            sinais.push({
                alvo: "energia",
                prioridade: 85,
                motivo:
                    "A energia está baixa."
            });
        }

        // Recursos
        if (recursos > 60) {

            sinais.push({
                alvo: "recursos",
                prioridade: 50,
                motivo:
                    "Existem recursos disponíveis."
            });
        }

        // Estado normal
        if (sinais.length === 0) {

            sinais.push({
                alvo: "exploracao",
                prioridade: 30,
                motivo:
                    "Nenhuma ameaça crítica foi detectada."
            });
        }

        sinais.sort(
            (a, b) =>
                b.prioridade - a.prioridade
        );

        this.focoAtual = sinais[0];

        this.historico.push({
            ciclo: percepcao.ciclo,
            sinais,
            foco: this.focoAtual
        });

        if (this.historico.length > 100) {
            this.historico.shift();
        }

        this.nivel = Math.min(
            100,
            this.nivel + 1
        );

        return this.focoAtual;
    }

    obterFoco() {
        return this.focoAtual;
    }

    getStatus() {

        return {
            nivel: this.nivel,
            foco: this.focoAtual,
            historico: this.historico.length
        };
    }
}
