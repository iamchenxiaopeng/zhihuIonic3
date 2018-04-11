import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * 
 * 
 * @export
 * @class LoginPage
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{//子类继承父类

  mobile:any;
  password:any;
  errorMessage:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loadingCtrl:LoadingController,
              public rest:RestProvider,
              public toastCtrl:ToastController) {
    super();//子类调用父类的方法
  }

  login(){
    var loadding = super.showLoading(this.loadingCtrl,"登录中")
    this.rest.login(this.mobile,this.password)
    .subscribe(
      f=>{
        if(f["Status"]=="OK"){
          //登录成功
        }else{
          loadding.dismiss();
          super.showToast(this.toastCtrl,f["StatusContent"])
        }
      },
      error=>this.errorMessage=<any>error
    );
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


}
