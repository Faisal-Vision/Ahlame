import { AbstractControl, ValidatorFn } from '@angular/forms';


   export function dateRangeValidator(fromDateKey: string, toDateKey: string): ValidatorFn 
    {
        return (formGroup: AbstractControl): { [key: string]: any } | null => {
          const fromDate = formGroup.get(fromDateKey)?.value;
          const toDate = formGroup.get(toDateKey)?.value;
      
          if (!fromDate || !toDate) {
            return null; // Don't validate if one of the dates is missing
          }
      
          return toDate > fromDate ? null : { dateRange: true };
        };
    }
