import { SudokuService } from './../../services/sudoku.service';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  constructor(private service: SudokuService) {}
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  booleanGrid: number[][] = [];
  numberGrid: number[][] = [];
  N: number = 9;
  SRN: number = 3;

  ngOnInit(): void {
    this.service.getSudoku().subscribe((data: any) => {
      console.log(data);
      this.numberGrid = data;
    });

    // this.booleanGrid = this.generateBooleanGrid();
    // this.generateGrid();
    // this.numberGrid = this.generateNumberGrid();
  }

  // generate 9x9 grid
  generateGrid() {
    for (let i = 0; i < 9; i++) {
      this.numberGrid.push([]);
      for (let j = 0; j < 9; j++) {
        this.numberGrid[i][j] = 0;
      }
    }
    this.printGrid();
    return this.numberGrid;
  }
  generateNumberGrid() {
    this.generatediagonalgrid();
    this.fillRemaining();
    return this.numberGrid;
  }

  fillRemaining() {
    // this.fill(0, 3);
    this.fill(0, 6);
    // this.fill(3, 0);
    // this.fill(3, 6);
    // this.fill(6, 0);
    // this.fill(6, 3);
  }

  getList(row: number, col: number) {
    let list = this.numberGrid[row].filter((x) => x !== 0);
    for (let i = 0; i < 9; i++) {
      if (
        this.numberGrid[i][col] !== 0 &&
        !list.includes(this.numberGrid[i][col])
      ) {
        list.push(this.numberGrid[i][col]);
      }
    }
    // console.log(list);

    return _.difference(this.list, list);
  }

  fill(row: number, col: number) {
    let num;
    for (let i = row; i < row + 3; i++) {
      for (let j = col; j < col + 3; j++) {
        console.log('i: ', i, 'j: ', j);

        let list = this.getList(i, j);
        console.log('unique: ' + list);

        do {
          num = this.generateRandomNumber(list, list.length);
        } while (this.checkInGrid(row, col, num));
        this.numberGrid[i][j] = num;
      }
    }
  }

  generatediagonalgrid() {
    for (let i = 0; i < 9; i += 3) {
      this.fillBox(i, i);
    }
  }

  fillBox(row: number, col: number) {
    let num;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        do {
          num = this.generateRandomNumber(this.list, 9);
          // console.log(num);
        } while (this.checkInGrid(row, col, num));

        this.numberGrid[row + i][col + j] = num;
      }
    }
  }
  printGrid() {
    console.log(this.numberGrid);
  }

  generateRandomNumber(list: number[], n: number) {
    return list[Math.floor(Math.random() * n)];
  }

  checkInGrid(row: number, column: number, value: number) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.numberGrid[row + i][column + j] === value) {
          // console.log(value, 'found in grid');
          return true;
        }
      }
    }
    return false;
  }
}
