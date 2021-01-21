import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import {Result} from "../utils/result";
import {DotsService} from "../utils/dotservice";
import {RService} from "../utils/rservice";

@Component({
  selector: 'app-resultform',
  templateUrl: './resultform.component.html',
  styleUrls: ['./resultform.component.css']
})
export class ResultformComponent implements OnInit {

  defaultValue : number = 1;
  defaultValueX : number = 0;

  dots : Result[];
  resultform : FormGroup;

  constructor(private fb : FormBuilder, private dotsService : DotsService, private http : HttpClient, private rService : RService) {
    this.resultform = this.fb.group({
      x : '',
      y : '',
      r : ''
    });
  }

  ngOnInit(): void {
    this.dotsService.dotsCurrent.subscribe(dots => {
      this.dots = dots;
    });
    this.resultform.get('r')?.valueChanges.subscribe((value) => {
      this.rService.setRadius(value);
    });
  }

  send(): void {
    this.http.get('./rest/dot', {
      params: {
        x : this.resultform.controls['x'].value,
        y : this.resultform.controls['y'].value,
        r : this.resultform.controls['r'].value,
      }
    }).subscribe((data : any) => {
        let e = document.getElementById('error');

        if (data.hasError) {
           if (e != null) e.innerText = data.error;
        } else {
          if (e != null) e.innerText = '';
          let result : Result = Object.assign(new Result(), data.data);
          let results : Result[] = this.dots;
          results.push(result);
          this.dotsService.resetDots(results);
        }
    });
  }

  clearTable(): void {
    let e = document.getElementById('error');
    if (e != null) e.innerText = '';

    this.http.get('./rest/clear')
      .subscribe((data : any) => {
      if (!data.hasError) {
        this.dotsService.resetDots([]);
      }
    });
  }
}
