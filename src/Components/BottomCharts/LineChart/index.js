/* Components */
import ChartCard from "../../ChartCard"

import lightChartBackground from '../../../assets/images/dots.svg'
import darkChartBackground from '../../../assets/images/dots.svg'

const LineChart = ({ data, theme, title, lastUpdate, description, dragHandle }) => {
    const eventCount = [];
    const newUsers = [];
    const users = [];

    data.forEach(item => {
        const timestamp = new Date(item.week_start_date).getTime();
        const value = item.value;
        const source = item.source;

        if (source === 'Event Count') {
            eventCount.push([timestamp, value]);
        } else if (source === 'New Users') {
            newUsers.push([timestamp, value]);
        } else if (source === 'Users') {
            users.push([timestamp, value]);
        } 
    });

    const options	= {
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
        accessibility: {
			enabled: false,
		},
		chart: {
            zoomType: 'xy',
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
				marker: {
					enabled: false,
				}
			}
		},
		series: [
            {
                name: 'Event Count',
                color: '#FFFFFF',
                lineColor: theme === 'light' ? '#00FF00' : '#FFFFFF',
                data: eventCount
            }, {
                name: 'New Users',
                color: '#6966FF',
                lineColor: theme === 'light' ? '#00FF00' : '#6966FF',
                data: newUsers
            },{
                name: 'Users',
                color: '#6966FF',
                lineColor: theme === 'light' ? '#00FF00' : '#6966FF',
                data: newUsers
            },
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

export default LineChart