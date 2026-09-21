import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Produtos as ProdutoModel } from '../../models/produtos';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MdbRippleModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos implements OnInit {

  produtos: ProdutoModel[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (erro) => {
        console.error('Erro ao listar produtos:', erro);
      }
    });
  }

  verProduto(id: number): void {
    this.router.navigate(['/produtos', id]);
  }
}