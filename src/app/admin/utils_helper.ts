import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class UtilsHelper {
    constructor(private translate : TranslateService,) {

    }

    urlSanatizer(string, arr) {
        arr.map((a,i) => {
            string = string.replace(`$${i+1}`, a);
        });
        return string;
    }

    async trs(code) : Promise<string> {
        return this.translate.get(code).toPromise();
    }
}
