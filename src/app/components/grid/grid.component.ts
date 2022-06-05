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
  ref: any;
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

  values: number = 30;
  copycontent: number = 0;
  count = 0;
  min = 0;
  empty: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  ngOnInit(): void {
    this.service.getSudoku().subscribe((data: any) => {
      console.log(data);
      let state = data[1];
      this.sudoku = state;
      this.solution = data[0];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.sudoku[i][j] != 0) {
            this.boolean[i][j] = true;
            this.disabled[i][j] = true;
          }
        }
      }
      // console.log(this.sudoku);
      // console.log(this.boolean);
      // console.log(this.disabled);

      this.calc();
      this.sudoku = this.empty;
      Swal.fire({
        title: 'Start the game?',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Yes',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.sudoku = state;

          this.ref = setInterval(() => {
            this.count += 1;
            if (this.count == 60) {
              this.count = 0;
              this.min += 1;
            }
          }, 1000);
        } else if (result.isDenied) {
        }
      });
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
    // console.log(val + ' copied');

    this.copycontent = val;
  }
  put(row: number, col: number) {
    // alert(row + ' ' + col);
    // console.log(this.sudoku[row][col] == this.solution[row][col]);
    if (this.copycontent != 0) {
      if (this.disabled[row][col] == false) {
        if (this.copycontent == this.solution[row][col]) {
          // console.log('correct');

          this.sudoku[row][col] = this.copycontent;
          this.boolean[row][col] = true;
          this.values = this.values - 1;
          if (this.values != 0) {
            console.log(this.values);

            this.calc();
          } else {
            clearInterval(this.ref);
            Swal.fire({
              title: 'Game Finished',
              text: 'Time taken: ' + this.min + ' min ' + this.count + ' sec',
              icon: 'success',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonText: 'Close',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                location.reload();
              } else if (result.isDenied) {
                location.reload();
              }
            });
          }
        } else {
          if (this.chances > 0) {
            this.chances -= 1;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.chances + ' chances left',
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            this.sudoku[row][col] = this.copycontent;
            this.boolean[row][col] = false;
            this.calc();
          } else {
            Swal.fire({
              title: 'You have no chances left. Restart to play new game?',
              icon: 'warning',
              allowOutsideClick: false,
              allowEscapeKey: false,
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
  pause() {
    let state = this.sudoku;
    this.sudoku = this.empty;
    clearInterval(this.ref);
    Swal.fire({
      title: 'Game paused.',
      text: 'Click OK to continue?',
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      this.sudoku = state;
      if (result.isConfirmed) {
        this.ref = setInterval(() => {
          this.count += 1;
          if (this.count == 60) {
            this.count = 0;
            this.min += 1;
          }
        }, 1000);
      } else if (result.isDenied) {
        location.reload();
      }
    });
  }
}
