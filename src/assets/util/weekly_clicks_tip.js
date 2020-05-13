import d3Tip from "d3-tip";
function getWeekTip(elementWidth) {
  const tableWidth = 200;
  const tip = d3Tip()
    .attr("class", "d3-tip")
    .direction(function (d) {
      const x = this.getBBox().x;

      if (x <= tableWidth / 2) {
        console.log("bbox x", x);
        console.log("tableWidth / 2", tableWidth / 2);
        console.log("el Width", elementWidth);

        return "e";
      }
      if (elementWidth < tableWidth / 2 + x) {
        return "w";
      }
      return "n";
    })
    .offset(function () {
      const x = this.getBBox().x;

      if (x <= tableWidth / 2) {
        return [0, 17];
      }
      if (elementWidth < tableWidth / 2 + x) {
        return [0, -17];
      }

      return [-17, 0];
    })
    .html(function (d) {
      return `
    <table id="tipTable" style="max-width: 200px">
        <tr>
            <th colspan="2">Период</th>
        </tr>
        <tr>
        <td colspan="2">${d.rangeIsFrom} - ${d.rangeIsTo}</td>       
        </tr>
        <tr>
            <th style="float: left">Неделя N</th>
            <td style="float: right">${d.weekN}</td>       
        </tr>
        <tr>
            <th style="float: left">Клики</th>
            <td style="float: right">${d.clicks}</td>       
        </tr>     
  </table>
  `;
    });

  return tip;
}
export { getWeekTip };
