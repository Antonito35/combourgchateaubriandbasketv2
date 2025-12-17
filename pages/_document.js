import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // Add translate="no" and meta google=notranslate to discourage automatic translation
    <Html lang="fr" translate="no">
      <Head>
        <meta name="google" content="notranslate" />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
      </Head>
      <body className="antialiased notranslate">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
