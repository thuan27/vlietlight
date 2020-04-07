
export class ValidationService {
    isNumber(evt, int = false) {
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            if (int) {
                evt.preventDefault();
            }
            else {
                if (charCode !== 46) {
                    evt.preventDefault();
                }
            }
        }
    }
}
