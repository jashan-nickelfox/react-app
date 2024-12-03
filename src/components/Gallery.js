import React, { useState, useEffect } from "react";
import { searchUnsplashImages } from "../utils/unsplashApi";
import { Box, TextField, Button, Grid, Typography, Card, CardMedia, Alert, CircularProgress, useTheme } from "@mui/material";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageInput, setPageInput] = useState("");

  const theme = useTheme();
  const itemsPerPage = 20;

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedImages = await searchUnsplashImages(query, currentPage, itemsPerPage);

      if (fetchedImages.results.length === 0) {
        setError("No results found for your query. Try a different search term.");
        setImages([]);
      } else {
        setImages(fetchedImages.results);
        setTotalPages(Math.ceil(fetchedImages.total / itemsPerPage));
      }
    } catch (err) {
      console.error("Error fetching Unsplash images:", err);
      setError("An error occurred while fetching images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Search query cannot be empty.");
      return;
    }
    setCurrentPage(1);
    setPageInput("");
    fetchImages();
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      setError(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
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

  useEffect(() => {
    if (query.trim()) {
      fetchImages();
    }
  }, [currentPage]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "10vh",
        color: theme.palette.text.primary,
      }}
    >
      <Box p={4}>
        <Box display="flex" justifyContent="center" mb={2}>
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
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {isLoading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

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

        {images.length > 0 && (
          <Box display="flex" justifyContent="center" mt={4} gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
            >
              Previous
            </Button>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Page:</Typography>
              <TextField
                variant="outlined"
                size="small"
                value={pageInput}
                onChange={handlePageInputChange}
                placeholder={`${currentPage}`}
                sx={{ width: "100px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePageInputSubmit}
                disabled={isLoading}
              >
                Go
              </Button>
            </Box >
            <Box justifyContent="center" marginTop="8px" >
              <Typography sx={{ mx: 2 }}>
                {currentPage} of {totalPages}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
