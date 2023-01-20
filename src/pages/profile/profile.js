import { Button, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import UserCard from './userCard';
import UserCategory from './userCategory';
import UserSummary from './userSummary';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAsync } from '../../redux/walletSlice';
import { transactionIncrement } from '../../redux/transactionSlice';
// import UserDetails from './userDetails';

const Profile = () => {
  const count = useSelector(state => state.wallet.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(increment());
    // dispatch(incrementByAmount(10))
    console.log(count);
  }, [count]);

  return (
    <Layout>
      <Flex gap="30px" direction="column">
        <Button
          onClick={() => {
            dispatch(transactionIncrement(10));
          }}
        >
          Add
        </Button>
        <Button
          onClick={() => {
            dispatch(incrementAsync(10));
          }}
        >
          Add Async
        </Button>
        <UserCard />
        <UserSummary />
        {/* <UserDetails /> */}
        <UserCategory />
      </Flex>
    </Layout>
  );
};

export default Profile;
