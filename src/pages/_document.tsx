import i18next from "../helpers/i18n";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="h-screen w-screen bg-white" lang={i18next.language}>
        <Head>
          <meta name="description" content="Chat via XMTP" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700|Inconsolata:400,600,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full">
          <main>
            <Main />
            <NextScript />
          </main>
        </body>
      </Html>
    );
  }
}

export default AppDocument;
