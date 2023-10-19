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
import YoutubeViewChart from "../Components/BottomCharts/YoutubeViewChart";
import WebsiteViewChart from "../Components/BottomCharts/WebsiteViewChart";
import WebsiteViewCountryChart from "../Components/BottomCharts/WebsiteViewCountryChart";
import ChartLineAndBar from "../Components/ChartLineAndBar";
import ActiveUserCountryChart from "../Components/BottomCharts/ActiveUserCountryChart";

class BottomFunnel extends Component {
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
    activeCharts: [
      "chart-11",
      "chart-12",
      "chart-13",
      "chart-14",
      "chart-15",
      "chart-16",
      "chart-17",
      "chart-18",
      "chart-19"
    ],
    chartList: [
      {
        id: "chart-11",
        data: [],
        component: WebsiteViewChart,
        props: {},
        title: "Active user Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-12",
        data: [],
        component: ActiveUserCountryChart,
        props: {},
        title: "Active user Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-13",
        data: [],
        component: ChartLineAndBar,
        props: {},
        title: "Linkedin user Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-14",
        data: [],
        component: ChartLineAndBar,
        props: {},
        title: "Token holders",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-15",
        data: [],
        component: ChartLineAndBar,
        props: {},
        title: "Token holders > 50dYdX",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-16",
        data: [],
        component: ChartLineAndBar,
        props: {},
        title: "Hedgie holders",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-17",
        data: [],
        component: YoutubeViewChart,
        props: {},
        title: "Trading Volume Chart",
        description:
          "View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-18",
        data: [],
        component: WebsiteViewCountryChart,
        props: {},
        title: "Platform Volume",
        description:
          "Subscriber Count chart illustrates the number of poaps given to comunity.",
        lastUpdate: "",
      }, {
        id: "chart-19",
        data: [],
        component: WebsiteViewCountryChart,
        props: {},
        title: "Trading Fees",
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
      window.location.href = 'https://demodashboard-aha.pages.dev/'
    }
    let chartListClone = this.state.chartList;
    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    const endpoints = [
      'http://dydx.hopto.org:3013/stats/activeuser',
      'http://dydx.hopto.org:3013/stats/activeuser',
      'http://dydx.hopto.org:3013/stats/linkedin',
      'http://dydx.hopto.org:3013/stats/token-holders',
      'http://dydx.hopto.org:3013/stats/token-holders-50',
      'http://dydx.hopto.org:3013/stats/hedgie-holders',
      'http://dydx.hopto.org:3013/stats/trading-volume',
      'http://dydx.hopto.org:3013/stats/platform-volume',
      'http://dydx.hopto.org:3013/stats/trading-fees',
    ];
    
    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));
  
      responses.forEach((response, index) => {
        if (response.status === 410) {
          Cookies.remove('token');
          window.location.href = 'https://demodashboard-aha.pages.dev/'
        } else {
          const data = response.data ? response.data : false;
          chartListClone[index].data = data.result.map(({ week_start_date, value, source }, index) => {
            return { week_start_date, value, source };
          });
        }
      });
  
      this.setState({
        chartList: chartListClone,
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
                  pageTitle="Market Data (Bottom of Funnel)"
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

export default BottomFunnel;
