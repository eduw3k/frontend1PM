import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);

  private API = 'http://localhost:8081/categorias';

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API);
  }

  criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.API, {
      nome: categoria.nome
    });
  }

  editar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.API}/${categoria.id}`,
      {
        nome: categoria.nome
      }
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}