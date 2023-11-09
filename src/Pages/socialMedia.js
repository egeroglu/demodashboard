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
import YoutubeSubsChart from "../Components/BottomCharts/YoutubeSubsChart";
import Widget1 from "../Components/Widget1";
import TableSocial from "../Components/TableSocial";

class SocialMedia extends Component {
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
    websiteViewWidgetData:"",
    totalSubsWidgetData:"",
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
        window.location.href = 'https://dydxfoundation-dashboard.com/'
    }
    let chartListClone = this.state.chartList;
    let websiteViewWidgetDataClone = this.state.websiteViewWidgetData;
    let totalSubsWidgetDataClone = this.state.totalSubsWidgetData

    let dataTableClone = this.state.dataTable;

    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    const endpoints = [
        'https://dydxfoundation-dashboard.com/api/stats/youtube',
        'https://dydxfoundation-dashboard.com/api/stats/website',
        'https://dydxfoundation-dashboard.com/api/stats/twitter',
        'https://dydxfoundation-dashboard.com/api/stats/telegram',
        'https://dydxfoundation-dashboard.com/api/stats/discord',
        'https://dydxfoundation-dashboard.com/api/tables/topoffunnel',
    ];
    
    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));
  
      for (let i = 0; i < 5; i++) {
        const response = responses[i];

        if (response.status === 410) {
          Cookies.remove('token');
          window.location.href = 'https://dydxfoundation-dashboard.com/'
        } else {
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
        }
      }

      websiteViewWidgetDataClone = responses[0].data.result;
      totalSubsWidgetDataClone = responses[3].data.result;
      dataTableClone = responses[5].data.result;

      this.setState({
        chartList: chartListClone,
        websiteViewWidgetData: websiteViewWidgetDataClone,
        totalSubsWidgetData: totalSubsWidgetDataClone,
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
      websiteViewWidgetData,
      totalSubsWidgetData,
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
                  pageTitle="Social Media Dashboard"
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
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={websiteViewWidgetData}
                  title="Website View" 
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={totalSubsWidgetData}
                  title="Total Subs" 
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
                    tableHeight={1200}
                    title= "Social Media Data Table"
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

export default SocialMedia;
