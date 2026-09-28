// The box art: a web page drawn as a model kit's exploded view — header, hero,
// cards and footer pulled apart, each with a numbered callout and leader line,
// the way an instruction sheet shows how parts go together. On load the parts
// drift apart from an assembled page; under reduced motion they start apart.
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-exploded-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 420 360" role="img" [attr.aria-label]="label" class="ev" [class.ev--dark]="tone === 'dark'">
      <!-- Parts: each group starts assembled and slides out along its own vector -->
      <g class="part p1">
        <rect x="70" y="30" width="280" height="34" rx="3" class="plate" />
        <rect x="84" y="42" width="44" height="10" class="detail" />
        <rect x="262" y="42" width="74" height="10" class="detail" />
      </g>
      <g class="part p2">
        <rect x="70" y="84" width="280" height="96" rx="3" class="plate" />
        <rect x="88" y="104" width="150" height="16" class="detail" />
        <rect x="88" y="128" width="110" height="9" class="detail soft" />
        <rect x="88" y="150" width="64" height="18" class="accent" />
      </g>
      <g class="part p3">
        <rect x="70" y="198" width="134" height="84" rx="3" class="plate" />
        <rect x="84" y="212" width="70" height="10" class="detail" />
        <rect x="84" y="230" width="104" height="7" class="detail soft" />
        <rect x="84" y="243" width="92" height="7" class="detail soft" />
      </g>
      <g class="part p4">
        <rect x="216" y="198" width="134" height="84" rx="3" class="plate" />
        <rect x="230" y="212" width="70" height="10" class="detail" />
        <rect x="230" y="230" width="104" height="7" class="detail soft" />
        <rect x="230" y="243" width="92" height="7" class="detail soft" />
      </g>
      <g class="part p5">
        <rect x="70" y="300" width="280" height="30" rx="3" class="plate" />
        <rect x="84" y="311" width="120" height="8" class="detail soft" />
      </g>

      <!-- Callouts -->
      <g class="callouts">
        <g><line x1="46" y1="47" x2="70" y2="47" /><circle cx="34" cy="47" r="11" /><text x="34" y="51">1</text></g>
        <g><line x1="374" y1="120" x2="350" y2="120" /><circle cx="386" cy="120" r="11" /><text x="386" y="124">2</text></g>
        <g><line x1="46" y1="240" x2="70" y2="240" /><circle cx="34" cy="240" r="11" /><text x="34" y="244">3</text></g>
        <g><line x1="374" y1="240" x2="350" y2="240" /><circle cx="386" cy="240" r="11" /><text x="386" y="244">4</text></g>
        <g><line x1="46" y1="315" x2="70" y2="315" /><circle cx="34" cy="315" r="11" /><text x="34" y="319">5</text></g>
      </g>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .ev {
        width: 100%;
        height: auto;
        overflow: visible;
        --line: var(--ink);
        --plate-fill: var(--plate);
      }
      .ev--dark {
        --line: #fff;
        --plate-fill: rgba(255, 255, 255, 0.12);
      }
      .plate {
        fill: var(--plate-fill);
        stroke: var(--line);
        stroke-width: 2;
      }
      .detail {
        fill: var(--line);
      }
      .detail.soft {
        opacity: 0.45;
      }
      .accent {
        fill: var(--decal);
      }
      .callouts line {
        stroke: var(--line);
        stroke-width: 1.5;
        stroke-dasharray: 3 3;
      }
      .callouts circle {
        fill: none;
        stroke: var(--line);
        stroke-width: 2;
      }
      .callouts text {
        fill: var(--line);
        font: 700 12px var(--font-mono);
        text-anchor: middle;
      }
      .part {
        animation: explode 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) 0.3s both;
      }
      .p1 {
        --dx: 0px;
        --dy: -14px;
      }
      .p2 {
        --dx: 0px;
        --dy: -4px;
      }
      .p3 {
        --dx: -12px;
        --dy: 6px;
      }
      .p4 {
        --dx: 12px;
        --dy: 6px;
      }
      .p5 {
        --dx: 0px;
        --dy: 14px;
      }
      .callouts {
        animation: fade 0.6s ease 1.5s both;
      }
      @keyframes explode {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(var(--dx), var(--dy));
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .part,
        .callouts {
          animation-duration: 0.01ms;
          animation-delay: 0s;
        }
      }
    `,
  ],
})
export class ExplodedViewComponent {
  @Input() tone: 'light' | 'dark' = 'light';
  @Input() label = 'Exploded view of a web page: header, hero, two content cards and footer, numbered 1 to 5.';
}
