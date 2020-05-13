import moment from "moment";

// GET DATE DETAILS BY LOCALE
function getDateDetailsByLocale(dateToParse, locale) {
  const pattern = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/gi;
  moment.locale(locale);
  const myDateStr = dateToParse.match(pattern)[0];
  const m_myDateStr = moment(myDateStr);
  const date = m_myDateStr.format("DD MMMM YYYY");
  const weekDay = m_myDateStr.format("dddd");
  return { date, weekDay };
}

// SETUP DATES FROM MONDAY TO SUNDAY (FOR WEEKLY CLICKS CHART)
function setUpDatesFromMonToSun(from, to) {
  const daysAfterMonday = moment(from).isoWeekday() - 1;
  const daysToSunday = 7 - moment(to).isoWeekday();

  let fromDate = moment(from).subtract(daysAfterMonday, "day");
  if (fromDate < moment().startOf("year")) {
    fromDate = moment().startOf("year").format("YYYY-MM-DD");
  } else {
    fromDate = moment(from)
      .subtract(daysAfterMonday, "day")
      .format("YYYY-MM-DD");
  }
  let toDate = moment(to).add(daysToSunday, "day").format("YYYY-MM-DD");
  console.log({ fromDate, toDate });
  return { fromDate, toDate };
}

//GET TEXT FOR TITLE TIME RANGE
function getTextForTitleTimeRange(fromDate, toDate, locale) {
  const from = getDateDetailsByLocale(fromDate, "ru");
  const to = getDateDetailsByLocale(toDate, "ru");

  return `с ${from.date} (${from.weekDay}) по ${to.date} (${to.weekDay})`;
}
export { getTextForTitleTimeRange, setUpDatesFromMonToSun };
