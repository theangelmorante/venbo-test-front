import { Directive } from '@angular/core';

@Directive({
  selector: '[appNoSpecialCharacters]',
  standalone: true
})
export class NoSpecialCharactersDirective {

  constructor() { }

}
