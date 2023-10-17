/* UI */
import {
	Grid
} from '@mui/material';


const Charts = ({ theme, chartList, activeCharts }) => {
	return (
		<Grid container spacing={ 3 }>
			{
				chartList.map(function({ id, data, component: Component, props, title, description, lastUpdate }, index){
					if(activeCharts.indexOf(id) !== -1){
						return (
							<Grid item xs={ 12 } lg={ 4 } key={ index }>
								<Component
									index={ index }
									id={ id }
									data={ data }
									theme={ theme }
									component={ Component }
									props={ props }
									title={ title }
									description={ description }
									lastUpdate={ lastUpdate }
								/>
							</Grid>
						)
					}
					return false
				})
			}
		</Grid>
	)
}

export default Charts
