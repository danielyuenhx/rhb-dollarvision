import { Flex } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout';
import UserCategory from './userCategory';
import UserDetails from './userDetails';

const Profile = () => {
  return (
    <Layout>
      <Flex gap="30px" direction="column">
        <UserDetails />
        <UserCategory />
      </Flex>
    </Layout>
  );
};

export default Profile;
