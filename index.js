"use strict";

///////////////////////////////////////////////////////////
// ELEMENTS
const form = document.getElementById("form");
const inputName = document.getElementById("form__label-input--name");
const inputEmail = document.getElementById("form__label-input--email");
const inputPhone = document.getElementById("form__label-input--phone");
const [warningName, warningEmail, warningPhone] =
  document.querySelectorAll(".hidden");

///////////////////////////////////////////////////////////
// REGEX FUNCTIONS
const regexName = function (value) {
  const arrValue = value.split(" ");
  const isFirstLetterCapital = arrValue.every((el) => /[A-ZÀ-Ú]/.test(el[0]));
  const isRestLower = arrValue.every((el) => /^[a-zà-ú´']+$/.test(el.slice(1)));
  const result = isFirstLetterCapital && isRestLower;

  return result;
};

const regexEmail = function (value) {
  const re = /^[^\s@]+@[^\s@]+$/;
  const result = re.test(value);

  return result;
};

const regexPhone = function (value) {
  // Remove placeholder phone
  value = value.replaceAll(/[\D]/g, "");

  console.log(value.length);

  let result = false;

  if (value.length !== 11 || Number.isNaN(+value)) return result;

  return !result;
};

///////////////////////////////////////////////////////////
// CREATE BORDER
const createBorder = function (el, isCorrect) {
  el.classList.add("green-border");

  if (isCorrect && el.classList.contains("red-border")) {
    el.classList.remove("red-border");
    el.classList.add("green-border");
  }

  if (!isCorrect && el.classList.contains("green-border")) {
    el.classList.remove("green-border");
    el.classList.add("red-border");
  }
};

const borderName = function () {
  const value = this.value;
  const isCorrectName = regexName(value);

  createBorder(this, isCorrectName);
};

const borderEmail = function () {
  const value = this.value;
  const isCorrectEmail = regexEmail(value);

  createBorder(this, isCorrectEmail);
};

const borderPhone = function () {
  const value = this.value;
  const isCorrectPhone = regexPhone(value);

  createBorder(this, isCorrectPhone);
};

// HANDLERS CREATE BORDER
inputName.addEventListener("keyup", borderName);
inputEmail.addEventListener("keyup", borderEmail);
inputPhone.addEventListener("keyup", borderPhone);

///////////////////////////////////////////////////////////
// MASK PHONE
const placeholder = "(DD) 00000-0000";

const clearPlaceholder = function () {
  const isInputFill = inputPhone.value === placeholder;
  isInputFill && (inputPhone.value = "");
};

const createPlaceholder = function () {
  const isInputEmpety = inputPhone.value === "";
  isInputEmpety && (inputPhone.value = placeholder);
};

const createMaskPhone = function () {
  clearPlaceholder();
  this.onkeyup = function () {
    inputPhone.value = inputPhone.value.replace(/\D/g, "");
    inputPhone.value = inputPhone.value.replace(/^(\d{2})(\d)/g, "($1) $2");
    inputPhone.value = inputPhone.value.replace(/(\d)(\d{4})$/, "$1-$2");
  };
};

// HANDLER CREATE MASK PHONE
inputPhone.addEventListener("keydown", createMaskPhone);
inputPhone.addEventListener("focus", createPlaceholder);
inputPhone.addEventListener("blur", clearPlaceholder);

///////////////////////////////////////////////////////////
// VALIDATION FORM
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputNameValue = inputName.value;
  const inputEmailValue = inputEmail.value;
  const inputPhoneValue = inputPhone.value;

  const isNameValid = regexName(inputNameValue) === true;
  const isEmailValid = regexEmail(inputEmailValue) === true;
  const isPhoneValid = regexPhone(inputPhoneValue) === true;

  if (!isNameValid) {
    warningName.style.opacity = 1;
    createBorder(inputName, false);
  }

  if (!isEmailValid) {
    warningEmail.style.opacity = 1;
    createBorder(inputEmail, false);
  }

  if (!isPhoneValid) {
    warningPhone.style.opacity = 1;
    createBorder(inputPhone, false);
  }

  if (!isNameValid || !isEmailValid || !isPhoneValid) return false;

  warningName.style.opacity = 0;
  warningEmail.style.opacity = 0;
  warningPhone.style.opacity = 0;
});
