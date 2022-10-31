export const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

export const getFormattedTime = (time) =>
  `${time.h}:${padToTwo(time.min)}:${padToTwo(time.sec)}`;
