import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{

  mobile:any;
  nickname:any;
  password:any;
  confirmPassword:any;
  errorMessage:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl:ToastController) {
    super();
  }

  gotoLogin(){
    this.navCtrl.pop();
  }

  doRegister(){
    //前台验证手机号码
    if(!(/^1[34578]\d{9}/.test(this.mobile))){
      super.showToast(this.toastCtrl,'手机号格式有误')
    }else if(this.nickname.length<3 || this.nickname.length>10){
      super.showToast(this.toastCtrl,'用户昵称只能是3-10位')
    }else if(this.password.length<3 || this.password.length>12){
      super.showToast(this.toastCtrl,'用户密码只能是3-12位')
    }else if(this.password != this.confirmPassword){
      super.showToast(this.toastCtrl,'两次输入的密码不匹配')
    }else{
      var loading=super.showLoading(this.loadingCtrl,"注册中...");
      this.rest.register(this.mobile,this.nickname,this.password)
      .subscribe(
        f=>{
          if(f["Status"]=="OK"){
            loading.dismiss();
            super.showToast(this.toastCtrl,"注册成功")            
            this.dismiss();
          }else{
            loading.dismiss();
            super.showToast(this.toastCtrl,f["StatusContent"])
          }
        },
        error => this.errorMessage = <any>error
      )
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
