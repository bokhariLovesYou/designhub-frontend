import "../styles/globals.css";
import "../styles/index.scss";
import { AppWrapper } from "../context/AppWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
