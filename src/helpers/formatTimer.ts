function formatTimer(duration: number) {
  const hoursString = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const minutesString = (duration % 60).toString().padStart(2, "0");
  return {
    hoursString,
    minutesString,
  };
}

export { formatTimer };
