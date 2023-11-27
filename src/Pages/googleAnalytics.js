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
import WebsiteViewChart from "../Components/BottomCharts/WebsiteViewChart";
import LineChart from "../Components/BottomCharts/LineChart";
import PageTitleChart from "../Components/BottomCharts/PageTitleChart";
import AverageChart from "../Components/BottomCharts/AverageChart";
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
    performanceWidgetData:"",
    ctrWidgetData:"",
    impressionWidgetData:"",
    overviewDataTable:"",
    eventDataTable:"",
    sourceDataTable:"",
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
        "chart-10",
        "chart-11",
        "chart-12",
      ],
      chartList: [
        {
          id: "chart-1",
          data: [],
          component: DemograpyChart,
          props: {},
          title: "Demographic Chart",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-2",
          data: [],
          component: WebsiteViewChart,
          props: {},
          title: "Performance (Organic Search Clicks)",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-3",
          data: [],
          component: AverageChart,
          props: {},
          title: "Average CTR",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-4",
          data: [],
          component: WebsiteViewChart,
          props: {},
          title: "Average Position",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-5",
          data: [],
          component: WebsiteViewChart,
          props: {},
          title: "Total Impression",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-6",
          data: [],
          component: LineChart,
          props: {},
          title: "Overview",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-7",
          data: [],
          component: WebsiteViewChart,
          props: {},
          title: "Average Engagement Time",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-8",
          data: [],
          component: PageTitleChart,
          props: {},
          title: "Events",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-9",
          data: [],
          component: PageTitleChart,
          props: {},
          title: "Top Pages",
          description:
            "Based on countries.",
          lastUpdate: "",
        }, {
          id: "chart-10",
          data: [],
          component: PageTitleChart,
          props: {},
          title: "Interest",
          description:
            "Based on countries.",
          lastUpdate: "",
        },{
          id: "chart-11",
          data: [],
          component: PageTitleChart,
          props: {},
          title: "Sources",
          description:
            "Based on countries.",
          lastUpdate: "",
        },{
          id: "chart-12",
          data: [],
          component: PageTitleChart,
          props: {},
          title: "Top Cities",
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
    let performanceWidgetDataClone = this.performanceWidgetData;
    let ctrWidgetDataClone = this.ctrWidgetData;
    let impressionWidgetDataClone = this.impressionWidgetData;
    let overviewDataTableClone = this.state.overviewDataTable;
    let eventDataTableClone = this.state.eventDataTable;
    let sourceDataTableClone = this.state.sourceDataTable;

    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    const endpoints = [
        'https://dydxfoundation-dashboard.com/api/stats/google/demographic',
        'https://dydxfoundation-dashboard.com/api/stats/google/performance',
        'https://dydxfoundation-dashboard.com/api/stats/google/ctr',
        'https://dydxfoundation-dashboard.com/api/stats/google/average_position',
        'https://dydxfoundation-dashboard.com/api/stats/google/impressions',
        'https://dydxfoundation-dashboard.com/api/stats/google/overview',
        'https://dydxfoundation-dashboard.com/api/stats/google/engagement_time',
        'https://dydxfoundation-dashboard.com/api/stats/google/event',
        'https://dydxfoundation-dashboard.com/api/stats/google/page_title',
        'https://dydxfoundation-dashboard.com/api/stats/google/interest',
        'https://dydxfoundation-dashboard.com/api/stats/google/source',
        'https://dydxfoundation-dashboard.com/api/stats/google/city',
        'https://dydxfoundation-dashboard.com/api/tables/google/overview',
        'https://dydxfoundation-dashboard.com/api/tables/google/breakdowns/event',
        'https://dydxfoundation-dashboard.com/api/tables/google/breakdowns/source',
      ];

    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));

      for (let i = 0; i < 12; i++) {
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
      performanceWidgetDataClone = responses[1].data.result;
      ctrWidgetDataClone = responses[2].data.result;
      impressionWidgetDataClone = responses[4].data.result;
      overviewDataTableClone = responses[12].data.result;
      eventDataTableClone = responses[13].data.result;
      sourceDataTableClone = responses[14].data.result;

      this.setState({
        chartList: chartListClone,
        performanceWidgetData: performanceWidgetDataClone,
        ctrWidgetData: ctrWidgetDataClone,
        impressionWidgetData: impressionWidgetDataClone,
        overviewDataTable: overviewDataTableClone,
        eventDataTable: eventDataTableClone,
        sourceDataTable: sourceDataTableClone,
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
      performanceWidgetData,
      ctrWidgetData,
      impressionWidgetData,
      tokenHolderWidgetData,
      platformVolumeWidgetData,
      overviewDataTable,
      eventDataTable,
      sourceDataTable,
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
                  pageTitle="Ga & Seo Dashboard"
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
                  data={performanceWidgetData}
                  title="Performance" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={ctrWidgetData}
                  title="Average CTR"
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={impressionWidgetData}
                  title="Impressions" 
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
                    tableHeight={473}
                    title= "Google Analitics Overview Table"
                    dataTable={overviewDataTable}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TableSocial 
                    theme={theme}
                    tableHeight={577}
                    title= "Event Table"
                    dataTable={eventDataTable}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TableSocial 
                    theme={theme}
                    tableHeight={425}
                    title= "Source Table"
                    dataTable={sourceDataTable}
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
