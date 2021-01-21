import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
        .post('./rest/login',JSON.stringify({
          username : this.mainform.controls['username'].value,
          password : this.mainform.controls['password'].value
        }),{
          headers : new HttpHeaders ({'Content-Type': 'application/json'})
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
      .post('./rest/registration', JSON.stringify({
        username : this.mainform.controls['username'].value,
        password : this.mainform.controls['password'].value
      }),{
        headers : new HttpHeaders ({'Content-Type': 'application/json'})
      }).subscribe((data : any) => {
      if (data.hasError) {
        window.alert(data.error);
      } else {
        window.alert('Registration is successful');
      }
    });
  }
}
