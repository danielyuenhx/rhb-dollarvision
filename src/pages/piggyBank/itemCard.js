import React from 'react';
import { Card, CardBody, Progress, Text, Tooltip } from '@chakra-ui/react';

const itemCard = ({ index, title, total, paid, onClick }) => {
  return (
    <Card onClick={onClick.bind(null, index)} cursor="pointer">
      <CardBody>
        <Text fontSize="lg" fontWeight="bold" mb="10px">
          {title}
        </Text>
        <Tooltip
          hasArrow
          label={`${(paid / total) * 100}%`}
          bg="gray.300"
          color="black"
          placement="top"
        >
          <Progress
            colorScheme="blue"
            height="32px"
            value={(paid / total) * 100}
          />
        </Tooltip>
      </CardBody>
    </Card>
  );
};

export default itemCard;