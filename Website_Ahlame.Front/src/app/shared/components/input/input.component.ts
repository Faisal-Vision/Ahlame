import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() formGroup: FormGroup | any;
  @Input() controlName = '';
  @Input() label = '';
  @Input() validatorLanguageType = '';
  @Input() inputType = 'textbox';
  @Input() contentType = 'text';
  @Input() placeholder = '';
  @Input() suffix = false;
  @Input() className = '';
  @Input() disabled = false;
}
