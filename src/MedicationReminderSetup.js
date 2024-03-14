import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './FirebaseProvider';
import { Checkbox, Input, Button, Radio, RadioGroup, Stack, Heading, Box } from '@chakra-ui/react';

const MedicationReminderSetup = () => {
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [reminderTimes, setReminderTimes] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState('');

  const handleMedicationSelection = (medication) => {
    setSelectedMedications(prevMedications => {
      if (prevMedications.includes(medication)) {
        return prevMedications.filter(med => med !== medication);
      } else {
        return [...prevMedications, medication];
      }
    });
  };

  const handleReminderTimeChange = (time) => {
    setReminderTimes(prevTimes => [...prevTimes, time]);
  };

  const handleNotificationPreferenceChange = (preference) => {
    setNotificationPreferences(preference);
  };

  const handleSubmit = async () => {
    try {
      // Store reminder settings in Firestore
      const docRef = await addDoc(collection(db, 'reminderSettings'), {
        medications: selectedMedications,
        reminderTimes,
        notificationPreferences,
      });
      console.log('Reminder settings stored with ID: ', docRef.id);
      // Reset state after submitting
      setSelectedMedications([]);
      setReminderTimes([]);
      setNotificationPreferences('');
    } catch (error) {
      console.error('Error storing reminder settings: ', error);
    }
  };

  return (
    <Box p="4" maxW="500px" m="auto">
      <Heading mb="4">Medication Reminder Setup</Heading>
      <Stack spacing="4">
        <Heading size="md">Select Medications:</Heading>
        <Checkbox isChecked={selectedMedications.includes('Medication A')} onChange={() => handleMedicationSelection('Medication A')}>
          Medication A
        </Checkbox>
        <Checkbox isChecked={selectedMedications.includes('Medication B')} onChange={() => handleMedicationSelection('Medication B')}>
          Medication B
        </Checkbox>
        {/* Add more medication checkboxes as needed */}

        <Heading size="md">Set Reminder Times:</Heading>
        <Input type="time" onChange={(e) => handleReminderTimeChange(e.target.value)} />

        <Heading size="md">Notification Preferences:</Heading>
        <RadioGroup onChange={(e) => handleNotificationPreferenceChange(e)}>
          <Stack spacing="2">
            <Radio value="Email" isChecked={notificationPreferences === 'Email'}>
              Email
            </Radio>
            <Radio value="Push" isChecked={notificationPreferences === 'Push'}>
              Push Notification
            </Radio>
          </Stack>
        </RadioGroup>

        <Button colorScheme="teal" onClick={handleSubmit}>Save Reminder Settings</Button>
      </Stack>
    </Box>
  );
};

export default MedicationReminderSetup;
