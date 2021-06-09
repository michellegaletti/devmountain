import { useState, useContext } from "react";
import { EntryContext } from "../context/EntryContext";
import PageLayout from "../components/PageLayout";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Icon,
  Center,
  Box,
} from "@chakra-ui/react";
import {
  IoRestaurantOutline,
  IoCalendarOutline,
  IoWineSharp,
  IoArrowBackOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";

export default function newEntry() {
  const [restaurantName, setRestaurantName] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [genreId, setGenreId] = useState(0);
  const [entryMeal, setEntryMeal] = useState("");
  const [entryDrink, setEntryDrink] = useState("");
  const [bathroomValue, setBathroomValue] = useState(3);
  const [customerValue, setCustomerValue] = useState(3);
  const [otherComments, setOtherComments] = useState("");
  const { handleAddEntry } = useContext(EntryContext);

  const router = useRouter();

  return (
    <Box maxW="100%">
      <PageLayout />
      <Icon
        as={IoArrowBackOutline}
        onClick={() => router.push("/diary")}
        mt={[24, 4, 4]}
        ml={[8, 8, 52, 72, 96]}
        w={6}
        h={6}
        color="#420039"
      />
      <Text textAlign="center">New Entry</Text>
      <Stack
        direction="column"
        maxW={["75%", "50%", "50%"]}
        margin="0 auto"
        marginTop={8}
        spacing={4}
      >
        <InputGroup size="md">
          <Input
            placeholder="restaurant name"
            borderRadius="3xl"
            bgColor="white"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon color="gray.400" as={IoCalendarOutline} />}
          />
          <Input
            placeholder="date eaten there"
            borderRadius="3xl"
            bgColor="white"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
        </InputGroup>
        <Select
          placeholder="Select food genre"
          borderRadius="3xl"
          bgColor="white"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
        >
          <option value={1}>Italian</option>
          <option value={2}>Asian</option>
          <option value={3}>Breakfast</option>
          <option value={4}>Mexican</option>
          <option value={5}>Burgers</option>
          <option value={6}>Sandwiches</option>
          <option value={7}>Seafood</option>
          <option value={8}>Steakhouse</option>
          <option value={9}>Vegetarian</option>
          <option value={10}>Vegan</option>
          <option value={11}>Other</option>
        </Select>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon color="gray.400" as={IoRestaurantOutline} />}
          />
          <Input
            placeholder="meal you ate"
            borderRadius="3xl"
            bgColor="white"
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
            placeholder="drink you drank"
            borderRadius="3xl"
            bgColor="white"
            value={entryDrink}
            onChange={(e) => setEntryDrink(e.target.value)}
          />
        </InputGroup>
        <Stack direction="column">
          <Center>
            <Text>Bathroom experience: </Text>
          </Center>
          <Center>
            <RadioGroup onChange={setBathroomValue} value={bathroomValue}>
              <Stack direction="row" spacing={8}>
                <Radio value={1} colorScheme="red" />
                <Radio value={2} colorScheme="red" />
                <Radio value={3} colorScheme="red" />
                <Radio value={4} colorScheme="red" />
                <Radio value={5} colorScheme="red" />
              </Stack>
            </RadioGroup>
          </Center>
          <Center>
            <Text minW={52} textAlign="center">
              1
            </Text>
            <Text minW={52} textAlign="center">
              5
            </Text>
          </Center>
        </Stack>

        <Stack direction="column">
          <Center>
            <Text>Customer experience: </Text>
          </Center>
          <Center>
            <RadioGroup onChange={setCustomerValue} value={customerValue}>
              <Stack direction="row" spacing={8}>
                <Radio value={1} colorScheme="red" />
                <Radio value={2} colorScheme="red" />
                <Radio value={3} colorScheme="red" />
                <Radio value={4} colorScheme="red" />
                <Radio value={5} colorScheme="red" />
              </Stack>
            </RadioGroup>
          </Center>
          <Center>
            <Text minW={52} textAlign="center">
              1
            </Text>
            <Text minW={52} textAlign="center">
              5
            </Text>
          </Center>
        </Stack>
        <InputGroup size="md">
          <Input
            placeholder="other comments..."
            borderRadius="3xl"
            bgColor="white"
            value={otherComments}
            onChange={(e) => setOtherComments(e.target.value)}
          />
        </InputGroup>
      </Stack>
      <Center my={8}>
        <Button
          w={36}
          bgColor="#AF7A6D"
          color="white"
          borderRadius="3xl"
          onClick={() => {
            handleAddEntry(
              restaurantName,
              entryDate,
              entryMeal,
              entryDrink,
              bathroomValue,
              customerValue,
              otherComments,
              genreId
            );
          }}
        >
          Save
        </Button>
      </Center>
    </Box>
  );
}
