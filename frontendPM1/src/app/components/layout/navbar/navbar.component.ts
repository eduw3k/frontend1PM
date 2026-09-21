import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';
import { Subcategoria } from '../../../models/subcategoria';
import { SubcategoriaService } from '../../../services/subcategoria.service';

@Component({
  selector: 'app-navbar',
  imports: [MdbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];

  constructor(
    private categoriaService: CategoriaService
    , private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarSubcategorias();
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
}
