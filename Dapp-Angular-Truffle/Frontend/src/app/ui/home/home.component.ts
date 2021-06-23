import { Component, OnInit } from '@angular/core';
import { create, urlSource } from 'ipfs-http-client';
import { IPFS } from 'ipfs-core-types';
import { ImageResult } from 'src/app/interfaces/fileResult.interface';
import { ContractService } from 'src/app/services/contract/contract.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public ipfs: any;
    fileUrl: any;
    constructor(private contractService: ContractService) { }

    handleFileInput(fileData) {
        var file = fileData[0];
        let result: ImageResult = {
            file: null,
            url: null
        };

        this.fileToDataURL(file, result).then(r => {
            debugger
            this.fileUrl = r.dataURL;
            this.uploadFile(file);
        });
    }
    async uploadFile(file) {
        //QmWy5UZFSBMQpgdeWhQx441jsKqWU1ojPp2LERN4KZNZoH
        const fileAdded = await this.ipfs.add({path : 'abcd',content: file});
        const hash = fileAdded.cid.string;
        console.log(fileAdded);
        console.log('hash', hash);
        this.contractService.setHashInBlockChain(hash);
    }

    createIpfsClient() {
        this.ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        })
    };

    private fileToDataURL(file: File, result: ImageResult): Promise<ImageResult> {
        return new Promise((resolve) => {
            let reader = new FileReader();
            reader.onload = function (e) {
                result.dataURL = reader.result.toString();
                resolve(result);
            };
            reader.readAsDataURL(file);
        });
    }

    ngOnInit(): void {
        this.createIpfsClient();
        this.contractService.loadBlockchainData();
    }
}
