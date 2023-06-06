import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, TextField, Typography,Fab } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import {
  StyledBox, StyledContainer, StyledDragAndDrop, StyledCreateButton,
  StyledTextFiels, StyledForm, StyledDragAndDropContainer,
  EmojiPickerContainer,StyledImage
} from './Styles'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';

import EmojiPicker from "emoji-picker-react";


const CreatePost = () => {
  const initialState = {
    title: "",
    discription: "",
    tags: '',
    selectedFile: ""
  }
  const [formData, setformData] = useState(initialState)
  const [pickerOpen, setPickerOpen] = useState({ isopen: false, name: '' })
  const [clear, setClear] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleEmoji = (emoji) => {
    console.log(pickerOpen)
    console.log(emoji)
    setformData({
      ...formData,
      [pickerOpen.name]: `${formData[pickerOpen.name]} ${emoji}`
    })

  }

  const handleClear = () => {
    setformData(initialState)
    setClear(true)
  }

  return (
    <StyledBox component='div'>
      <StyledContainer component='div'>


        <StyledForm onSubmit={handleSubmit}>

          <DragAndDrop
            setformData={setformData}
            formData={formData}
            setClear={setClear}
            clear={clear}
          />


          <StyledTextFiels component='div' >
            {/* <StyledCreateButton > */}

            {/* </StyledCreateButton> */}

            <Box >
              <TextField
                label='Title'
                name="title"
                value={formData.title}
                variant='standard'
                sx={{ paddingBottom: 3, width: '80%' }}
                onChange={handleChange}
              />
              <IconButton onClick={() => setPickerOpen({ isopen: !pickerOpen.isopen, name: 'title' })}>
                <EmojiEmotionsIcon color='secondary' />
              </IconButton>
            </Box>

            <Box>
              <TextField
                label='Discription'
                name="discription"
                variant='standard'
                value={formData.discription}
                multiline
                rows={4}
                sx={{ paddingBottom: 3, width: '80%' }}
                onChange={handleChange}
              />
              <IconButton onClick={() => setPickerOpen({ isopen: !pickerOpen.isopen, name: 'discription' })}>
                <EmojiEmotionsIcon color='secondary' />
              </IconButton>
            </Box>

            <TextField
              label='Tags'
              tags='tags'
              name="tags"
              variant='standard'
              value={formData.tags}
              sx={{ paddingBottom: 3, width: '80%' }}
              onChange={handleChange}
            />


            <Button
              variant='contained'
              color='error'
              size='small'
              onClick={handleSubmit}
              sx={{ width: "80%", marginBottom: 2, marginTop: 2 }}
            >
              Add post
            </Button>

            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleClear}
              sx={{ width: "80%", }}
            >
              clear
            </Button>

            {pickerOpen.isopen && <EmojiPickerContainer>
              <Fab 
                size="medium" 
                color="secondary" 
                sx={{display:{xs:'flex', md:'none'}, marginBottom:1}}
                onClick={() => setPickerOpen({ isopen: !pickerOpen.isopen, name: '' })}
                >
                <CloseIcon />
              </Fab>
              <EmojiPicker
                onEmojiClick={({ emoji }) => handleEmoji(emoji)}
              />
            </EmojiPickerContainer>}

          </StyledTextFiels>

        </StyledForm>
      </StyledContainer >
    </StyledBox >

  )
}



const DragAndDrop = ({ setformData, formData, setClear, clear }) => {
  const [imageforPreview, setImageforPreview] = useState(null)

  useEffect(() => {
    if (clear) {
      setImageforPreview(null)
      setClear(false)
    }
  }, [clear])

  const convertToBase64 = (file) => {
    setImageforPreview(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onloadend = () => {
      setformData({ ...formData, 'selectedFile': reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    file && convertToBase64(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    file && convertToBase64(file)
  }

  return (
    <StyledDragAndDropContainer component='div'>

      <StyledDragAndDrop >
        {imageforPreview
          ? (
            <StyledImage
              src={imageforPreview}
            />
          )

          : (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              component='div'
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label htmlFor='imageUpload' >
                <AddPhotoAlternateIcon fontSize='large' color='secondary' />
              </label>
              <Typography variant='p' sx={{display:{xs:'none',sm:'flex'}}}>Click or Drag and drop here</Typography>
              <Typography variant='p' sx={{display:{xs:'flex',sm:'none'}}}>Seclect Image</Typography>

              <input
                id="imageUpload"
                type='file'
                accept='image/*'
                onChange={handleImage}
                style={{ display: 'none' }}
              />
            </Box>
          )
        }

      </StyledDragAndDrop>

    </StyledDragAndDropContainer>
  )
}



export default CreatePost