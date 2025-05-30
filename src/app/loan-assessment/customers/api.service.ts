// src/app/customers/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface People {
  uid: number;
  name: string;
  url: string;
}
export interface Person {
  skin_color: string;
  hair_color: string;
  height: number;
  mass: number;
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
}
interface SwapiList<T> {
  results: People[];
}

interface SwapiPerson<T> {
  result: {
    properties: Person;
  };
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl = 'https://www.swapi.tech/api/';

  constructor(private http: HttpClient) {}

  getSWAPIPeople(): Observable<People[]> {
    return this.http
      .get<SwapiList<People>>(`${this.baseUrl}people`)
      .pipe(map((response) => response.results));
  }

  getSWAPIPerson(id: number): Observable<Person> {
    return this.http
      .get<SwapiPerson<Person>>(`${this.baseUrl}people/${id}`)
      .pipe(map((response) => response.result.properties));
  }
}
