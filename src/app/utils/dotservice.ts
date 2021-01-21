import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Result} from "./result";

@Injectable()
export class DotsService {
  private dotsSource = new BehaviorSubject<Result[]>([]);
  public dotsCurrent = this.dotsSource.asObservable();

  constructor() {
  }

  resetDots(dots : Result[]) {
    this.dotsSource.next(dots);
  }
}
