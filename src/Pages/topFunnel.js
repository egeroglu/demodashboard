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
import YoutubeViewChart from "../Components/BottomCharts/YoutubeViewChart";
import YoutubeSubsChart from "../Components/BottomCharts/YoutubeSubsChart";
import WebsiteViewChart from "../Components/BottomCharts/WebsiteViewChart";
import WebsiteViewCountryChart from "../Components/BottomCharts/WebsiteViewCountryChart";
import ChartLineAndBar from "../Components/ChartLineAndBar";

class TopFunnel extends Component {
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
    activeCharts: [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-7",
      "chart-8",
      "chart-9",
      "chart-10"
    ],
    chartList: [
      {
        id: "chart-1",
        data: [],
        component: YoutubeViewChart,
        props: {},
        title: "Youtube View Data",
        description:
          "View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-2",
        data: [],
        component: YoutubeSubsChart,
        props: {},
        title: "Youtube Subscriber Data",
        description:
          "Subscriber Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-3",
        data: [],
        component: WebsiteViewChart,
        props: {},
        title: "Website View Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-4",
        data: [],
        component: WebsiteViewCountryChart,
        props: {},
        title: "Website View Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-5",
        data: [],
        component: ChartLineAndBar,
        props: {},
        title: "Twitter View Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-6",
        data: [],
        component: WebsiteViewCountryChart,
        props: {},
        title: "Twitter Follower Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-7",
        data: [],
        component: WebsiteViewChart,
        props: {},
        title: "Telegram View Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-8",
        data: [],
        component: WebsiteViewCountryChart,
        props: {},
        title: "Telegram Follower Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      },{
        id: "chart-9",
        data: [],
        component: WebsiteViewChart,
        props: {},
        title: "DC View Data",
        description:
          "Website View Count chart illustrates the number of poaps given to comunity.",
        lastUpdate:"",
      }
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

      try {
        
        const axiosRequests = [
          axios.get('http://dydx.hopto.org:3013/stats/youtube', axiosConfig),
          axios.get('http://dydx.hopto.org:3013/stats/website', axiosConfig),
          axios.get('http://dydx.hopto.org:3013/stats/twitter', axiosConfig),
          axios.get('http://dydx.hopto.org:3013/stats/telegram', axiosConfig),
          axios.get('http://dydx.hopto.org:3013/stats/discord', axiosConfig)
        ];
    
        const responses = await Promise.all(axiosRequests);
    
        for (let i = 0; i < responses.length; i++) {
          const response = responses[i];
          if (response.status === 200) {
            const data = response.data ? response.data : false;
    
            if (i === 0) {
              chartListClone[0].data = data.result
                .filter(item => item.type === 'VIEWS')
                .map(({ week_start_date, value, type, source }, index) => {
                  return { week_start_date, value, type, source };
                });
              chartListClone[1].data = data.result
                .filter(item => item.type === 'SUBS')
                .map(({ week_start_date, value, type, source }, index) => {
                  return { week_start_date, value, type, source };
                });
            } else if (i === 1) {
              chartListClone[2].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
              chartListClone[3].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
            } else if (i === 2) {
              chartListClone[4].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
              chartListClone[5].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
            } else if (i === 3) {
              chartListClone[6].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
              chartListClone[7].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
            } else if (i === 4) {
              chartListClone[8].data = data.result.map(({ week_start_date, value, source }, index) => {
                return { week_start_date, value, source };
              });
            }
          } else {
            Cookies.remove('token');
            window.location.href = 'https://demodashboard-aha.pages.dev/'
            break;
          }
        }
    
        this.setState((prevState) => ({
          ...prevState,
          chartList: chartListClone,
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
                    pageTitle="Social Media Data (Top of Funnel) Charts"
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

export default TopFunnel;
