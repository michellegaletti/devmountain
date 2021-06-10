import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/UserContext";
import { DiaryProvider } from "../context/DiaryContext";
import { EntryProvider } from "../context/EntryContext";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#F5EDF0",
      100: "#AF7A6D",
      200: "#420039",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
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
