import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  constructor(private http: HttpClient) {}

  prodURL: string = 'https://sudoku-game-101.herokuapp.com/generate-sudoku';
  devURL: string = 'http://localhost:8080/generate-sudoku';

  getSudoku() {
    console.log('service called');

    return this.http.get(this.devURL);
  }
}
