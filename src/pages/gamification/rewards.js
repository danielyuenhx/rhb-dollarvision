import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { SimpleGrid, Flex, Text } from '@chakra-ui/layout';
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
            height="400px"
            opacity={reward.earned ? 1 : 0.5}
            key={reward.label}
          >
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{reward.label}</Text>
                {reward.earned && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="green"
                    size="1x"
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
                    width: '150px',
                    height: '180px',
                  }}
                />

                <Text>{reward.description}</Text>
              </Flex>
            </CardBody>
            <CardFooter>
              <Flex width="100%" justifyContent="flex-end" alignItems="center">
                {/* <Text color="secondaryBlue">{reward.points}</Text> */}
                {
                  <Text fontSize="small" opacity={reward.earned ? 0 : 1}>
                    Complete before {reward.expired}
                  </Text>
                }
              </Flex>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export default Rewards;
