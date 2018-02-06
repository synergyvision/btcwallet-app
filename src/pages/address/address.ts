import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../app/models/address';
import { AuthService } from '../../app/services/auth.service';
import { AppSettings } from '../../app/app.settings';

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
              public formBuilder: FormBuilder, private authService: AuthService) {
    // Form Builder
    this.inputs = [
      {
        placeholder: 'Correo', name: 'email', value: '', type: 'email',
        validators: [Validators.email, Validators.maxLength(30), Validators.required],
      },
      {
        placeholder: 'Alias', name: 'alias', value: '', type: 'text',
        validators: [Validators.required, Validators.maxLength(30)],
      },
      {
        placeholder: '', name: 'id', value: null, type: 'null',
        validators: null,
      },
      {
        placeholder: '', name: 'img', value: '../assets/icons/wallet-user.svg', type: 'null',
        validators: null,
      },
    ];
    this.addressForm = formBuilder.group({});
    this.inputs.forEach((control) => {
      this.addressForm.addControl(control.name, new FormControl(control.value));
      this.addressForm.controls[control.name].setValidators(control.validators);
    });
  }

  // Save changes to the address
  private onSubmit(form) {
    this.authService.addressExist(form.value.email)
    .subscribe((response) => {
      if (response) {
        this.validateAddress(form);
      } else {
        this.error = 'Este usuario no existe';
      }
    });
  }

  private validateAddress(form: FormGroup) {
    this.authService.isAddressSaved(form.value.email)
      .subscribe((response) => {
        if (response.length === 0) {
          this.authService.addAddress(form);
          this.navCtrl.pop();
        } else {
          // User already exists on the addressBook
          this.error = 'Este usuario ya se encuentra en su libreta';
        }
      }, (error) => {
        this.error = error;
      });
  }
}
