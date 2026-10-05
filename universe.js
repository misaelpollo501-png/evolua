export class EvoluaUniverse {

    constructor() {

        this.entidades = [];

        this.estado = {
            ativo: true,
            ciclos: 0,
            estabilidade: 100,
            complexidade: 0
        };

        this.versao = "2.0.0";
    }

    adicionarEntidade(entidade) {

        if (!entidade) return null;

        const novaEntidade = {
            id: entidade.id || `entity_${Date.now()}_${Math.random()
                .toString(36)
                .slice(2, 7)},

            nome: entidade.nome || "Entidade desconhecida",

            tipo: entidade.tipo || "desconhecido",

            estado: entidade.estado || {},

            criadaEm: Date.now()
        };

        this.entidades.push(novaEntidade);

        this.estado.complexidade =
            Math.min(100, this.estado.complexidade + 1);

        return novaEntidade;
    }

    removerEntidade(id) {

        const indice = this.entidades.findIndex(
            entidade => entidade.id === id
        );

        if (indice === -1) return false;

        this.entidades.splice(indice, 1);

        return true;
    }

    buscarEntidade(id) {

        return this.entidades.find(
            entidade => entidade.id === id
        ) || null;
    }

    obterEntidades() {

        return [...this.entidades];
    }

    ciclo() {

        this.estado.ciclos++;

        for (const entidade of this.entidades) {

            if (!entidade.estado) {
                entidade.estado = {};
            }

            entidade.estado.atividade =
                (entidade.estado.atividade || 0) + 1;
        }
    }

    gerarEntidadeAleatoria() {

        const tipos = [
            "recurso",
            "organismo",
            "evento",
            "estrutura",
            "anomalia"
        ];

        const entidade = this.adicionarEntidade({
            nome: `Entidade ${this.entidades.length + 1}`,
            tipo: tipos[
                Math.floor(Math.random() * tipos.length)
            ]
        });

        return entidade;
    }

    getStatus() {

        return {
            ...this.estado,

            entidades: this.entidades.length,

            lista: this.entidades.map(
                entidade => ({
                    id: entidade.id,
                    nome: entidade.nome,
                    tipo: entidade.tipo
                })
            )
        };
    }
}
