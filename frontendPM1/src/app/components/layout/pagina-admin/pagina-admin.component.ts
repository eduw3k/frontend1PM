import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Categoria } from '../../../models/categoria';
import { Subcategoria } from '../../../models/subcategoria';
import { CategoriaService } from '../../../services/categoria.service';
import { SubcategoriaService } from '../../../services/subcategoria.service';

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

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];

  categoriaSelecionada: Categoria | null = null;
  subcategoriaSelecionada: Subcategoria | null = null;
  subcategoriasFiltradas: Subcategoria[] = [];

  novaCategoria: Categoria = new Categoria(0, '');

  novaSubcategoria: Subcategoria = new Subcategoria(0, '', 0);

  

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

  mostrarModalCategoria = false;
  mostrarModalSubcategoria = false;

  mostrarModalEditarCategoria = false;
  mostrarModalEditarSubcategoria = false;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
    this.carregarCategorias();
    this.carregarSubcategorias();
  }

  listarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (erro) => {
        console.error('Erro ao listar produtos:', erro);

        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível carregar os produtos.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  editarProduto(produto: Produtos): void {
    this.produtoSelecionado = { ...produto };
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
        this.produtoService.excluir(id).subscribe({
          next: () => {
            this.listarProdutos();

            Swal.fire({
              title: 'Excluído!',
              text: 'O produto foi excluído com sucesso.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          error: (erro) => {
            console.error('Erro ao excluir produto:', erro);

            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível excluir o produto.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
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
    this.produtoService.criar(this.novoProduto).subscribe({
      next: () => {
        this.listarProdutos();
        this.mostrarModalAdicionar = false;

        Swal.fire({
          title: 'Produto adicionado!',
          text: 'O produto foi cadastrado com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);

        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível cadastrar o produto.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancelarEdicao(): void {
    this.produtoSelecionado = null;
    this.mostrarModal = false;
  }

  salvarEdicao(): void {
    if (this.produtoSelecionado) {
      this.produtoService.editar(this.produtoSelecionado).subscribe({
        next: () => {
          this.listarProdutos();
          this.produtoSelecionado = null;
          this.mostrarModal = false;

          Swal.fire({
            title: 'Produto atualizado!',
            text: 'O produto foi atualizado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error: (erro) => {
          console.error('Erro ao editar produto:', erro);

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível atualizar o produto.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

  carregarCategorias(): void {
  this.categoriaService.listar().subscribe({
    next: (categorias) => {
      this.categorias = categorias;
    },
    error: (erro) => {
      console.error('Erro ao carregar categorias:', erro);
    }
  });
}
carregarSubcategorias(): void {
  this.subcategoriaService.listar().subscribe({
    next: (subcategorias) => {
      this.subcategorias = subcategorias;
    },
    error: (erro) => {
      console.error('Erro ao carregar subcategorias:', erro);
    }
  });
}

filtrarSubcategorias(): void {

   if (!this.novoProduto.categoria) {
    this.subcategoriasFiltradas = [];
    this.novoProduto.subcategoria = null;
    return;
  }

  this.subcategoriasFiltradas = this.subcategorias.filter(
    subcategoria =>
      subcategoria.categoriaId === this.novoProduto.categoria
  );

  this.novoProduto.subcategoria = null;
}

abrirModalCategoria(): void {
  this.novaCategoria = new Categoria(0, '');
  this.mostrarModalCategoria = true;
}

cancelarCategoria(): void {
  this.mostrarModalCategoria = false;
}

adicionarCategoria(): void {

  this.categoriaService.criar(this.novaCategoria).subscribe({
    next: () => {

      this.carregarCategorias();

      this.mostrarModalCategoria = false;

      Swal.fire({
        title: 'Categoria criada!',
        text: 'A categoria foi cadastrada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    },
    error: (erro) => {

      console.error('Erro ao criar categoria:', erro);

      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível criar a categoria.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }
  });
}

editarCategoria(categoria: Categoria): void {

  this.categoriaSelecionada = {
    ...categoria
  };

  this.mostrarModalEditarCategoria = true;
}

cancelarEdicaoCategoria(): void {

  this.categoriaSelecionada = null;
  this.mostrarModalEditarCategoria = false;

}

salvarCategoria(): void {

  if (!this.categoriaSelecionada) {
    return;
  }

  this.categoriaService.editar(this.categoriaSelecionada).subscribe({

    next: () => {

      this.carregarCategorias();

      this.categoriaSelecionada = null;
      this.mostrarModalEditarCategoria = false;

      Swal.fire({
        title: 'Categoria atualizada!',
        text: 'A categoria foi atualizada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    },

    error: (erro) => {

      console.error('Erro ao editar categoria:', erro);

      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível atualizar a categoria.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }

  });
}

excluirCategoria(id: number): void {

  Swal.fire({
    title: 'Excluir categoria?',
    text: 'Essa ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33'
  }).then((resultado) => {

    if (resultado.isConfirmed) {

      this.categoriaService.excluir(id).subscribe({

        next: () => {

          this.carregarCategorias();

          Swal.fire({
            title: 'Excluída!',
            text: 'A categoria foi excluída.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

        },

        error: (erro) => {

          console.error('Erro ao excluir categoria:', erro);

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível excluir a categoria.',
            icon: 'error',
            confirmButtonText: 'OK'
          });

        }

      });

    }

  });
}

abrirModalSubcategoria(): void {

  this.novaSubcategoria = new Subcategoria(
    0,
    '',
    0
  );

  this.mostrarModalSubcategoria = true;
}

cancelarSubcategoria(): void {

  this.mostrarModalSubcategoria = false;

}

adicionarSubcategoria(): void {

  this.subcategoriaService.criar(this.novaSubcategoria).subscribe({

    next: () => {

      this.carregarSubcategorias();

      this.mostrarModalSubcategoria = false;

      Swal.fire({
        title: 'Subcategoria criada!',
        text: 'A subcategoria foi cadastrada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    },

    error: (erro) => {

      console.error('Erro ao criar subcategoria:', erro);

      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível criar a subcategoria.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }

  });
}

editarSubcategoria(subcategoria: Subcategoria): void {

  this.subcategoriaSelecionada = {
    ...subcategoria
  };

  this.mostrarModalEditarSubcategoria = true;
}

cancelarEdicaoSubcategoria(): void {

  this.subcategoriaSelecionada = null;
  this.mostrarModalEditarSubcategoria = false;

}

salvarSubcategoria(): void {

  if (!this.subcategoriaSelecionada) {
    return;
  }

  this.subcategoriaService.editar(this.subcategoriaSelecionada).subscribe({

    next: () => {

      this.carregarSubcategorias();

      this.subcategoriaSelecionada = null;
      this.mostrarModalEditarSubcategoria = false;

      Swal.fire({
        title: 'Subcategoria atualizada!',
        text: 'A subcategoria foi atualizada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    },

    error: (erro) => {

      console.error('Erro ao editar subcategoria:', erro);

      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível atualizar a subcategoria.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }

  });
}

excluirSubcategoria(id: number): void {

  Swal.fire({
    title: 'Excluir subcategoria?',
    text: 'Essa ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33'
  }).then((resultado) => {

    if (resultado.isConfirmed) {

      this.subcategoriaService.excluir(id).subscribe({

        next: () => {

          this.carregarSubcategorias();

          Swal.fire({
            title: 'Excluída!',
            text: 'A subcategoria foi excluída.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

        },

        error: (erro) => {

          console.error('Erro ao excluir subcategoria:', erro);

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível excluir a subcategoria.',
            icon: 'error',
            confirmButtonText: 'OK'
          });

        }

      });

    }

  });
}
}