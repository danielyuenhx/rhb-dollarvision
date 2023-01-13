import { Flex } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout';
import UserCard from './userCard';
import UserCategory from './userCategory';
import UserDetails from './userDetails';
import UserSummary from './userSummary';

const Profile = () => {
  return (
    <Layout>
      <Flex gap="30px" direction="column">
        <UserCard />
        <UserSummary />
        {/* <UserDetails /> */}
        <UserCategory />
      </Flex>
    </Layout>
  );
};

export default Profile;
