const MY_DATE_FORMAT = {
    parse: {
      dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
    },
    display: {
      dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    }
};

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InventaryAddComponent } from './pages/inventary-add/inventary-add.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import { CoreComponent } from './core/core.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TypesProductComponent } from './pages/types-product/types-product.component';
import { TypesProductAddComponent } from './pages/types-product-add/types-product-add.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MarkProductComponent } from './pages/mark-product/mark-product.component';
import { MarkProductAddComponent } from './pages/mark-product-add/mark-product-add.component';
import { ProgrammingComponent } from './pages/inventary/inventary.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { MovementsAddComponent } from './pages/movements-add/movements-add.component';
import { ClasificationProductComponent } from './pages/clasification-product/clasification-product.component';
import { ClasificationProductAddComponent } from './pages/clasification-product-add/clasification-product-add.component';
import { StoreComponent } from './pages/store/store.component';
import { StoreAddComponent } from './pages/store-add/store-add.component';
import { MovementsAddFormComponent } from './pages/movements-add-form/movements-add-form.component';
import { RolComponent } from './pages/rol/rol.component';
import { RolAddComponent } from './pages/rol-add/rol-add.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
    declarations : [CoreComponent,
                    LoginComponent,
                    Dashboard2Component,
                    LogoutComponent,
                    TypesProductComponent,
                    TypesProductAddComponent,
                    MarkProductComponent,
                    MarkProductAddComponent,
                    MovementsComponent,
                    MovementsAddComponent,
                    ProgrammingComponent,
                    InventaryAddComponent,
                    ClasificationProductComponent,
                    ClasificationProductAddComponent,
                    StoreComponent,
                    StoreAddComponent,
                    MovementsAddFormComponent,
                    RolComponent,
                    RolAddComponent
                    ],
    entryComponents : [],
    imports : [AdminRoutingModule,
               CommonModule,
               SharedModule,
               PdfViewerModule,
               MatAutocompleteModule,
               MatTableModule,
               MatSortModule,
               MatPaginatorModule,
               Ng2GoogleChartsModule
            ],
    providers : [
        { provide: MatPaginatorIntl },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ]
})
export class AdminModule { }
