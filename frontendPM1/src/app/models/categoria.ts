import { Subcategoria } from './subcategoria';

export class Categoria {
    id!: number;
    nome!: string;
    subcategorias!: Subcategoria[];

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        
    }
    
}
