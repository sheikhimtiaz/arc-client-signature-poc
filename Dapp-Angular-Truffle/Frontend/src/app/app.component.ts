import { Component, OnInit } from '@angular/core';
import { ContractService } from './services/contract/contract.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'AngularDapp';
    constructor(private contract: ContractService) {

    }

    ngOnInit() {
        this.contract.loadWeb3();
    }
}
