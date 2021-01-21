import {DotsService} from "./dotservice";
import {OnInit} from "@angular/core";
import {Result} from "./result";
import {RService} from "./rservice";

export class Point {
  x : number;
  y : number;
}

export class Image  {

  w = 530;
  h = 530;
  px_mult = 48;

  ox = this.w / 2;
  oy = this.h / 2;

  r : number = 1;
  dots : Result[] = [];

  init(dots : DotsService, rService : RService): void {
    dots.dotsCurrent
      .subscribe((dots) => {
        this.dots = dots;
        this.drawDots(dots);
      });

    rService.rCurrent.subscribe((value) => {
      this.r = value;
      this.repaint();
    });
  }

  repaint() {
    this.drawDots(this.dots);
  }

  drawDots(dots : Result[]): void {
    let e =<HTMLCanvasElement>  document.getElementById('canvas');

    if (!e) return;

    e.width = this.w;
    e.height = this.h;
    let ctx = e.getContext('2d');

    if(ctx) {

      const w = this.w;
      const h = this.h;
      const px_mult = 48;

      const ox = this.w / 2;
      const oy = this.h / 2;

      ctx.fillStyle = '#f8f6f6';
      ctx.fillRect(0, 0, w, h);

      const px_radius = px_mult * this.r;
      ctx.fillStyle = '#3399FF';

      // main shape
      ctx.beginPath();

      if (px_radius > 0) {
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox + px_radius, oy);
        ctx.lineTo(ox + px_radius, oy + px_radius/2);
        ctx.lineTo(ox, oy + px_radius/2);
        ctx.moveTo(ox, oy);
        ctx.arc(ox, oy, Math.abs(px_radius)/2, 0, Math.PI, false);
        ctx.lineTo(ox - px_radius, oy);
        ctx.lineTo(ox, oy - px_radius/2);
        ctx.lineTo(ox, oy);
      } else {
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox + px_radius, oy);
        ctx.lineTo(ox + px_radius, oy + px_radius/2);
        ctx.lineTo(ox, oy + px_radius/2);
        ctx.moveTo(ox, oy);
        ctx.arc(ox, oy, Math.abs(px_radius)/2, 0,  -Math.PI/2, true);
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox - px_radius, oy);
        ctx.lineTo(ox, oy - px_radius/2);
        ctx.lineTo(ox, oy);
      }

      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = '12px sans-serif';

      // Coordinates
      ctx.beginPath();
      this.canvas_arrow(ctx, 0, oy, w, oy);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      this.canvas_arrow(ctx, ox, h, ox, 0);
      ctx.closePath();
      ctx.stroke();

      const d = 5;

      // Horizontal digits
      for(let i = -5.0; i <= 5.1; i += 0.5) {
        if(i * i > 0.1) {
          ctx.fillText(i.toString(), ox + i * px_mult - d, oy - d);
        }
      }

      for(let i = -5.0; i <= 5.1; i += 0.25) {
        if(i * i > 0.01) {
          ctx.beginPath();
          ctx.moveTo(ox + i * px_mult , oy - d / 2);
          ctx.lineTo(ox + i * px_mult , oy + d / 2);
          ctx.stroke();
        }
      }

      // Vertical digits
      for(let i = -5.0; i <= 5.1; i += 0.5) {
        if(i * i > 0.1) {
          ctx.fillText((-i).toString(), ox + d, oy + i * px_mult);
        }
      }

      for(let i = -5.0; i <= 5.1; i += 0.25) {
        if(i * i > 0.01) {
          ctx.beginPath();
          ctx.moveTo(ox - d/2, oy + i * px_mult);
          ctx.lineTo(ox + d/2, oy + i * px_mult);
          ctx.stroke();
        }
      }

      ctx.fillText('0', ox + d, oy - d);

      for(let dot of dots) {
        this.drawDot(ctx, dot);
      }
    }
  }

  drawDot(ctx : any, dot : Result) {
    ctx.beginPath();
    ctx.arc(this.ox + this.px_mult * dot.x, this.oy - this.px_mult * dot.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = dot.result ? 'green' : 'red';
    ctx.fill();
  }

  clicked(e: Point): Point {
    return {
      x : (e.x - this.ox)/this.px_mult,
      y :  (-e.y + this.oy)/this.px_mult
    }
  }

  canvas_arrow(context : any, fromx : any, fromy : any, tox : any, toy : any) {
    let headlen = 10;
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }
}
