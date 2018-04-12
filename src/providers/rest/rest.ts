import {
  Http,
  Response
} from '@angular/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class RestProvider {
  //一些项目所需的api
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";


  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  /**
   * 
   * 通过HTTP请求，获取用户手机号和密码，进行登录
   *此处未对安全性有所考虑，实际应用需要加密
   * 
   * @private
   * @param {string} url 
   * @returns {Observable < string[] >} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable < string[] > {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body) || {}
  }

  //处理错误信息，并在console中显示
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) { //如果错误为response类型
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} $(err)`;
    } else {
      errMsg = error.message;
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  //登录
  login(mobile,password):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlLogin+"?mobile="+mobile+"&password="+password)
  }

  //注册
  register(mobile,nickname,password): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlRegister+"?mobile="+mobile+"&nickname="+nickname+"&password="+password)
  }

  //获取用户信息
  getUserInfo(userId):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUserInfo + "?userId=" + userId)
  }

  //更新用户信息
  updateNickName(userId,nickname):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname)
  }

}
