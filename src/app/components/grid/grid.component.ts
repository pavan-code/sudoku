import { SudokuService } from './../../services/sudoku.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  constructor(private service: SudokuService) {}
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  solution: number[][] = [];
  sudoku: number[][] = [];
  chances: number = 5;
  boolean: boolean[][] = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
  ];

  disabled: boolean[][] = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
  ];

  copycontent: number = 0;

  ngOnInit(): void {
    this.service.getSudoku().subscribe((data: any) => {
      // console.log(data);
      this.sudoku = data[1];
      this.solution = data[0];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.sudoku[i][j] != 0) {
            this.boolean[i][j] = true;
            this.disabled[i][j] = true;
          }
        }
      }
      console.log(this.sudoku);
      console.log(this.boolean);
      console.log(this.disabled);

      this.calc();
    });
  }
  calc() {
    this.list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.sudoku[i][j] == 0) {
          this.list[this.solution[i][j]]++;
        }
      }
    }
    // console.log(this.list);
  }
  copy(val: number) {
    // alert(val);
    console.log(val + ' copied');

    this.copycontent = val;
  }
  put(row: number, col: number) {
    // alert(row + ' ' + col);
    // console.log(this.sudoku[row][col] == this.solution[row][col]);
    if (this.copycontent != 0) {
      if (this.disabled[row][col] == false) {
        if (this.copycontent == this.solution[row][col]) {
          console.log('correct');

          this.sudoku[row][col] = this.copycontent;
          this.boolean[row][col] = true;
          this.calc();
        } else {
          if (this.chances > 1) {
            this.chances -= 1;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.chances + ' chances left',
            });
            this.sudoku[row][col] = this.copycontent;
            this.boolean[row][col] = false;
            this.calc();
          } else {
            Swal.fire({
              title: 'You have no chances left. Do you want to restart?',

              confirmButtonText: 'Yes',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                location.reload();
              } else if (result.isDenied) {
                location.reload();
              }
            });
          }
        }
      } else {
        Swal.fire('This cell is already filled');
      }
    } else {
      Swal.fire('Select a number to fill');
    }
  }
}
