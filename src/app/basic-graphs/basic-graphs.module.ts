import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyClicksComponent } from './monthly-clicks/monthly-clicks.component';
import { BasicGraphsComponent } from './basic.graphs.component';
import { BasicGraphsRoutingModule } from './basic-graphs-routing.module';
import { BasicGraphsHttpService } from './basic-graphs-http.service';

@NgModule({
  declarations: [BasicGraphsComponent, MonthlyClicksComponent],
  imports: [CommonModule, BasicGraphsRoutingModule],
  providers: [BasicGraphsHttpService],
})
export class BasicGraphsModule {}
