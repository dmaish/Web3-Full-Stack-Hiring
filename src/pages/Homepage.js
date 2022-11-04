import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import CoinDropdown from "../components/dropdown/CoinDropdown";
import daiABI from '../abi/dai';
import arrows from '../assets/arrows.png';
import { Coin, Coins, Currencies, Currency } from '../utils/constants';
import { fetchAllCurrencies } from "../utils/fetchCurrencies";
import coinGroup from '../assets/coin-group.png';
import Alert from 'react-bootstrap/Alert';
import './homepage.css';

var Web3 = require('web3');

const Homepage = () => {
  const [address, setAddress] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [fiatValue, setFiatValue] = useState('');
  const [pickedCoin, setPickedCoin] = useState(Coin.USDC);
  const [pickedCurrency, setPickedCurrency] = useState(Currency.USD);
  const [coinToFetch, setCoinToFetch] = useState();
  const [alertOn, setAlertOn] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [allCurrencies, setAllCurrencies] = useState('');


  const { 
    REACT_APP_INFURA_NODE,
    REACT_APP_DAI_CONTRACT_ADDRESS,
    REACT_APP_USDC_CONTRACT_ADDRESS
  } = process.env;

  var web3 = new Web3(REACT_APP_INFURA_NODE);
  const daiContract = new web3.eth.Contract(daiABI, REACT_APP_DAI_CONTRACT_ADDRESS);
  const usdcContract = new web3.eth.Contract(daiABI, REACT_APP_USDC_CONTRACT_ADDRESS);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetchAllCurrencies();
        const allCurr = res?.data?.rates;
        setAllCurrencies(allCurr);
      } catch (error) {
        setAlertOn(true);
        setAlertMessage(error.message? error.message : 'error fetching currencies');
      }
    }

    fetchCurrencies();
  }, []);

  const getCoinBalance = async () => {
    try {
        setPickedCurrency(Currency.USD);
        setAlertOn(false);
        setAlertMessage('');
        setCoinToFetch(pickedCoin);

        if (pickedCoin === Coin.DAI) {
          const userBalance = await daiContract.methods.balanceOf(address).call();
          const formattedBalance = web3.utils.fromWei(userBalance, "ether");
          setCoinValue(formattedBalance);
          setFiatValue(formattedBalance);

        } else if (pickedCoin === Coin.USDC) {
          const userBalance = await usdcContract.methods.balanceOf(address).call();
          const formattedBalance = web3.utils.fromWei(userBalance, "Mwei"); //since usdc has 6 decimals
          setCoinValue(formattedBalance);
          setFiatValue(formattedBalance);
        }

      }catch (error) {
        setAlertOn(true);
        setAlertMessage(error.toString())
      }
  }

  const handleChange = (event) => {
    const { value } = event.target 
    setAddress( value );
  }

  const displayFiat = async(currencyName) => {
    if (allCurrencies){
      setPickedCurrency(currencyName);
      const rate = allCurrencies[currencyName];
      const calculatedFiatValue = rate *  coinValue;
      setFiatValue(calculatedFiatValue)
    } else {
      setPickedCurrency(Currency.USD);
      setFiatValue(coinValue)
    }
  }

  const renderRightCard = () => {
    const coinToFetchObj = Coins.find((each) => each?.name === coinToFetch);
    return (
    <div class="col h-100 d-flex justify-content-center align-items-center">
      {coinValue ? 
      <div class="card right-card" style={{ width: '85%', padding: '5em'}}>
        <div class="card-body">
          <div>
            <img class="large-coin-image" src={coinToFetchObj?.asset} alt={coinToFetchObj?.name}/>
          </div>
            <div class="crypto-balance">
              <span>{Number(coinValue).toLocaleString('en-US', {minimumFractionDigits: 2})}</span> <span>{coinToFetchObj ? coinToFetch.toUpperCase(): ''}</span>
            </div>

            <div class="w-100 ">
              <div class="d-flex justify-content-between fiat-balance">
                <input type="text" class="form-control fiat-input" placeholder="type address here" value={Number(fiatValue).toLocaleString('en-US', {minimumFractionDigits: 2})} readonly/>
                <CoinDropdown setPickedOption={displayFiat} pickedOption={pickedCurrency} optionsList={Currencies}/>
              </div>
            </div>
        </div>
      </div>
      : <img class="coins-group" src={coinGroup} alt='coin group'/>}
    </div>
  )}

  const renderLeftCard = () => {
    return(
      <div class="col h-100 d-flex justify-content-center align-items-center ">
      <div class="card transparent-bg" style={{ width: '75%'}}>
        <div class="card-body transparent-bg">
          <div class="title" style={{fontSize: '3.8em', fontWeight: '600'}}>
            crypto checker
          </div>
            <div style={{ marginTop: '0.7em', marginBottom: '6.5em'}}>
              <span class="" style={{fontSize: '1.3em'}}>
                Provide your ERC20 token<br></br>
                and address below
              </span>
            </div>
            <div class="w-100 ">
              <div class="d-flex justify-content-between input-area">
                  <CoinDropdown setPickedOption={setPickedCoin} pickedOption={pickedCoin} optionsList={Coins}/>
                  <input type="text" class="form-control addr-input" placeholder="type address here" value={address} onChange={handleChange}/>
              </div>
              
              <div class="btn-container d-flex justify-content-center">
                <div class="submit-btn d-flex justify-content-center align-items-center btn-area"  onClick={getCoinBalance}>
                  <span style={{fontSize: '1em', marginRight: '13px'}}>
                    submit
                  </span>
                  <img class="arrow-image" src={arrows} alt={'arrows'}/>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    );

  }
    return (
      <Container fluid className="vh-100">
        {alertOn && alertMessage &&
        <Alert key={'danger'} variant={'danger'}>
          {alertMessage}
        </Alert>}
        
        <div class="row h-100">
          {renderLeftCard()}
          {renderRightCard()}
        </div>
      </Container>
    );
  }
  
  export default Homepage;