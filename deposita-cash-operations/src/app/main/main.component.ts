import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, FooterComponent],
  template: `
    <main-header />
      <ng-content />
    <main-footer />
  `,
  styles: ``
})
export class MainComponent {

}
