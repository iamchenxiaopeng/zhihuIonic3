//UI层通用的一些方法的抽象类

import { Loading, LoadingController, ToastController,Toast } from "ionic-angular";

export abstract class BaseUI{//类要是抽象类(abstract)，才可以继承
    constructor(){}

    protected showLoading(
                        loadingCtrl:LoadingController,
                        message:string):Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange:true,//页面改变的时候自动关闭loading弹窗
        })
        loader.present();
        return loader;
    }
    protected showToast(toastCtrl:ToastController,message:string):Toast{
        let toast = toastCtrl.create({
            message:message,
            duration: 2000,//默认显示的时长
            position:`bottom`
        });
        toast.present();
        return toast;
    }
}