import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  Heading,
  useToast
} from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import { createProduct, fetchProductDetail, updateProduct } from "../../../api";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useParams } from "react-router-dom";

function ProductUpdate() {
  const { product_id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    ["admin:products", product_id],
    () => fetchProductDetail(product_id)
  );

  const toast = useToast();

  if (isLoading) return "Loading...";

  if (error) return `error ${error.message}`;

  return (
    <Flex flexDir="column" width="100%" maxW="700px" mt={15} gap={5}>
      <Heading fontSize="2xl" color="green">
        Add new product
      </Heading>
      <Formik
        initialValues={{
          title: data.title,
          price: data.price,
          description: data.description,
          photos: data.photos
        }}
        onSubmit={async (values) => {
          try {
            await updateProduct(product_id, values)
            toast({
              title: `Updated`,
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
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Flex flexDir="column" gap="10px">
                <Box>
                  <FormLabel>Title</FormLabel>
                  <Input
                    onChange={handleChange}
                    placeholder="Title"
                    name="title"
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </Box>

                <Box>
                  <FormLabel>Description</FormLabel>
                  <Input
                    onChange={handleChange}
                    placeholder="description"
                    name="description"
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                </Box>

                <Box>
                  <FormLabel>Price</FormLabel>
                  <Input
                    onChange={handleChange}
                    placeholder="price"
                    name="price"
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </Box>

                <Box>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <Flex flexDir="column" gap="10px">
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <Flex gap={3} key={index}>
                              <Input
                                name={`photos.${index}`}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                value={photo}
                                placeholder="Please add a photo link"
                                onBlur={handleBlur}
                              />
                              <Button
                                colorScheme="red"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                            </Flex>
                          ))}
                        <Button
                          colorScheme="facebook"
                          w="200px"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Photo
                        </Button>
                      </Flex>
                    )}
                  />
                </Box>

                <Button colorScheme="green" type="submit">
                  Update
                </Button>
              </Flex>
            </FormControl>
          </form>
        )}
      </Formik>
    </Flex>
  );
}

export default ProductUpdate;
