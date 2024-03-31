"use client"
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, useToast } from '@chakra-ui/react'
import { db } from '../../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useState } from 'react'
import {storage} from '../../config/firebase'
import {ref, uploadBytes} from 'firebase/storage' 
import {v4} from 'uuid'

const page = () => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [sales, setSales] = useState('')
    const [moreDesc, setMoreDesc] = useState('')
    const [img, setImg] = useState<any>()
    const [file, setFile] = useState<any>()
    const [uploading, setUploading] = useState(false)

    const dishCollectionRef = collection(db, 'dish');
    const toast = useToast()

    const handleFile = (e:any) => {
        console.log(img)
        setUploading(true)
        if(img === null) return
        const uploadRef = ref(storage, `images/${img?.name + v4()}`)
        uploadBytes(uploadRef, img).then((val:any) => {
            setFile(val.metadata.name)
            setUploading(false)
            console.log(val.metadata)
        }).catch((err) => console.log(err)).finally(() => {
            setUploading(false)
        })
    }

    const addDish = async () => {
        setLoading(true)
        if(!setFile) return
        try {
            const res = await addDoc(dishCollectionRef, {desc, dish_img: file, dish_name: name, more_desc: moreDesc, price, sales})
            if(res){
                setLoading(false)
                setName('')
                setDesc('')
                setPrice('')
                setSales('')
                setMoreDesc('')
                toast({
                    description: 'Dish has been added',
                    colorScheme: 'black',
                    title: 'sucess',
                    duration: 3000,
                    status: 'success',
                    isClosable:true,
                    position: 'top'
                })
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <Box>
        <Heading>Add a new Dish to the menu</Heading>

        <Flex>
            <Box flex={1}>
                <FormControl mt={10} id="password">
                    <FormLabel>Dish Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} height={50} backgroundColor={'#fff'} type="text" />
                </FormControl>

                <FormControl mt={5} id="dessc">
                    <FormLabel>Description</FormLabel>
                    <Input value={desc} onChange={(e) => setDesc(e.target.value)} height={50} backgroundColor={'#fff'} type="text" />
                </FormControl>

                <Flex gap={5} mt={5}>
                    <FormControl id="price">
                        <FormLabel>Price</FormLabel>
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} height={50} backgroundColor={'#fff'} type="number" />
                    </FormControl>

                    <FormControl id="price">
                        <FormLabel>Sales % price</FormLabel>
                        <Input value={sales} onChange={(e) => setSales(e.target.value)} height={50} backgroundColor={'#fff'} type="number" />
                    </FormControl>
                </Flex>

                <FormControl mt={5} id="desc">
                    <FormLabel>More description</FormLabel>
                    <Input value={moreDesc} onChange={(e) => setMoreDesc(e.target.value)} height={50} backgroundColor={'#fff'} type="text" />
                </FormControl>

                <Flex>
                    <FormControl mt={5} id="file">
                        <FormLabel>Add a Photo</FormLabel>
                        <Input onChange={(e:any)=>setImg(e.target.files[0])} height={50} backgroundColor={'#fff'} type="file" />
                    </FormControl>

                    <Button onClick={handleFile}>{uploading ? <Spinner /> : 'Upload'}</Button>
                </Flex>

                <Button isDisabled={loading && uploading} onClick={addDish} backgroundColor={'#000'} width={'100%'} height={14} mt={10} color={'#fff'}>{loading ? <Spinner /> : 'Add Dish'}</Button>
            </Box>
            <Box flex={1}>

            </Box>
        </Flex>
    </Box>
  )
}

export default page