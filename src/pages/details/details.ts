import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage'
import { AnswerPage } from '../answer/answer';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{
  id:string;
  question: string[];
  answers: string[];
  errorMessage:any;
  isFavourite:boolean;
  userId:string;
  isMyQuestion:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
      super();
  }

  ionViewDidLoad() {
  //home页面传入了参数,通过this.navParams.get（）获取    
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);    
  }
  //加载问题
  loadQuestion(id){
    this.storage.get('UserId').then((val)=>{        
      if(val!==null){
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl,'加载中...')           
        this.rest.getQuestionWithUser(id,val)
        .subscribe(
          q=>{
            loading.dismiss();
            this.question = q;            
            this.answers = q["Answers"];
            this.isFavourite = q["IsFavourite"];
            this.isMyQuestion = (q["OwnUserId"] == val);
          },
          error => this.errorMessage = <any>error
        )
      }
    })  
  }

  //关注和取消关注
  saveFavourite(){
    var loading = super.showLoading(this.loadingCtrl,'请求中...');
    this.rest.saveFavourite(this.id,this.userId)
    .subscribe(
      f=>{
        if(f["Status"]=="OK"){          
          loading.dismiss();
          super.showToast(this.toastCtrl,this.isFavourite ? "已取消关注":"关注成功");
          this.isFavourite = !this.isFavourite;
        }
      },
      error => this.errorMessage = <any>error
    )
  }

  //打开回答页面
  showAnswerPage(){
    let modal = this.modalCtrl.create(AnswerPage,{"id":this.id});
    // 该页面关闭后回调loadquestion这个函数刷新数据
    modal.onDidDismiss(()=>{
      this.loadQuestion(this.id)
    })
    modal.present();
  }

}
