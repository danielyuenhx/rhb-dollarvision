import { Flex } from '@chakra-ui/layout';
import React from 'react';
import Layout from '../../components/layout';
import Rewards from './rewards';
// import UserStats from './userStats';

const Gamification = () => {
  return (
    <Layout>
      <Flex gap="30px" direction="column">
        {/* <UserStats /> */}
        <Rewards />
      </Flex>
    </Layout>
  );
};

export default Gamification;
