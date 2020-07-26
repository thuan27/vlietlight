import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'uppercaseToSpaceLower'})

export class UppercaseToSpaceLowerPipe implements PipeTransform {

    transform(strings: string): string {

        var i = 0;
        
        var tmp_str = '';
        while (i <= strings.length){
            var character = strings.charAt(i),
                prevChar = strings.charAt(i-1);

            if (character == character.toUpperCase() && prevChar != prevChar.toUpperCase()) {
                tmp_str += " ";
            }
            tmp_str += character;

            i++;
        }

        return tmp_str.charAt(0).toUpperCase() + tmp_str.slice(1);
    }
}