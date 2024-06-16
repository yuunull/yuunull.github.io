import { Html, Head, Main, NextScript } from "next/document";
import Header from "../../components/layout/Header";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <Header />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
