import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Select2Module } from "ng-select2-component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../admin/components/loading/loading.component';
import { AuthguardGuard } from '../authguard.guard';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from '../public/components/header/header.component';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MaterialModule } from './material.module';
import { CustomIconComponent } from './components/cs-mat-icon/custom-icon.component';
import { MenuSolutionsComponent } from '../public/components/menu-solutions/menu-solutions.component';
import { LoadingPublicComponent } from '../public/components/loading/loading.component';
import { SearchComponent } from '../public/icons/search/search.component';
import { CsIconComponent } from '../public/components/cs-icon/cs-icon.component';
import { ReverseStr, SafePipe, CapitalizePipe, formatDate , shortNamePie } from '../app.pipe';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PortalModule } from '@angular/cdk/portal';
import { LoaderComponent } from './components/loader/loader.component';
import { StorageModule } from './providers/storage/storage.module';
import { VerifyGuard } from '../verify.guard';
import { OnlyNumberDirective } from '../core/directives/only-number.directive';
import { ModalResponseDownloadComponent } from './components/modal-response-download/modal-response-download.component';
import { ModalResponseComponent } from './components/modal-response/modal-response.component';
import { AntiOverlay } from './components/anti-overlay/anti-overlay.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarComponent } from './components/mat-snack-bar/mat-snack-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgInitDirective } from '../core/directives/init.directive';
import { MenuPacasComponent } from './components/menu-pacas/menu-pacas.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

registerLocaleData(localeEs, 'es');
@NgModule({
    declarations: [
        LoadingComponent,
        HeaderComponent,
        CustomIconComponent,
        MenuSolutionsComponent,
        LoadingPublicComponent,
        SearchComponent,
        CsIconComponent,
        ReverseStr,
        SafePipe,
        CapitalizePipe,
        formatDate,
        OnlyNumberDirective,
        ModalResponseComponent,
        ModalResponseDownloadComponent,
        AntiOverlay,
        MatSnackBarComponent,
        LoaderComponent,
        NgInitDirective,
        MenuPacasComponent,
        shortNamePie
    ],
    imports: [
        FlexLayoutModule,
        SlickCarouselModule,
        StorageModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        Select2Module,
        PdfViewerModule,
        NgbModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAroBxYNogmrBdkvvaFR16wPNlRKTG4_ws'
        }),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        AgmJsMarkerClustererModule,
        MaterialModule,
        PortalModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        }),
        NgxUsefulSwiperModule,


    ],
    entryComponents : [ModalResponseComponent, ModalResponseDownloadComponent, AntiOverlay],
    exports: [SlickCarouselModule,
              HeaderComponent,
              FormsModule,
              ReactiveFormsModule,
              Select2Module,
              NgbModule,
              LoadingComponent,
              AgmCoreModule,
              AgmJsMarkerClustererModule,
              MaterialModule,
              CustomIconComponent,
              MenuSolutionsComponent,
              LoadingPublicComponent,
              SearchComponent,
              CsIconComponent,
              ReverseStr,
              SafePipe,
              CapitalizePipe,
              formatDate,
              CalendarModule,
              PortalModule,
              OnlyNumberDirective,
              ModalResponseComponent,
              ModalResponseDownloadComponent,
              AntiOverlay,
              MatDatepickerModule,
              MatProgressSpinnerModule,
              TranslateModule,
              NgxUsefulSwiperModule,
              LoaderComponent,
              FlexLayoutModule,
              NgInitDirective,
              MenuPacasComponent,
              shortNamePie],
    providers : [AuthguardGuard,VerifyGuard]
  })

export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
          ngModule: SharedModule,
          providers: []
        }
      }
}

