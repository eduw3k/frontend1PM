export class Subcategoria {
    id!: number;
    nome!: string;
    categoriaId!: number;

    constructor(id: number, nome: string, categoriaId: number) {
        this.id = id;
        this.nome = nome;
        this.categoriaId = categoriaId;
    }
}
