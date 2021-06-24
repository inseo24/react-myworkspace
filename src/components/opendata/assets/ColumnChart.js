/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";

import columndata from "./data/columndata";
import { useRef, useLayoutEffect } from "react";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_dataviz);

am4core.useTheme(am4themes_animated);

function ColumnChart(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);
    x.padding(40, 40, 40, 40);

    let categoryAxis = x.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "지역";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = x.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = x.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "지역";
    series.dataFields.valueX = "기온";
    series.tooltipText = "{valueX.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return x.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    x.data = columndata;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <>
      <div
        className="chartdiv"
        style={{ width: "100%", height: "500px", color: "black" }}
      ></div>
    </>
  );
}

export default ColumnChart;
