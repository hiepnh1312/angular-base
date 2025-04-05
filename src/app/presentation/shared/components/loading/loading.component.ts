import {Component, inject} from '@angular/core';
import {LoadingService} from '../../../../core/services/loading.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: true
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
