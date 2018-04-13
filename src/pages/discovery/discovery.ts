import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';
/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{

  questions:string[];
  errorMessage:string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,  
    public loadingCtrl: LoadingController,
    public rest: RestProvider
  ) {
    super();
  }

  ionViewDidEnter(){
    this.getQuestions();
  }
  getQuestions(){
    var loading = super.showLoading(this.loadingCtrl,'加载中...')
    this.rest.getQuestions()
    .subscribe(
      q=>{
        this.questions = q;
        loading.dismiss();
        // console.log(f);   
          },
      error=>this.errorMessage = <any>error
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryPage');
  }

  //刷新事件
  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(questionId){    
    this.navCtrl.push(DetailsPage,{id: questionId});
  }

}
