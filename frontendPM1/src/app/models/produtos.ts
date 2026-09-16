export class Produtos {
    id!: number;
    nome!: string;
    descricao!: string;
    altura!: number;
    largura!: number;
    diametro!: number;
    circunferencia!: number;
    pesoaprox!: number;
    // cores: string[] = []; n consegui pensar em como fazer, cores ja pré-definidas.
    categoria!: number;
    subcategoria!: number;
    preco!: number;
    imagem!: string;

    constructor(id: number, nome: string, descricao: string, altura: number, largura: number, diametro: number, circunferencia: number, pesoaprox: number, categoria: number, subcategoria: number, preco: number, imagem: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.altura = altura;
        this.largura = largura;
        this.diametro = diametro;
        this.circunferencia = circunferencia;
        this.pesoaprox = pesoaprox;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.preco = preco;
        this.imagem = imagem;
    }
}
