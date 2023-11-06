import { Component } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

/* UI */
import { Container, CssBaseline, ThemeProvider, Grid } from "@mui/material";

/* Themes */
import themes from "../themes";
import "../App.css";

/* Pages */
import OfflineBackdrop from "../Modals/OfflineBackdrop";
import NotFound from "./NotFound";

/* Components */
import Header from "../Components/Header";
import PageHeader from "../Components/PageHeader";
import SectionHeader from "../Components/SectionHeader";

/* Charts */
import Charts from "../Components/Charts";

/* Table */
import TableSocial from "../Components/TableSocial";

class BottomTable extends Component {
  state = {
    theme: localStorage.getItem("theme") || "dark",
    sidebarIsOpen: false,
    user: {
      avatar: "",
      email: "dYdX Foundation",
    },
    isFavorited: true,
    versionList: [{ title: "" }, { title: "" }, { title: "" }],
    activeVersion: 0,
    currencies: [
      {
        title: "Absolute",
      },
      {
        title: "Delta",
      },
    ],
    activeCharts: [
    ],
    chartList: [
      
    ],
    dataTable:"",
    watchListIsOpen: false,
  };

  sidebarToggle = () =>
    this.setState((prevState) => ({
      ...prevState,
      sidebarIsOpen: !prevState.sidebarIsOpen,
    }));

  watchListToggle = () =>
    this.setState((prevState) => ({
      ...prevState,
      watchListIsOpen: !prevState.watchListIsOpen,
    }));

  themeToggle = () => {
    let theme = this.state.theme === "light" ? "dark" : "light";
    this.setState((prevState) => ({ ...prevState, theme }));
    localStorage.setItem("theme", theme);
  };

  onChangeActiveButton = (e, value) =>
    this.setState((prevState) => ({ ...prevState, activeButton: value }));

  setActiveVersion = (e) =>
    this.setState((prevState) => ({
      ...prevState,
      activeVersion: e.target.value,
    }));

  setActiveCurrency = (e) =>
    this.setState((prevState) => ({
      ...prevState,
      activeCurrency: e.target.value,
    }));

    toggleChartItem = (id) => {
      const { activeCharts } = this.state;
      let currentIndex = activeCharts.indexOf(id);
      const newActiveCharts = [...activeCharts];
  
      if (currentIndex === -1) {
        newActiveCharts.push(id);
      } else {
        newActiveCharts.splice(currentIndex, 1);
      }
      this.setState({
        activeCharts: newActiveCharts,
      });
    };
    
  async componentDidMount() {
    let jwtToken = Cookies.get('token');
    if (!jwtToken) {
      window.location.href = 'http://localhost:3000'
    }

    let dataTableClone = this.state.dataTable;

    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    try {
      
      const axiosRequests = [
        axios.get('https://dydxfoundation-dashboard.com/api/tables/bottomoffunnel', axiosConfig),
      ];
  
      const responses = await Promise.all(axiosRequests);    
        for (let i = 0; i < responses.length; i++) {
          const response = responses[i];
          if (response.status === 200) {
            const data = response.data ? response.data : false;
            if (i === 0) {
              dataTableClone = data.result;
            }
          } else {
            Cookies.remove('token');
            window.location.href = 'http://localhost:3000'
            break;
          }
        }

      this.setState((prevState) => ({
        ...prevState,
        dataTable: dataTableClone,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      theme,
      user,
      activeVersion,
      currencies,
      activeCurrency,
      chartList,
      activeCharts,
      dataTable,
    } = this.state;

    return (
      <ThemeProvider theme={themes[theme]}>
        <CssBaseline />
        <Container maxWidth="xxl">
          <Header
            sidebarToggle={this.sidebarToggle}
            theme={theme}
            avatar={user.avatar}
            email={user.email}
            themeToggle={this.themeToggle}
            watchListToggle={this.watchListToggle}
          />
          <main id="content">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <PageHeader
                    theme={theme}
                    pageTitle="Market Data Table (Bottom of Funnel)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <SectionHeader
                    theme={theme}
                    chartList={chartList}
                    activeCharts={activeCharts}
                    toggleChartItem={this.toggleChartItem}
                    activeVersion={activeVersion}
                    setActiveVersion={this.setActiveVersion}
                    currencies={currencies}
                    activeCurrency={activeCurrency}
                    setActiveCurrency={this.setActiveCurrency}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TableSocial 
                    theme={theme}
                    tableHeight={629}
                    title= "Bottom of Funnel Table"
                    dataTable={dataTable}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Charts
                    theme={theme}
                    chartList={chartList}
                    activeCharts={activeCharts}
                  />
                </Grid>
              </Grid>
            
            <OfflineBackdrop theme={theme} />
          </main>
        </Container>
      </ThemeProvider>
    );
  }
}

export default BottomTable;
