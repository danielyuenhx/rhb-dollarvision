import { Flex, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Clock from 'react-live-clock';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowRightFromBracket,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

const header = () => {
  const headerSections = [
    { text: 'Daniel Yuen', icon: faUser },
    { text: 'Log Out', icon: faArrowRightFromBracket },
    { text: 'Tutorials', icon: faQuestionCircle },
  ];
  return (
    <Flex
      height="75px"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      px="30px"
      bgColor="#f7fafc"
      zIndex="10000"
    >
      <Link to="/">
        <Image
          width="100px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/RHB_Logo.svg/1920px-RHB_Logo.svg.png"
        />
      </Link>
      <Flex width="700px" justifyContent="space-between" alignItems="center">
        <Clock
          format={'h:mm:ss A, ddd D MMM YYYY'}
          style={{ fontSize: '18px' }}
          ticking={true}
        />
        {headerSections.map(section => {
          return (
            <>
              <Box borderRightWidth="2px" width={0} height="1.5rem" />
              <Text
                fontSize="18px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
              >
                <FontAwesomeIcon icon={section.icon} color="#0067b1" size="s" />
                {section.text}
              </Text>
            </>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default header;
