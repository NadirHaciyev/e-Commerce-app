import React from 'react'
import { useAuth } from '../../context/Auth'
import { Heading, UnorderedList, ListItem, Container } from '@chakra-ui/react'

function Profile() {
  const { user } = useAuth()
  return (
    <Container maxW="7xl">
      <Heading>User information</Heading>
      <UnorderedList>
        <ListItem>Role - {user?.role}</ListItem>
        <ListItem>ID - {user?._id}</ListItem>
        <ListItem>Email - {user?.email}</ListItem>
      </UnorderedList>
    </Container>
  )
}

export default Profile