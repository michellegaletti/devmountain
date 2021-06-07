import PageLayout from "../components/PageLayout";
import { Box, Stack, Text, Icon, Tag, Center, Select } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DiaryContext } from "../context/DiaryContext";
import { IoAddOutline } from "react-icons/io5";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { IoWineSharp, IoRemoveCircleOutline } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import { EntryContext } from "../context/EntryContext";
import { useRouter } from "next/router";

export default function diary() {
  const { diary } = useContext(DiaryContext);
  const { user } = useContext(UserContext);
  const { handleDeleteEntry } = useContext(EntryContext);
  const [genreId, setGenreId] = useState(0);
  const router = useRouter();

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
          maxW={["xs", "md", "md"]}
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
      </Center>
      {diary?.filter((entry) => {
        if (!genreId) {
          return true;
        }
        return +entry.genre_id === +genreId;
      }).length > 0 ? (
        <Center>
          <Stack
            direction="column"
            align-items="center"
            margin="0 auto"
            my={8}
            mt={[40, 28, 28]}
            mx={8}
            spacing={8}
          >
            {diary
              .filter((entry) => {
                if (!genreId) {
                  return true;
                }
                return +entry.genre_id === +genreId;
              })
              .map((entry, index) => {
                return (
                  <Stack
                    direction="column"
                    w={["2xs", "md", "md"]}
                    bgColor="#F5EDF0"
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
                    <Icon
                      as={IoRemoveCircleOutline}
                      onClick={() => handleDeleteEntry(entry.entry_id)}
                    />

                    <Stack direction="row" justifyContent="space-between">
                      {entry.entry_alcohol !== "" ? (
                        <Icon w={6} h={6} as={IoWineSharp} />
                      ) : (
                        <Box></Box>
                      )}
                      <Tag
                        bgColor="#AF7A6D"
                        color="white"
                        borderRadius="3xl"
                        boxShadow="1px 1px 2px #888888"
                      >
                        {entry.genre_name}
                      </Tag>
                    </Stack>
                    <Text textAlign="center" py={2}>
                      {entry.restaurant_name}
                    </Text>
                    <Stack direction="row" justifyContent="space-between">
                      <Text>{entry.entry_date}</Text>
                      {entry.bathroom_experience >= 3 &&
                      entry.customer_experience >= 3 ? (
                        <Icon w={5} h={5} as={FaRegThumbsUp} />
                      ) : (
                        <Icon w={5} h={5} as={FaRegThumbsDown} />
                      )}
                    </Stack>
                  </Stack>
                );
              })}
          </Stack>
        </Center>
      ) : (
        <Text textAlign="center" pt={[60, 36, 36]} color="gray.400">
          No entries to show.
          <Text>
            (Click <Icon as={IoAddOutline} /> to add new entry.)
          </Text>
        </Text>
      )}
    </>
  );
}
