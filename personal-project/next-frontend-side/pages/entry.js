import PageLayout from "../components/PageLayout";
import { useState, useContext, useEffect } from "react";
import { EntryContext } from "../context/EntryContext";
import {
  Stack,
  Text,
  Icon,
  Button,
  Tag,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Center,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { IoCreateOutline, IoWineSharp } from "react-icons/io5";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useRouter } from "next/router";

export default function entry() {
  const { entry, handleGetEntry, handleEditEntry } = useContext(EntryContext);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [entryMeal, setEntryMeal] = useState("");
  const [entryDrink, setEntryDrink] = useState("");
  const [bathroomValue, setBathroomValue] = useState(3);
  const [customerValue, setCustomerValue] = useState(3);
  const [otherComments, setOtherComments] = useState("");

  useEffect(() => {
    if (router.query.entryId) {
      handleGetEntry(router.query.entryId);
    }
  }, [router.query.entryId]);

  useEffect(() => {
    setEntryMeal(entry?.entry_meal);
    setEntryDrink(entry?.entry_alcohol);
    setBathroomValue(entry?.bathroom_experience);
    setCustomerValue(entry?.customer_experience);
    setOtherComments(entry?.other);
  }, [entry]);

  return (
    <>
      <PageLayout />
      {!isEdit ? (
        <>
          <Stack direction="column" margin="0 auto" mt={24} alignItems="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Text>{entry?.restaurant_name}</Text>
              <Icon as={IoCreateOutline} onClick={() => setIsEdit(true)} />
            </Stack>
            <Stack
              direction="column"
              p={4}
              bgColor="#F5EDF0"
              minW={["75%", "50%", "50%"]}
              borderRadius="md"
              spacing={2}
            >
              <Stack direction="row" justifyContent="space-between" mb={4}>
                <Stack direction="row">
                  {entry?.entry_alcohol !== "" ? (
                    <Icon w={6} h={6} as={IoWineSharp} />
                  ) : (
                    <Box></Box>
                  )}
                  {entry?.bathroom_experience >= 3 &&
                  entry?.customer_experience >= 3 ? (
                    <Icon w={5} h={5} as={FaRegThumbsUp} />
                  ) : (
                    <Icon w={5} h={5} as={FaRegThumbsDown} />
                  )}
                </Stack>
                <Tag
                  bgColor="#AF7A6D"
                  color="white"
                  borderRadius="3xl"
                  boxShadow="1px 1px 2px #888888"
                >
                  {entry?.genre_name}
                </Tag>
              </Stack>
              <Text pb={4}>{entry?.entry_date}</Text>
              <Text color="#420039">What I ate:</Text>
              <Text bgColor="#FFF" p={2} borderRadius="md">
                {entry?.entry_meal}
              </Text>
              {entry?.entry_drink !== "" ? (
                <>
                  <Text color="#420039">What I drank:</Text>
                  <Text bgColor="#FFF" p={2} borderRadius="md">
                    {entry?.entry_alcohol}
                  </Text>
                </>
              ) : (
                <Box></Box>
              )}
              <Stack direction="column">
                <Center>
                  <Text color="#420039">Bathroom experience: </Text>
                </Center>
                <Center>
                  <RadioGroup value={entry?.bathroom_experience}>
                    <Stack direction="row" spacing={4}>
                      <Radio
                        value={1}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={2}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={3}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={4}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={5}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                    </Stack>
                  </RadioGroup>
                </Center>
                <Center>
                  <Text minW={32} textAlign="center" color="#420039">
                    1
                  </Text>
                  <Text minW={32} textAlign="center" color="#420039">
                    5
                  </Text>
                </Center>
              </Stack>
              <Stack direction="column">
                <Center>
                  <Text color="#420039">Customer experience: </Text>
                </Center>
                <Center>
                  <RadioGroup value={entry?.customer_experience}>
                    <Stack direction="row" spacing={4}>
                      <Radio
                        value={1}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={2}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={3}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={4}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                      <Radio
                        value={5}
                        colorScheme="red"
                        isReadOnly
                        bg="white"
                      />
                    </Stack>
                  </RadioGroup>
                </Center>
                <Center>
                  <Text minW={32} textAlign="center" color="#420039">
                    1
                  </Text>
                  <Text minW={32} textAlign="center" color="#420039">
                    5
                  </Text>
                </Center>
              </Stack>
              {entry?.entry_other === "" ? (
                <>
                  <Text color="#420039">Other comments: </Text>
                  <Text bgColor="#FFF" p={2} borderRadius="md">
                    {entry?.other}
                  </Text>
                </>
              ) : (
                <Box></Box>
              )}
            </Stack>
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="column" margin="0 auto" mt={24} alignItems="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Text>{entry?.restaurant_name}</Text>
            </Stack>
            <Stack
              direction="column"
              p={4}
              bgColor="#F5EDF0"
              minW={["75%", "50%", "50%"]}
              borderRadius="md"
              spacing={2}
            >
              <Stack direction="row" justifyContent="space-between" pb={4}>
                <Text>{entry?.entry_date}</Text>
                <Tag
                  bgColor="#AF7A6D"
                  color="white"
                  borderRadius="3xl"
                  boxShadow="1px 1px 2px #888888"
                >
                  {entry?.genre_name}
                </Tag>
              </Stack>
              <InputGroup size="md">
                <Input
                  bgColor="#FFF"
                  color="gray.500"
                  placeholder={entry?.entry_meal}
                  value={entryMeal}
                  onChange={(e) => setEntryMeal(e.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="gray.400" as={IoWineSharp} />}
                />
                <Input
                  bgColor="#FFF"
                  color="gray.500"
                  placeholder={
                    entry?.entry_alcohol === ""
                      ? "Drink you drank"
                      : entry?.entry_alcohol
                  }
                  value={entryDrink}
                  onChange={(e) => setEntryDrink(e.target.value)}
                />
              </InputGroup>
              <Stack direction="column">
                <Center>
                  <Text color="#420039">Bathroom experience: </Text>
                </Center>
                <Center>
                  <RadioGroup onChange={setBathroomValue} value={bathroomValue}>
                    <Stack direction="row" spacing={4}>
                      <Radio value={1} colorScheme="red" bg="white" />
                      <Radio value={2} colorScheme="red" bg="white" />
                      <Radio value={3} colorScheme="red" bg="white" />
                      <Radio value={4} colorScheme="red" bg="white" />
                      <Radio value={5} colorScheme="red" bg="white" />
                    </Stack>
                  </RadioGroup>
                </Center>
                <Center>
                  <Text minW={32} textAlign="center" color="#420039">
                    1
                  </Text>
                  <Text minW={32} textAlign="center" color="#420039">
                    5
                  </Text>
                </Center>
              </Stack>
              <Stack direction="column">
                <Center>
                  <Text color="#420039">Customer experience: </Text>
                </Center>
                <Center>
                  <RadioGroup onChange={setCustomerValue} value={customerValue}>
                    <Stack direction="row" spacing={4}>
                      <Radio value={1} colorScheme="red" bg="white" />
                      <Radio value={2} colorScheme="red" bg="white" />
                      <Radio value={3} colorScheme="red" bg="white" />
                      <Radio value={4} colorScheme="red" bg="white" />
                      <Radio value={5} colorScheme="red" bg="white" />
                    </Stack>
                  </RadioGroup>
                </Center>
                <Center>
                  <Text minW={32} textAlign="center" color="#420039">
                    1
                  </Text>
                  <Text minW={32} textAlign="center" color="#420039">
                    5
                  </Text>
                </Center>
              </Stack>
              <InputGroup size="md">
                <Input
                  placeholder="other comments..."
                  bgColor="white"
                  color="gray.500"
                  value={otherComments}
                  onChange={(e) => setOtherComments(e.target.value)}
                />
              </InputGroup>
            </Stack>
            <Button
              w={36}
              bgColor="#AF7A6D"
              color="white"
              borderRadius="3xl"
              onClick={() => {
                handleEditEntry(
                  entryMeal,
                  entryDrink,
                  bathroomValue,
                  customerValue,
                  otherComments,
                  entry?.entry_id
                );
                setIsEdit(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}
