export const convertMsToSeconds = (ms: number) => {
  return ms / 1000;
};

export const convertSecondsToMinutesAndSeconds = (totalSeconds: number) => {
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: Math.floor(totalSeconds % 60),
  };
};

export const convertTimeToString = (time: number) => {
  if (time < 10) {
    return `0${time}`; // 한 자리 숫자인 경우 앞에 0을 붙여줍니다
  }
  return `${time}`;
};

export const convertTotalTimeString = ({ minutes = 0, seconds = 0 }) => {
  return `${convertTimeToString(minutes)}:${convertTimeToString(seconds)}`;
};
