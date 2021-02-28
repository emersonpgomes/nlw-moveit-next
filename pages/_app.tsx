import { UserProvider } from "../src/contexts/user";
import "../src/styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
