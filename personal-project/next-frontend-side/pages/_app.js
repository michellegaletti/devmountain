import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/UserContext";
import { DiaryProvider } from "../context/DiaryContext";
import { EntryProvider } from "../context/EntryContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserProvider>
        <DiaryProvider>
          <EntryProvider>
            <Component {...pageProps} />
          </EntryProvider>
        </DiaryProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
export default MyApp;
