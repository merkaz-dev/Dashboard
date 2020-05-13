import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dashboard';
  constructor(
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon(
      'wm-logo',
      domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/svg/logoSvg.svg'
      )
    );

    matIconRegistry.addSvgIcon(
      'vertical-dots',
      domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/svg/vertical-dots.svg'
      )
    );
  }
}
