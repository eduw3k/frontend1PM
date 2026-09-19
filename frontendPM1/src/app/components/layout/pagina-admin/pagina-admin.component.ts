import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produtos } from '../../../models/produtos';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.scss',
})
export class PaginaAdmin implements OnInit {
  produtos: Produtos[] = [];
  produtoSelecionado: Produtos | null = null;

  novoProduto: Produtos = new Produtos(
    0,
    '',
    '',
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    ''
  );

  mostrarModal = false;
  mostrarModalAdicionar = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtos = this.produtoService.listar();
  }

  editarProduto(produto: Produtos): void {
    this.produtoSelecionado = produto;
    this.mostrarModal = true;
  }

  excluirProduto(id: number): void {
    Swal.fire({
      title: 'Excluir produto?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.produtoService.excluir(id);
        this.listarProdutos();

        Swal.fire({
          title: 'Excluído!',
          text: 'O produto foi excluído com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  abrirModalAdicionar(): void {
    this.novoProduto = new Produtos(
      0,
      '',
      '',
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      ''
    );

    this.mostrarModalAdicionar = true;
  }

  cancelarAdicao(): void {
    this.mostrarModalAdicionar = false;
  }

  adicionarProduto(): void {
    this.produtoService.criar(this.novoProduto);
    this.listarProdutos();
    this.mostrarModalAdicionar = false;

    Swal.fire({
      title: 'Produto adicionado!',
      text: 'O produto foi cadastrado com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  cancelarEdicao(): void {
    this.produtoSelecionado = null;
    this.mostrarModal = false;
  }

  salvarEdicao(): void {
    if (this.produtoSelecionado) {
      this.produtoService.editar(this.produtoSelecionado);
      this.listarProdutos();
      this.produtoSelecionado = null;
      this.mostrarModal = false;
    }
  }
}