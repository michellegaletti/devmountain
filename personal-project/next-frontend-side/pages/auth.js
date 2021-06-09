import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  Box,
  Button,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
  Center,
  Text,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { LockIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { handleLogin, handleRegister } = useContext(UserContext);
  const router = useRouter();

  return (
    <Center maxW="100%" minH="100vh" bgColor={["#F5EDF0", "#F5EDF0", "#FFF"]}>
      <Box
        maxW={["100%", "lg", "lg"]}
        maxH="lg"
        borderWidth={[0, "1px", "1px"]}
        borderRadius="md"
        pb={36}
        px={16}
        borderWidth={0}
        bgColor={["transparent", "transparent", "#F5EDF0"]}
      >
        <Center>
          <Text py={12} fontSize="4xl" fontWeight="bold" color="#420039">
            Yumary
          </Text>
        </Center>
        <Center>
          <Stack spacing={3}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={AiOutlineUser} color="gray.400" />}
              />
              <Input
                w={60}
                size="md"
                borderRadius="3xl"
                bgColor="white"
                isRequired
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.400" />}
              />
              <Input
                w={60}
                size="md"
                borderRadius="3xl"
                bgColor="white"
                isRequired
                placeholder="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Icon
                  w={5}
                  h={5}
                  color="#420039"
                  onClick={() => setShow(!show)}
                  as={show ? IoEyeOutline : IoEyeOffOutline}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Center>
        <Center>
          <Stack spacing={4} my={3}>
            <Button
              w={36}
              bgColor="#AF7A6D"
              color="white"
              borderRadius="3xl"
              onClick={() => handleLogin(email, password)}
            >
              Login
            </Button>
            <Center>
              <Text fontWeight="medium" color="#420039">
                New user?
              </Text>
            </Center>
            <Button
              w={36}
              bgColor="#AF7A6D"
              color="white"
              borderRadius="3xl"
              onClick={() => {
                handleRegister(email, password);
              }}
            >
              Register
            </Button>
          </Stack>
        </Center>
      </Box>
    </Center>
  );
};

export default auth;
