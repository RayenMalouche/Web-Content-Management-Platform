// Ported from component-lab `text-effect.tsx` (21st.dev), React +
// framer-motion → Angular. Kept: the text split per word (or per character)
// and each segment revealed on a stagger, with the "slide" and "blur" presets.
// Changed: the stagger is a CSS animation-delay per segment instead of
// framer-motion variants; the full string stays readable to screen readers.
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-text-effect',
  standalone: true,
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="sr-only">{{ text }}</span
    ><span aria-hidden="true"
      ><span
        *ngFor="let seg of segments; let i = index"
        class="seg"
        [class.seg--blur]="preset === 'blur'"
        [style.animation-delay.s]="delay + i * stagger"
        >{{ seg }}</span
      ></span
    >`,
  styles: [
    `
      .seg {
        display: inline-block;
        white-space: pre;
        animation: slide 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
      }
      .seg--blur {
        animation-name: blur;
      }
      @keyframes slide {
        from {
          opacity: 0;
          transform: translateY(0.4em);
        }
      }
      @keyframes blur {
        from {
          opacity: 0;
          filter: blur(10px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .seg {
          animation: none;
        }
      }
    `,
  ],
})
export class TextEffectComponent {
  @Input({ required: true }) text = '';
  @Input() per: 'word' | 'char' = 'word';
  @Input() preset: 'slide' | 'blur' = 'slide';
  @Input() delay = 0;

  get stagger(): number {
    return this.per === 'word' ? 0.08 : 0.03;
  }

  get segments(): string[] {
    return this.per === 'word' ? this.text.split(/(\s+)/) : this.text.split('');
  }
}
