export class ReasoningSystem {

    constructor() {

        this.ultimoRaciocinio = null;

        this.historico = [];

        this.nivel = 0;
    }

    analisar(
        percepcao,
        foco,
        predicao,
        organismo
    ) {

        if (!percepcao) {
            return null;
        }

        const energia =
            organismo?.estado?.energia ?? 100;

        const saude =
            organismo?.estado?.saude ?? 100;

        const ameaca =
            organismo?.estado?.ameaca ?? 0;

        const opcoes = [];

        // Defesa
        opcoes.push({
            tipo: "defesa",

            objetivo:
                "Reduzir exposição ao perigo.",

            pontuacao:
                ameaca * 1.5,

            risco:
                Math.max(0, ameaca - 50),

            beneficio:
                ameaca
        });

        // Recuperação
        opcoes.push({
            tipo: "recuperacao",

            objetivo:
                "Restaurar o estado interno.",

            pontuacao:
                (100 - energia) +
                (100 - saude),

            risco: 5,

            beneficio:
                (100 - energia) +
                (100 - saude)
        });

        // Exploração
        opcoes.push({
            tipo: "exploracao",

            objetivo:
                "Buscar novas informações.",

            pontuacao:
                (organismo?.estado?.curiosidade || 0)
                * 0.8,

            risco:
                ameaca * 0.5,

            beneficio:
                organismo?.estado?.curiosidade || 0
        });

        // Aprendizado
        opcoes.push({
            tipo: "aprendizado",

            objetivo:
                "Transformar experiências em conhecimento.",

            pontuacao:
                40 +
                (organismo?.estado?.aprendizagem || 0),

            risco: 10,

            beneficio: 60
        });

        // Ajustar pontuação usando a previsão
        if (predicao?.principal) {

            const impacto =
                predicao.principal.impacto;

            if (impacto === "alto") {

                for (const opcao of opcoes) {

                    if (
                        opcao.tipo === "defesa" ||
                        opcao.tipo === "recuperacao"
                    ) {
                        opcao.pontuacao += 25;
                    }
                }
            }
        }

        // Penalização por risco
        for (const opcao of opcoes) {

            opcao.pontuacao -=
                opcao.risco * 0.5;
        }

        opcoes.sort(
            (a, b) =>
                b.pontuacao -
                a.pontuacao
        );

        const melhor = opcoes[0];

        this.ultimoRaciocinio = {

            ciclo:
                percepcao.ciclo,

            foco,

            predicao,

            opcoes,

            melhorOpcao: melhor,

            confianca:
                Math.min(
                    100,
                    40 +
                    Math.abs(
                        melhor.pontuacao
                    )
                ),

            timestamp: Date.now()
        };

        this.historico.push(
            this.ultimoRaciocinio
        );

        if (this.historico.length > 100) {
            this.historico.shift();
        }

        this.nivel = Math.min(
            100,
            this.nivel + 1
        );

        return this.ultimoRaciocinio;
    }

    obterDecisao() {

        return this.ultimoRaciocinio
            ?.melhorOpcao || null;
    }

    getStatus() {

        return {

            nivel: this.nivel,

            historico:
                this.historico.length,

            ultima:
                this.ultimoRaciocinio
        };
    }
}
