import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from './../adapters/unsubscribe-on-destroy-adapter';
import { BasicGraphsHttpService } from '../basic-graphs/basic-graphs-http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  show = false;

  @Input() multi = true;
  @Input() dataInfo: any;
  @ViewChild('accordion', { static: true }) accordion: any;
  constructor(private basicGraphs: BasicGraphsHttpService) {
    super();
  }
  ngOnInit(): void {
    this.subs
      .add
      // this.basicGraphs.dataInfoSubj.subscribe((d) => {
      //   this.dataInfo = d;
      // })
      ();
  }
  closeAll() {
    this.accordion.closeAll();
  }
}
