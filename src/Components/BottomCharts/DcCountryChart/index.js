/* Components */
import ChartCard from "../../ChartCard"

import lightChartBackground from '../../../assets/images/dots.svg'
import darkChartBackground from '../../../assets/images/dots.svg'

const DcCountryChart = ({ data, theme, title, lastUpdate, description, dragHandle }) => {
    const dydxData = [];
    const japanData = [];
    const turkeyData = [];

    for(let i =0; i<data.length;i++){
        const timestamp = new Date(data[i].week_start_date).getTime();
        dydxData.push([timestamp, data[i].value]);
        i++;
        turkeyData.push([timestamp, data[i].value]);
        i++;
        japanData.push([timestamp, data[i].value]);
    }
	
	const options	= {
		chart: {
            zoomType: 'xy',
			type: 'area',
			backgroundColor: theme === 'light' ? '#FFFFFF' : '#212134',
			events: {
				render: function() {
					this.renderer.image(theme === 'light' ? lightChartBackground : darkChartBackground)
						.attr({
							x		: '0',
							y		: 50,
							width	: '100%',
							height	: 275,
							style	: 'pointer-events:none'
						})
						.add();
				}
			},
		},
		scrollbar: {
            enabled: false
        },
		legend: {
            enabled: true
        },
		legend: {
			itemStyle: {
				color: theme === 'light' ? '#04042E' : '#FFFFFF'
			},
		},
		title: false,
		credits: false,
        xAxis: {
            type: 'datetime'
        },
		accessibility: {
			enabled: false,
		},
		exporting: {
			enabled: false
		},
		rangeSelector: {
            buttonTheme: { // styles for the buttons
                fill: 'none',
                stroke: 'none',
                'stroke-width': 0,
                r: 8,
                style: {
                    color: '#C8C7D8',
                    fontWeight: 'bold'
                },
                states: {
                    hover: {
                    },
                    select: {
                        fill: '#6966FF',
                        style: {
                            color: 'white'
                        }
                    }
                    // disabled: { ... }
                }
            },
            inputBoxBorderColor: 'gray',
            inputBoxWidth: 120,
            inputBoxHeight: 18,
            inputStyle: {
                color: '#6966FF',
                fontWeight: 'bold'
            },
            labelStyle: {
                color: '#C8C7D8',
                fontWeight: 'bold'
            },
            selected: 5
        },
		yAxis: {
			opposite: false,
			title: false,
			gridLineWidth: false,
			labels: {
                format: '{value}%'
            },
		},
		tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y})<br/>',
            split: true
        },
		plotOptions: {
			area: {
				stacking: 'percent',
				marker: {
					enabled: false,
				}
			}
		},
		series: [
			{
				name: 'Dydx',
				color: '#006018',
				lineColor: theme === 'light' ? '#006018' : '#006018',
				fillColor: {
					linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, theme === 'light' ? '#006018' : '#006018'],
						[1, theme === 'light' ? '#006018' : 'rgb(0,96,24,0.4)']
					]
				},
				lineWidth: 0.75,
			    data: dydxData
			},{
				name: 'Japan',
				color: '#FEFEFE',
				lineColor: theme === 'light' ? '#FEFEFE' : '#FEFEFE',
				fillColor: {
					linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, theme === 'light' ? '#FEFEFE' : '#FEFEFE'],
						[1, theme === 'light' ? '#FEFEFE' : 'rgb(254,254,254,0.5)']
					]
				},
				lineWidth: 0.75,
			    data: japanData
			},{
				name: 'Turkey',
				color: '#6D0007',
				lineColor: theme === 'light' ? '#6D0007' : '#6D0007',
				fillColor: {
					linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, theme === 'light' ? '#6D0007' : '#6D0007'],
						[1, theme === 'light' ? '#6D0007' : 'rgb(109,0,7,0.5)']
					]
				},
				lineWidth: 0.75,
			    data: turkeyData
			}
		]
	}

	return (
		<ChartCard
			theme={ theme }
			title={ title }
			lastUpdate={lastUpdate}
			description={ description }
			dragHandle={ dragHandle }
			options={ options }
		/>
	)
}

export default DcCountryChart