function getDifferenceTime(str: string, duration: number, seporator: string) {
  const start = new Date(str);
  const last = new Date(start);

  last.setMinutes(start.getMinutes() + duration);

  const options = { hour: "numeric", minute: "numeric" } as const;

  return `
    ${start.toLocaleTimeString("ru-RU", options)} 
    ${seporator} 
    ${last.toLocaleTimeString("ru-RU", options)}
    `;
}

export { getDifferenceTime };
