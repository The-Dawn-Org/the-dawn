import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">have</Button>
          <Button color="inherit">fun</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontFamily: '"Amatic SC", cursive',
              fontSize: { xs: "4rem", md: "6rem" },
              color: "primary.main",
            }}
          >
            🚀תרגיל השלמה 021
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
