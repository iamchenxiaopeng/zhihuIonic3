import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji'
/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export const EMOJI_ACCESSOR:any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>EmojipickerComponent),
  multi:true
}
@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers:[EMOJI_ACCESSOR]
})
//用implements实现接口 ControlValueAccessor
//接口里面每个方法都要写（带?的可以不写）
export class EmojipickerComponent implements ControlValueAccessor{

  emojiArray=[];
  content:string;
  text: string;
  onChanged:Function;
  onTouched:Function;

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();
  }

  //再次处理新的内容赋值以及函数的绑定
  
  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }
  //再次处理新的内容赋值以及函数的绑定
  registerOnTouched(fn: any): void {
    this.onTouched += fn;
    if(this.content){
      this.onChanged(this.content);
    }
  }

  setValue(val:any):any{
    this.content+=val;
    if(this.content){
      this.onChanged(this.content);
    }
  }
  
  
}
