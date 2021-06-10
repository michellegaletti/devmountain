import { useState, useContext } from "react";
import { EntryContext } from "../context/EntryContext";
import PageLayout from "../components/PageLayout";
import RadioComponent from "../components/RadioComponent";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  Text,
  Stack,
  Button,
  Icon,
  Center,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  IoRestaurantOutline,
  IoCalendarOutline,
  IoWineSharp,
  IoArrowBackOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";

export default function newEntry() {
  const [restaurantName, setRestaurantName] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [genreId, setGenreId] = useState(0);
  const [entryMeal, setEntryMeal] = useState("");
  const [entryDrink, setEntryDrink] = useState("");
  const [bathroomValue, setBathroomValue] = useState("3");
  const [customerValue, setCustomerValue] = useState("3");
  const [otherComments, setOtherComments] = useState("");
  const { handleAddEntry } = useContext(EntryContext);
  const values = ["1", "2", "3", "4", "5"];
  const foodGenres = [
    { value: 1, name: "Italian" },
    { value: 2, name: "Asian" },
    { value: 3, name: "Breakfast" },
    { value: 4, name: "Mexican" },
    { value: 5, name: "Burgers" },
    { value: 6, name: "Sandwiches" },
    { value: 7, name: "Seafood" },
    { value: 8, name: "Steakhouse" },
    { value: 9, name: "Vegetarian" },
    { value: 10, name: "Vegan" },
    { value: 11, name: "Other" },
  ];

  return (
    <Box maxW="100%">
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
      <Text textAlign="center">New Entry</Text>
      <Stack
        direction="column"
        maxW={["75%", null, "50%"]}
        margin="0 auto"
        marginTop={8}
        spacing={3}
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
          {foodGenres.map((genre, index) => (
            <option value={genre.value} key={index}>
              {genre.name}
            </option>
          ))}
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
        <FormControl as="fieldset">
          <Center>
            <FormLabel as="legend" margin="0 auto" pb={4}>
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
            <FormLabel as="legend" margin="0 auto" pb={4}>
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
          bgColor="brand.100"
          color="white"
          borderRadius="3xl"
          onClick={() => {
            handleAddEntry(
              restaurantName,
              entryDate,
              entryMeal,
              entryDrink,
              Number(bathroomValue),
              Number(customerValue),
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
