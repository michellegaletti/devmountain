import { Stack, RadioGroup, Radio, Text } from "@chakra-ui/react";

export default function RadioComponent({ value, onChange, valueArr }) {
  return (
    <>
      <Stack direction="column">
        <RadioGroup onChange={onChange} value={value}>
          <Stack direction="row" spacing={6} justifyContent="center">
            {valueArr.map((val, index) => (
              <Radio value={val} key={index} colorScheme="red" bg="white" />
            ))}
          </Stack>
        </RadioGroup>
        <Stack direction="row">
          <Text flex={1} maxW={44} textAlign="left">
            1
          </Text>
          <Text flex={1} maxW={44} textAlign="right">
            5
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
