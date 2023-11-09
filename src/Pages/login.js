import { Component } from "react";
import Cookies from 'js-cookie';

/* UI */
import { Container, CssBaseline, ThemeProvider, Grid, Box, Button, TextField } from "@mui/material";

/* Themes */
import themes from "../themes";
import "../App.css";

class Login extends Component {

  state = {
    theme: localStorage.getItem("theme") || "dark",
    email: "",
    token: ""
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleTokenChange = (event) => {
    this.setState({ token: event.target.value });
  };

  handleLogin = () => {
    console.log("handle");
    const { email, token } = this.state;
    fetch("https://dydxfoundation-dashboard.com/api/user/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
              },
      body: JSON.stringify({
        email: email,
        token: token
      })
    })
      .then(async (response) => {
        if (response.status === 200) {
          let result = await response.json();
          Cookies.set('token', result.result.token)
          window.location.href = 'https://dydxfoundation-dashboard.com/socialMedia'
        } else {
          alert('Wrong Credentials')
        }
      }).catch((error) => {
        console.error("Hata oluştu: ", error);
      });
      
  };

  render() {
    const { theme, email, password } = this.state;

    return (
      <ThemeProvider theme={themes[theme]}>
        <CssBaseline />
        <Container maxWidth="xxl">
          <main id="content">
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item>
                <Box
                  bgcolor="#6966FF"
                  p={3}
                  boxShadow={3}
                  borderRadius= "8px"
                >
                  <TextField
                    label="Mail"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={this.handleEmailChange}
                  />
                  <TextField
                    label="Authentication Code"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={this.handleTokenChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleLogin}
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
    );
  }
}

export default Login;
