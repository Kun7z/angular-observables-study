import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError, startWith } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'user-search',
  templateUrl: '../html/user-search.html',
  styleUrls: ['../scss/user-search.scss'],
})
export class UserSearchComponent implements OnInit {
  searchControl = new FormControl('');
  users$!: Observable<User[]>; // Adicionado ! para indicar que será inicializado depois
  isLoading = false;
  errorMessage = '';

  private fakeDatabase: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com' },
    { id: 2, name: 'Maria Souza', email: 'maria@exemplo.com' },
    { id: 3, name: 'Carlos Oliveira', email: 'carlos@exemplo.com' },
    { id: 4, name: 'Ana Pereira', email: 'ana@exemplo.com' },
    { id: 5, name: 'Pedro Santos', email: 'pedro@exemplo.com' },
  ];

  ngOnInit() {
    this.users$ = this.searchControl.valueChanges.pipe(
       
      startWith(''),
      debounceTime(300),
      switchMap((term) => {
        console.log(term)
        this.isLoading = true;
        return this.searchUsers(term).pipe(
          catchError((error) => {
            this.errorMessage = 'Erro ao buscar usuários';
            console.error(error);
            return of([]);
          })
        );
      })
    );
  }

  private searchUsers(term: string | null): Observable<User[]> {
    this.isLoading = true;
    this.errorMessage = '';

    const searchTerm = term?.toLowerCase() || '';

    return of(
      this.fakeDatabase.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      )
    ).pipe(
      catchError((error) => {
        this.errorMessage = 'Erro ao buscar usuários';
        console.error(error);
        return of([]);
      })
    );
  }
}
