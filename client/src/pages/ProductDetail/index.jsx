import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../../api";
import { Box, Center, Button, Flex, Badge, Text } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../context/BasketContext";

function ProductDetail() {
  const { productId } = useParams();
  const { addToBasket, findBasketItem } = useBasket();

  const { isLoading, error, data } = useQuery(["product", productId], () =>
    fetchProductDetail(productId)
  );

  if (isLoading) return "Loading...";

  if (error) return `error ${error.message}`;

  const images = data.photos.map((item) => {
    return { original: item };
  });

  return (
    <Center mt={5}>
      <Box p="2">
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
        />
        {/* <Image borderRadius="md" w={"3xs"} src={data.photos[0]} /> */}
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
          {data.title}
        </Text>
        <Text mt={2}>${data.price}</Text>
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            {moment(data.createdAt).format("DD/MM/YYYY")}
          </Text>
        </Flex>
        <Button
          onClick={() => addToBasket(data)}
          mt={2}
          colorScheme={findBasketItem(data) ? "red" : "green"}
        >
          {findBasketItem(data) ? "Remove to Basket" : "Add to Basket"}
        </Button>
      </Box>
    </Center>
  );
}

export default ProductDetail;
