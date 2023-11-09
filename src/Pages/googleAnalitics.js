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
import WebsiteViewChart from "../Components/BottomCharts/WebsiteViewChart";
import WebsiteViewCountryChart from "../Components/BottomCharts/WebsiteViewCountryChart";
import ChartLineAndBar from "../Components/ChartLineAndBar";
import YoutubeViewChart from "../Components/BottomCharts/YoutubeViewChart";
import ActiveUserCountryChart from "../Components/BottomCharts/ActiveUserCountryChart";
import Widget1 from "../Components/Widget1";
import TableSocial from "../Components/TableSocial";


class GoogleAnalitics extends Component {
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
        "chart-2",
        "chart-3",
        "chart-4",
        "chart-5",
        "chart-6",
        "chart-7",
        "chart-8",
        "chart-9"
      ],
      chartList: [
        {
          id: "chart-1",
          data: [],
          component: WebsiteViewChart,
          props: {},
          title: "Data",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-2",
          data: [],
          component: ActiveUserCountryChart,
          props: {},
          title: "Data",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-3",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Data",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-4",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Data",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-5",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Data",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-6",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Data",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-7",
          data: [],
          component: YoutubeViewChart,
          props: {},
          title: "Chart",
          description:
            "View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-8",
          data: [],
          component: WebsiteViewCountryChart,
          props: {},
          title: "Chart",
          description:
            "Subscriber Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-9",
          data: [],
          component: WebsiteViewCountryChart,
          props: {},
          title: "Chart",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
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
        'https://dydxfoundation-dashboard.com/api/stats/activeuser',
        'https://dydxfoundation-dashboard.com/api/stats/activeuser',
        'https://dydxfoundation-dashboard.com/api/stats/linkedin',
        'https://dydxfoundation-dashboard.com/api/stats/token-holders',
        'https://dydxfoundation-dashboard.com/api/stats/token-holders-50',
        'https://dydxfoundation-dashboard.com/api/stats/hedgie-holders',
        'https://dydxfoundation-dashboard.com/api/stats/trading-volume',
        'https://dydxfoundation-dashboard.com/api/stats/platform-volume',
        'https://dydxfoundation-dashboard.com/api/stats/trading-fees',
        'https://dydxfoundation-dashboard.com/api/tables/bottomoffunnel'
    ];
    
    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));
  
      for (let i = 0; i < 9; i++) {
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

      activeUserWidgetDataClone = responses[0].data.result;
      tokenHolderWidgetDataClone = responses[3].data.result;
      platformVolumeWidgetDataClone = responses[7].data.result;
      dataTableClone = responses[9].data.result;

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
                  pageTitle="Google Analitics Dashboard (STILL DEVELOPING THOSE ARE DUMMY DATA)"
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
                    tableHeight={1460}
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

export default GoogleAnalitics;
