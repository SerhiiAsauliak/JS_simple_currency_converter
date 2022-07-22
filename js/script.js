"use strict";

const inputForeign = document.querySelector('.input__top'),
      inputUah = document.querySelector('.input__bottom'),
      clearBtn = document.querySelector('.btn'),
      selectField = document.querySelector('select');

clearBtn.addEventListener('click', () => {
   inputUah.value = '';
   inputForeign.value = '';
});

selectField.addEventListener('click', () => {
   inputForeign.placeholder = selectField.value;
   localStorage.setItem('value', selectField.value);
});

inputForeign.placeholder = localStorage.getItem('value');
selectField.value = localStorage.getItem('value');

inputForeign.addEventListener('input',(e) => calc(e));
inputUah.addEventListener('input', (e) => calc(e));
   
function calc(e) {
   let cuurentField = e.target.placeholder;
   if(cuurentField !== 'UAH'){
      axios.get(`https://api.exchangerate.host/latest?base=${cuurentField}&symbols=UAH`)
      .then(res => res)
      .then(data => {
         inputUah.value = (inputForeign.value * data.data.rates.UAH).toFixed(2);
         if(inputForeign.value === ''){
            inputUah.value = '';
         }
      });
   }else{
      axios.get(`https://api.exchangerate.host/latest?base=${cuurentField}&symbols=${selectField.value}`)
      .then(res => res)
      .then(data => {
         if(selectField.value === "USD"){
            inputForeign.value = (inputUah.value * data.data.rates.USD).toFixed(2);
         }else{
            inputForeign.value = (inputUah.value * data.data.rates.EUR).toFixed(2);
         } 
         if(inputUah.value === ''){
            inputForeign.value = '';
         }
      }); 
   }
        
}

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
      axios.get('https://api.exchangerate.host/latest?base=USD&symbols=UAH'),
      axios.get('https://api.exchangerate.host/latest?base=EUR&symbols=UAH')
   ])
   .then(data => data.forEach(renderContent));








