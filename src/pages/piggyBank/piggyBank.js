import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import Layout from '../../components/layout';
import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import supabase from '../../supabaseClient';
import ItemDetails from './itemDetails';
import ItemCard from './itemCard';
import SelectionModal from './modals/selectionModal';
import CreatedModal from './modals/createdModal';
import AssetsModal from './modals/assetsModal';
import { useSelector, useDispatch } from 'react-redux';
import SavingModal from './modals/savingModal';
import { updateModalName } from '../../redux/modalSlice';
import CustomModal from './modals/customModal';
import WarningModal from './modals/warningModal';
import WithdrawModal from './modals/withdrawModal';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: '1000',
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
  };
}

const PiggyBank = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(0);
  const [items, setItems] = useState();
  const dispatch = useDispatch();

  const current = useSelector(state => state.modal.currentModalName);

  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const renderModal = () => {
    if (current === 'Assets') {
      return <AssetsModal startAnimation={startAnimation} />;
    } else if (current === 'Education Fund' || current === 'Investments') {
      return <SavingModal startAnimation={startAnimation} />;
    } else if (current === 'Custom Fund') {
      return <CustomModal startAnimation={startAnimation} />;
    } else if (current === 'Completed') {
      return <CreatedModal stopAnimation={stopAnimation} />;
    } else if (current === 'Selection') {
      return <SelectionModal />;
    } else if (current === 'Warning') {
      return <WarningModal startAnimation={startAnimation} />;
    } else if (current === 'Withdraw') {
      return <WithdrawModal onClose={onClose} />;
    }
  };

  const AddPiggyBankHandler = () => {
    onOpen();
    dispatch(updateModalName('Selection'));
  };

  const WithdrawHandler = () => {
    onOpen();
    dispatch(updateModalName('Withdraw'));
  };

  useEffect(() => {
    const getPiggybank = async () => {
      let { data: items } = await supabase
        .from('piggybank')
        .select('name, desc, total, paid, per_month');
      setItems(items);
    };
    getPiggybank();
  }, []);

  return (
    <Layout>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Text mt={4} fontSize="4xl" mb="20px" fontWeight="extrabold">
        Piggy Bank
      </Text>
      {items ? (
        <>
          <Flex gap="30px" direction="row">
            <Flex gap="25px" direction="column" w="50%">
              {items &&
                items.map((item, index) => (
                  <ItemCard
                    key={index}
                    index={index}
                    title={item.name}
                    desc={item.desc}
                    total={item.total}
                    paid={item.paid}
                    onClick={setSelectedItem.bind(null, index)}
                  />
                ))}
              <Button
                variant="primaryButton"
                w="auto"
                _hover={{ transform: '' }}
                float="right"
                onClick={AddPiggyBankHandler}
              >
                Add Piggy Bank
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                w="auto"
                _hover={{ transform: '' }}
                float="right"
                onClick={WithdrawHandler}
                mt={-2}
              >
                Withdraw from Piggy Bank
              </Button>
            </Flex>
            {items && <ItemDetails selectedItem={items[selectedItem]} />}
          </Flex>

          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="xl"
            scrollBehavior={'inside'}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            {renderModal()}
          </Modal>
        </>
      ) : (
        <Flex
          w="100%"
          marginTop="30vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="secondaryBlue"
          />
        </Flex>
      )}
    </Layout>
  );
};

export default PiggyBank;
