import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReceivePage } from '../receive/receive';
import { SendPage } from '../send/send';
import { User } from '../../app/models/user';
import { AuthService } from '../../app/services/auth.service';
import { RestService } from '../../app/services/rest.service';
import { Observable } from 'rxjs/Observable';
import { IBalance } from '../../app/models/IBalance';
import { LoaderService } from '../../app/services/loader.service';

// Component for the Home Page, displays user balance, and options

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  private user: User;
  private balance: IBalance;

  constructor(public navCtrl: NavController, private restService: RestService, private authService: AuthService,
              private loaderService: LoaderService, private zone: NgZone) {
    this.loaderService.showFullLoader('Espere');
    this.restService.balance
    .subscribe((balance) => {
      this.balance = balance;
      this.loaderService.dismissLoader();
    });
  }

  private ionViewWillEnter() {
    this.authService.updateBalance();
    this.restService.balance
    .subscribe((balance) => {
      this.zone.run(() => {
        this.balance = balance;
        console.log(balance);
      });
    });
  }

  private goToReceive() {
    this.navCtrl.push(ReceivePage);
  }

  private goToSend() {
    this.navCtrl.push(SendPage);
  }
}
