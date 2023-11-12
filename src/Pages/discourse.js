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
import ChartLineAndBar from "../Components/ChartLineAndBar";
import Widget1 from "../Components/Widget1";
import TableSocial from "../Components/TableSocial";


class Discourse extends Component {
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
    discourseViewsWidget:"",
    discourseMemberWidgetData:"",
    discourseContributorsWidgetData:"",
    dataTable:"",
    activeCharts: [
        "chart-1",
        "chart-2",
        "chart-3",
        "chart-4",
        "chart-5",
        "chart-6",
      ],
      chartList: [
        {
          id: "chart-1",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Discourse Views",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        },{
          id: "chart-2",
          data: [],
          component: WebsiteViewChart,
          props: {},
          title: "Discourse Views",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-3",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Discourse Members",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-4",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Discourse Contributors",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-5",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Discourse Posts",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
        }, {
          id: "chart-6",
          data: [],
          component: ChartLineAndBar,
          props: {},
          title: "Discourse Topics",
          description:
            "Website View Count chart illustrates the number of poaps given to comunity.",
          lastUpdate: "",
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
    let discourseViewsClone = this.state.questWidgetData;
    let discourseMemberWidgetDataClone = this.state.discourseMemberWidgetData
    let discourseContributorsWidgetDataClone = this.state.discourseContributorsWidgetData;

    let dataTableClone = this.state.dataTable;

    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    const endpoints = [
        'https://dydxfoundation-dashboard.com/api/stats/discourse/views',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/views',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/members',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/contributors',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/posts',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/topics',
        'https://dydxfoundation-dashboard.com/api/tables/middleoffunnel'
    ];
    
    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));
  
      for (let i = 0; i < 6; i++) {
        const response = responses[i];

        if (response.status === 410) {
          Cookies.remove('token');
          window.location.href = 'https://dydxfoundation-dashboard.com/'
        } else {
          const data = response.data ? response.data : false;

          chartListClone[i].data = data.result.map(({ week_start_date, value }, i) => {
            return { week_start_date, value };
          });
          console.log(chartListClone[i].data)

        }
      }

      discourseViewsClone = responses[0].data.result;
      discourseMemberWidgetDataClone = responses[2].data.result;
      discourseContributorsWidgetDataClone = responses[3].data.result;
      dataTableClone = responses[6].data.result;

      this.setState({
        chartList: chartListClone,
        discourseViewsWidget: discourseViewsClone,
        discourseMemberWidgetData: discourseMemberWidgetDataClone,
        discourseContributorsWidgetData: discourseContributorsWidgetDataClone,
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
      discourseViewsWidget,
      discourseMemberWidgetData,
      discourseContributorsWidgetData,
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
                  pageTitle="Discourse Dashboard (...DISCOURSE DONE... WAITING FOR SNAPSHOT API)"
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
                  data={discourseViewsWidget}
                  title="Discourse Views" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={discourseMemberWidgetData}
                  title="Discourse Member" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={discourseContributorsWidgetData}
                  title="Discourse Contributors" 
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
                    tableHeight={318}
                    title= "Discourse Analitics Table"
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

export default Discourse;
