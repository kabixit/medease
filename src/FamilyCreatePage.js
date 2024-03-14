import React, { useState } from 'react';
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './FirebaseProvider';
import './FamilyCreatePage.css';

const FamilyCreatePage = () => {
  const [familyName, setFamilyName] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', dob: '', gender: '', relation: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index][field] = value;
    setFamilyMembers(updatedFamilyMembers);
  };

  const saveFamilyProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !familyName || familyMembers.length === 0) {
        console.error('Invalid data for family profile');
        return;
      }

      const familyProfileCollection = collection(db, 'familyProfiles');
      await addDoc(familyProfileCollection, { userId: currentUser.email, familyName, familyMembers });
      // Reset state after saving
      setFamilyName('');
      setFamilyMembers([]);
    } catch (error) {
      console.error('Error saving family profile:', error);
    }
  };

  return (
    <div>
      <h1>Create Family Profile</h1>
    <div className='main-div'>
    <Box className="family-create-page">
      
      <Input
        placeholder="Family Name"
        value={familyName}
        onChange={(e) => setFamilyName(e.target.value)}
        mb={4}
      />
      {familyMembers.map((member, index) => (
        <Stack key={index} direction="row" spacing={4} mb={4}>
          <Input
            placeholder="Name"
            value={member.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />
          <Input
            type="date"
            placeholder="Date of Birth"
            value={member.dob}
            onChange={(e) => handleChange(index, 'dob', e.target.value)}
          />
          <Input
            placeholder="Gender"
            value={member.gender}
            onChange={(e) => handleChange(index, 'gender', e.target.value)}
          />
          <Input
            placeholder="Relationship"
            value={member.relation}
            onChange={(e) => handleChange(index, 'relation', e.target.value)}
          />
        </Stack>
      ))}
      <div className='btn-div'>
      <Button colorScheme="blue" onClick={addFamilyMember} mb={10} mr={10}>Add Family Member</Button>
      <Button colorScheme="green" onClick={saveFamilyProfile} mb={10}>Save Family Profile</Button>
      </div>
    </Box>
    </div>
    </div>
  );
};

export default FamilyCreatePage;
