import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Produtos } from '../../../models/produtos';
import { ProdutoService } from '../../../services/produto.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-details',
  standalone: true,
  imports: [FormsModule, MdbRippleModule],
  templateUrl: './produto-details.component.html',
  styleUrl: './produto-details.component.scss'
})
export class ProdutoDetailsComponent implements OnInit {

  produto: Produtos = new Produtos(
    0, '', '', 0, 0, 0, 0, 0, 0, 0, 0, ''
  );

  quantidade = 1;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.produtoService.buscarPorId(Number(id)).subscribe({
        next: (produtoEncontrado) => {
          this.produto = produtoEncontrado;
        },
        error: (erro) => {
          console.error('Erro ao buscar produto:', erro);

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível carregar o produto.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

  comprar(): void {
    const numero = '5545998331309';
    const total = this.produto.preco * this.quantidade;

    const mensagem =
      `Olá! Gostaria de fazer um pedido:\n\n` +
      `Produto: ${this.produto.nome}\n` +
      `Quantidade: ${this.quantidade}\n` +
      `Preço unitário: R$ ${this.produto.preco.toFixed(2)}\n` +
      `Total: R$ ${total.toFixed(2)}\n\n` +
      `Gostaria de continuar o atendimento.`;

    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
      '_blank'
    );
  }

  adicionarCarrinho(): void {
    this.carrinhoService.adicionar(
      this.produto,
      this.quantidade
    );

    Swal.fire({
      title: 'Carrinho',
      text: `${this.produto.nome} foi adicionado ao carrinho!`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  voltar(): void {
    this.router.navigate(['/produtos']);
  }
}
