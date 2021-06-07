import { useContext } from "react";
import { useRouter } from "next/router";
import { Box, Stack, Button, Icon } from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";
import { IoHomeOutline, IoAddOutline } from "react-icons/io5";
import Link from "next/link";

export default function PageLayout() {
  const router = useRouter();
  const { handleLogout } = useContext(UserContext);

  return (
    <Box
      maxW={["100%", "50%", "50%"]}
      margin="0 auto"
      p={4}
      bgColor={["#F5EDF0", "#FFF", "#FFF"]}
      boxShadow={["0px 1px 10px #888888", "none", "none"]}
      position={["fixed", "relative", "relative"]}
      top={0}
      width="100%"
    >
      <Stack
        align="center"
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        mx={4}
      >
        <Link href="/diary">
          <a>
            <Icon w={6} h={6} as={IoHomeOutline} />
          </a>
        </Link>
        <Stack direction="row" alignItems="baseline" spacing={5}>
          <Link href="/new-entry">
            <a>
              <Icon w={6} h={6} as={IoAddOutline} />
            </a>
          </Link>
          {/* {topNav.map(({ label, path }, index) => {
          const isActive = path === router.pathname;
          return (
            <Text key={index}>
              <Link href={path}>
                <a>{label}</a>
              </Link>
            </Text>
          );
        })} */}
          <Button
            bgColor="#AF7A6D"
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
