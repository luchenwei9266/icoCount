import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import AV from '../key';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
		validateForm: FormGroup;
		public ICOList: Array<string>;
		public ICOObj: string;
		public userName: string;
		public userWechat: string;
		public userNum: any;
		public userAddr: string;
		
		constructor(private _message: NzMessageService) {}
	
		ngOnInit() {
			let query = new AV.Query('ICOs');
			query.descending('createdAt').limit(1000);
			query.find().then((result:any) => {
				result = JSON.parse(JSON.stringify(result));
				this.ICOList = result;
			})
		}

		_submitForm() {
			// 构建ICO表对象
			let icoItem = AV.Object.createWithoutData('ICOs', this.ICOObj);
			let Count = AV.Object.extend('count');
			let count = new Count();
			count.set('userName',this.userName)
								.set('userWechat',this.userWechat)
								.set('ICONum',this.userNum*1)
								.set('userAddr',this.userAddr)
								.set('ICOName',icoItem);
			count.save().then((todo) => {
				this._message.create('success', `添加成功`);
				this.fetch();
			}, (error) => {
				this._message.create('error', error);
			});

		}

		fetch() {
			this.ICOObj = this.userName = this.userWechat = this.userAddr = this.userNum = "";
		}

}
