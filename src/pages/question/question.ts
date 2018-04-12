import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  BaseUI
} from '../../common/baseui';
import {
  Storage
} from '@ionic/storage';
import {
  RestProvider
} from '../../providers/rest/rest';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title: string;
  content: string;
  errorMssage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  //提交问题
  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, '')
        this.rest.saveQuestion(val, this.title, this.content)
          .subscribe(f => {
              if (f["Status"] == "OK") {
                loading.dismissAll();
                this.dismiss();
              } else {
                this.dismiss();
                super.showLoading
              }
            },
            error => this.errorMssage = < any > error
          )
      } else {
        super.showToast(this.toastCtrl, '请登录后发布提问')
      }
    })
  }

}
