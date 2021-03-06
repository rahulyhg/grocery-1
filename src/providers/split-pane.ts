import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';

@Injectable()
export class SplitPane {

  public splitPaneState : boolean;

  constructor(public platform : Platform) {
    console.log('Hello SplitPane Provider');
    this.splitPaneState = false;
  }

  getSplitPane() {
    if (localStorage.getItem('userData')) {
      if (this.platform.width() > 850) {
        this.splitPaneState = true;
      } else {
        this.splitPaneState = false;
      }
    } else {
      this.splitPaneState = false;
    }
    return this.splitPaneState;
  }

}