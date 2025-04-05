import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-inline-message',
  templateUrl: './inline-message.component.html',
  imports: [CommonModule, TranslateModule],
})
export class InlineMessageComponent {
  @Input() control!: AbstractControl | null;
  @Input() translate = true;

  get errorKey(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) return null;
    return Object.keys(this.control.errors)[0] || null;
  }
}
