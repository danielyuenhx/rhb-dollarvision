import React from 'react';
import {
  Flex,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';

const CreatedModal = () => {
  return (
    <ModalContent>
      <ModalCloseButton
        onClick={() => {
          // setSelect('');
          // setConfirmed(false);
          // setAssets('');
          // stopAnimation();
        }}
      />
      <ModalBody py="50px">
        <Flex
          direction="column"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Player
            src={'https://assets10.lottiefiles.com/packages/lf20_1oky66dx.json'}
            className="player"
            loop
            autoplay
            speed={1}
            style={{
              width: '250px',
              height: '180px',
            }}
          />
          <Text fontSize="3xl" fontWeight="bold">
            Piggy Bank created!
          </Text>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default CreatedModal;
