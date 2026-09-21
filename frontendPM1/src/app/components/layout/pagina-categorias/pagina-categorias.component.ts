
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Produtos as ProdutoModel } from '../../../models/produtos';
import { ProdutoService } from '../../../services/produto.service';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-pagina-categorias',
  imports: [MdbRippleModule],
  templateUrl: './pagina-categorias.component.html',
  styleUrl: './pagina-categorias.component.scss'
})
export class PaginaCategoriasComponent implements OnInit {
    produtos: ProdutoModel[] = [];

    titulo = 'Categoria';

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const categoriaId = params.get('categoriaId');
      const subcategoriaId = params.get('subcategoriaId');

      // Limpa os produtos antigos
      this.produtos = [];

      if (categoriaId) {

        this.carregarPorCategoria(Number(categoriaId));
        this.carregarNomeCategoria(Number(categoriaId)); //titulo

      } else if (subcategoriaId) {

        this.carregarPorSubcategoria(Number(subcategoriaId));
        this.carregarNomeSubcategoria(Number(subcategoriaId)); //titulo

      }

    });
  }

  carregarPorCategoria(id: number): void {

    this.produtoService.listarPorCategoria(id).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },

      error: (erro) => {
        console.error(
          'Erro ao carregar produtos da categoria:',
          erro
        );
      }
    });

  }

  carregarPorSubcategoria(id: number): void {

    this.produtoService.listarPorSubcategoria(id).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },

      error: (erro) => {
        console.error(
          'Erro ao carregar produtos da subcategoria:',
          erro
        );
      }
    });

  
  }

  listar(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  verProduto(id: number): void {
    this.router.navigate(['/produtos', id]);
  }

  carregarNomeCategoria(id: number): void {

    this.categoriaService.listar().subscribe({
      next: (categorias) => {

        const categoria = categorias.find(
          categoria => categoria.id === id
        );

        if (categoria) {
          this.titulo = categoria.nome;
        }

      },
      error: (erro) => {
        console.error('Erro ao carregar categoria:', erro);
      }
    });

  }

  carregarNomeSubcategoria(id: number): void {

    this.subcategoriaService.listar().subscribe({
      next: (subcategorias) => {

        const subcategoria = subcategorias.find(
          subcategoria => subcategoria.id === id
        );

        if (subcategoria) {
          this.titulo = subcategoria.nome;
        }

      },
      error: (erro) => {
        console.error('Erro ao carregar subcategoria:', erro);
      }
    });

  }
}
