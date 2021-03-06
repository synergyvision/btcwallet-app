import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../app/models/address';
import { SharedService } from '../../app/services/shared.service';
import { AppData } from '../../app/app.data';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '../../app/services/loader.service';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})

// Component for displaying one address

export class AddressPage {

  private address: Address;
  private action: string;
  private addressForm: FormGroup;
  private inputs;
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events,
              public formBuilder: FormBuilder, private sharedService: SharedService,
              private translate: TranslateService, private loaderService: LoaderService) {
    // Form Builder
    this.inputs = AppData.addressInputs;
    this.addressForm = formBuilder.group({});
    this.inputs.forEach((control) => {
      this.addressForm.addControl(control.name, new FormControl(control.value));
      this.addressForm.controls[control.name].setValidators(control.validators);
    });
  }

  // Save changes to the address
  private onSubmit(form) {
    this.loaderService.showSpinner();
    const firebaseSub = this.sharedService.addressExist(form.value.email)
    .subscribe((response) => {
      if (response) {
        response = response.pop();
        const newAddress = new Address(form.value.alias, form.value.email, response.img, response.key);
        this.validateAddress(newAddress);
        this.loaderService.dismissLoader();
      } else {
        this.error = this.translate.instant('ERROR.user_does_not_exist');
        this.loaderService.dismissLoader();
      }
      firebaseSub.unsubscribe();
    }, ((error) => {
      this.translate.instant(error);
      firebaseSub.unsubscribe();
    }));
  }

  private validateAddress(address: Address) {
    const firebaseSub = this.sharedService.isAddressSaved(address.email)
      .subscribe((response) => {
        if (response.length === 0) {
          this.sharedService.addAddress(address);
          this.navCtrl.pop();
        } else {
          // User already exists on the addressBook
          this.error = this.translate.instant('ERROR.duplicated_user');
        }
        firebaseSub.unsubscribe();
      }, (error) => {
        firebaseSub.unsubscribe();
        this.error = this.translate.instant(error);
      });
  }
}
