import { Component, OnInit } from '@angular/core';
import AV from '../key';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-add-ico',
  templateUrl: './add-ico.component.html',
  styleUrls: ['./add-ico.component.css']
})
export class AddIcoComponent implements OnInit {
  public ICOName: string;
  public ICOProportion: string;
  public ICODiscount: any;

  constructor(private _message: NzMessageService) {}

  ngOnInit() {
  }

  _submitForm() {
    let query = new AV.Query('ICOs');
    query.equalTo('ICOName',this.ICOName);
    query.find().then((data:any) =>{
      if (data.length>0) {
        this._message.create('error', "该ICO已存在");
        return;
      }
      let ICOS = AV.Object.extend('ICOs');
      let icos = new ICOS();
      icos.set('ICOName',this.ICOName)
              .set('ICOProportion',this.ICOProportion)
              .set('ICODiscount',this.ICODiscount*1);
      icos.save().then(() => {
        this._message.create('success', `添加成功`);
        this.fetch();
      }, (error) => {
        this._message.create('error', error);
      });
    });
  }

  fetch() {
    this.ICOName = this.ICOProportion = this.ICODiscount = "";
  }

}
