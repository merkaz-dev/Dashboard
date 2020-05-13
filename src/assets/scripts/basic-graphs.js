import * as d3 from "d3";
import localeRu from "../util/locale.json";
import { getDateRangeOfWeek } from "../util/util_week_ranges";

function getDataReady(data) {
  // PREPARING FORMATES
  var locale = d3.timeFormatLocale(localeRu);
  var formateDate = locale.format("%d %b %Y");
  var formateYear = locale.format("%Y");
  var formateWeeks = locale.format("%V");
  var formateNumberK = d3.format(".1s");
  var formateComaK = d3.format(",");

  var margin = { top: 60, right: 5, bottom: 40, left: 30 };

  // convert string to date type
  data.forEach((e) => {
    e.date = new Date(e.date);
  });

  // define date ranges by week number
  data.forEach((e) => {
    const dates = getDateRangeOfWeek(formateWeeks(e.date), formateYear(e.date));

    e.rangeIsFrom = formateDate(new Date(dates.rangeIsFrom));
    e.rangeIsTo = formateDate(new Date(dates.rangeIsTo));
    e.weekN = formateWeeks(e.date);
  });

  // order records by date
  data.sort((a, b) => {
    return a.date - b.date;
  });

  const data_ready_total = d3
    .nest()
    .key(function (d) {
      return "totalClicks";
    })
    .rollup(function (leaves) {
      var temp = leaves.reduce((acc, cur) => {
        var obj = {};
        obj.date = cur.date;
        obj.clicks = formateComaK(cur.totalClicks);
        obj.rangeIsFrom = cur.rangeIsFrom;
        obj.rangeIsTo = cur.rangeIsTo;
        obj.weekN = cur.weekN;
        acc.push(obj);
        return acc;
      }, []);
      return temp;
    })
    .entries(data);

  const data_ready_unique = d3
    .nest()
    .key(function (d) {
      return "uniqueClicks";
    })
    .rollup(function (leaves) {
      var temp = leaves.reduce((acc, cur) => {
        var obj = {};
        obj.date = cur.date;
        obj.clicks = formateComaK(cur.uniqueClicks);
        obj.rangeIsFrom = cur.rangeIsFrom;
        obj.rangeIsTo = cur.rangeIsTo;
        obj.weekN = cur.weekN;
        acc.push(obj);
        return acc;
      }, []);
      return temp;
    })
    .entries(data);

  return {
    dataTotalClicks: data_ready_total,
    dataUniqueClicks: data_ready_unique,
    dataAllClicks: data_ready_total.concat(data_ready_unique),
    localeRu: localeRu,
    formateWeeks: formateWeeks,
    margin: margin,
    formateNumberK: formateNumberK,
  };
}

export { getDataReady };
