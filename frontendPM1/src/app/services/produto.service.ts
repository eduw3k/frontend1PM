import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Produtos } from '../models/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8081/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produtos[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(produtos => produtos.map(produto => this.converterProduto(produto))),
      catchError(this.tratarErro)
    );
  }

  buscarPorId(id: number): Observable<Produtos> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(produto => this.converterProduto(produto)),
      catchError(this.tratarErro)
    );
  }

  criar(produto: Produtos): Observable<Produtos> {
    const produtoRequest = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade: 1,
      altura: produto.altura,
      largura: produto.largura,
      diametro: produto.diametro,
      circunferencia: produto.circunferencia,
      pesoAprox: produto.pesoaprox,
      imagemPrincipal: produto.imagem,
      ativo: true,
      destaque: false,
      categoriaId: produto.categoria,
      subcategoriaId: produto.subcategoria
    };

    return this.http.post<any>(this.apiUrl, produtoRequest).pipe(
      map(produtoCriado => this.converterProduto(produtoCriado)),
      catchError(this.tratarErro)
    );
  }

  editar(produto: Produtos): Observable<Produtos> {
    const produtoRequest = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade: 1,
      altura: produto.altura,
      largura: produto.largura,
      diametro: produto.diametro,
      circunferencia: produto.circunferencia,
      pesoAprox: produto.pesoaprox,
      imagemPrincipal: produto.imagem,
      ativo: true,
      destaque: false,
      categoriaId: produto.categoria,
      subcategoriaId: produto.subcategoria
    };

    return this.http.put<any>(`${this.apiUrl}/${produto.id}`, produtoRequest).pipe(
      map(produtoAtualizado => this.converterProduto(produtoAtualizado)),
      catchError(this.tratarErro)
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.tratarErro)
    );
  }

  private converterProduto(produto: any): Produtos {
    return new Produtos(
      produto.id,
      produto.nome,
      produto.descricao,
      produto.altura,
      produto.largura,
      produto.diametro,
      produto.circunferencia,
      produto.pesoAprox,
      produto.categoriaId,
      produto.subcategoriaId,
      produto.preco,
      produto.imagemPrincipal
    );
  }

  private tratarErro(erro: any) {
    console.error('Erro na API de produtos:', erro);
    return throwError(() => erro);
  }
}