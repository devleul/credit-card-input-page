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
      if (event.target.innerHTML == '') {
        event.target.style.border = '1px solid rgb(192, 110, 110)';
        event.target.nextElementSibling.innerHTML = 'This field cannot be empty';
      } else {
        event.target.nextElementSibling.innerHTML = '';
      }
    });
  });
}

function changeContent(event, elementForChange, std) {
  if (event.target.value === '') {
    elementForChange.innerHTML = std;
  } else {
    elementForChange.innerHTML = event.target.value;
  }
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

function changeNameOnCard() {
  const nameOnCard = document.querySelector('#name');
  const nameField = document.querySelector('#cardholder-name');
  const stdName = nameOnCard.innerHTML;
  nameField.addEventListener('input', (event) => changeContent(event, nameOnCard, stdName));
}

function changeNumberOnCard() {
  const numberOnCard = document.querySelector('#number');
  const numberField = document.querySelector('#card-number');
  const stdNumber = numberOnCard.innerHTML
  numberField.addEventListener('input', (event) => changeContent(event, numberOnCard, stdNumber));
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

preventScrollAllSides();
loseFocusInput();
changeNameOnCard();
changeNumberOnCard();
maxLengthCVC();
changeCVC();
addSpaceCardNumber();