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

// function addSpaceCardNumber() {
//   const numberField = document.querySelector('#card-number');
//   numberField.addEventListener('keyup', (event) => {
//     let length = event.target.value.length;
//     const spaces = event.target.value.split('').filter((element) => element === ' ').length;
//     length -= spaces;
//     const lengthWithSpaces = length - 1;
//     console.log(event.keyCode);
//     console.log(length > 0);
//     console.log(event.target.value.charAt(length - 1));
//     if (event.target.value.charAt(length - 1) === ' ') {
//       console.log('cheguei no space');
//       event.target.value = event.target.value.slice(0, -1);
//     }
//     if (length > 0 && length % 4 === 0) {
//       const keyID = event.keyCode;
//       switch(keyID) {
//         case 8:
//           break
//         default:
//           event.target.value += ' ';
//       }
//     }
//   });
// }

function addSpaceCardNumber() {
  const numberField = document.querySelector('#card-number');
  numberField.addEventListener('keyup', (event) => {
    let formatedNumber = '';
    let number = event.target.value;
    console.log(number);
    for (let i = 0; i < number.length; i += 1) {
      number = number.replace(' ', '');
      if (i % 4 === 0 && i > 0) {
        console.log(i);
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

preventScrollAllSides();
loseFocusInput();
changeNameOnCard();
changeNumberOnCard();
addSpaceCardNumber();