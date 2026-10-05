export class ConstitutionEngine {

    constructor() {

        this.diretrizes = [

            {
                id: "preservacao",
                nome: "Preservação",
                descricao:
                    "Preservar a integridade do organismo.",
                prioridade: 100
            },

            {
                id: "aprendizado",
                nome: "Aprendizado",
                descricao:
                    "Aprender com experiências.",
                prioridade: 90
            },

            {
                id: "adaptacao",
                nome: "Adaptação",
                descricao:
                    "Adaptar-se às mudanças do ambiente.",
                prioridade: 85
            },

            {
                id: "exploracao",
                nome: "Exploração",
                descricao:
                    "Buscar informações e possibilidades.",
                prioridade: 70
            },

            {
                id: "estabilidade",
                nome: "Estabilidade",
                descricao:
                    "Manter equilíbrio interno.",
                prioridade: 80
            },

            {
                id: "coerencia",
                nome: "Coerência",
                descricao:
                    "Evitar decisões incompatíveis com o próprio estado.",
                prioridade: 75
            }
        ];
    }

    getPrincipios() {

        return this.diretrizes.map(
            principio => ({ ...principio })
        );
    }

    avaliar(decisao, contexto = {}) {

        if (!decisao) {

            return {
                permitida: false,
                motivo: "Decisão inexistente."
            };
        }

        const violacoes = [];

        if (
            contexto.saude !== undefined &&
            contexto.saude < 15 &&
            decisao.tipo === "exploracao"
        ) {
            violacoes.push(
                "A exploração apresenta risco elevado."
            );
        }

        if (
            contexto.ameaca !== undefined &&
            contexto.ameaca > 80 &&
            decisao.tipo === "exploracao"
        ) {
            violacoes.push(
                "A ameaça atual é muito alta."
            );
        }

        return {

            permitida:
                violacoes.length === 0,

            violacoes,

            principios:
                this.getPrincipios()
        };
    }

    escolherMelhor(decisoes, contexto = {}) {

        if (!Array.isArray(decisoes) ||
            decisoes.length === 0) {

            return null;
        }

        const avaliadas = decisoes.map(
            decisao => {

                const avaliacao =
                    this.avaliar(
                        decisao,
                        contexto
                    );

                return {
                    ...decisao,
                    avaliacao,
                    pontuacao:
                        (decisao.pontuacao || 0) +
                        (
                            avaliacao.permitida
                                ? 50
                                : -100
                        )
                };
            }
        );

        avaliadas.sort(
            (a, b) =>
                b.pontuacao -
                a.pontuacao
        );

        return avaliadas[0];
    }
}
