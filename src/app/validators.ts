import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchAccountNumbers(control: AbstractControl): ValidationErrors | null {
  const accountNumber = control.get('accountNumber')?.value;
  const reEnterAccount = control.get('reEnterAccount')?.value;

  if (accountNumber !== reEnterAccount) {
    return { mismatch: true };
  }

  return null;
}
