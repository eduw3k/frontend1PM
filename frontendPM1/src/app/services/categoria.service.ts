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
}