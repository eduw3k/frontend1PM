import { Injectable } from '@angular/core';
import { Produtos } from '../models/produtos';

export interface ItemCarrinho {
  produto: Produtos;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private chave = 'carrinho-studium';

  private itens: ItemCarrinho[] = this.carregar();

  private carregar(): ItemCarrinho[] {
    const dados = localStorage.getItem(this.chave);

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  }

  private salvar(): void {
    localStorage.setItem(this.chave, JSON.stringify(this.itens));
  }

  listar(): ItemCarrinho[] {
    return this.itens;
  }

  get quantidadeTotal(): number {
    return this.itens.reduce(
      (total, item) => total + item.quantidade, 0
    );
  }

  adicionar(produto: Produtos, quantidade: number): void {
    const item = this.itens.find(
      item => item.produto.id === produto.id
    );

    if (item) {
      item.quantidade += quantidade;
    } else {
      this.itens.push({
        produto: produto,
        quantidade: quantidade
      });
    }

    this.salvar();
  }

  atualizarQuantidade(id: number, quantidade: number): void {
    const item = this.itens.find(
      item => item.produto.id === id
    );

    if (item && quantidade > 0) {
      item.quantidade = quantidade;
      this.salvar();
    }
  }

  remover(id: number): void {
    this.itens = this.itens.filter(
      item => item.produto.id !== id
    );

    this.salvar();
  }

  limpar(): void {
    this.itens = [];
    this.salvar();
  }
}
