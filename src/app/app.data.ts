import { CryptoCoin } from './models/crypto';
import { Activity } from './models/activity';
import { ValidatorFn, Validators } from '@angular/forms';

// Lowest unit of Token used by default by BlockCypher

export class AppData {

    // Forms

    public static registerForm = [
        {
            placeholder: 'FORM.email', name: 'email', icon: 'form-email', type: 'email',
            validators: [Validators.email, Validators.required, Validators.maxLength(30)],
        },
        {
            placeholder: 'FORM.password', name: 'password', icon: 'form-password', type: 'password',
            validators: [Validators.required, Validators.minLength(8),
            Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)],
        },
        {
            placeholder: 'FORM.repeat_password', name: 'confirmPassword', icon: 'form-password', type: 'password',
            validators: [Validators.required],
        },
    ];

    public static selectAddressForm = [
        {
            placeholder: 'FORM.address', name: 'inputAddress', type: 'text',
            validators: [Validators.maxLength(42), Validators.minLength(24), Validators.required] },
        {
            placeholder: 'FORM.token', name: 'token', type: 'number',
            validators: [Validators.minLength(6), Validators.maxLength(6), Validators.required],
        },
    ];

    public static loginForm = [
        {
            placeholder: 'FORM.email', name: 'email', icon: 'form-email', type: 'email',
            validators: [Validators.email, Validators.required, Validators.maxLength(30)],
        },
        {
            placeholder: 'FORM.password', name: 'password', icon: 'form-password', type: 'password',
            validators: [Validators.required, Validators.minLength(8)],
        },
    ];

    public static addressInputs = [
        {
            placeholder: 'FORM.email', name: 'email', value: '', type: 'email',
            validators: [Validators.email, Validators.maxLength(30), Validators.required],
        },
        {
            placeholder: 'FORM.alias', name: 'alias', value: '', type: 'text',
            validators: [Validators.required, Validators.maxLength(30)],
        },
    ];

    public static editAddressInputs = [
        {
            placeholder: 'FORM.alias', name: 'alias', value: '', type: 'text',
            validators: [Validators.required, Validators.maxLength(30)],
        },
    ];

    public static feeOptions = [
        {
            name: 'FORM.fee_low', value: 'low',
        },
        {
            name: 'FORM.fee_medium', value: 'medium',
        },
        {
            name: 'FORM.fee_high', value: 'high',
        },
    ];

    public static cryptoCurrencies = [
        { name: 'Testnet', value: 'tes' },
        { name: 'Bitcoin', value: 'btc' },
        { name: 'Dogecoin', value: 'dog' },
        { name: 'Litecoin', value: 'ltc' },
        { name: 'BlockCypher Testnet', value: 'bcy' },
        { name: 'Ethereum', value: 'eth' },
        { name: 'Ethereum Testnet', value: 'tet' },
    ];

    public static hdCryptoCurrencies = [
        { name: 'Testnet', value: 'tes' },
        { name: 'Bitcoin', value: 'btc' },
        { name: 'Dogecoin', value: 'dog' },
        { name: 'Litecoin', value: 'ltc' },
        { name: 'BlockCypher Testnet', value: 'bcy' },
    ];

    public static multiCryptoCurrencies = [
        { name: 'Testnet', value: 'tes' },
        { name: 'Bitcoin', value: 'btc' },
        { name: 'Dogecoin', value: 'dog' },
        { name: 'Litecoin', value: 'ltc' },
        { name: 'BlockCypher Testnet', value: 'bcy' },
    ];

    public static restAPIPaths = [
        { name: 'TESTNET_URL', path: 'btc/test3', crypto: 'tes' },
        { name: 'BITCOIN_URL', path: 'btc/main', crypto: 'btc' },
        { name: 'BLOCKCYPHER_TESTNET_URL', path: 'bcy/test', crypto: 'bcy' },
        { name: 'ETHER_URL', path: 'eth/main', crypto: 'eth' },
        { name: 'DOGE_URL', path: 'doge/main', crypto: 'dog' },
        { name: 'LITECOIN_URL', path: 'ltc/main', crypto: 'ltc' },
        { name: 'ETHER_TESTNET_URL', path: 'beth/test', crypto: 'tet' },
    ];

    public static metadataOptions = [
       { name: 'METADATA.payment', value: 'Payment' },
       { name: 'METADATA.gift', value: 'Gift' },
       { name: 'METADATA.transfer', value: 'Transference' },
    ];

    public static cryptoUnitList = [
        new CryptoCoin(
            'Testnet',
            'tes',
            [
                { name: 'BTC', exchange: 100000000 },
                { name: 'mBTC', exchange: 100000 },
                { name: 'sat', exchange: 1 },
            ],
            100000000, 'BTC'),
        new CryptoCoin(
            'BlockCypher',
            'bcy',
            [
                { name: 'BTC', exchange: 100000000 },
                { name: 'mBTC', exchange: 100000 },
                { name: 'sat', exchange: 1 },
            ],
            100000000, 'BTC'),
        new CryptoCoin(
            'Bitcoin',
            'btc',
            [
                { name: 'BTC', exchange: 100000000 },
                { name: 'mBTC', exchange: 100000 },
                { name: 'sat', exchange: 1 },
            ],
            100000000, 'BTC'),
        new CryptoCoin(
            'DOGECOIN',
            'dog',
            [
                { name: 'DOGE', exchange: 100000000 },
                { name: 'koinus', exchange: 1 },
            ],
            100000000, 'DOGE'),
        new CryptoCoin(
            'LiteCoin',
            'ltc',
            [
                { name: 'LTC', exchange: 100000000 },
                { name: 'lites', exchange: 1000000 },
                { name: 'photons', exchange: 1000 },
                { name: 'litoshis', exchange: 1 },
            ],
            100000000, 'LTC'),
        new CryptoCoin(
            'Ether',
            'eth',
            [
                { name: 'ether', exchange: 1000000000000000000 },
                { name: 'Gwei', exchange: 1000000000000000 },
                { name: 'Mwei', exchange: 1000000000000 },
                { name: 'Kwei', exchange: 1000000000 },
                { name: 'wei', exchange: 1 },
            ],
            1000000000000000000, 'ETH'),
        new CryptoCoin(
            'Ether Testnet',
            'tet',
            [
                { name: 'ether', exchange: 1000000000000000000 },
                { name: 'Gwei', exchange: 1000000000000000 },
                { name: 'Mwei', exchange: 1000000000000 },
                { name: 'Kwei', exchange: 1000000000 },
                { name: 'wei', exchange: 1 },
            ],
            1000000000000000000, 'ETH'),
        new CryptoCoin(
            'Dash',
            'das',
            [
                { name: 'DASH', exchange: 100000000 },
            ],
            100000000, 'DASH'),
    ];

    public static currenciesList = [
        'USD',
        'EUR',
    ];

    public static exchangePairs = [
        { crypto: 'btc', name: 'btc' },
        { crypto: 'ltc', name: 'ltc' },
        { crypto: 'dog', name: 'doge' },
        { crypto: 'eth', name: 'eth' },
        { crypto: 'das', name: 'dash' },
        { crypto: 'tes', name: 'btc' },
        { crypto: 'tet', name: 'eth' },
        { crypto: 'bcy', name: 'btc' },
    ];

    public static activityList = [
        new Activity('12/12/2017', 'Acceso desde dispositivo Android NG-7800', undefined),
        new Activity('06/11/2017', 'Cambio de clave', undefined),
        new Activity('05/04/2017', 'Se agregaron 00,156 BTC a la billetera', undefined),
        new Activity('28/03/2017', 'Se agregaron 00,23 BTC a la billetera', undefined),
        new Activity('14/01/2017', 'Cambio de clave', undefined),
        new Activity('28/12/2016', 'Acceso desde dispositivo iPhone 6c', undefined),
    ];

    public static numberOfSigners = [2, 3, 4, 5];
}
