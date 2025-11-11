import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // Add translate="no" and meta google=notranslate to discourage automatic translation
    <Html lang="fr" translate="no">
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <body className="antialiased notranslate">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
