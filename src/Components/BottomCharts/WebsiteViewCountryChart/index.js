/* Components */
import ChartCard from "../../ChartCard"

import lightChartBackground from '../../../assets/images/dots.svg'
import darkChartBackground from '../../../assets/images/dots.svg'

const WebsiteViewCountryChart = ({ data, theme, title, lastUpdate, description, dragHandle }) => {
    const brazilData = [];
    const franceData = [];
    const indiaData = [];
    const japanData = [];
    const turkeyData = [];

    data.forEach(item => {
        const timestamp = new Date(item.week_start_date).getTime();
        const value = item.value;
        const source = item.source;

        if (source === 'Brazil') {
            brazilData.push([timestamp, value]);
        } else if (source === 'France') {
            franceData.push([timestamp, value]);
        } else if (source === 'India') {
            indiaData.push([timestamp, value]);
        } else if (source === 'Japan') {
            japanData.push([timestamp, value]);
        } else if (source === 'Turkey') {
            turkeyData.push([timestamp, value]);
        }
    });
	
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
				name: 'Brazil',
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
			    data: brazilData
			},{
				name: 'France',
				color: '#001860',
				lineColor: theme === 'light' ? '#001860' : '#001860',
				fillColor: {
					linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, theme === 'light' ? '#001860' : '#001860'],
						[1, theme === 'light' ? '#001860)' : 'rgb(0,24,96,0.5)']
					]
				},
				lineWidth: 0.75,
			    data: franceData
			},{
				name: 'India',
				color: '#908460',
				lineColor: theme === 'light' ? '#908460' : '#908460',
				fillColor: {
					linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, theme === 'light' ? '#908460' : '#908460'],
						[1, theme === 'light' ? '#908460' : 'rgb(144,132,96,0.5)']
					]
				},
				lineWidth: 0.75,
			    data: indiaData
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

export default WebsiteViewCountryChart