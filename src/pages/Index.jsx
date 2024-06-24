import { useState, useRef } from "react";
import { Box, Container, Text, VStack, Button, HStack, useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 6000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, "0");
    const hundredths = String(time % 100).padStart(2, "0");
    return `${minutes}:${seconds}.${hundredths}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  return (
    <Box bg={colorMode === "dark" ? "#1a1a1a" : "white"} height="100vh">
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            alignSelf="flex-end"
          />
          <Text fontSize="6xl" fontWeight="bold" color={colorMode === "dark" ? "white" : "black"}>
            {formatTime(time)}
          </Text>
          <HStack spacing={4}>
            <Button colorScheme="green" size="xl" onClick={startTimer}>Start</Button>
            <Button colorScheme="red" size="xl" onClick={stopTimer}>Stop</Button>
            <Button colorScheme="yellow" size="xl" onClick={resetTimer}>Reset</Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;