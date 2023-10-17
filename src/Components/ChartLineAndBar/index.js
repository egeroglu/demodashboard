/* Components */
import ChartCard from "../ChartCard"

import lightChartBackground from '../../assets/images/dots.svg'
import darkChartBackground from '../../assets/images/dots.svg'

const ChartLineAndBar = ({ data, theme, title, lastUpdate, description, dragHandle }) => {
    const groupedData = {};
    const dailyChangeData = {};
    let previousValue = null;

    data.forEach(item => {
        const date = new Date(item.week_start_date).getTime();
        const value = item.value;
        if (groupedData[date]) {
            groupedData[date] += value;
        } else {
            groupedData[date] = value;
        }
        if (previousValue === null) {
            dailyChangeData[date] = value;
        } else {
            const dailyChange = value - previousValue;
            dailyChangeData[date] = dailyChange;
        }
        previousValue = value;
    });

    const groupedDataArray = Object.entries(groupedData).map(([date, totalValue]) => ([
        parseInt(date),
        totalValue
    ]));

    const dailyDataArray = Object.entries(dailyChangeData).map(([date, value]) => ([
        parseInt(date),
        value
    ]));

	const options	= {
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
        title: false,
		credits: false,
        scrollbar: {
            enabled: false
        },
        yAxis: [{
            opposite: false,
            // Sol tarafta y-axis
        }, {
            showlastlabel: false,
            textPosition: 'none',
            opposite: true // Sağ tarafta y-axis
        }],
        plotOptions: {
            series: {
                borderRadius: '0%'
            }
        },
        series: [{
            type: 'column',
            name: 'Daily',
            yAxis: 1,
            opposite: true,
            data: dailyDataArray.slice(1),
        },{
            type: 'line',
            name: 'Cumulative',
            data: groupedDataArray,
            color: "#ff0000"
        }]
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

export default ChartLineAndBar