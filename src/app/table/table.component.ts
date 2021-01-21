import { Component, OnInit } from '@angular/core';

import { Result } from '../utils/result';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DotsService} from "../utils/dotservice";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  results : Result[];

  constructor(private http : HttpClient, private dots : DotsService) {
  }

  ngOnInit(): void {
    this.dots.dotsCurrent.subscribe(dots => {
      this.results = dots;
    });
    this.reload();
  }


  reload(): void {
    this.http
        .post('./rest/results', JSON.stringify({}), {
          headers : new HttpHeaders({'Content-Type': 'application/json'})
        }).subscribe((data : any) => {
          if (!data.hasError) {
            this.results = [];
            data.data.forEach((e : any) => {
              this.results.push(Object.assign(new Result(), e))
            });
            this.dots.resetDots(this.results);
          }
        });
  }
}
