import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { User } from '../../app/models/user';
import { AppSettings } from '../../app/app.settings';
import { AppData } from '../../app/app.data';
import { Wallet } from '../../app/models/wallet';
import { CryptoCoin } from '../../app/models/crypto';
import { SharedService } from '../../app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-account-wallet',
  templateUrl: 'account-wallet.html',
})
export class AccountWalletPage {

  private wallets: Wallet[];
  private user: User;
  private walletOptions = AppSettings.walletOptions;
  private cryptoUnitsList = AppData.cryptoUnitList;
  private currenciesList = AppData.currenciesList;
  private selectedOption: string;
  private selectedWallet: Wallet;
  private selectedCrypto: CryptoCoin;
  private cryptoUnit: CryptoCoin;
  private selectedCurrency: string;
  private message: string;
  private wif: string;
  private showInput: boolean = false;
  private showWalletSelect: boolean = false;
  private recoverWalletForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedService,
              private translate: TranslateService, private formBuilder: FormBuilder) {
    this.wallets = this.sharedService.wallets;
    this.user = this.sharedService.user;
    this.cryptoUnit = this.cryptoUnitsList.pop();
  }

  get self() { return this; }
  private changeCurrency() {
    this.sharedService.updateCurrency(this.selectedCurrency);
    this.clearData();
    this.message = this.translate.instant('ACCOUNT_OPTIONS.success');
  }

  private ionViewWillEnter() {
    this.clearData();
  }

  private selectOption(value) {
    this.clearData();
    this.selectedOption = value;
    if (this.selectedOption.match(/^(exportWallet|changeCryptoUnit|showMnemonics)$/)) {
        this.showWalletSelect = true;
    } else {
      this.showWalletSelect = false;
    }
  }

  private changeCryptoUnit() {
    this.selectedWallet.crypto.units = this.selectedCrypto;
    this.sharedService.updateWalletCryptoUnit(this.selectedWallet)
    .then((success) => {
      this.clearData();
      this.message = this.translate.instant('ACCOUNT_OPTIONS.success');
    })
    .catch((error) => {
      this.message = this.translate.instant('ERROR.unknown');
    });
  }

  private clearData() {
    this.selectedOption = this.selectedCrypto =
    this.selectedWallet = this.selectedCurrency =
    this.wif = this.message = this.selectedWallet = undefined;
    this.showWalletSelect = this.showInput = false;
  }

  private exportWallet() {
    if (this.selectedWallet.crypto.value === 'tet' || this.selectedWallet.crypto.value === 'eth') {
      this.sharedService.getWalletWIF(this.selectedWallet)
      .subscribe((wif) => {
        this.wif = wif;
      });
    } else {
      this.showMnemonics();
    }
  }

  private showMnemonics() {
    this.sharedService.getWalletMnemonics(this.selectedWallet)
    .subscribe((mnemonics) => {
      this.selectedWallet = undefined;
      if (mnemonics !== undefined) {
        this.navCtrl.push('ShowMnemonicsPage', mnemonics);
      } else {
        this.message = this.translate.instant('ERROR.no_mnemonics');
      }
    });
  }

  private importWallet() {
    this.showInput = true;
  }

  private recoverWallet(form: FormGroup) {
  }

  private onWalletChange() {
    if (this.selectedOption === 'changeCryptoUnit') {
      this.cryptoUnit = this.cryptoUnitsList
      .filter((crypto) => {
        return (crypto.value === this.selectedWallet.crypto.value);
      }).pop();
    } else if (this.selectedOption === 'exportWallet') {
      this.exportWallet();
    } else {
      this.showMnemonics();
    }
  }
}
