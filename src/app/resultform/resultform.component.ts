import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resultform',
  templateUrl: './resultform.component.html',
  styleUrls: ['./resultform.component.css']
})
export class ResultformComponent implements OnInit {

  resultform : FormGroup;

  constructor(private fb : FormBuilder, private http : HttpClient) {
    this.resultform = this.fb.group({
      x : '',
      y : '',
      r : ''
    });
  }

  ngOnInit(): void {
  }

  send(): void {

  }

  clearTable(): void {

  }
}
