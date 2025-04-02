import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Compra } from 'src/app/types';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private carrinho: Compra[] = [];
  private produtoAdicionado$ = new Subject<number>();
  
  obterQtdDeCarrinho(){
    return this.produtoAdicionado$.asObservable();
  }
  adicionarProduto(produto: string) {
    const produtoCompra: Compra = {
      produto: produto,
      id: this.carrinho.length + 1, //autoIncremento
    };
    this.carrinho.push(produtoCompra);
    this.produtoAdicionado$.next(this.carrinho.length)
    console.log(this.carrinho)
  }
}
