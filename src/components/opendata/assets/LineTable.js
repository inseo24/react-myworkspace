import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function AppTable(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    x.data = [
      {
        date: "2012-07-27",
        value: 13,
      },
      {
        date: "2012-07-28",
        value: 11,
      },
      {
        date: "2012-07-29",
        value: 15,
      },
      {
        date: "2012-07-30",
        value: 16,
      },
      {
        date: "2012-07-31",
        value: 18,
      },
      {
        date: "2012-08-01",
        value: 13,
      },
      {
        date: "2012-08-02",
        value: 22,
      },
      {
        date: "2012-08-03",
        value: 23,
      },
      {
        date: "2012-08-04",
        value: 20,
      },
      {
        date: "2012-08-05",
        value: 17,
      },
      {
        date: "2012-08-06",
        value: 16,
      },
      {
        date: "2012-08-07",
        value: 18,
      },
      {
        date: "2012-08-08",
        value: 21,
      },
      {
        date: "2012-08-09",
        value: 26,
      },
      {
        date: "2012-08-10",
        value: 24,
      },
    ];

    // Set input format for the dates
    x.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    let bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    x.cursor = new am4charts.XYCursor();
    x.cursor.behavior = "panXY";
    x.cursor.xAxis = dateAxis;
    x.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    x.scrollbarY = new am4core.Scrollbar();
    x.scrollbarY.parent = chart.leftAxesContainer;
    x.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    x.scrollbarX = new am4charts.XYChartScrollbar();
    x.scrollbarX.series.push(series);
    x.scrollbarX.parent = x.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <div className="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
export default AppTable;
