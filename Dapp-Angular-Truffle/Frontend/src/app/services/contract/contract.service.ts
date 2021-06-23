import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3 from 'web3';
import * as Document from '../../../../../Blockchain/build/contracts/Document.json';
declare let window: any;

@Injectable({
    providedIn: 'root'
})

export class ContractService {
    account: any;
    contract: any;
    docHash: any;

    constructor(private snackbar: MatSnackBar) {

    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.account = accounts[0];
        console.log(this.account);
        const networkId = await web3.eth.net.getId()
        const networkData = Document.networks[networkId]
        if (networkData) {
            const contract = new web3.eth.Contract(Document.abi, networkData.address)
            this.contract = contract;
            this.docHash = await contract.methods.get().call();
            console.log('Dochash',this.docHash);
        } else {
            window.alert('Smart contract not deployed to detected network.')
        }
    }

    failure(message: string) {
        const snackbarRef = this.snackbar.open(message);
        snackbarRef.dismiss()
    }

    succes() {
        const snackbarRef = this.snackbar.open('Transaction complete successfully');
        snackbarRef.dismiss()
    }

    setHashInBlockChain(hash) {
        this.contract.methods.set(hash).send({ from: this.account }).then((r) => {
            this.docHash = hash; 
            return this.docHash;
        })
    }
}
