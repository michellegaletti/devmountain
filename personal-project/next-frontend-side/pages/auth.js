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
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { LockIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, handleRegister } = useContext(UserContext);
  const router = useRouter();

  return (
    <Center maxW="100%" h="100vh" bgColor={["brand.50", "#FFF", null]}>
      <Box
        maxW={["100%", "lg", null]}
        h="lg"
        borderWidth={[0, "1px", null]}
        borderRadius="md"
        pb={36}
        px={16}
        borderWidth={0}
        bgColor={["transparent", "brand.50", null]}
      >
        <Center>
          <Text py={12} fontSize="4xl" fontWeight="bold" color="brand.200">
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  variant="unstyled"
                  color="brand.200"
                  margin="0 auto"
                  size="lg"
                  minW={0}
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Center>
        <Center>
          <Stack spacing={4} my={3}>
            <Button
              w={36}
              bgColor="brand.100"
              color="white"
              borderRadius="3xl"
              onClick={() => handleLogin(email, password)}
            >
              Login
            </Button>
            <Center>
              <Text fontWeight="medium" color="brand.200">
                New user?
              </Text>
            </Center>
            <Button
              w={36}
              bgColor="brand.100"
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
