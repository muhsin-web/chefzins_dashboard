'use client'

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {db} from  '../../config/firebase'
import {getDocs, addDoc, collection, doc, deleteDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'


export default function page() {
  const [priceList, setPriceList] = useState<any>([]) 
  const [feature, setfeature] = useState<any>([])
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [value, setValue] = useState('')

  const priceListRef = collection(db, 'price_list')

  const toast = useToast()

  const getPrice = async () => {
    try {
      const data = await getDocs(priceListRef)
      const filterData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setPriceList(filterData)
      console.log(filterData)
      getPrice()
    } catch (error) {
      console.log(error)
    }
  }

  const addPrice = async () => {
    if(!price || !type){
      toast({
        status: 'error',
        title: 'error',
        description: 'Fill required inputs',
        position: 'top'
      })
      return
    }

    if(feature.length == 0){
      toast({
        status: 'error',
        title: 'error',
        description: 'Fill required inputs',
        position: 'top'
      })
      return
    }

    if(priceList.length == 3){
      toast({
        status: 'error',
        title: 'error',
        description: 'All prices has been added',
        position: 'top'
      })
      return
    }
    try {
      const res = await addDoc(priceListRef, {features: feature, price, type})
      if(res){
        toast({
          status: 'success',
          title: 'Success',
          description: 'Price List has been added',
          position: 'top'
        })

        getPrice()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addFeature = (e:any) => {
    setfeature((feature:any) => ([...feature, value]))
    setValue('')
  }

  const deletePriceList = async (id:any) => {
    try {
      const priceListDoc = doc(db, 'price_list', id)
      await deleteDoc(priceListDoc)
      toast({
        status: 'error',
        title: 'Success',
        description: 'Price List has been removed',
        position: 'top'
      })

    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getPrice()
  },[])
  console.log(feature, type)

  return (
    <Flex gap={10}>
     {
      priceList.length > 0 && (
        <Flex  flex={2} justifyContent={'center'} gap={5} py={6}>
        {
          priceList.map((prices:any, index:number) => {
            const {id, features, price, type} = prices
            return(
              <Box
              key={index}
              flex={1}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
                <Flex justify={'space-between'}>
                <Button><EditIcon /></Button>
                <Button onClick={() => deletePriceList(id)}><DeleteIcon color={'red'} /></Button>
                </Flex>
              <Stack
                textAlign={'center'}
                p={6}
                color={useColorModeValue('gray.800', 'white')}
                align={'center'}>
                <Text
                  fontSize={'sm'}
                  fontWeight={500}
                  bg={useColorModeValue('green.50', 'green.900')}
                  p={2}
                  px={3}
                  color={'green.500'}
                  rounded={'full'}>
                  {type}
                </Text>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                  <Text fontSize={'3xl'}>NGN</Text>
                  <Text fontSize={'6xl'} fontWeight={800}>
                    {price}
                  </Text>
                  <Text color={'gray.500'}>/month</Text>
                </Stack>
              </Stack>
      
              <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                <List spacing={3}>
                  {
                    features.map((fea: any, index: number) => {
                      return(
                        <ListItem key={index}>
                          <ListIcon as={CheckIcon} color="green.400" />
                          {fea}
                        </ListItem>
                      )
                    })
                  }
                </List>
              </Box>
            </Box>
            )
          })
        }
        </Flex>
      )
     }
     {
      priceList.length === 0 && (
        <Text textAlign={'center'} fontSize={32} flex={2}>No Price List has been added</Text>
      )
     }

      <Box flex={1} marginX={'auto'}>
        <FormControl mb={5} id="firstName" isRequired>
          <FormLabel>Price</FormLabel>
          <Select onChange={(e)=>setType(e.target.value)} backgroundColor={'#fff'} placeholder='Select option'>
            <option value='chefmen'>Chefme</option>
            <option value='amonth'>chef a month</option>
            <option value='event'>Chef for event</option>
          </Select>
        </FormControl>

        <FormControl mb={5} id="firstName" isRequired>
          <FormLabel>Price</FormLabel>
          <Input onChange={(e) => setPrice(e.target.value)} backgroundColor={'#fff'} type="number" />
        </FormControl>

        <Flex align={'center'}>
          <FormControl mb={5} id="firstName" isRequired>
            <FormLabel>Features</FormLabel>
            <Input value={value} onChange={(e) => setValue(e.target.value)} backgroundColor={'#fff'} type="text" />
          </FormControl>
          <Button onClick={addFeature}>Add</Button>
        </Flex>

        <Flex gap={5}>
          {
            feature.length > 0 && feature.map((item: string) => (
              <Text>{item}</Text>
            ))
          }
        </Flex>
        <Button onClick={addPrice} backgroundColor={'#000'} color={'#fff'} height={14} width={'100%'}>Submit</Button>
      </Box>
    </Flex>
  )
}