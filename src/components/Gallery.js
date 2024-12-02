import React, { useState, useEffect } from "react";
import { searchUnsplashImages } from "../utils/unsplashApi";
import {
  Box,TextField,Button,Grid,Typography,Card,CardMedia,useTheme,} from "@mui/material";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const itemsPerPage = 12;

  const fetchImages = async () => {
    if (query.trim()) {
      setIsLoading(true);
      const fetchedImages = await searchUnsplashImages(query, currentPage, itemsPerPage);
      setImages(fetchedImages.results);
      setTotalPages(Math.ceil(fetchedImages.total / itemsPerPage));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      fetchImages();
    }
  }, [query, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchImages();
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "15vh",
        color: theme.palette.text.primary,
      }}
    >
      <Box p={4}>
        <Box display="flex" justifyContent="center">
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            Search
          </Button>
        </Box>

        {isLoading && <Typography>Loading...</Typography>}

        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card
                sx={{
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.urls.small}
                  alt={image.alt_description || "Unsplash Image"}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography sx={{ mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
