import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css']
})
export class MainformComponent implements OnInit {

  mainform : FormGroup;

  constructor(private fb : FormBuilder, private http : HttpClient, private router : Router) {
    this.mainform = this.fb.group({
      username : '',
      password : ''
    });
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.http
        .get('./rest/login', {
          params : {
            username : this.mainform.controls['username'].value,
            password : this.mainform.controls['password'].value
          }
        }).subscribe((data : any) => {
          if (data.hasError) {
            window.alert(data.error);
          } else {
            this.router.navigate(['/results']);
          }
        });
  }

  signUp(): void {
    this.http
      .get('./rest/registration', {
        params : {
          username : this.mainform.controls['username'].value,
          password : this.mainform.controls['password'].value
        }
      }).subscribe((data : any) => {
      if (data.hasError) {
        window.alert(data.error);
      } else {
        console.info('Info');
      }
    });
  }
}
