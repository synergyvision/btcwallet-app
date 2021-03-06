// Placeholder Class/Interface for the user registered addresses
// Used for Sending BTC or CC to an user that also has a Vision Wallet

export class Address {
  public alias: string;
  public email: string;
  public img?: string;
  public uid?: string;

  constructor(alias: string, email: string, img?: string, uid?: string) {
    this.alias = alias;
    this.email = email;
    this.img = img;
    this.uid = uid;
  }

  public setAlias(alias: string) {
    this.alias = alias;
  }

}
