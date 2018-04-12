import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage'
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';

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
export class MorePage extends BaseUI{
  //定义登录状态
  public notLogin : boolean = true;
  public logined : boolean = false;
  headface: string;
  userinfo: string[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public storage: Storage,
              public loadCtrl: LoadingController,
              public rest: RestProvider,  
            ) {
    super();
  }

  showModal(){
    let modal = this.modalCtrl.create(LoginPage);
    // 关闭后的回调(modal关闭不会再次触发页面【ionViewDidEnter】的生命周期)
    modal.onDidDismiss(()=>{
      this.loadUserPage();
    })
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
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl,'加载中')
        this.rest.getUserInfo(val)
        .subscribe(
          userinfo => {
            this.userinfo = userinfo;
            //后面加上new date，给资源文件加上一个后缀，取消缓存效果
            this.headface = userinfo["UserHeadface"]+"?"+(new Date()).valueOf;
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          }
        );
      }else{
        this.notLogin = true;
        this.logined = false;
      }
    })
  }

  //user页面
  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }

}
