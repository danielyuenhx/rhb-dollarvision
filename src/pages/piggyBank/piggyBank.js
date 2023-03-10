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
import { usePiggyBanks } from '../../hooks/usePiggyBanks';
import { usePiggyBankById } from '../../hooks/usePiggyBankById';
import supabase from '../../supabaseClient';

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
  const dispatch = useDispatch();

  const {
    data: piggyBanks,
    isLoading: piggyBanksAreLoading,
    refetch: refetchPiggyBanks,
  } = usePiggyBanks();
  const defaultPiggyBankId =
    !piggyBanksAreLoading && piggyBanks ? piggyBanks[0].id : 1;
  const [selectedPiggyBankId, setSelectedPiggyBankId] =
    useState(defaultPiggyBankId);

  const { data: piggyBank, isLoading: piggyBankIsLoading } =
    usePiggyBankById(selectedPiggyBankId);
  const isLoading = piggyBanksAreLoading || piggyBankIsLoading;

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
      return (
        <AssetsModal
          startAnimation={startAnimation}
          refetchPiggyBanks={refetchPiggyBanks}
          data={piggyBank}
        />
      );
    } else if (current === 'Education Fund' || current === 'Investments') {
      return <SavingModal startAnimation={startAnimation} />;
    } else if (current === 'Custom Fund') {
      return <CustomModal startAnimation={startAnimation} />;
    } else if (current === 'Completed') {
      return <CreatedModal stopAnimation={stopAnimation} />;
    } else if (current === 'Selection') {
      return <SelectionModal />;
    } else if (current === 'Warning') {
      return (
        <WarningModal
          startAnimation={startAnimation}
          refetchPiggyBanks={refetchPiggyBanks}
        />
      );
    } else if (current === 'Withdraw') {
      return (
        <WithdrawModal
          onClose={onClose}
          refetchPiggyBanks={refetchPiggyBanks}
        />
      );
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

  // useEffect(() => {
  //   const getPiggybank = async () => {
  //     let { data: items } = await supabase
  //       .from('piggybank')
  //       .select('name, desc, total, paid, per_month');
  //     setItems(items);
  //   };
  //   getPiggybank();
  // }, []);

  return (
    <Layout>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Flex
        gap="25px"
        direction="row"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb="20px"
      >
        <Text mt={4} fontSize="4xl" mb="20px" fontWeight="extrabold">
          Piggy Bank
        </Text>
        <Flex gap="1rem">
          <Button
            variant="outline"
            colorScheme="red"
            w="auto"
            float="right"
            onClick={WithdrawHandler}
            maxWidth="400px"
          >
            Withdraw from Piggy Bank
          </Button>
          <Button
            w="auto"
            float="right"
            onClick={AddPiggyBankHandler}
            maxWidth="400px"
            colorScheme="blue"
            variant="solid"
          >
            Add Piggy Bank
          </Button>
        </Flex>
      </Flex>
      {piggyBanks ? (
        <>
          <Flex gap="30px" direction="row">
            <Flex gap="25px" direction="column" w="50%">
              {piggyBanks &&
                piggyBanks.map((pb, index) => (
                  <ItemCard
                    key={pb.id}
                    index={index}
                    title={pb.name}
                    desc={pb.description}
                    total={pb.total}
                    paid={pb.paid}
                    onClick={setSelectedPiggyBankId.bind(null, pb.id)}
                    selected={pb.id === selectedPiggyBankId}
                  />
                ))}
            </Flex>
            {piggyBank ? (
              <ItemDetails piggyBank={piggyBank} />
            ) : (
              <Flex w="100%" justifyContent="center" alignItems="center">
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="secondaryBlue"
                />
              </Flex>
            )}
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
