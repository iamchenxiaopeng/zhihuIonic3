import {
  Component
} from '@angular/core';
import {
  IonicPage,
  normalizeURL,
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  ToastController,
  LoadingController,
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
//四个navive组件
import {
  File
} from '@ionic-native/file';
import {
  Transfer,
  TransferObject
} from '@ionic-native/transfer';
import {
  FilePath
} from '@ionic-native/file-path';
import {
  Camera
} from '@ionic-native/camera';

declare var cordova: any; //导入第三方库定义到ts项目中

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  userId: string;
  errorMessage: string;
  lastImage: string = null;

  constructor(public navCtrl: NavController,
    public storage: Storage,
    public rest: RestProvider,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }
  ionViewDidEnter() {
    this.storage.get('UserId').then((val => {
      if (val != null) {
        this.userId = val;
      }
    }))
  }

  //选择上传图片方式的弹窗
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [{
          text: '从图片酷中选择',
          handler: () => {
            //打开图库
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          } //接口
        },
        {
          text: '使用相机',
          handler: () => {
            //开启相机
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(soureType) {
    //定义相机的一些参数
    var options = {
      quality: 100, //图片的质量
      soureType: soureType,
      saveToPhotoAlbum: false, //是否保存相片到本地相册中
      correctOrientation: true, //自动纠正相机方向
    };
    this.camera.getPicture(options).then((imagePath) => {
        //特别处理android平台路径问题
        if (this.platform.is('android') && soureType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          //android平台
          this.filePath.resolveNativePath(imagePath) //用filepath组件获取安卓平台的路径
            .then(filePath => {
              //安卓平台获取正确的路径和文件名
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/' + 1));
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'))
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
            })
        } else {
          //其他平台
          let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1)
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
        }
      },
      (err) => {
        super.showToast(this.toastCtrl, "选择图片出现错误，请在app中操作或是权限问题")
      }
    )
  }

  //将获取的图片或者相机拍摄的图片另存，用于后期图片上传
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
      },
      error => {
        super.showToast(this.toastCtrl, "存储图片到本地图库出现错误")
      }
    )
  }

  //为文件生成一个新的文件名
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }
  uploadImage() {
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.userId + ".jpg"; //定义上传后的文件名
    //fileTransfer上传的参数
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'fileName': filename,
        'userid': this.userId
      }
    }

    const fileTransfer: TransferObject = this.transfer.create();
    var loading = super.showLoading(this.loadingCtrl, '上传中');
    //文件上传
    fileTransfer.upload(targetPath, url, options).then(data => {
        loading.dismiss();
        super.showToast(this.toastCtrl, '图片上传成功!');
        // 在用户看清弹窗后才关闭页面
        setTimeout(() => {
          this.viewCtrl.dismiss();
        }, 2000)
      },
      err => {
        loading.dismiss();
        super.showToast(this.toastCtrl, '图片上传错误，请重试')
      }
    )
  }


}
