import PageLayout from "../components/PageLayout";
import { useState, useContext, useEffect } from "react";
import { EntryContext } from "../context/EntryContext";
import {
  Stack,
  Text,
  Icon,
  IconButton,
  Button,
  Tag,
  InputGroup,
  Input,
  InputLeftElement,
  Center,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import {
  IoCreateOutline,
  IoWineSharp,
  IoArrowBackOutline,
} from "react-icons/io5";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useRouter } from "next/router";
import ReadOnlyRadioComponent from "../components/ReadOnlyRadioComponent";
import RadioComponent from "../components/RadioComponent";
import Link from "next/link";

export default function entry() {
  const { entry, handleGetEntry, handleEditEntry } = useContext(EntryContext);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [entryMeal, setEntryMeal] = useState("");
  const [entryDrink, setEntryDrink] = useState("");
  const [bathroomValue, setBathroomValue] = useState("3");
  const [customerValue, setCustomerValue] = useState("3");
  const [otherComments, setOtherComments] = useState("");
  const values = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    if (router.query.entryId) {
      handleGetEntry(router.query.entryId);
    }
  }, [router.query.entryId]);

  useEffect(() => {
    setEntryMeal(entry?.entry_meal);
    setEntryDrink(entry?.entry_alcohol);
    setBathroomValue(entry?.bathroom_experience + "");
    setCustomerValue(entry?.customer_experience + "");
    setOtherComments(entry?.other);
  }, [entry]);

  return (
    <>
      <PageLayout />
      <Link href="/diary">
        <a>
          <Icon
            as={IoArrowBackOutline}
            mt={[24, 4, null]}
            ml={[8, 8, 52, 72, 96]}
            w={6}
            h={6}
            color="brand.200"
          />
        </a>
      </Link>
      {isEdit ? (
        <>
          <Stack direction="column" margin="0 auto" alignItems="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Text>{entry?.restaurant_name}</Text>
            </Stack>
            <Stack
              direction="column"
              p={4}
              bgColor="brand.50"
              minW={["75%", "50%", null]}
              borderRadius="md"
              spacing={2}
            >
              <Stack direction="row" pb={4}>
                <Flex flex={1}>
                  <Text>{entry?.entry_date}</Text>
                </Flex>
                <Flex flex={1} justifyContent="flex-end">
                  <Tag
                    bgColor="brand.100"
                    color="white"
                    borderRadius="3xl"
                    boxShadow="1px 1px 2px #888888"
                  >
                    {entry?.genre_name}
                  </Tag>
                </Flex>
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
              <FormControl as="fieldset">
                <Center>
                  <FormLabel
                    as="legend"
                    color="brand.200"
                    margin="0 auto"
                    pb={4}
                  >
                    Bathroom experience:
                  </FormLabel>
                </Center>
                <Center>
                  <RadioComponent
                    value={bathroomValue}
                    onChange={setBathroomValue}
                    valueArr={values}
                  />
                </Center>
              </FormControl>
              <FormControl as="fieldset">
                <Center>
                  <FormLabel
                    as="legend"
                    color="brand.200"
                    margin="0 auto"
                    pb={4}
                  >
                    Customer experience:
                  </FormLabel>
                </Center>
                <Center>
                  <RadioComponent
                    value={customerValue}
                    onChange={setCustomerValue}
                    valueArr={values}
                  />
                </Center>
              </FormControl>
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
              bgColor="brand.100"
              color="white"
              borderRadius="3xl"
              onClick={() => {
                handleEditEntry(
                  entryMeal,
                  entryDrink,
                  Number(bathroomValue),
                  Number(customerValue),
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
      ) : (
        <>
          <Stack direction="column" margin="0 auto" alignItems="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Text>{entry?.restaurant_name}</Text>
              <IconButton
                icon={<IoCreateOutline />}
                variant="unstyled"
                margin="0 auto"
                onClick={() => setIsEdit(true)}
              />
            </Stack>
            <Stack
              direction="column"
              p={4}
              bgColor="brand.50"
              minW={["75%", "50%", null]}
              borderRadius="md"
              spacing={2}
            >
              <Stack direction="row" mb={4}>
                <Stack direction="row" flex={1} alignItems="center">
                  {entry?.entry_alcohol ? (
                    <Icon w={6} h={6} as={IoWineSharp} />
                  ) : null}
                  <Flex flex={1}>
                    {entry?.bathroom_experience >= 3 &&
                    entry?.customer_experience >= 3 ? (
                      <Icon w={5} h={5} as={FaRegThumbsUp} />
                    ) : (
                      <Icon w={5} h={5} as={FaRegThumbsDown} />
                    )}
                  </Flex>
                </Stack>
                <Tag
                  bgColor="brand.100"
                  color="white"
                  borderRadius="3xl"
                  boxShadow="1px 1px 2px #888888"
                >
                  {entry?.genre_name}
                </Tag>
              </Stack>
              <Text pb={4}>{entry?.entry_date}</Text>
              <Text color="brand.200">What I ate:</Text>
              <Text bgColor="#FFF" p={2} borderRadius="md">
                {entry?.entry_meal}
              </Text>
              {entry?.entry_drink !== "" ? (
                <>
                  <Text color="brand.200">What I drank:</Text>
                  <Text bgColor="#FFF" p={2} borderRadius="md">
                    {entry?.entry_alcohol}
                  </Text>
                </>
              ) : null}
              <FormControl as="fieldset">
                <Center>
                  <FormLabel
                    as="legend"
                    color="brand.200"
                    margin="0 auto"
                    pb={4}
                  >
                    Bathroom experience:
                  </FormLabel>
                </Center>
                <Center>
                  <ReadOnlyRadioComponent
                    value={entry?.bathroom_experience + ""}
                    valueArr={values}
                  />
                </Center>
              </FormControl>
              <FormControl as="fieldset">
                <Center>
                  <FormLabel
                    as="legend"
                    color="brand.200"
                    margin="0 auto"
                    pb={4}
                  >
                    Customer experience:{" "}
                  </FormLabel>
                </Center>
                <Center>
                  <ReadOnlyRadioComponent
                    value={entry?.customer_experience + ""}
                    valueArr={values}
                  />
                </Center>
              </FormControl>
              {entry?.entry_other === "" ? (
                <>
                  <Text color="brand.200">Other comments: </Text>
                  <Text bgColor="#FFF" p={2} borderRadius="md">
                    {entry?.other}
                  </Text>
                </>
              ) : null}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
}
