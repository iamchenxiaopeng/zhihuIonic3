import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ViewController
} from 'ionic-angular';
import {
  Storage
} from '@ionic/storage'
import {
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
} from '../../providers/rest/rest';


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  //给一个默认头像和名字，增强用户体验
  headface: string = "https://imoocqa.gugujiankong.com/users/5996953615f87ec629cff319.jpg?function%20valueOf()%20{%20[native%20code]%20}";
  nickname: string = "加载中...";
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
    super();
  }

  //声明周期函数
  ionViewDidEnter() {
    this.loadUserPage();
  }
  //更改登录状态
  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, '加载中')
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.headface = userinfo["UserHeadface"];
              this.nickname = userinfo["UserNickName"]
              loading.dismiss();
            },
            error => this.errorMessage = < any > error
          );
      }
    })
  }

  //更新用户状态
  updateNickName() {
    this.storage.get('UserId').then((val) => {
      console.log(val);
      if (val != null) {
        var loading = this.showLoading(this.loadCtrl, "修改中...");        
        this.rest.updateNickName(val, this.nickname)
          .subscribe( 
            f => {
              if (f["Status"] = "OK") {
                loading.dismiss();
                super.showToast(this.toastCtrl, "昵称修改成功！")
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
              error => this.errorMessage = < any  > error;
            }
          )
      }
    })
  }

  //注销登录
  logout(){
    this.storage.remove('UserId');
    this.viewCtrl.dismiss()
  }

}
