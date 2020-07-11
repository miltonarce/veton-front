import React from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class PercentageArea extends React.Component {
    componentDidMount() {
      this.drow(this.props)
    }
  
    componentWillReceiveProps(nextProps, nextState) {
      this.chart.destroy()
      this.drow(nextProps)
    }
  
    shouldComponentUpdate() {
        return false
    }
  
    componentWillUnmount() {
      this.chart.destroy()
    }
  
    drow(props) {
          this.chart = Highcharts.chart(this.container, {
        chart: {
          type: 'area'
        },
        title: {
          text: props.title
        },
        xAxis: {
          categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        yAxis: {
          title: {
            text: 'Percent'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
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
            }
          }
        },
        series: props.data
      })
    }
  
    render() {
      return <div className="chart" ref={ref => this.container = ref} />
    }
  }
  
  const title = 'Historic and Estimated Worldwide Population Distribution by Region'
  const data = [{
    name: 'Asia',
    data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
    name: 'Africa',
    data: [106, 107, 111, 133, 221, 767, 1766]
  }, {
    name: 'Europe',
    data: [163, 203, 276, 408, 547, 729, 628]
  }, {
    name: 'America',
    data: [18, 31, 54, 156, 339, 818, 1201]
  }, {
    name: 'Oceania',
    data: [2, 2, 2, 6, 13, 30, 46]
  }]

export default PercentageArea;