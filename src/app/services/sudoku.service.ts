import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  constructor(private http: HttpClient) {}

  getSudoku() {
    console.log('service called');

    return this.http.get(
      'https://sudoku-game-101.herokuapp.com/generate-sudoku'
    );
  }
}
