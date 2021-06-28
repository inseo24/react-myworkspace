/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import React, { Component } from "react";

import { AmchartsReact } from "amchart4-react";

am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);

class TestChart extends Component {
  state = {
    chart: null,
    categoryAxis: null,
  };

  componentDidMount() {
    const chart = am4core.create("testchart", am4charts.XYChart);

    this.createChart(chart);

    this.setState(() => ({ chart }));
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createChart = (chart) => {
    chart.data = this.props.data;

    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "지역";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    this.setState(() => ({ categoryAxis }));

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
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
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
  };

  render() {
    return (
      <div>
        <div id="testchart" style={{ width: "100%", height: "500px" }} />
        {this.state.chart ? (
          <AmchartsReact
            chart={this.state.chart}
            categoryAxis={this.state.categoryAxis}
            color="black"
          />
        ) : null}
      </div>
    );
  }
}

export default TestChart;
