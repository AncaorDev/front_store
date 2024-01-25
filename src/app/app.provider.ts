import {Injectable} from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class AppProvider {
    constructor() {

    }

    load() {
        return new Promise(async (resolve) => {
            return resolve(true)
        })
    }
}
