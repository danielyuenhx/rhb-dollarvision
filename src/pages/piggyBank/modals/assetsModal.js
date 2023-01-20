import React, { useState, Fragment } from 'react';
import {
  Button,
  Flex,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Input,
  InputLeftAddon,
  InputGroup,
  Switch,
  Collapse,
} from '@chakra-ui/react';
import { updateModalName } from '../../../redux/modalSlice';
import { useDispatch } from 'react-redux';

const AssetsModal = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [insuranceActivate, setInsuranceActivate] = useState(false);

  const [asset, setAssets] = useState('Car');
  const [amount, setAmount] = useState(80000);
  const [initialDesposit, setInitialDeposit] = useState(3000);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);

  // Insurance and loan
  let insurance = 500 * 7;
  let loan = (amount / (7 * 12)) * (104.5 / 100);

  let balance = 10000;
  let downPaymentAmount = 0;

  if (insuranceActivate) {
    downPaymentAmount = (
      amount * (downPaymentPercentage / 100) -
      initialDesposit +
      loan +
      insurance
    ).toFixed(2);
  } else {
    downPaymentAmount = (
      amount * (downPaymentPercentage / 100) -
      initialDesposit
    ).toFixed(2);
  }

  let installment = (downPaymentAmount / (sliderValue * 12)).toFixed(2);
  let recommended = balance * (10 / 100).toFixed(2);
  let piggyBankActive = 5;

  // saved amount is initial deposit
  // per month is installment

  const dispatch = useDispatch();

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleDepositChange = event => {
    setInitialDeposit(event.target.value);
  };

  const handleDownPaymentChange = event => {
    setDownPaymentPercentage(event.target.value);
  };

  const insuranceHandler = () => {
    setInsuranceActivate(!insuranceActivate);
  };

  const BackHandler = () => {
    setSliderValue(10);
    dispatch(updateModalName('Selection'));
  };

  const proceedHandler = async () => {
    if (recommended < installment) {
      dispatch(updateModalName('Warning'));
    } else {
      dispatch(updateModalName('Completed'));
    }
  };

  return (
    <ModalContent pb="20px">
      <ModalHeader>
        <Flex justifyContent="space-between" alignItems="center">
          Assets
          <Button
            bgColor="secondaryBlue"
            color="white"
            variant="solid"
            _hover={{
              bgColor: 'secondaryBlue',
              color: 'white',
            }}
            onClick={BackHandler}
          >
            Back
          </Button>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex gap="30px" direction="column">
          {/* What to save */}
          <Flex direction="column" gap="20px">
            <Text as="b">What are you saving for?</Text>
            <Flex direction="row" justify="space-around">
              <Button
                onClick={() => setAssets('Car')}
                variant="solid"
                colorScheme={asset === 'Car' ? 'blue' : 'gray'}
                width="40%"
              >
                Car
              </Button>
              <Button
                onClick={() => setAssets('House')}
                variant="solid"
                colorScheme={asset === 'House' ? 'blue' : 'gray'}
                width="40%"
              >
                House
              </Button>
            </Flex>
          </Flex>

          {/* How long */}
          <Flex direction="column">
            <Text as="b">How many years do you want to save this for?</Text>
            <Slider
              aria-label="slider-ex-6"
              onChange={val => setSliderValue(val)}
              max={10}
              marginTop="40px"
              min={1}
            >
              <SliderMark
                value={sliderValue}
                textAlign="center"
                borderRadius="20px"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="10"
              >
                {sliderValue}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Flex>

          {/* Price */}
          <Flex direction="column" gap="20px">
            {/* Percentage */}
            <Text as="b">How many % of down payment you want to save up?</Text>
            <InputGroup>
              <InputLeftAddon children="%" />
              <Input
                type="number"
                placeholder="20"
                value={downPaymentPercentage}
                onChange={handleDownPaymentChange}
                min={1}
                // value={downPaymentPercentage}
              />
            </InputGroup>
            {/* How much */}
            <Flex direction="row" gap="20px">
              <Flex
                direction="column"
                gap="20px"
                justifyContent="space-between"
              >
                <Text as="b">How much is the {asset}?</Text>
                <InputGroup>
                  <InputLeftAddon children="RM" />
                  <Input
                    type="number"
                    placeholder="80000"
                    defaultValue={amount}
                    onChange={handleAmountChange}
                  />
                </InputGroup>
              </Flex>

              {/* Initial deposit */}
              <Flex
                direction="column"
                gap="20px"
                justifyContent="space-between"
              >
                <Text as="b">Initial deposit?</Text>
                <InputGroup>
                  <InputLeftAddon children="RM" />
                  <Input
                    type="number"
                    placeholder="5000"
                    defaultValue={initialDesposit}
                    onChange={handleDepositChange}
                  />
                </InputGroup>
              </Flex>
            </Flex>
          </Flex>

          {/* Activate insurance and loan calculator */}
          <Flex direction="column" gap="20px">
            <Flex justify="space-between">
              <Text as="b" fontSize="15px">
                Include RHB loan and insurance calculator
              </Text>
              <Switch
                id="isChecked"
                isChecked={insuranceActivate}
                onChange={insuranceHandler}
              />
            </Flex>
            <Collapse in={insuranceActivate}>
              <Flex justify="space-between" gap="20px" direction="column">
                {/* Insurance */}
                <Flex direction="row" gap="20px">
                  <Flex direction="column" gap="20px">
                    <Text>Insurance</Text>
                    <InputGroup>
                      <InputLeftAddon children="RM" />
                      <Input type="number" defaultValue={500} isDisabled />
                    </InputGroup>
                  </Flex>

                  {/* Loan */}
                  <Flex direction="column" gap="20px">
                    <Text>Loan</Text>
                    <InputGroup>
                      <InputLeftAddon children="%" />
                      <Input type="number" defaultValue={4.5} isDisabled />
                    </InputGroup>
                  </Flex>
                </Flex>
                <Text>
                  This calculator will add in the insurance and loan interest to
                  provide you a closer estimation of the actual assets.
                </Text>
              </Flex>
            </Collapse>
          </Flex>

          {/* Tips */}
          <Flex direction="column">
            <Text as="b" fontSize="15px">
              Important Tips!
            </Text>
            <Text>
              Based on the balance on your account, it is recommended to not
              save more than{' '}
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                RM {recommended}
              </span>{' '}
              for better sustainability.
            </Text>

            {piggyBankActive >= 3 ? (
              <Fragment>
                <Text as="b" fontSize="15px" marginTop="20px">
                  Reminder
                </Text>
                <Text>
                  You currently also have {piggyBankActive} ongoing piggy bank
                  goals to achieve, are you sure you want to proceed?
                </Text>
              </Fragment>
            ) : null}
          </Flex>

          {/* Summary */}
          <Flex direction="column" gap="20px">
            <Flex direction="column">
              <Text as="b" fontSize="15px">
                Summary
              </Text>
              <Text>
                We will help you to save up for{' '}
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'green',
                  }}
                >
                  {downPaymentPercentage}%
                </span>{' '}
                of the down payment for the selected asset.
              </Text>
            </Flex>
            <Flex direction="column" gap="20px">
              <Text>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'green',
                  }}
                >
                  RM {downPaymentAmount}
                </span>{' '}
                is the total down payment.{' '}
                {insuranceActivate ? 'RHB Insurance and loan included.' : ''}
              </Text>

              <Text>
                You have selected {sliderValue} years to achieve your target,
                therefore, you will need to save&nbsp;
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: installment > recommended ? 'red' : 'green',
                  }}
                >
                  RM {installment}
                </span>{' '}
                every month to achieve your goal!
              </Text>
            </Flex>
          </Flex>

          {/* Links */}
          <Flex w="100%" gap="20px" direction="column" fontWeight="bold">
            <Text>Visit RHB Services for more informations!</Text>
            <Flex justify="space-around">
              <Button
                onClick={() => {
                  window.open('https://www.rhbinsurance.com.my/', '_blank');
                }}
                variant="solid"
                bgColor="secondaryBlue"
                color="white"
                _hover={{
                  bgColor: 'secondaryBlue',
                  color: 'white',
                }}
              >
                RHB Insurance
              </Button>
              <Button
                onClick={() => {
                  window.open(
                    'https://www.rhbgroup.com/personal/loans/personal-financing/index.html',
                    '_blank'
                  );
                }}
                variant="solid"
                bgColor="secondaryBlue"
                color="white"
                _hover={{
                  bgColor: 'secondaryBlue',
                  color: 'white',
                }}
              >
                RHB Loan
              </Button>
            </Flex>
          </Flex>

          {/* Confirmation */}
          <Flex direction="column" gap="20px" textAlign="center">
            <Button onClick={proceedHandler}>Proceed</Button>
            <Text
              fontWeight="bold"
              fontStyle="italic"
              color={installment > recommended ? 'red' : 'green'}
            >
              Upon confirmation, RM {installment} will be automatically
              transferred to this piggy bank account at the end of every month.
            </Text>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default AssetsModal;
