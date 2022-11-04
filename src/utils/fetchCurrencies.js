import axios from 'axios';

const FETCH_URL = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CNY,KES,GBP';

export const fetchAllCurrencies = async () => {
    const response = await axios.get(FETCH_URL);
    return response;
}