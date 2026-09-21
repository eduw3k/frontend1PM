import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategoria } from '../models/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private http = inject(HttpClient);

  private API = 'http://localhost:8081/subcategorias';

  listar(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(this.API);
  }
}
