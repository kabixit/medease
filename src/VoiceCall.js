import React, { useState } from 'react';
import { Box, Button, Input, Stack, Heading } from '@chakra-ui/react';
import axios from 'axios';

const VoiceCallPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCall = async () => {
    try {
      // Make a POST request to your backend to initiate the voice call
      const response = await axios.post('/api/make-voice-call', { phoneNumber });
      console.log('Voice call initiated:', response.data);
    } catch (error) {
      console.error('Error initiating voice call:', error);
    }
  };

  return (
    <Box className="section-container">
      <Box className="hero-section">
        <Stack spacing="6" align="center" justify="center" textAlign="center">
          <Heading size="xl" color="blue.500">Make Voice Call</Heading>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            size="lg"
            width="300px"
            mb="4"
          />
          <Button colorScheme="blue" size="lg" onClick={handleCall}>Call</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VoiceCallPage;
