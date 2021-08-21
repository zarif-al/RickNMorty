import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Head from "next/head";
import Navigation from "../components/Navigation.js";
import { AnimatePresence } from "framer-motion";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// Start of Fix - https://github.com/vercel/next.js/issues/17464
import Router from "next/router";
const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);
// End Of Fix
function MyApp({ Component, pageProps, router }) {
  let display = false;
  if (router.route === "/") {
    display = false;
  } else {
    display = true;
  }
  return (
    <>
      <Head>
        <title>Rick & Morty</title>
        <meta name="description" content="Rick and Morty" />
        <link rel="icon" href="/rickAndMorty.ico" />
      </Head>
      <Navigation display={display} activeKey={router.route} />
      <ApolloProvider client={client}>
        <div className="appDiv">
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </div>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
