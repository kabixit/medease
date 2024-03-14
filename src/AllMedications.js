import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseProvider';
import { Box, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react';

const AllMedications = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const medicationsCollection = collection(db, 'medications');
        const querySnapshot = await getDocs(medicationsCollection);
        const medsData = [];
        querySnapshot.forEach((doc) => {
          medsData.push(doc.data());
        });
        setMedications(medsData);
      } catch (error) {
        console.error('Error retrieving medications:', error);
      }
    };

    fetchMedications();
  }, []);

  return (
    <Box maxW="800px" mx="auto" p="6">
      <Heading as="h1" mb="6">All Medications</Heading>
      <Wrap spacing="6">
        {medications.map((medication, index) => (
          <WrapItem key={index} w="100%" md="calc(50% - 12px)">
            <Box p="4" bg="white" boxShadow="md" borderRadius="md">
              <Heading as="h2" size="md" mb="2">{medication.name}</Heading>
              <Text><strong>Dosage:</strong> {medication.dosage}</Text>
              <Text><strong>Frequency:</strong> {medication.frequency}</Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default AllMedications;
