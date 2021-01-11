import { Component, OnInit } from '@angular/core';

import { Result } from '../utils/result';
import { HttpClient } from '@angular/common/http';
import { ParseTreeResult } from '@angular/compiler';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  results : Result[];

  constructor(private http : HttpClient) {
  }

  ngOnInit(): void {
    this.reload();
  }


  reload(): void {
    this.http
        .get('./assets/table.json')
        .subscribe((data : any) => {
          this.results = [];
          data.forEach((e : any) => {
            this.results.push(Object.assign(new Result(), e))
          });
        });
  }
}
