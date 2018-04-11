import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * 
 * 
 * @export
 * @class MorePage
 */
// @IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  //定义登录状态
  public notLogin : boolean = true;
  public logined : boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public storage: Storage  
            ) {
  }

  showModal(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  //声明周期函数
  ionViewDidEnter(){
   this.loadUserPage();
  }
  //更改登录状态
  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        this.notLogin = false;
        this.logined = true;
      }else{
        this.notLogin = true;
        this.logined = false;
      }
    })
  }

}
