import Head from "next/head";
import SignupFlow from "components/signup-flow";

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatHive</title>
        <meta
          name="description"
          content="Stay connected with your customers or friends using our Simple Chat App. Engage in real-time conversations on any device, with features like file sharing, emojis, and more. Sign up now for a seamless chat experience!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <main style={{ height: "100vh" }}>
        <SignupFlow />
      </main>
    </>
  );
}
