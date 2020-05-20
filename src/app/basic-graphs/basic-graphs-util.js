function prepareData(data) {
  // PREPARING DATE & TIME
  var locale = d3.timeFormatLocale(getLocale());
  var formatLocale = locale.format("%b %Y");

  data.data.forEach((e) => {
    e.date = new Date(e.date);
  });

  data.data.sort((a, b) => {
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
        obj.clicks = cur.totalClicks;
        acc.push(obj);
        return acc;
      }, []);
      return temp;
    })
    .entries(data.data);

  const data_ready_unique = d3
    .nest()
    .key(function (d) {
      return "uniqueClicks";
    })
    .rollup(function (leaves) {
      var temp = leaves.reduce((acc, cur) => {
        var obj = {};
        obj.date = cur.date;
        obj.clicks = cur.uniqueClicks;
        acc.push(obj);
        return acc;
      }, []);
      return temp;
    })
    .entries(data.data);

  const data_ready = data_ready_total.concat(data_ready_unique);
  // console.log("data_ready WEEKLY CLICKS", data_ready_total);
  console.log("data_ready WEEKLY CLICKS", data_ready);
}
