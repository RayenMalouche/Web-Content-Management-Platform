import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CuttingMatComponent } from '../../shared/kit/cutting-mat.component';
import { ExplodedViewComponent } from '../../shared/kit/exploded-view.component';
import { TextEffectComponent } from '../../shared/kit/text-effect.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterLink, CuttingMatComponent, ExplodedViewComponent, TextEffectComponent],
  standalone: true
})
export class HomeComponent {}
