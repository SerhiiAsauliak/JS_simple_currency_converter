"use strict";

const inputTop = document.querySelector('.input__top'),
      inputBottom = document.querySelector('.input__bottom'),
      clearBtn = document.querySelector('.btn'),
      selectField = document.querySelector('select');
// const url = 'http://localhost:3000/currency';
const url = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,UAH';

clearBtn.addEventListener('click', () => {
   inputTop.value = '';
   inputBottom.value = '';
});

inputTop.addEventListener('input',() => calc(url, inputBottom, inputTop, '*'));
inputBottom.addEventListener('input', () => calc(url, inputTop, inputBottom, '/'));

function calc(adress, inputTop, inputBottom, operator) {
   fetch(adress)
         .then(data => data.json())
         .then(res => {
            if(inputBottom.value === ''){
               inputTop.value = '';
            }else{
               if(operator === '*'){
                  inputTop.value = Math.floor(+inputBottom.value * res.rates.UAH);
               }else{
                  inputTop.value = Math.floor(+inputBottom.value / res.rates.UAH);
               }
            }
   });
}

const currencyCode = {
   USD: 'USD',
   EUR: 'EUR',
   UAH: 'UAH'
};
const renderContent = (response) => {
   let currencyInfo = document.querySelector('.currency-info');
   let content = Object.keys(response.data.rates).map(el => {
      currencyInfo.innerHTML += `
         <div>${response.data.base}</div>
         <div><span>${response.data.rates[el].toFixed(2)}</span></div>
      `;
   });
};
Promise.all([
      axios.get(`https://api.exchangerate.host/latest?base=${currencyCode.USD}&symbols=${currencyCode.UAH}`),
      axios.get(`https://api.exchangerate.host/latest?base=${currencyCode.EUR}&symbols=${currencyCode.UAH}`)
   ])
   .then(data => data.forEach(renderContent));











