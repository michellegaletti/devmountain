import { useContext } from "react";
import { Box, Stack, Button, Icon } from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";
import { IoHomeOutline, IoAddOutline } from "react-icons/io5";
import Link from "next/link";

export default function PageLayout() {
  const { handleLogout } = useContext(UserContext);

  return (
    <Box
      maxW={["100%", null, "50%"]}
      margin="0 auto"
      p={4}
      bgColor={["brand.50", "#FFF", null]}
      boxShadow={["0px 1px 10px #888888", "none", "none"]}
      position={["fixed", "relative", null]}
      top={0}
      zIndex="9"
      width="100%"
    >
      <Stack align="center" direction="row" alignItems="baseline" mx={4}>
        <Link href="/diary">
          <a>
            <Icon w={6} h={6} flex={1} as={IoHomeOutline} />
          </a>
        </Link>
        <Stack
          direction="row"
          alignItems="baseline"
          spacing={5}
          flex={1}
          justifyContent="flex-end"
        >
          <Link href="/new-entry">
            <a>
              <Icon w={6} h={6} as={IoAddOutline} />
            </a>
          </Link>
          <Button
            bgColor="brand.100"
            color="white"
            borderRadius="3xl"
            boxShadow="1px 1px 2px #888888"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
