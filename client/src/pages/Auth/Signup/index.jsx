import {
  Container,
  Box,
  Text,
  FormLabel,
  Input,
  Button,
  Alert
} from "@chakra-ui/react";
import React from "react";
import { Formik, useFormik } from "formik";
import { fetchLogin } from "../../../api";
import { useQuery } from "react-query";
import validationSchema from "./validation";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: ""
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password
        });
        logIn(registerResponse);
        navigate("/");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    }
  });

  return (
    <Container mt="10" centerContent>
      <Box>
        <Text
          as="h2"
          mb="5"
          textAlign="center"
          fontSize="22"
          fontWeight="bold"
          color="#333"
        >
          Sign Up
        </Text>
        <Box>
          {errors.general && <Alert colorScheme="red">{errors.general}</Alert>}
        </Box>

        <form onSubmit={handleSubmit}>
          <Box mb="5">
            <FormLabel>E-mail</FormLabel>
            <Input onChange={handleChange} type="email" name="email" />
          </Box>
          <Box mb="5">
            <FormLabel>Password</FormLabel>
            <Input onChange={handleChange} type="password" name="password" />
          </Box>
          <Box mb="5">
            <FormLabel>Password Confirm</FormLabel>
            <Input
              onChange={handleChange}
              type="password"
              name="passwordConfirm"
            />
          </Box>
          <Button width="100%" colorScheme="pink" type="submit">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;
