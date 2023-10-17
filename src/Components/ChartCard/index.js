import { useState, useRef } from 'react'
import Highcharts from 'highcharts/highstock';

import HighchartsReact from 'highcharts-react-official'
import highchartsExporting from "highcharts/modules/exporting";

/* UI */
import {
	styled,
	Card,
	Collapse,
	CardContent,
} from "@mui/material"

/* Components */
import ChartCardHeader from "../ChartCardHeader"
import ChartCardFooter from '../ChartCardFooter'

highchartsExporting(Highcharts)

const ChartCard = ({ theme, title, description,lastUpdate, dragHandle, options, children }) => {
	const chartComponent = useRef(null);
	const [expanded, setExpanded] = useState(true)
	const exportChart = () => chartComponent.current.chart.exportChart()
	const printChart = () => chartComponent.current.chart.print()
	const fullScreenChart = () => chartComponent.current.chart.fullscreen.toggle()

	return (
		<Card>
			<ChartCardHeader
				theme={ theme }
				title={ title }
				description={ description }
				dragHandle={ dragHandle }
				expanded={ expanded }
				setExpanded={ setExpanded }
			/>
			<Collapse in={ expanded } timeout="auto" unmountOnExit>
				<CardContentStyled
					sx={{
						backgroundColor: theme === 'light' ? '#FFFFFF' : '#05052F'
					}}
				>
					<HighchartsReact
						ref={ chartComponent }
						highcharts={ Highcharts }
						options={ options }
						constructorType={'stockChart'}
						style={{
							display: 'flex',
							justifyContent: 'space-around',
						}}
					/>

					{
						children
					}
				</CardContentStyled>
				<ChartCardFooter
					theme={ theme }
					lastUpdate={ lastUpdate }
					exportChart={ exportChart }
					printChart={ printChart }
					fullScreenChart={ fullScreenChart }
				/>
			</Collapse>
		</Card>
	)
}

/*  */
const CardContentStyled	= styled(CardContent)(({ theme }) => ({
	margin: '0 8px',
	padding: '0',
	fontSize: '14px',
	lineHeight: 1
}))

export default ChartCard