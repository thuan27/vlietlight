
export class ValidationService {
    isNumber(evt, int = false) {
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if (!(charCode >= 48 && charCode <= 57) &&  !(charCode === 46) && (charCode === 0)) {
            if (int) {
                evt.preventDefault();
            }
            else {
                if (charCode !== 46) {
                    evt.preventDefault();
                }
            }
        }
// int
        // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        //     if (int) {
        //         evt.preventDefault();
        //     }
        //     else {
        //         if (charCode !== 46) {
        //             evt.preventDefault();
        //         }
        //     }
        // }
    }
}
