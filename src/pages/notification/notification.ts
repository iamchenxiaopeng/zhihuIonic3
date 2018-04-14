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
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  DetailsPage
} from '../details/details'

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  errorMessage: any;
  //判断是否有通知
  hasNotification: boolean = false;
  notificationList: string[];

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

  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        // var loading = super.showLoading(this.loadCtrl, '加载中')
        this.rest.getUserNotifications(val)
          .subscribe(
            n => {
              this.notificationList = n;
              // loading.dismissAll(); 
              if(n.length !== 0){
                this.hasNotification = true;
              }    
                       
            },
            error => this.errorMessage = < any > error
          );
      }
    })
  }
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, {
      id: questionId
    });
  }


}
