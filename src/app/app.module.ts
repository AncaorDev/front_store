import './core/date.extensions';
import './core/string.extension';
import './core/number.extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common'
import { ProgressbarComponent } from './admin/components/progressbar/progressbar.component';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MenuResponsiveComponent } from './public/components/menu-responsive/menu-responsive.component';
import { PublicModule } from './public/public.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthInterceptorService } from './auth-interceptor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { NotFoundComponent } from './admin/pages/404/not-found.component';
import localeEs from '@angular/common/locales/es';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppProvider } from './app.provider';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SlickCarouselModule } from 'ngx-slick-carousel';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export function AppProviderFactory(provider) {
	return () => provider.load();
}

registerLocaleData(localeEs, 'es');
@NgModule({
	exports: [SlickCarouselModule],
	declarations: [
		AppComponent,
		NotFoundComponent,
		MenuResponsiveComponent,
		ProgressbarComponent,
	],
	imports: [
		SlickCarouselModule,
		SharedModule.forRoot(),
		PdfViewerModule,
		PublicModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgxUsefulSwiperModule,
		TranslateModule.forRoot({
			loader: {
			  provide: TranslateLoader,
			  useFactory: HttpLoaderFactory,
			  deps: [HttpClient]
		   }
		})
	],
	providers: [AppProvider,
				{ 	provide: APP_INITIALIZER,
					useFactory: AppProviderFactory,
					deps: [AppProvider], multi: true
				},
				DatePipe,
				{
					provide  : HTTP_INTERCEPTORS,
					useClass : AuthInterceptorService,
					multi    : true
				},
				{ provide: LOCALE_ID, useValue: 'es' },
				MatDatepickerModule,
				MatDialogModule,
                MatSliderModule,
				MatExpansionModule,
				],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(overlayContainer: OverlayContainer) {
		overlayContainer.getContainerElement().classList.add('theme_default');
	}
}
