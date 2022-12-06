import {valid_credit_card} from './luhnsalgo.js';

function preventScrollAllSides() {
  document.querySelector('html').addEventListener('wheel', preventScroll, { passive: false });
  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

function loseFocusInput() {
  const inputList = document.querySelectorAll('input');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('focusout', (event) => {
      if (event.target.value.length < 1) {
        event.target.style.border = '1px solid rgb(192, 110, 110)';
        event.target.nextElementSibling.innerHTML = 'This field cannot be empty';
      } else {
        event.target.removeAttribute('style');
        event.target.nextElementSibling.innerHTML = '';
      }
    });
  });
}

function loseFocusMonth() {
  const inputMonth = document.querySelector('#card-month');
  inputMonth.addEventListener('focusout', (event) => {
    if (event.target.value.length < 1) {
      document.querySelector('#wrong-year').innerHTML = 'This field cannot be empty';
    } else {
      document.querySelector('#wrong-year').innerHTML = '';
    }
  });
}

function addSpaceCardNumber() {
  const numberField = document.querySelector('#card-number');
  numberField.addEventListener('keyup', (event) => {
    let formatedNumber = '';
    let number = event.target.value;
    for (let i = 0; i < number.length; i += 1) {
      number = number.replace(' ', '');
      if (i % 4 === 0 && i > 0) {
        formatedNumber = formatedNumber.concat(' ');
      }
      formatedNumber = formatedNumber.concat(number[i]);
    }
    event.target.value = formatedNumber;
  });
}

function checkIfCardNumberHasLetters() {
  const numberField = document.querySelector('#card-number');
  numberField.addEventListener('focusout', (event) => {
    if (event.target.value.length > 0) {
      for (let i = 0; i < event.target.value.length; i += 1) {
        if (!/[\d]|[\d\s]/.test(event.target.value[i])) {
          console.log(!/[\d]|[\d\s]/.test(event.target.value)[i]);
          event.target.style.border = '1px solid rgb(192, 110, 110)';
          event.target.nextElementSibling.innerHTML = 'Wrong format. Use numbers only';
        }
      }
    }
  });
}

function changeContent(event, elementForChange, std) {
  if (event.target.value === '') {
    elementForChange.innerHTML = std;
  } else {
    elementForChange.innerHTML = event.target.value;
  }
}

function changeNameOnCard() {
  const nameOnCard = document.querySelector('#name');
  const nameField = document.querySelector('#cardholder-name');
  const stdName = nameOnCard.innerHTML;
  nameField.addEventListener('input', (event) => changeContent(event, nameOnCard, stdName));
  nameField.addEventListener('focusout', (event) => changeContent(event, nameOnCard, stdName));
}

function changeNumberOnCard() {
  const numberOnCard = document.querySelector('#number');
  const numberField = document.querySelector('#card-number');
  const stdNumber = numberOnCard.innerHTML
  numberField.addEventListener('input', (event) => changeContent(event, numberOnCard, stdNumber));
  numberField.addEventListener('focusout', (event) => changeContent(event, numberOnCard, stdNumber));
}

function changeDateOnCard() {
  const month = () => {
    const monthNum = document.querySelector('#card-month');
    if (monthNum.value === '') {
      return '00';
    }
    return monthNum.value;
  }
  const year = () => {
    const yearNum = document.querySelector('#card-year');
    if (yearNum.value === '') {
      return '00';
    }
    return yearNum.value;
  }
  const dateOnCard = document.querySelector('#issue-date');
  document.querySelector('#card-month').addEventListener('input', () => dateOnCard.innerHTML = `${month()}/${year()}`);
  document.querySelector('#card-year').addEventListener('input', () => dateOnCard.innerHTML = `${month()}/${year()}`);
}

function maxLengthDate() {
  const month = document.querySelector('#card-month');
  const year = document.querySelector('#card-year');
  month.addEventListener('input', (event) => {
    if (event.target.value.length > 2) {
      event.target.value = event.target.value.slice(0, 2);
    }
  });
  year.addEventListener('input', (event) => {
    if (event.target.value.length > 2) {
      event.target.value = event.target.value.slice(0, 2);
    }
  });
}

function changeCVC() {
  const cvcOnCard = document.querySelector('#cvc');
  const cvcField = document.querySelector('#card-cvc');
  const stdNumber = cvcOnCard.innerHTML
  cvcField.addEventListener('input', (event) => changeContent(event, cvcOnCard, stdNumber));
}

function maxLengthCVC() {
  const cvcField = document.querySelector('#card-cvc');
  cvcField.addEventListener('input', (event) => {
    if (event.target.value.length > 4) {
      event.target.value = event.target.value.slice(0, 4);
    }
  });
}

const verifyName = () => {
  const name = document.querySelector('#cardholder-name');
  if (name.value.length < 1) {
    return false;
  }
  return true;
};

const verifyDate = () => {
  const month = document.querySelector('#card-month');
  const year = document.querySelector('#card-year');
  if (month.value.length < 1 && year.value.length < 1) {
    return false;
  }
  return true;
};

const verifyCVC = () => {
  const cvc = document.querySelector('#card-cvc');
  if (cvc.value.length < 3) {
    return false;
  }
  return true;
}

function verifyAllContent() {
  const errorMsg = document.querySelector('#error-msg');
  const name = verifyName();
  const luhn = valid_credit_card(document.querySelector('#card-number').value.replace(' ', ''));
  const date = verifyDate();
  const cvc = verifyCVC();
  // console.log(name);
  // console.log(luhn);
  // console.log(date);
  // console.log(cvc);
  if (!name) {
    errorMsg.innerHTML = 'Looks like the Name Field has a problem';
    return false;
  }
  if (!luhn) {
    errorMsg.innerHTML = 'Looks like the Number of Your Card has a problem';
    return false;
  }
  if (!date) {
    errorMsg.innerHTML = 'Looks like your Exp. Date Field has a problem';
    return false;
  }
  if (!cvc) {
    errorMsg.innerHTML = 'Looks like your CVC Field has a problem';
    return false;
  }
  return true;
}

function btnContinue() {
  const btn = document.querySelector('#submit');
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (verifyAllContent()) {
      const form = document.querySelector('main');
      form.style.display = 'none';
      const secondScreen = document.querySelector('#second-screen');
      secondScreen.style.display = 'block';
    }
  });
}

function btnSecondScreen() {
  const btn = document.querySelector('#btn-second-screen');
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.querySelector('main');
    form.style.display = 'block';
    const secondScreen = document.querySelector('#second-screen');
    secondScreen.style.display = 'none';
  });
}

preventScrollAllSides();
loseFocusInput();
loseFocusMonth();
changeNameOnCard();
changeNumberOnCard();
maxLengthDate();
changeDateOnCard()
maxLengthCVC();
changeCVC();
addSpaceCardNumber();
checkIfCardNumberHasLetters();
btnContinue();
btnSecondScreen();