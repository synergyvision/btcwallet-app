import { IWallet } from './IWallet';

export class Wallet {
    public addresses: string[];
    public name: string;
    public token: string;

    constructor(addresses: string[], name: string, token: string) {
        this.addresses = addresses;
        this.name = name;
        this.token = token;
    }
}
