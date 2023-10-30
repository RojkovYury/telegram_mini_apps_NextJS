export default function lunaCheck (cardNumber: any) {
  let cardArray = cardNumber.toString().split('').map(Number)
  for (let i = cardArray.length - 2; i >= 0; i -= 2) {
    let doubledDigit = cardArray[i] * 2;
    if (doubledDigit > 9) {doubledDigit -= 9}
    cardArray[i] = doubledDigit;
  }
  let sum = cardArray.reduce((acc: any, curr: any) => acc + curr, 0);
  if (sum % 10 === 0) {return true}
  else {return false}
}