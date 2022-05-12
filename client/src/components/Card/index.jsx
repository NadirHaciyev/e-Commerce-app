import {
  Box,
  Button,
  Text,
  Flex,
  Center,
  Image,
  Badge
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../context/BasketContext";

function Card({ item }) {
  const { addToBasket, findBasketItem } = useBasket();

  return (
    <Box p="5" maxW="300px" border="1px solid #ccc">
      <Link to={`/product/${item._id}`}>
        <Image borderRadius="md" src={item.photos[0]} w="220px" h='200px' />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {item.title}
        </Text>
        <Text mt={2}>${item.price}</Text>
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Text>
        </Flex>
      </Link>
      <Button onClick={() => addToBasket(item)} mt={2} colorScheme={
        findBasketItem(item) ? 'red' : 'green'
      }>
        {findBasketItem(item) ? "Remove to Basket" : "Add to Basket"}
      </Button>
    </Box>
  );
}

export default Card;
