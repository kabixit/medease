import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from './FirebaseProvider'; // Assuming you have Firebase Firestore instance and Firebase Authentication instance in FirebaseProvider

const FamilyProfileListPage = ({ currentUser }) => {
  const [familyProfiles, setFamilyProfiles] = useState([]);

  useEffect(() => {
    const fetchFamilyProfiles = async () => {
      try {
        const currentUser = auth.currentUser;

        const familyProfilesCollection = collection(db, 'familyProfiles');
        const q = query(familyProfilesCollection, where('userId', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        const fetchedFamilyProfiles = querySnapshot.docs.map(doc => doc.data());
        setFamilyProfiles(fetchedFamilyProfiles);
      } catch (error) {
        console.error('Error fetching family profiles:', error);
      }
    };
    fetchFamilyProfiles();
  }, [currentUser]);

  return (
    <Box p={8} maxWidth={600} margin="auto">
      <Heading size="lg" mb={6}>Family Profiles</Heading>
      {familyProfiles.length === 0 ? (
        <Text>No family profiles found.</Text>
      ) : (
        <ul>
          {familyProfiles.map((profile, index) => (
            <li key={index}>
              <Box mb={2}>
                <Heading size="md">{profile.familyName}</Heading>
                <Text>Family Members:</Text>
                <ul>
                  {profile.familyMembers.map((member, i) => (
                    <li key={i}>
                      <Text>{member.name}</Text>
                      <Text>{member.dob}</Text>
                      <Text>{member.gender}</Text>
                      <Text>{member.relation}</Text>
                    </li>
                  ))}
                </ul>
              </Box>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default FamilyProfileListPage;
