'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  HStack,
  InputRightElement,
} from '@chakra-ui/react'
import { auth } from '../../config/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import Link from 'next/link'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Signup() {
    const [email,  setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const signUp = async() => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
             console.log(res)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    console.log(email, password)

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Welcome to chefzin
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              onClick={signUp}
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user? <Link href={'/login'} color={'blue.400'}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>

  )
}