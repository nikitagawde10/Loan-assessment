import { inject, Injectable } from '@angular/core';
import { APIService, People, Person } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiService = inject(APIService);

  getAllPeople(): Observable<People[]> {
    return this.apiService
      .getSWAPIPeople()
      .pipe(tap((people) => console.table(people)));
  }

  getPersonDetails(id: number): Observable<Person> {
    return this.apiService
      .getSWAPIPerson(id)
      .pipe(tap((person) => console.table(person)));
  }
  constructor() {}
}
