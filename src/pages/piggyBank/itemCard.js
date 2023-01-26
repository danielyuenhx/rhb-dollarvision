import React from 'react';
import { Card, CardBody, Progress, Text, Tooltip } from '@chakra-ui/react';
import ProgressBar from '@ramonak/react-progress-bar';

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
          label={`${(paid / total) * 100}%`}
          bg="gray.300"
          color="black"
          placement="top"
        >
          <ProgressBar
            completed={(paid / total) * 100}
            isLabelVisible={false}
            height="30px"
            bgColor="#0067b1"
          />
        </Tooltip>
      </CardBody>
    </Card>
  );
};

export default itemCard;
