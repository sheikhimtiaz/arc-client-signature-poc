import { ContractService } from './../../services/contract/contract.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Identicon } from '../../services/identicon';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  direction: string;
  balance: string;
  data;

  constructor(private contract: ContractService, private sanitizer: DomSanitizer) {

  }

  getImage() {
    this.data = this.sanitizer.bypassSecurityTrustResourceUrl((
      'data:image/svg+xml; utf8,'
      + encodeURI(new Identicon(Md5.hashStr(this.direction), {size: 32, format: 'svg'}).toString(true))
    ));
  }

  navigateTo() {
    window.open('https://metamask.io/');
  }

  connectAccount() {
    console.warn('dio');
    this.contract.connectAccount().then((value: any) => {
      console.log(value);
      this.direction = value;
      this.getDetails(this.direction);
      this.getImage();
    }).catch((error: any) => {
      this.contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
  }


  getDetails(account){
    this.contract.accountInfo(account).then((value:any) => {
      this.balance = value;
      console.log(value);
    }).catch((error: any) => {
      this.contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
  }

}
