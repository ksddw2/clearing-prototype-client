import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from './services/app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

    readonly TAB_TEXT = "Margin Calls";
    marginTabText = this.TAB_TEXT;

    setMarginTabTitle(count) {
      this.marginTabText = this.TAB_TEXT + "(" + count + ")";
    }
}
