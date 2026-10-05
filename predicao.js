export class PredictionSystem {

    constructor() {

        this.ultimaPredicao = null;

        this.historico = [];

        this.precisao = 50;
    }

    prever(percepcao, foco) {

        if (!percepcao) {
            return null;
        }

        const previsoes = [];

        const perigo =
            percepcao.ambiente?.perigo || 0;

        const energia =
            percepcao.organismo?.energia || 0;

        const saude =
            percepcao.organismo?.saude || 0;

        const recursos =
            percepcao.ambiente?.recursos || 0;

        // Perigo elevado
        if (perigo > 60) {

            previsoes.push({
                resultado:
                    "A ameaça pode aumentar.",
                probabilidade:
                    Math.min(95, perigo + 10),
                impacto: "alto"
            });
        }

        // Energia baixa
        if (energia < 30) {

            previsoes.push({
                resultado:
                    "A energia poderá atingir níveis críticos.",
                probabilidade: 85,
                impacto: "alto"
            });
        }

        // Saúde baixa
        if (saude < 30) {

            previsoes.push({
                resultado:
                    "A integridade do organismo poderá diminuir.",
                probabilidade: 80,
                impacto: "alto"
            });
        }

        // Recursos disponíveis
        if (recursos > 60) {

            previsoes.push({
                resultado:
                    "A exploração dos recursos poderá gerar benefício.",
                probabilidade: 70,
                impacto: "medio"
            });
        }

        // Sem riscos importantes
        if (previsoes.length === 0) {

            previsoes.push({
                resultado:
                    "O estado atual tende a permanecer estável.",
                probabilidade: 60,
                impacto: "baixo"
            });
        }

        const principal = previsoes
            .sort(
                (a, b) =>
                    b.probabilidade -
                    a.probabilidade
            )[0];

        this.ultimaPredicao = {

            ciclo: percepcao.ciclo,

            foco,

            principal,

            possibilidades: previsoes,

            timestamp: Date.now()
        };

        this.historico.push(
            this.ultimaPredicao
        );

        if (this.historico.length > 100) {
            this.historico.shift();
        }

        return this.ultimaPredicao;
    }

    obterUltima() {
        return this.ultimaPredicao;
    }

    avaliarResultado(resultadoReal) {

        if (!this.ultimaPredicao) {
            return null;
        }

        const acertou =
            resultadoReal ===
            this.ultimaPredicao.principal.resultado;

        if (acertou) {
            this.precisao =
                Math.min(
                    100,
                    this.precisao + 2
                );
        } else {
            this.precisao =
                Math.max(
                    0,
                    this.precisao - 1
                );
        }

        return {
            acertou,
            precisao: this.precisao
        };
    }

    getStatus() {

        return {
            precisao: this.precisao,
            historico: this.historico.length,
            ultima:
                this.ultimaPredicao
        };
    }
}
