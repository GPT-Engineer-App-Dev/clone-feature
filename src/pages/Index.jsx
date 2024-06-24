import { useState, useRef } from "react";
import { Container, Text, VStack, Button, HStack } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">
          {formatTime(time)}
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="green" onClick={startTimer}>Start</Button>
          <Button colorScheme="red" onClick={stopTimer}>Stop</Button>
          <Button colorScheme="yellow" onClick={resetTimer}>Reset</Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;