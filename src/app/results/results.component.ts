import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image, Point} from "../utils/image";
import {DotsService} from "../utils/dotservice";
import {Result} from "../utils/result";
import {RService} from "../utils/rservice";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  dots : Result[];
  image : Image;

  constructor(private http : HttpClient, private dotsService : DotsService, private rService : RService) {
    this.image = new Image();
  }

  ngOnInit(): void {
    this.dotsService.dotsCurrent.subscribe((dots)=> this.dots = dots);
    this.image.init(this.dotsService, this.rService);
  }

  logout() {
    this.http.post('/rest/logout', JSON.stringify({}), {
      headers : new HttpHeaders ({'Content-Type': 'application/json'})
    });
  }

  imageClick(e : any) : void {
    let rect = e.target.getBoundingClientRect();
    let x = e.x - rect.left;
    let y = e.y - rect.top;
    let p : Point = this.image.clicked({x : x , y : y});
    this.http.post('./rest/image', JSON.stringify({
      x : p.x.toString(),
      y : p.y.toString(),
      r : this.image.r.toString()
    }), {
      headers : new HttpHeaders ({'Content-Type': 'application/json'})
    }).subscribe((data : any) => {
      if (!data.hasError) {
        let dots : Result[] = this.dots;
        let r : Result = Object.assign(new Result(), data.data);
        dots.push(r);
        this.dotsService.resetDots(dots);
      }
    });
  }
}
