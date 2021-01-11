import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
        .get('./assets/signin.json')
        .subscribe((data : any) => {
            if (data.hasError) {
              //TODO: handle error
            } else {
              this.router.navigate(['/results']);
            }
        });
  }

  signUp(): void {
  }
}
