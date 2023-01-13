import { Flex, HStack, VStack } from '@chakra-ui/layout';
import React from 'react';
import IconItem from './iconItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaAward } from 'react-icons/fa';

const icons = () => {
  return (
    <Grid>
      <HStack justifyContent="space-between">
        <IconItem text="Multi Currency Account Conversion" icon={FaAward} />
        <IconItem text="ASNB Subscription" icon={FaAward} />
      </HStack>
      <HStack>
        <IconItem text="DuitNow" icon={FaAward} />
        <IconItem text="My Favourites" icon={FaAward} />
      </HStack>
      <HStack>
        <IconItem text="e-FD Placement" icon={FaAward} />
      </HStack>
    </Grid>
  );
};

export default icons;
