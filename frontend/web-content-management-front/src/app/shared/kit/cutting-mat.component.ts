// Ported from component-lab `animated-grid-pattern.tsx` (21st.dev), React +
// framer-motion → Angular. Kept: an SVG pattern grid with a handful of squares
// that fade in, fade out and move to a new cell, measured by a ResizeObserver.
// Changed: framer-motion's per-square animation is a CSS keyframe with a
// staggered delay, and each square hops to a new cell on `animationiteration`;
// the grid is the self-healing cutting mat under a model kit, so its default
// colours are mat green and white. Holds still under prefers-reduced-motion.
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { NgFor } from '@angular/common';

let nextId = 0;

interface Square {
  id: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-cutting-mat',
  standalone: true,
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg aria-hidden="true" class="mat">
      <defs>
        <pattern [attr.id]="patternId" [attr.width]="size" [attr.height]="size" patternUnits="userSpaceOnUse" x="-1" y="-1">
          <path [attr.d]="'M.5 ' + size + 'V.5H' + size" fill="none"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" [attr.fill]="'url(#' + patternId + ')'"></rect>
      <rect
        *ngFor="let sq of squares; let i = index; trackBy: trackById"
        class="square"
        [attr.x]="sq.x * size + 1"
        [attr.y]="sq.y * size + 1"
        [attr.width]="size - 1"
        [attr.height]="size - 1"
        [style.animation-duration.s]="duration * 2"
        [style.animation-delay.s]="i * 0.35"
        (animationiteration)="move(sq)"
      ></rect>
    </svg>
  `,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        overflow: hidden;
        pointer-events: none;
      }
      .mat {
        width: 100%;
        height: 100%;
        stroke: var(--mat-grid, rgba(255, 255, 255, 0.14));
        fill: var(--mat-square, rgba(255, 255, 255, 0.1));
      }
      .square {
        stroke-width: 0;
        opacity: 0;
        animation-name: blink;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
      @keyframes blink {
        0%,
        100% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .square {
          animation: none;
          opacity: 0.6;
        }
      }
    `,
  ],
})
export class CuttingMatComponent implements AfterViewInit, OnDestroy {
  /** Cell size in px. */
  @Input() size = 32;
  /** How many squares light up at once. */
  @Input() numSquares = 18;
  /** Seconds for a square to fade in (and again to fade out). */
  @Input() duration = 3;

  readonly patternId = `cutting-mat-${nextId++}`;
  squares: Square[] = [];
  private cols = 0;
  private rows = 0;
  private observer?: ResizeObserver;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    const measure = () => {
      const { width, height } = this.host.nativeElement.getBoundingClientRect();
      this.cols = Math.max(1, Math.floor(width / this.size));
      this.rows = Math.max(1, Math.floor(height / this.size));
      this.squares = Array.from({ length: this.numSquares }, (_, id) => ({ id, ...this.randomCell() }));
      this.cdr.markForCheck();
    };
    measure();
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(measure);
      this.observer.observe(this.host.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  move(sq: Square): void {
    Object.assign(sq, this.randomCell());
    this.cdr.markForCheck();
  }

  trackById(_: number, sq: Square): number {
    return sq.id;
  }

  private randomCell() {
    return { x: Math.floor(Math.random() * this.cols), y: Math.floor(Math.random() * this.rows) };
  }
}
