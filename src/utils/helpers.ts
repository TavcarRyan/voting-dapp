import moment from "moment";

const BLOCK_TIME = 14.5;

const calculateMinTime = (date: Date) => {
  const isToday = moment(date).isSame(moment(), "day");
  if (isToday) {
    const nowAddFifteenMinutes = moment(new Date()).toDate();
    return nowAddFifteenMinutes;
  }

  return moment().startOf("day").toDate();
};

const getEstimatedBlockNumber = (
  currentTime: number,
  currentBlockHeight: number,
  futureTime: number
) => {
  return (
    currentBlockHeight +
    Math.round((futureTime - currentTime) / 1000 / BLOCK_TIME)
  );
};

export const Helper = {
  calculateMinTime,
  getEstimatedBlockNumber,
};
