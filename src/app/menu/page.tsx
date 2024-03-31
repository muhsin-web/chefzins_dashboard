'use client'
import { Avatar, AvatarBadge, Box, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useEffect, useState } from 'react'
import { BiEditAlt, BiPlus } from 'react-icons/bi'
import {db} from '../../config/firebase'
import {getDocs, collection, doc, deleteDoc} from 'firebase/firestore'
import { DeleteIcon } from '@chakra-ui/icons'

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const addref = useRef(null)
  const editref = useRef(null)
  const router = useRouter()
  const [menu, setMenu] = useState<any>([])
  const [deleting, setDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState(0)
  const [editDish, setEditDish] = useState<any>()

  const menuRef = collection(db, "dish")

  const getMenu = async () => {
    try {
      const data = await getDocs(menuRef)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      console.log(filteredData)
      setMenu(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMenu()
  }, [])

  const deleteDish = async(id:any) => {
    setDeletingId(id)
    setDeleting(true)
    try {
      const menuDoc = doc(db, "dish", id)
      const res = await deleteDoc(menuDoc)
      setDeleting(false)
      getMenu()
    } catch (error) {
      console.log(error)
    }finally{
      setDeleting(false)
    }
  }

  const handleEditDish = (dish:any) => {
    setEditDish(dish)
    onOpen()
  }
  
  return (
    <>
    <Heading mb={50}>All Dishes</Heading>
    <Flex justifyContent={'flex-end'} mb={50}>
      <Box>
        <Button ref={addref} onClick={()=>router.push('/add-menu')} background={'black'} color={'#fff'}>Add Dish <BiPlus /></Button>
      </Box>
    </Flex>
      <TableContainer>
        <Table variant='striped' colorScheme='GRAY'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Dishes</Th>
              <Th>Image</Th>
              <Th>Price (NGN)</Th>
              <Th>Desc</Th>
              <Th>Sales (NGN)</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              menu.length > 0 && menu.map((dish:any, index:number) => {
                const {id, desc, dish_img, dish_name, more_desc, price, sales} = dish
                return (
                  <Tr key={id}>
                    <Td>{index + 1}</Td>
                    <Td>{dish_name}</Td>
                    <Td>millimetres (mm)</Td>
                    <Td>{price}</Td>
                    <Td>{desc}</Td>
                    <Td>{sales}</Td>
                    <Td ref={editref}>
                      <Flex>
                        <Button onClick={() => handleEditDish(dish)}><BiEditAlt /></Button>
                        <Button onClick={()=>deleteDish(id)}>{deleting && deletingId == id ? <Spinner /> : <DeleteIcon color={'red'} />}</Button>
                      </Flex>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
          {/* {
              menu.length == 0 && (
                <Box>
                  <Text>YOU CURRENTLY HAVE NO DISH, ADD A DISH</Text>
                </Box>
              )
            } */}
        </Table>
      </TableContainer>

      <Modal finalFocusRef={addref} size={'3xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Dish</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image src={''} alt='product dish' />
            </Center>

            <FormControl>
              <FormLabel>Dish name</FormLabel>
              <Input value={editDish?.dish_name} type='text' placeholder='Dish name' />
            </FormControl>

            <FormControl>
              <FormLabel>Desc</FormLabel>
              <Input value={editDish?.desc} placeholder='Dish name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>more Desc</FormLabel>
              <Input value={editDish?.more_desc} placeholder='Dish description' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input value={editDish?.price} type='number' placeholder='Enter your price' />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Page