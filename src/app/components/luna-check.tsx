export default function lunaCheck(cardNumber: string) {
  const cardArray = cardNumber.toString().split('').map(Number);
  for (let i = cardArray.length - 2; i >= 0; i -= 2) {
    let doubledDigit = cardArray[i] * 2;
    if (doubledDigit > 9) { doubledDigit -= 9; }
    cardArray[i] = doubledDigit;
  }
  const sum = cardArray.reduce((acc: number, curr: number) => acc + curr, 0);
  if (sum % 10 === 0) { return true; }
  return false;
}
