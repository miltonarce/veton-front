import React from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PercentageArea = ({ series }) => {
  Highcharts.setOptions({
    colors: [
      "#4A2FBA",
      "#CC1357",
      "#5B0187",
      "#710855",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4",
    ],
  });

  const options = {
    chart: {
      type: 'area'
  },
  title: {
      text: 'Consultas de tus veterinarias'
  },
  subtitle: {
      text: 'Porcentaje por mes'
  },
  xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov','Dic' ],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
  yAxis: {
      labels: {
          format: '{value}%'
      },
      title: {
          enabled: false
      }
  },
  tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} consultas)<br/>',
      split: true
  },
  plotOptions: {
      area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
              lineWidth: 1,
              lineColor: '#ffffff'
          },
          accessibility: {
              pointDescriptionFormatter: function (point) {
                  function round(x) {
                      return Math.round(x * 100) / 100;
                  }
                  return (point.index + 1) + ', ' + point.category + ', ' +
                      point.y + ' millions, ' + round(point.percentage) + '%, ' +
                      point.series.name;
              }
          }
      }
  },
  series,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};


/*PercentageArea.propTypes = {
  title: PropTypes.string.isRequired,
  statistics: PropTypes.arrayOf(PropTypes.shape({})),
};*/

export default PercentageArea;