import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

import * as bcrypt from 'bcryptjs';

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

 hashCode(val : string) {
    let hash = 0, i, chr;
    for (i = 0; i < val.length; i++) {
      chr   = val.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }


  signIn(): void {
    this.http
        .post('./rest/login',JSON.stringify({
          username : this.mainform.controls['username'].value,
          password : this.hashCode(this.mainform.controls['password'].value)
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
        password : this.hashCode(this.mainform.controls['password'].value)
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
