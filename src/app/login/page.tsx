'use client'

import { auth } from '../../config/firebase'
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
  useToast,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

const Login:FC<any> = () => {
    const route = useRouter()
    const [email,  setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()

    const signIn = async() => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
             console.log(res)
             if(res){
                toast({
                    title: 'Success',
                    description: "you have successfully logged in",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })
                console.log('psuh')
                route.push('/')

             }
        } catch (error: any) {
            console.error(error.message)
        }
    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={signIn}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login