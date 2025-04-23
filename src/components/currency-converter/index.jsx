import { useEffect, useState } from "react";
import "./currency.css";

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [exchangeRate, setExchangeRate] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("");

    async function fetchExchangeRate() {
        const apiResponse = await fetch(
            `https://open.er-api.com/v6/latest/${fromCurrency}`,
            {
                method: "GET",
            }
        );
        const result = await apiResponse.json();
        const calculateRate = result?.rates[toCurrency];
        setExchangeRate(calculateRate);
        setConvertedAmount((amount * calculateRate).toFixed(2));
    }

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurrency, toCurrency, amount]);

    function handleAmountChnage(event) {
        setAmount(event.target.value);
    }

    function handleFromCurrencyChange(event) {
        setFromCurrency(event.target.value);
    }

    function handleToCurrencyChange(event) {
        setToCurrency(event.target.value);
    }

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="input-container">
                <input
                    type="number"
                    value={amount}
                    id="amount"
                    placeholder="Enter amount"
                    onChange={handleAmountChnage}
                />
                <select
                    name=""
                    id=""
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                </select>
            </div>
            <p>To</p>
            <div className="input-container">
                <input type="text" value={convertedAmount} readOnly />
                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                </select>
            </div>
            <p className="exchange-rate" >
                Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
            </p>
        </div>
    );
}
