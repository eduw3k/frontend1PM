export class Subcategoria {
    id!: number;
    nome!: string;
    categoria!: number;

    constructor(id: number, nome: string, categoria: number) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
    }
}
