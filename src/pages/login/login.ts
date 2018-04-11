import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';


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
// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{//子类继承父类（的方法）

  mobile:any;
  password:any;
  errorMessage:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loadingCtrl:LoadingController,
              public rest:RestProvider,
              public toastCtrl:ToastController,
              public storage: Storage) {
    super();//子类通过super调用父类的构造函数
  }

  login(){
    var loadding = super.showLoading(this.loadingCtrl,"请稍等...")
    this.rest.login(this.mobile,this.password)
    .subscribe(
      f=>{
        if(f["Status"]=="OK"){
          //登录成功 ,通过导入stroage组件来对相关信息的储存
          //（导入之前需要npm安装该组件）可以查api 
          //也可以存储接口返回的 taken（比起storage更复杂）
          this.storage.set('UserId',f["UserId"]);
          loadding.dismiss();
          this.dismiss();
          
        }else{
          loadding.dismiss();
          super.showToast(this.toastCtrl,f["StatusContent"])
        }
      },
      error=>this.errorMessage=<any>error
    );
  }
  pushRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  //重要：关闭当前页面（this指向调用者）
  dismiss(){
    this.viewCtrl.dismiss();
  }


}
