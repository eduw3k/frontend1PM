import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent {

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  get itens(): ItemCarrinho[] {
    return this.carrinhoService.listar();
  }

  get total(): number {
    return this.itens.reduce(
      (soma, item) =>
        soma + item.produto.preco * item.quantidade,
      0
    );
  }

  alterarQuantidade(item: ItemCarrinho, quantidade: number): void {
    if (quantidade >= 1) {
      this.carrinhoService.atualizarQuantidade(
        item.produto.id,
        quantidade
      );
    }
  }

  remover(id: number): void {
    this.carrinhoService.remover(id);
  }

  continuarComprando(): void {
    this.router.navigate(['/produtos']);
  }

  comprarPeloWhatsApp(): void {
    if (this.itens.length === 0) {
      return;
    }

    const numero = '5545998331309';

    let mensagem = 'Olá! Gostaria de fazer um pedido:\n\n';

    this.itens.forEach((item, index) => {
      const produto = item.produto;
      const subtotal = produto.preco * item.quantidade;

      mensagem +=
        `${index + 1}. ${produto.nome}\n` +
        `Quantidade: ${item.quantidade}\n` +
        `Preço unitário: R$ ${produto.preco.toFixed(2)}\n` +
        `Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });

    mensagem +=
      `Total estimado: R$ ${this.total.toFixed(2)}\n\n` +
      'Gostaria de continuar o atendimento.';

    const url =
      `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  }
}
