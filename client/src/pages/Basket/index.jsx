import {
  Box,
  Flex,
  Container,
  Image,
  Text,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  useToast
} from "@chakra-ui/react";

import { useBasket } from "../../context/BasketContext";
import { MdCancel } from "react-icons/md";
import { FcEmptyTrash } from "react-icons/fc";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchOrder, postOrder } from "../../api";

function Basket() {
  const [address, setAdress] = useState("");

  const {
    basketItems,
    setBasketItems,
    addToBasket,
    handleIncrease,
    handleDecrease,
    sortedBasketItems
  } = useBasket();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const toast = useToast()

  const handleSubmit = async () => {
    const items = basketItems.map((item) => ({
      amount: item.amount,
      _id: item._id
    }));

    const input = {
      address: address,
      items: JSON.stringify(items)
    };
    onClose()
    try {
      await postOrder(input);
      toast({
        title: `Success`,
        status: "success",
        isClosable: true,
        duration: 1000,
        position: "top"
      });
    } catch (error) {
      toast({
        title: `Error`,
        status: "error",
        isClosable: true,
        duration: 1000,
        position: "top"
      });
    }
  };

  return (
    <>
      {basketItems.length ? (
        <Container p={0} maxW="4xl" my={10} border="1px solid #ccc">
          <Flex
            borderBottom="1px solid #ccc"
            alignItems="center"
            justifyContent="space-between"
            h="60px"
          >
            <Button onClick={onOpen} ms={10}>
              Order
            </Button>
            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Adress</FormLabel>
                    <Textarea
                      resize="none"
                      h="2px"
                      ref={initialRef}
                      placeholder="Adress"
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
                    Send
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              onClick={() => {
                setBasketItems([]);
              }}
              me={10}
              colorScheme="white"
              gap="2px"
            >
              <FcEmptyTrash />
              <Text color="#333" _hover={{ color: "#f00" }}>
                Clear All
              </Text>
            </Button>
          </Flex>
          {sortedBasketItems.map((item, key) => (
            <Flex
              mx="auto"
              key={key}
              p="5"
              borderBottom="1px solid #ccc"
              maxW={700}
              alignItems="center"
              h={200}
            >
              <Link to={`/product/${item._id}`}>
                <Image borderRadius="md" src={item.photos[0]} w={20} h={20} />
              </Link>
              <Flex w="100%" h="70%" justifyContent="space-between" ps={10}>
                <Flex flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Heading as="h2" fontSize={25}>
                      {item.title}
                    </Heading>
                  </Box>
                  <Box>
                    <Flex>
                      <Text me={3} color="red" fontWeight="bold">
                        Price:
                      </Text>
                      {item.price}$
                    </Flex>
                    <Flex>
                      <Text me={3} color="red" fontWeight="bold">
                        Total:
                      </Text>
                      {basketItems.map((data) => {
                        return data._id === item._id
                          ? data.amount * item.price
                          : "";
                      })}
                      $
                    </Flex>
                  </Box>
                </Flex>
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Box onClick={() => addToBasket(item)}>
                    <MdCancel fontSize={25} color="red" cursor="pointer" />
                  </Box>
                  <Flex alignItems="center" gap={5}>
                    <Text>Amount:</Text>
                    <IconButton
                      onClick={() => handleDecrease(item)}
                      icon={<AiOutlineMinus />}
                    />
                    {basketItems.map((data) => {
                      return data._id === item._id ? data.amount : "";
                    })}
                    <IconButton
                      onClick={() => handleIncrease(item)}
                      icon={<AiOutlinePlus />}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Container>
      ) : (
        <Flex mt={50} flexDir="column" alignItems="center">
          <FcEmptyTrash size={200} />
          <Heading as="h2" fontWeight="normal">
            Your basket is empty!
          </Heading>
        </Flex>
      )}
    </>
  );
}

export default Basket;
