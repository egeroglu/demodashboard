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

import Widget1 from "../Components/Widget1";

class Summary extends Component {
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
    websiteViewWidgetData:"",
    totalSubsWidgetData:"",
    discourseViewsWidget:"",
    discourseMemberWidgetData:"",
    discourseContributorsWidgetData:"",
    questWidgetData:"",
    poapWidgetData:"",
    dataTable:"",
    activeCharts: [ ],
    chartList: [ ],
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
    let activeUserWidgetDataClone = this.state.questWidgetData;
    let tokenHolderWidgetDataClone = this.state.tokenHolderWidgetData
    let platformVolumeWidgetDataClone = this.state.platformVolumeWidgetData;
    let websiteViewWidgetDataClone = this.state.websiteViewWidgetData;
    let totalSubsWidgetDataClone = this.state.totalSubsWidgetData
    let discourseViewsClone = this.state.questWidgetData;
    let discourseMemberWidgetDataClone = this.state.discourseMemberWidgetData
    let discourseContributorsWidgetDataClone = this.state.discourseContributorsWidgetData;
    let questWidgetDataClone = this.state.questWidgetData;
    let poapWidgetDataClone = this.state.poapWidgetData;
    const axiosConfig = {
      headers: {
        "Authorization": "Bearer " + jwtToken
      }
    };
    const endpoints = [
        'https://dydxfoundation-dashboard.com/api/stats/platform-volume',
        'https://dydxfoundation-dashboard.com/api/stats/activeuser',
        'https://dydxfoundation-dashboard.com/api/stats/token-holders',
        'https://dydxfoundation-dashboard.com/api/stats/website',
        'https://dydxfoundation-dashboard.com/api/stats/twitter',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/views',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/members',
        'https://dydxfoundation-dashboard.com/api/stats/discourse/contributors',
        'https://dydxfoundation-dashboard.com/api/stats/claimed-quests',
        'https://dydxfoundation-dashboard.com/api/stats/total-poaps',

    ];
    
    try {
      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, axiosConfig)));
      platformVolumeWidgetDataClone = responses[0].data.result;
      activeUserWidgetDataClone = responses[1].data.result;
      tokenHolderWidgetDataClone = responses[2].data.result;
      websiteViewWidgetDataClone = responses[3].data.result;
      totalSubsWidgetDataClone = responses[4].data.result;
      discourseViewsClone = responses[5].data.result;
      discourseMemberWidgetDataClone = responses[6].data.result;
      discourseContributorsWidgetDataClone = responses[7].data.result;
      questWidgetDataClone = responses[8].data.result;
      poapWidgetDataClone = responses[9].data.result;

      this.setState({
        activeUserWidgetData: activeUserWidgetDataClone,
        tokenHolderWidgetData: tokenHolderWidgetDataClone,
        platformVolumeWidgetData: platformVolumeWidgetDataClone,
        websiteViewWidgetData: websiteViewWidgetDataClone,
        totalSubsWidgetData: totalSubsWidgetDataClone,
        discourseViewsWidget: discourseViewsClone,
        discourseMemberWidgetData: discourseMemberWidgetDataClone,
        discourseContributorsWidgetData: discourseContributorsWidgetDataClone,
        questWidgetData: questWidgetDataClone,
        poapWidgetData: poapWidgetDataClone,
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
      websiteViewWidgetData,
      totalSubsWidgetData,
      discourseViewsWidget,
      discourseMemberWidgetData,
      discourseContributorsWidgetData,
      questWidgetData,
      poapWidgetData,
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
                  pageTitle="Weekly Summary Dashboard"
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
                  title="Active Users" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={tokenHolderWidgetData}
                  title="Token Holder" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={platformVolumeWidgetData}
                  title="Platform Volume" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={websiteViewWidgetData}
                  title="Website View" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={totalSubsWidgetData}
                  title="Twitter Views" 
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
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={questWidgetData}
                  title="Number of Quests" 
                />
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Widget1 
                  theme={theme}
                  data={poapWidgetData}
                  title="Number of POAP's" 
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

export default Summary;
