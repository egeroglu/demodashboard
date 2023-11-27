/* Components */
import ChartCard from "../../ChartCard"

import lightChartBackground from '../../../assets/images/dots.svg'
import darkChartBackground from '../../../assets/images/dots.svg'

const PageTitleChart = ({ data, theme, title, lastUpdate, description, dragHandle }) => {
    const currentData = [];
    
    data.forEach(item => {
        const timestamp = new Date(item.week_start_date).getTime();
        const value = item.value;
        const source = item.source;

        if (item.week_start_date == data[data.length-1].week_start_date) {
            currentData.push([value, source]);
        }
    });
    const getTop5 = (data) => {
        const sortedData = data.slice().sort((a, b) => b[1] - a[1]);
        const top5 = sortedData.slice(0, 5);
        return top5;
    };  
    const top5Data = getTop5(currentData);

    const tableData = top5Data.map(item => ({
        name: item[1],
        y: item[0],
      }));

	const options	= {
        chart: {
            type: 'column',
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
        accessibility: {
			enabled: false,
		},
        credits: false,
        xAxis: {
            crosshair: false,
			tickLength:10,
            labels: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
        series: [
            {
                name: 'Count',
                colorByPoint: true,
                data: tableData
            }
        ],
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

export default PageTitleChart