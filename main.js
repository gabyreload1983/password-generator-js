const characterAmountRange = document.querySelector("#characterAmountRange");
const characterAmountNumber = document.querySelector("#characterAmountNumber");

const includeUppercaseElement = document.querySelector("#includeUppercase");
const includeNumbersElement = document.querySelector("#includeNumbers");
const includeSymbolsElement = document.querySelector("#includeSymbols");

const formPasswordGenerator = document.querySelector("#formPasswordGenerator");
const passwordDisplay = document.querySelector("#passwordDisplay");

characterAmountRange.addEventListener("input", syncPassword);
characterAmountNumber.addEventListener("input", syncPassword);

const LOWERCASE_CHAR_CODE = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODE = arrayFromLowToHigh(65, 90);
const NUMBERS_CHAR_CODE = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODE = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

formPasswordGenerator.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  passwordDisplay.innerText = password;
});

passwordDisplay.addEventListener("click", () => {
  const password = passwordDisplay.innerText;
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(password);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Password copied to clipboard",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  copyContent();
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODE;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE);
  if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODE);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODE);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const arr = [];
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
}

function syncPassword(e) {
  const value = e.target.value;
  characterAmountRange.value = value;
  characterAmountNumber.value = value;
}
