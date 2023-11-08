import React from "react";
import Head from "next/head";
import "@/styles/globals.css";
import PropTypes from "prop-types";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import theme from "../theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface DocAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: DocAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { ...pageProps },
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Technical Documentations Portal</title>
        <meta
          name="Technical Documentations Portal"
          content="Technical Documentations Portal powered by .md"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
