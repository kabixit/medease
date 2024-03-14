import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import './FamilyProfileListPage.css';

const familyMembers = [
  { name: 'John Doe', dob: '1990-05-15', gender: 'Male', relation: 'Father' },
  { name: 'Jane Doe', dob: '1992-08-25', gender: 'Female', relation: 'Mother' },
  { name: 'Alice Doe', dob: '2010-03-10', gender: 'Female', relation: 'Daughter' },
  { name: 'Bob Doe', dob: '2015-11-20', gender: 'Male', relation: 'Son' },
];


const FamilyProfileListPage = () => {
  return (
    <Box className="family-profile-container">
      <h1 size="lg" mb={6}>Family Profile List</h1>
      {familyMembers.map((member, index) => (
        <Box key={index} className="member-card">
          <Heading className="member-heading" size="md">Family Member {index + 1}</Heading>
          <Text className="member-text">Name: {member.name}</Text>
          <Text className="member-text">Date of Birth: {member.dob}</Text>
          <Text className="member-text">Gender: {member.gender}</Text>
          <Text className="member-text">Relationship: {member.relation}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default FamilyProfileListPage;
