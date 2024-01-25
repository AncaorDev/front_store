import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'

@Pipe({name: 'reverseStr'})
export class ReverseStr implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    for (var i = value.length - 1; i >= 0; i--) {
      newStr += value.charAt(i);
    }
    return newStr;
  }
};

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
    transform(value:any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
        }
        return value;
    }
}

@Pipe({name: 'formatDate'})
export class formatDate implements PipeTransform {
    transform(value:any) {
        if (value) {
            let a = value.split('/');
            return  `${a[0]}/${a[1]}/${a[2].slice(2,4)}`
        }
        return value;
    }
}


@Pipe({name: 'shortName'})
export class shortNamePie implements PipeTransform {
    transform(value:any) {
        if (value.length>28) {
            value = `${value.substr(0,28)}...`
        }
        return value;
    }
}
