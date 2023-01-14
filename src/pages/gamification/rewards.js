import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { SimpleGrid, Flex, Text, Box } from '@chakra-ui/layout';
import React from 'react';
import { REWARD_DATA } from '../../data';
import { Player } from '@lottiefiles/react-lottie-player';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rewards = () => {
  return (
    <SimpleGrid minChildWidth="300px" spacing="50px">
      {REWARD_DATA.map(reward => {
        return (
          <Card
            height="450px"
            opacity={reward.earned ? 1 : 0.5}
            key={reward.label}
          >
            <CardHeader
              fontWeight="bold"
              bgColor="secondaryBlue"
              borderTopLeftRadius="inherit"
              borderTopRightRadius="inherit"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text color="white" fontWeight="bold" fontSize="xl">
                  {reward.label}
                </Text>
                {reward.earned && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="white"
                    size="2x"
                  />
                )}
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                height="100%"
                justifyContent="space-between"
                direction="column"
              >
                <Player
                  src={reward.lottie}
                  className="player"
                  loop
                  autoplay
                  speed={1}
                  style={{
                    width: '250px',
                    height: '180px',
                  }}
                />

                <Text>{reward.description}</Text>
              </Flex>
            </CardBody>
            <CardFooter>
              <Flex
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box width="40%">
                  <Text color="secondaryBlue" fontSize="smaller">
                    {reward.completion}% of users completed
                  </Text>
                </Box>

                <Text
                  fontSize="smaller"
                  opacity={reward.earned ? 0 : 1}
                  textAlign="end"
                >
                  Complete before {reward.expired}
                </Text>
              </Flex>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export default Rewards;
