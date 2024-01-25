import { NgModule } from '@angular/core';
import { RoutingModule } from './public-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { MaterialModule } from '../shared/material.module';
import { CarouselHomeComponent } from '../public/components/carousel-home/carousel-home.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
    declarations : [CarouselHomeComponent,],
    imports : [RoutingModule,
               CommonModule,
               BrowserAnimationsModule,
               MaterialModule,
               MatVideoModule,
               NgxUsefulSwiperModule,
               FormsModule,
               ReactiveFormsModule,
               StarRatingModule.forRoot(),
               BarRatingModule,
               SharedModule.forRoot(),
               SlickCarouselModule
            ],
    entryComponents : [],
    exports : [BrowserAnimationsModule,
               MaterialModule,
               CarouselHomeComponent,
               NgxUsefulSwiperModule,
               SlickCarouselModule
            ],
    providers: []
})
export class PublicModule {

}
