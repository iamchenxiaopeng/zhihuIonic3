import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{

  feeds:string[];
  errorMessage:string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,  
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider
  ) {
    super();
  }

  ionViewDidEnter(){
    this.getFeeds();
  }

  gotoQuestion(){
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  gotoChat(){
    this.selectTab(2)
  }

  //下面的tab栏切换方法
  selectTab(index: number){
    var t:Tabs = this.navCtrl.parent;//表示该页面的父级页面
    t.select(index);
  }

  //获取feed流
  getFeeds(){
    var loading = super.showLoading(this.loadingCtrl,'加载中...')
    this.rest.getFeeds()
    .subscribe(
      f=>{
        this.feeds = f;
        loading.dismiss();
      },
      error=>this.errorMessage = <any>error
    )
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
