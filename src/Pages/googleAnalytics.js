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

/* Components */
import Header from "../Components/Header";
import PageHeader from "../Components/PageHeader";
import SectionHeader from "../Components/SectionHeader";

/* Charts */
import Charts from "../Components/Charts";
import DemograpyChart from "../Components/BottomCharts/DemograpyChart";
import Widget1 from "../Components/Widget1";
import TableSocial from "../Components/TableSocial";


class GoogleAnalytics extends Component {
  state = {
    theme: localStorage.getItem("theme") || "dark",
    sidebarIsOpen: false,
    user: {
      avatar: "",
      email: "tristan@dydx.com",
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
    activeCurrency: "ETH",
    websiteData: {},
    price: "",
    changePercentage: "",
    allTimeLow: "",
    lastTime: "",
    activeUserWidgetData:"",
    tokenHolderWidgetData:"",
    platformVolumeWidgetData:"",
    dataTable:"",
    activeCharts: [
        "chart-1",
      ],
      chartList: [
        {
          id: "chart-1",
          data: [],
          component: DemograpyChart,
          props: {},
          title: "demographic Charts",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, 
      ],
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
        window.location.href = 'https://dydxfoundation-dashboard.com/'
    }
    let chartListClone = this.state.chartList;
    let activeUserWidgetDataClone = this.state.questWidgetData;
    let tokenHolderWidgetDataClone = this.state.tokenHolderWidgetData
    let platformVolumeWidgetDataClone = this.state.platformVolumeWidgetData;

    let dataTableClone = this.state.dataTable;

    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    const endpoints = [
        'https://dydxfoundation-dashboard.com/api/stats/google/demographic',
    ];
    
    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));
  
      for (let i = 0; i < 1; i++) {
        const response = responses[i];

        if (response.status === 410) {
          Cookies.remove('token');
          window.location.href = 'https://dydxfoundation-dashboard.com/'
        } else {
          const data = response.data ? response.data : false;
          chartListClone[i].data = data.result.map(({ week_start_date, value, source }, i) => {
            return { week_start_date, value, source };
          });
        }
      }

      this.setState({
        chartList: chartListClone,
        activeUserWidgetData: activeUserWidgetDataClone,
        tokenHolderWidgetData: tokenHolderWidgetDataClone,
        platformVolumeWidgetData: platformVolumeWidgetDataClone,
        dataTable: dataTableClone,
      });
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
      activeUserWidgetData,
      tokenHolderWidgetData,
      platformVolumeWidgetData,
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
                  pageTitle="Google Analytics Dashboard (...DUMMY DATA... WAITING FOR API)"
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
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={activeUserWidgetData}
                  title="Active User of Quests" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={tokenHolderWidgetData}
                  title="Token Holder Volume" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={platformVolumeWidgetData}
                  title="Platform Volume" 
                />
              </Grid>

              <Grid item xs={12}>
                <Charts
                  theme={theme}
                  chartList={chartList}
                  activeCharts={activeCharts}
                />
              </Grid>

              <Grid item xs={12}>
                  <TableSocial 
                    theme={theme}
                    tableHeight={1670}
                    title= "Google Analitics Table"
                    dataTable={dataTable}
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

export default GoogleAnalytics;
