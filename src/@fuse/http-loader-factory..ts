import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
    console.log('%cFactory!!!', 'color:red;font-size:2rem');
    // const VERSION = Date.now(); //#I18N
    // return new TranslateHttpLoader(httpClient, `${environment.store.connectors.sails.restURL}/languages/json/`, `?version=${VERSION}`) //#I18N;
    return new TranslateHttpLoader(httpClient, `/assets/i18n/`, '.json');

}
