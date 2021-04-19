import validator from "validator";
import { CasesOptions } from "../../types";

const { isLength, normalizeEmail, isStrongPassword } = validator;

const isNameInValid = (code: number) => {
  return !(code >= 48 && code <= 57) && !(code >= 65 && code <= 90) && !(code >= 97 && code <= 122);
};

const nameInputValidation = (value: string) => {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);

    if (isNameInValid(code)) {
      return false;
    }
  }

  return true && isLength(value, { min: 3, max: 30 });
};

const emailInputValidation = (value: string) => {
  const emailReg = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

  return emailReg.test(value.toLowerCase()) && isLength(value, { min: 8, max: 80 });
};

const passwordInputValidation = (value: string) => {
  return (
    isStrongPassword(value, { minLength: 8 }) &&
    isLength(value, { min: 8, max: 50 }) &&
    !(value[0] === " " || value[value.length - 1] === " ")
  );
};

export const validation = (value: string, inputId: string) => {
  let isValid = true;

  switch (inputId) {
    case CasesOptions.NAME_INPUT:
      isValid = isValid && nameInputValidation(value);

      break;

    case CasesOptions.EMAIL_INPUT:
      isValid = isValid && emailInputValidation(value);

      if (isValid) {
        normalizeEmail(value);
      }

      break;

    case CasesOptions.PASSWORD_INPUT:
      isValid = isValid && passwordInputValidation(value);

      break;

    default:
      return false;
  }

  if (isValid) {
    value.trim();
  }

  return isValid;
};
