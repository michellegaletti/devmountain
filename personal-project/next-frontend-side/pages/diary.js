import PageLayout from "../components/PageLayout";
import {
  Flex,
  Stack,
  Text,
  Icon,
  IconButton,
  Tag,
  Center,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DiaryContext } from "../context/DiaryContext";
import { IoAddOutline } from "react-icons/io5";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { IoWineSharp, IoTrashOutline } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import { EntryContext } from "../context/EntryContext";
import { useRouter } from "next/router";

export default function diary() {
  const { diary } = useContext(DiaryContext);
  const { user } = useContext(UserContext);
  const { handleDeleteEntry } = useContext(EntryContext);
  const [genreId, setGenreId] = useState(0);
  const router = useRouter();

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
    <>
      <PageLayout />
      <Center>
        <Select
          placeholder="Select food genre"
          borderRadius="3xl"
          bgColor="white"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          position="fixed"
          top={24}
          px={1}
          maxW={["xs", "md", null]}
        >
          {foodGenres.map((genre, index) => (
            <option value={genre.value} key={index}>
              {genre.name}
            </option>
          ))}
        </Select>
      </Center>
      {diary?.filter((entry) => {
        if (!genreId) {
          return true;
        }
        return Number(entry.genre_id) === Number(genreId);
      }).length > 0 ? (
        <Center>
          <Stack
            direction="column"
            align-items="center"
            margin="0 auto"
            my={8}
            mt={[40, 28, null]}
            mx={8}
            spacing={8}
          >
            {diary
              .filter((entry) => {
                if (!genreId) {
                  return true;
                }
                return Number(entry.genre_id) === Number(genreId);
              })
              .map((entry, index) => {
                return (
                  <Stack
                    direction="column"
                    w={["2xs", "md", null]}
                    bgColor="brand.50"
                    p={4}
                    borderRadius="md"
                    boxShadow="2px 2px 5px #888888"
                    key={index}
                    onClick={() => {
                      router.push({
                        pathname: "/entry",
                        query: { entryId: entry.entry_id },
                      });
                    }}
                  >
                    <Flex flex={1} justifyContent="flex-end">
                      <IconButton
                        icon={<IoTrashOutline />}
                        variant="unstyled"
                        size="lg"
                        minW={0}
                        h={4}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteEntry(entry.entry_id);
                        }}
                      />
                    </Flex>
                    <Stack direction="row">
                      {entry.entry_alcohol ? (
                        <Icon w={6} h={6} as={IoWineSharp} />
                      ) : null}
                      <Flex flex={1} justifyContent="flex-end">
                        <Tag
                          bgColor="brand.100"
                          color="white"
                          borderRadius="3xl"
                          boxShadow="1px 1px 2px #888888"
                        >
                          {entry.genre_name}
                        </Tag>
                      </Flex>
                    </Stack>
                    <Text textAlign="center" py={2}>
                      {entry.restaurant_name}
                    </Text>
                    <Stack direction="row">
                      <Flex flex={1}>
                        <Text>{entry.entry_date}</Text>
                      </Flex>
                      <Flex flex={1} justifyContent="flex-end">
                        {entry.bathroom_experience >= 3 &&
                        entry.customer_experience >= 3 ? (
                          <Icon w={5} h={5} as={FaRegThumbsUp} />
                        ) : (
                          <Icon w={5} h={5} as={FaRegThumbsDown} />
                        )}
                      </Flex>
                    </Stack>
                  </Stack>
                );
              })}
          </Stack>
        </Center>
      ) : (
        <Text textAlign="center" pt={[60, 36, null]} color="gray.400">
          No entries to show.
          <Text>
            (Click <Icon as={IoAddOutline} /> to add new entry.)
          </Text>
        </Text>
      )}
    </>
  );
}
