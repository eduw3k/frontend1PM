import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Produtos } from '../../../models/produtos';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-details',
  standalone: true,
  imports: [FormsModule, MdbRippleModule],
  templateUrl: './produto-details.component.html',
  styleUrl: './produto-details.component.scss'
})
export class ProdutoDetailsComponent implements OnInit {

  produto: Produtos = new Produtos(
    0,
    '',
    '',
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    ''
  );

  quantidade = 1;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      const produtoEncontrado =
        this.produtoService.buscarPorId(Number(id));

      if (produtoEncontrado) {
        this.produto = produtoEncontrado;
      }
    }
  }

  comprar(): void {
    alert('Produto adicionado para compra!');
  }

  adicionarCarrinho(): void {
    alert('Produto adicionado ao carrinho!');
  }

  voltar(): void {
    this.router.navigate(['/produtos']);
  }
}