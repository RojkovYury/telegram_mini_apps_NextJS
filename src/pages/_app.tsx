import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LayOut from "@/layout";
import { GlobalContextProvider } from "context/GlobalContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
    </GlobalContextProvider>
  );
}
