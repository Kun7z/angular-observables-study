import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: '../template/carrinho.html',
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  carrinhoService = inject(CarrinhoService);
  qtdDeCarrinho$ = this.carrinhoService.obterQtdDeCarrinho();
  qtdDeProdutos = 0;
  sub = new Subscription();

  constructor() {
    const subContador = this.qtdDeCarrinho$.subscribe((qtd) => {
      console.log('valor emitido', qtd);
      this.qtdDeProdutos = qtd;
    });
    this.sub.add(subContador);
  }
  
  ngOnInit() {}
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
