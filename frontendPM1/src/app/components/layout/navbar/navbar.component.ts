import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';
import { Subcategoria } from '../../../models/subcategoria';
import { SubcategoriaService } from '../../../services/subcategoria.service';

@Component({
  selector: 'app-navbar',
  imports: [MdbCollapseModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  busca = '';

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private router: Router
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

  getSubcategorias(categoriaId: number): Subcategoria[] {
    return this.subcategorias.filter(
      subcategoria => subcategoria.categoriaId === categoriaId
    );
  }

  pesquisar(): void {
    if (this.busca.trim()) {
      this.router.navigate(['/produtos'], {
        queryParams: { busca: this.busca }
      });
    } else {
      this.router.navigate(['/produtos']);
    }
  }

  limparBusca(): void {
    this.busca = '';
    this.router.navigate(['/produtos']);
  }

  sair(): void {
    this.router.navigate(['/login']);
  }

  solicitarSenhaAdmin(): void {
  const senha = prompt('Digite a senha do administrador:');

  if (senha === null) {
    return;
  }

  if (senha === '1234') {
    this.router.navigate(['/admin']);
  } else {
    alert('Senha incorreta. Acesso negado.');
  }
}
}
