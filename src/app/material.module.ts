import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

const modules = [
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatSliderModule,
  MatDialogModule,
  MatRippleModule,
  MatButtonModule,
  MatDividerModule,
  MatToolbarModule,
  MatGridListModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatBottomSheetModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class AppMaterialModule {}
