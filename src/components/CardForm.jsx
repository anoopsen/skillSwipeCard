import React, { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Container,
  Box,
  Typography,
  Dialog,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CardList from "./CardList";

const CardForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleAddImage = () => setImages([...images, ""]);
  const handleAddVideo = () => setVideos([...videos, ""]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleVideoChange = (index, value) => {
    const newVideos = [...videos];
    newVideos[index] = value;
    setVideos(newVideos);
  };

  const handleRemoveImage = (index) =>
    setImages(images.filter((_, i) => i !== index));
  const handleRemoveVideo = (index) =>
    setVideos(videos.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, images, videos });
    setText("");
    setImages([]);
    setVideos([]);
  };

  const handleOpen = () => {
    fetch("http://localhost:5000/api/cards")
      .then((response) => response.json())
      .then((data) => {
        setPreviewData(data);
        setOpen(true);
      })
      .catch((error) => console.error("Error fetching preview data:", error));
  };

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Create a New Card</Typography>
        <TextField
          label="Text"
          fullWidth
          margin="normal"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{width:'94%'}}
          InputProps={{ classes: { root: "textfieldcreate" } }}
        />
        <Typography variant="subtitle1">Images:</Typography>
        {images.map((image, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              label={`Image ${index + 1}`}
              fullWidth
              margin="normal"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
            <IconButton onClick={() => handleRemoveImage(index)}>
              <Remove />
            </IconButton>
          </Box>
        ))}
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddImage}
            style={{marginRight:'6%'}}
          >
            Add Image
          </Button>
        </Box>
        <Typography variant="subtitle1">Videos:</Typography>
        {videos.map((video, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              label={`Video ${index + 1}`}
              fullWidth
              margin="normal"
              value={video}
              onChange={(e) => handleVideoChange(index, e.target.value)}
            />
            <IconButton onClick={() => handleRemoveVideo(index)}>
              <Remove />
            </IconButton>
          </Box>
        ))}
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddVideo}
            style={{marginRight:'6%'}}

          >
            Add Video
          </Button>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={handleOpen}>
            Preview
          </Button>
          <Button variant="contained" color="primary" type="submit"
            style={{marginRight:'6%',width:'138px'}}
          
          >
            Save Card
          </Button>
        </Box>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        style={{
          "& .MuiPaper-root-MuiDialog-paper": {
            width: "100% !important",
            maxWidth: "1280px",
          },
        }}
      >
        <Container
          maxWidth="lg"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {previewData ? (
            <CardList cards={previewData} />
          ) : (
            <Typography variant="body1">Loading preview...</Typography>
          )}
        </Container>
      </Dialog>
    </Container>
  );
};

export default CardForm;
