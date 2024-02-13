function formatAmount(amount: number) {
  return new Intl.NumberFormat("ru").format(amount);
}

export { formatAmount };
