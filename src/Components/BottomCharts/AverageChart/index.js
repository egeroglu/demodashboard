/* Components */
import ChartCard from "../../ChartCard"

import lightChartBackground from '../../../assets/images/dots.svg'
import darkChartBackground from '../../../assets/images/dots.svg'

const AverageChart = ({ data, theme, title, lastUpdate, description, dragHandle }) => {
    const groupedData = {};
    data.forEach(item => {
        const date = new Date(item.week_start_date).getTime();
        const value = item.value;
        
        if (groupedData[date]) {
            groupedData[date] += value;
        } else {
            groupedData[date] = value;
        }
        });
        const groupedDataArray = Object.entries(groupedData).map(([date, totalValue]) => ([
            parseInt(date),
            parseFloat(totalValue.toFixed(3))
        ])
    );

	const options	= {
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
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
		},
		plotOptions: {
			area: {
				stacking: 'normal',
				pointStart: 1940,
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: [
			{
				name: 'CTR',
				color: '#6966FF',
				lineColor: theme === 'light' ? '#00FF00' : '#6966FF',
				fillColor: {
					linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, theme === 'light' ? '#00FF00' : '#6966FF'],
						[1, theme === 'light' ? 'rgba(4, 4, 46, 0)' : 'rgba(255, 255, 255, 0)']
					]
				},
				lineWidth: 0.75,
			    data: groupedDataArray
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

export default AverageChart