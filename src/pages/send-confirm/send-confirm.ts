import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-confirm',
  templateUrl: 'send-confirm.html',
})
export class SendConfirmPage {

  private address;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.address = this.navParams.data;
  }

  private goToInicio() {
    this.navCtrl.popToRoot();
  }

}
