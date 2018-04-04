import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../app/services/alert.service';
import { EventService } from '../../app/services/events.services';
import { AppData } from '../../app/app.data';
import { LoaderService } from '../../app/services/loader.service';
import { TranslateService } from '@ngx-translate/core';

// Component for the Login Page
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;
  private error: string;
  private inputs;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loaderService: LoaderService,
              private authService: AuthService, private formBuilder: FormBuilder, private events: Events,
              private translate: TranslateService) {
    this.inputs = AppData.loginForm;
    this.loginForm = formBuilder.group({});
    this.inputs.forEach((control) => {
      this.loginForm.addControl(control.name, new FormControl(control.value));
      this.loginForm.controls[control.name].setValidators(control.validators);
    });
  }

  private loginGoogle() {
    this.authService.loginGoogle().then((success) => {
      this.events.publish('user:loggedIn');
    }).catch((error) => {
      this.error = this.translate.instant('ERROR.unknown');
    });
  }

  private loginEmail(loginForm: FormGroup) {
    this.authService.login(loginForm.value.email, loginForm.value.password)
      .then((success) => {
        this.events.publish('user:loggedIn');
      }).catch((error) => {
        setTimeout(() => {
          console.log(error);
          this.error = this.translate.instant('ERROR.FIREBASE.' + error.code);
      }, 500);
      });
  }

  private goToRegister() {
    this.navCtrl.push('RegisterPage');
  }

}
