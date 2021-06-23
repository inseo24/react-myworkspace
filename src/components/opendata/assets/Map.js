import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./map.css";

import { useRef, useLayoutEffect } from "react";

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

function MapTable(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("mapdiv", am4maps.MapChart);

    x.geodata = am4geodata_worldHigh;

    x.projection = new am4maps.projections.Mercator();

    x.homeZoomLevel = 30;
    x.homeGeoPoint = { longitude: 128, latitude: 36 };

    let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeOpacity = 0.5;

    let imageSeries = x.series.push(new am4maps.MapImageSeries());
    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.nonScaling = true;

    let image = imageTemplate.createChild(am4core.Image);
    image.width = 50;
    image.height = 50;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    let label = imageTemplate.createChild(am4core.Label);
    label.text = "{label}";
    label.horizontalCenter = "middle";
    label.verticalCenter = "top";
    label.dy = 20;

    imageSeries.data = [
      {
        latitude: 35.1796,
        longitude: 129.0756,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "부산",
      },
      {
        latitude: 35.8714,
        longitude: 128.6014,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/thunder.svg",
        width: 32,
        height: 32,
        label: "대구",
      },
      {
        latitude: 36.3504,
        longitude: 127.3845,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/cloudy-day-1.svg",
        width: 32,
        height: 32,
        label: "대전",
      },
      {
        latitude: 35.1595,
        longitude: 126.8526,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/day.svg",
        width: 32,
        height: 32,
        label: "광주",
      },
      {
        latitude: 37.5665,
        longitude: 126.978,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/day.svg",
        width: 32,
        height: 32,
        label: "서울",
      },
      {
        latitude: 35.5384,
        longitude: 129.3114,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "울산",
      },
      {
        latitude: 33.4996,
        longitude: 126.5312,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "제주",
      },
      {
        latitude: 35.8242,
        longitude: 127.148,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "전주",
      },
      {
        latitude: 37.7519,
        longitude: 128.8761,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "강릉",
      },
      {
        latitude: 36.5684,
        longitude: 128.7294,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "안동",
      },
      {
        latitude: 37.8813,
        longitude: 127.73,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "춘천",
      },
      {
        latitude: 34.8118,
        longitude: 126.3922,
        imageURL:
          "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
        width: 32,
        height: 32,
        label: "목포",
      },
    ];

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <div className="mapdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}

export default MapTable;
