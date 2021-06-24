import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import mapdata from "./data/mapdata";
import { useRef, useLayoutEffect } from "react";

// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

function MapChart(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("mapdiv", am4maps.MapChart);

    // Set map definition
    x.geodata = am4geodata_worldHigh;

    // Set projection
    x.projection = new am4maps.projections.Mercator();

    // Center on the groups by default
    x.homeZoomLevel = 30;
    x.homeGeoPoint = { longitude: 128, latitude: 36 };

    // Polygon series
    let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeOpacity = 0.5;

    // Image series
    let imageSeries = x.series.push(new am4maps.MapImageSeries());
    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.nonScaling = true;

    let image = imageTemplate.createChild(am4core.Image);
    image.propertyFields.href = "imageURL";
    image.width = 50;
    image.height = 50;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";

    let label = imageTemplate.createChild(am4core.Label);
    label.text = "{label}";
    label.horizontalCenter = "middle";
    label.verticalCenter = "top";
    label.dy = 20;

    imageSeries.data = mapdata;
    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <>
      <div className="mapdiv" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
}

export default MapChart;
