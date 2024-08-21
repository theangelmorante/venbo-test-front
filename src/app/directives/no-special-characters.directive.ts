import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

export function noSpecialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /[^a-zA-Z\s]/.test(control.value);
    return forbidden ? { noSpecialCharacters: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appNoSpecialCharacters]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoSpecialCharactersDirective,
      multi: true,
    },
  ],
})
export class NoSpecialCharactersDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return noSpecialCharactersValidator()(control);
  }
}
