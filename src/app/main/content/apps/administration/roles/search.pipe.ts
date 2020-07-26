import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name : 'searchPipe',
})
export class SearchPipe implements PipeTransform {
    public transform(value:any, key: string, term: string) {
        return value.filter((item:any) => {
            if (item.hasOwnProperty(key)) {
                if (term) {
                    let str = item[key];
                    let regExp = new RegExp(term.toLocaleLowerCase(), 'g');
                    return str.toLocaleLowerCase().match(regExp) ? true : false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }
}