import Head from "next/head";
import PageLayout from "../components/PageLayout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Yumary</title>
        <meta
          name="description"
          content="App to keep track of restaurants been to, meals eaten, drinks drunk, and experience"
        />
        <meta name="author" content="Michelle Galetti" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <PageLayout />
    </div>
  );
}
