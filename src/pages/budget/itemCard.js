import React from 'react';
import { Card, CardBody, Progress, Text, Tooltip } from '@chakra-ui/react';

const itemCard = ({ index, title, desc, total, paid, onClick }) => {
  return (
    <Card onClick={onClick.bind(null, index)} cursor="pointer">
      <CardBody>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text mb="10px">{desc}</Text>
        <Tooltip
          hasArrow
          label={`${0.1383 * 100}%`}
          bg="gray.300"
          color="black"
          placement="top"
        >
          <Progress
            hasStripe
            colorScheme="blue"
            height="32px"
            value={0.1383 * 100}
          />
        </Tooltip>
      </CardBody>
    </Card>
  );
};

export default itemCard;
