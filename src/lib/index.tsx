const moment = require("moment");

const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function formatDate(dateString: any) {
  const date = moment(
    dateString?.toDate(),
    "DD MMM YYYY [at] HH:mm:ss [UTC]ZZ"
  );

  if (!date.isValid()) {
    return "Invalid Date";
  }

  const now = moment();
  const secondsAgo = now.diff(date, "seconds");
  const minutesAgo = now.diff(date, "minutes");

  if (secondsAgo < 60) {
    return `${secondsAgo} sec ago`;
  } else if (minutesAgo < 60) {
    return `${minutesAgo} min ago`;
  } else if (date.hours() >= 12) {
    return date.format("h:mm A");
  } else if (date.isSame(now, "day")) {
    return date.format("h:mm A");
  } else if (date.isSame(now.clone().subtract(1, "day"), "day")) {
    return `Yesterday at ${date.format("h:mm A")}`;
  } else if (date.isSame(now, "week")) {
    return date.format("dddd");
  } else if (date.year() === now.year()) {
    return date.format("MMM D [at] h:mm A");
  } else {
    return date.format("MMM D, YYYY [at] h:mm A");
  }
}

export { generateRandomString, formatDate };
