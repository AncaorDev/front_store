import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
    imports : [MatTabsModule,
                MatButtonModule,
                MatMenuModule,
                MatCardModule,
                MatTooltipModule,
                MatCheckboxModule,
                MatDialogModule,
                MatSliderModule,
                MatExpansionModule,
                MatIconModule,
                MatDividerModule,
                MatRadioModule,
                MatSlideToggleModule,
				MatInputModule,
                MatButtonToggleModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatMomentDateModule,
                MatBottomSheetModule,
                MatListModule,
                MatFormFieldModule,
                MatSelectModule,
                MatSnackBarModule,
                MatProgressBarModule,
                MatProgressSpinnerModule],
    exports : [MatTabsModule,
                MatButtonModule,
                MatMenuModule,
                MatCardModule,
                MatTooltipModule,
                MatCheckboxModule,
                MatDialogModule,
                MatSliderModule,
                MatExpansionModule,
                MatIconModule,
                MatDividerModule,
                MatRadioModule,
                MatSlideToggleModule,
				MatInputModule,
                MatButtonToggleModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatMomentDateModule,
                MatBottomSheetModule,
                MatListModule,
                MatFormFieldModule,
                MatSelectModule,
                MatSnackBarModule,
                MatProgressBarModule,
                MatProgressSpinnerModule],
    providers : [
        MatDatepickerModule
    ]
})


export class MaterialModule {
    constructor(public dialog: MatDialog) {
    }
}
