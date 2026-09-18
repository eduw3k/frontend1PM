import { Injectable } from '@angular/core';
import { Produtos } from '../models/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

 private produtos: Produtos[] = [
  new Produtos(
    1,
    'Caneca Personalizável 230ml',
    'Caneca personalizável para presentes e ocasiões especiais.',
    10,
    8,
    8,
    25,
    300,
    1,
    1,
    25.00,
    'assets/caneca.png'
  ),

  new Produtos(
    2,
    'Camiseta Personalizável',
    'Camiseta personalizável para deixar seu estilo do seu jeito.',
    70,
    50,
    0,
    0,
    200,
    1,
    1,
    45.00,
    'assets/camiseta.png'
  ),

  new Produtos(
    3,
    'Chaveiro Personalizável',
    'Chaveiro personalizado para presentes e lembranças.',
    5,
    3,
    2,
    10,
    30,
    1,
    1,
    15.00,
    'assets/chaveiro.png'
  ),

  new Produtos(
    4,
    'Cesta Personalizável',
    'Cesta personalizada para presentes e datas especiais.',
    30,
    25,
    20,
    80,
    1000,
    1,
    1,
    80.00,
    'assets/cesta.png'
  )
];

  listar(): Produtos[] {
    return this.produtos;
  }

  criar(produto: Produtos): void {
    produto.id = this.produtos.length > 0
      ? Math.max(...this.produtos.map(p => p.id)) + 1
      : 1;

    this.produtos.push(produto);
  }

  editar(produto: Produtos): void {
    const index = this.produtos.findIndex(p => p.id === produto.id);

    if (index !== -1) {
      this.produtos[index] = produto;
    }
  }

  excluir(id: number): void {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }

  buscarPorId(id: number): Produtos | undefined {
    return this.produtos.find(p => p.id === id);
  }
}