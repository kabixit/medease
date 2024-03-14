import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Input, Select, Stack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from './FirebaseProvider'; // Assuming you have Firebase auth in FirebaseProvider

const MedicationReminderPage = () => {
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [reminderTimes, setReminderTimes] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const medicationsCollection = collection(db, 'medications');
        const snapshot = await getDocs(medicationsCollection);
        const fetchedMedications = snapshot.docs.map(doc => doc.data().name);
        setMedications(fetchedMedications);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };
    fetchMedications();
  }, []);

  const addReminder = () => {
    if (newReminder.trim() !== '') {
      setReminderTimes([...reminderTimes, newReminder]);
      setNewReminder('');
    }
  };

  const removeReminder = (index) => {
    setReminderTimes(reminderTimes.filter((_, i) => i !== index));
  };

  const saveReminders = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !selectedMedication || reminderTimes.length === 0) {
        console.error('Invalid data for reminders');
        return;
      }

      const remindersCollection = collection(db, 'reminders');
      await addDoc(remindersCollection, {
        userId: currentUser.email,
        medication: selectedMedication,
        reminderTimes: reminderTimes
      });

      setSelectedMedication('');
      setReminderTimes([]);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <Box className="section-container">
      <Box className="hero-section">
        <Stack spacing="6" align="center" justify="center" textAlign="center">
          <Heading size="xl" color="blue.500">Set Medication Reminders</Heading>
          <Box>
            <Select
              value={selectedMedication}
              onChange={(e) => setSelectedMedication(e.target.value)}
              placeholder="Select medication"
              size="lg"
              width="300px"
              mb="4"
            >
              {medications.map((medication, index) => (
                <option key={index} value={medication}>{medication}</option>
              ))}
            </Select>
            <Stack spacing="2" mb="4">
              {reminderTimes.map((reminder, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Button colorScheme="red" size="sm" onClick={() => removeReminder(index)}>-</Button>
                  <Box ml="2">{reminder}</Box>
                </Box>
              ))}
            </Stack>
            <Stack direction="row" spacing="2" alignItems="center" mb="4">
              <Input
                type="time"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                size="md"
                width="200px"
              />
              <Button colorScheme="green" size="md" onClick={addReminder}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Stack>
          </Box>
          <Button colorScheme="blue" size="lg" onClick={saveReminders}>Save Reminders</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default MedicationReminderPage;
