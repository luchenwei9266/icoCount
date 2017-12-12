import { Component, OnInit } from '@angular/core';
import AV from '../key';

@Component({
  selector: 'app-ico-info',
  templateUrl: './ico-info.component.html',
  styleUrls: ['./ico-info.component.css']
})
export class IcoInfoComponent implements OnInit {
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];

  public ICOData: Array<any>;
  public ICOList: Array<any>;
  public ICOObj: string;

  _displayDataChange($event) {
    this._displayData = $event;
    this._refreshStatus();
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

  ngOnInit() {
    let query = new AV.Query('count');
    query.include('ICOName').limit(1000).descending('createdAt');
    query.find().then((result:any) => {
      let tempList = [];
      result = JSON.parse(JSON.stringify(result));
      
      result.forEach((element,index) => {
        let tempObj = {
          key : index,
          name : element.userName,
          ICOName : element.ICOName.ICOName,
          userWechat : element.userWechat,
          userAddr : element.userAddr,
          ICONum : element.ICONum,
          createdAt : element.createdAt,
        }
        tempList.push(tempObj);
      });
      this.ICOData = tempList;
    });

    let ICOQuery = new AV.Query('ICOs');
    ICOQuery.descending('createdAt').limit(1000);
    ICOQuery.find().then((result:any) => {
      result = JSON.parse(JSON.stringify(result));
      this.ICOList = result;
    })
  }

  selectChange () {
    console.log(111);
    if (!this.ICOObj) return false;
    // 构建ICO表对象
    let icoItem = AV.Object.createWithoutData('ICOs', this.ICOObj);
    let query = new AV.Query('count');
    query.equalTo('ICOName',icoItem);
    query.find().then((result:any) =>{
      let tempList = [];
      result = JSON.parse(JSON.stringify(result));
      result.forEach((element,index) => {
        let tempObj = {
          key : index,
          name : element.userName,
          ICOName : element.ICOName.ICOName,
          userWechat : element.userWechat,
          userAddr : element.userAddr,
          ICONum : element.ICONum,
          createdAt : element.createdAt,
        }
        tempList.push(tempObj);
      });
      this.ICOData = tempList;
    })
}

  constructor() {}
}
