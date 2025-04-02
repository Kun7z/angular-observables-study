import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrinhoService } from './components/compras/services/carrinho.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  inputProduto = '';
  private carrinhoService = inject(CarrinhoService);

  private timer$ = new Observable<string>((subscriber) => {
    console.log('Iniciado Observable');
    setTimeout(() => {
      subscriber.next('Resolvido Observable');
    }, 5000);
  });

  ngOnInit(): void {
    this.timer$.subscribe((value) => console.log(value));
  }

  adicionarProduto() {
    this.carrinhoService.adicionarProduto(this.inputProduto)
  }
}
