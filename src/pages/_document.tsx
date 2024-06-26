import { Html, Head, Main, NextScript } from "next/document";
import Header from "../../components/layout/Header";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <title>yuunull</title>
        <meta name="description" content="portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
