import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class RService {
  private rSource = new BehaviorSubject<number>(1);
  public rCurrent = this.rSource.asObservable();

  constructor() {
  }

  setRadius(value : number) {
    this.rSource.next(value);
  }
}
