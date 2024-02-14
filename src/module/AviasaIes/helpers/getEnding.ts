function getEndingTransfer(values: number) {
  const lastTwoNumbers = values % 100;
  const lastNumber = values % 10;

  if (lastTwoNumbers > 10 && lastNumber < 20) {
    return "Пересадок";
  }

  if (lastNumber > 1 && lastNumber < 5) {
    return "Пересадки";
  }

  if (lastNumber === 1) {
    return "Пересадка";
  }

  return "Пересадок";
}

export { getEndingTransfer };
