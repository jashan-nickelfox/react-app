import React, { useState } from 'react';
import { searchUnsplashImages } from '../utils/unsplashApi';
import { Box, TextField, Button, Grid, Typography, Card, CardMedia } from '@mui/material';

export default function Gallery() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) {
      const fetchedImages = await searchUnsplashImages(query);
      setImages(fetchedImages);
    }
  };

  return (
    <Box sx={{backgroundColor:'whitesmoke'}}> 
    <Box p={4}>
        <Box display= "flex" justifyContent="center">
        <Typography variant="h4" gutterBottom>
            Image Searcher
        </Typography>
        </Box>
      <Box display="flex" gap={2} mb={4}>
        <TextField
          variant="outlined"
          label="Search for images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image.urls.small}
                alt={image.alt_description || 'Unsplash Image'}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
}
