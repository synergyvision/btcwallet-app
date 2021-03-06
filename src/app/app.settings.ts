import { IToken } from './models/user';

// Allows to set up Global Static Values thought the App

export class AppSettings {

  public static pagesMenu = [
    { title: 'HOME.title', component: 'HomePage', icon: 'menu-home' },
    { title: 'ACCOUNT.title', component: 'AccountPage', icon: 'menu-account' },
    { title: 'ADDRESS_BOOK.title', component: 'AddressBookPage', icon: 'menu-address-book' },
    { title: 'TRANSACTIONS.title', component: 'TransactionsPage', icon: 'menu-transactions' },
    { title: 'ACTIVITY.title', component: 'ActivityPage', icon: 'menu-activity' },
    { title: 'EXCHANGE.title', component: 'ExchangePage', icon: 'menu-exchange'},
    { title: 'BLOCKCHAIN.title', component: 'BlockchainPage', icon: 'menu-explorer'},
  ];

  public static accountOptions = [
    { title: 'ACCOUNT_OPTIONS.security_settings', component: 'AccountSecurityPage'},
    { title: 'ACCOUNT_OPTIONS.wallet_settings' , component: 'AccountWalletPage'},
  ];

  public static securityOptions =  [
    { title: 'SECURITY_OPTIONS.recover_password', function: 'restorePassword',
      condition: (att?: any): boolean => {
        return true;
      }},
    { title: 'SECURITY_OPTIONS.activate_2auf', function: 'activateTwoFactorAuth',
      condition: (token?: any): boolean => {
        if (token.enabled === false) {
            return true;
        }
        return false;
      },
    },
    { title: 'SECURITY_OPTIONS.deactivate_2auf', function: 'deactivateTwoFactorAuth',
      condition: (token?: any): boolean => {
        if (token.activated) {
            return true;
        }
        return false;
        },
      },
  ];

  public static walletOptions = [
    { title: 'WALLET_OPTIONS.change_currency', value: 'changeCurrency' },
    { title: 'WALLET_OPTIONS.change_crypto_unit', value: 'changeCryptoUnit'},
    { title: 'WALLET_OPTIONS.export_wallet', value: 'exportWallet'},
    { title: 'WALLET_OPTIONS.import_wallet', value: 'importWallet'},
  ];

}
