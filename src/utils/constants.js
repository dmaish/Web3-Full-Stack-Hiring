
import dai from '../assets/dai.png';
import usdc from '../assets/usdc.png';
import china from '../assets/currency/china.png';
import euro from '../assets/currency/euro.png';
import kenya from '../assets/currency/kenya.png';
import unitedStates from '../assets/currency/unitedStates.png';
import unitedKingdom from '../assets/currency/unitedKingdom.png';

export const Coin = {
    DAI: 'dai',
    USDC: 'usdc'
}; 

export const Coins = [
    { name: Coin.DAI, asset: dai},
    { name: Coin.USDC, asset: usdc}
];

export const Currency = {
    CNY: 'CNY',
    USD: 'USD',
    EUR: 'EUR',
    KES: 'KES',
    GBP: 'GBP'
}

export const Currencies = [
    {name: Currency.CNY, asset: china},
    {name: Currency.USD, asset: unitedStates},
    {name: Currency.EUR, asset: euro},
    {name: Currency.KES, asset: kenya},
    {name: Currency.GBP, asset: unitedKingdom},

]