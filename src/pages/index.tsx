import React, { FunctionComponent, useState, useEffect, Fragment } from "react";
import { Grid, Button, Paper } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import styles from "../styles/Home.module.scss";
import { useGetMovie } from "../services/movies";
import Container from "@mui/material/Container";
import { Movie } from "../constants/models/Movies";
import Image from "next/image";
import { useRouter } from "next/router";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  FormControl,
  InputAdornment,
  TextField,
  createStyles,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function Home() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleVisible);
  }

  const [movies, setMovies] = React.useState<any>([]);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const [valueFilm, setValue] = useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    const newPacientes =
      movies &&
      movies.filter((value: any) =>
        value.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    setValue(newPacientes);
  }, [searchValue]);
  const getData = () => {
    setIsLoading(true);
    useGetMovie()
      .then((res: any) => {
        setValue(res.data.data);
        setMovies(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleClick = (): void => {
    // TODO: Clear the search input
    setSearchValue("");
    console.log("clicked the clear icon...");
  };
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://assets-prd.ignimgs.com/2022/12/20/biggestmoviesin2023-yt-1671570902006.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7229d393-c3b8-4703-a41e-e876546d2612/dfpzzwa-06cfc6f0-84e7-4cc4-9b21-94673c86ce73.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyMjlkMzkzLWMzYjgtNDcwMy1hNDFlLWU4NzY1NDZkMjYxMlwvZGZwenp3YS0wNmNmYzZmMC04NGU3LTRjYzQtOWIyMS05NDY3M2M4NmNlNzMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.u25-PnB_M6LoWhKs2d428nPdKqLAK2RHOXfZ6jE-KVU",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ntxvxqzsjq-landscape.jpg",
    },
  ];

  const RenderMoviesHotList = () => {
    if (movies) {
      return (
        movies &&
        movies
          .filter((i: any) => i.type === "hot")
          .slice(0, 4)
          .map((movie: any) => (
            <Grid item xs={12} md={6} lg={3} key={movie.id}>
              <Link href={`/details/${movie.id}`}>
                <div>
                  <img
                    src={movie.img}
                    alt="site logo"
                    width="100%"
                    height={375}
                  />
                  <div className={styles.movieTitle}> {movie.name} </div>
                  <div className={styles.movieLanguage}> {movie.language} </div>
                </div>
              </Link>
            </Grid>
          ))
      );
    } else if (isLoading) {
      return <>Loading Movies...</>;
    } else {
      return <>No Movies To Watch...</>;
    }
  };

  const RenderMoviesListNews = () => {
    if (movies) {
      return (
        movies &&
        movies
          .filter((i: any) => i.type === "news")
          .slice(0, 4)
          .map((movie: any) => (
            <Grid item xs={12} md={6} lg={3} key={movie.id}>
              <Link href={`/details/${movie.id}`}>
                <div>
                  <img
                    src={movie.img}
                    alt="site logo"
                    width="100%"
                    height={375}
                  />
                  <div className={styles.movieTitle}> {movie.name} </div>
                  <div className={styles.movieLanguage}> {movie.language} </div>
                </div>
              </Link>
            </Grid>
          ))
      );
    } else if (isLoading) {
      return <>Loading Movies...</>;
    } else {
      return <>No Movies To Watch...</>;
    }
  };

  const RenderMoviesList = () => {
    if (valueFilm) {
      return (
        valueFilm &&
        valueFilm.map((movie: any) => (
          <Grid item xs={12} md={6} lg={3} key={movie.id}>
            <Link href={`/details/${movie.id}`}>
              <div className="box_film">
                <img src={movie.img} alt="site logo" width={250} height={375} />
                <div className={styles.movieTitle}> {movie.name} </div>
                <div className={styles.movieLanguage}> {movie.language} </div>
              </div>
            </Link>
          </Grid>
        ))
      );
    } else if (isLoading) {
      return <>Loading Movies...</>;
    } else {
      return <>No Movies To Watch...</>;
    }
  };

  return (
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>
      <Carousel>
        {items.map((item, i) => (
          <img
            width={"100%"}
            height={"auto"}
            className="banner_img"
            key={item.name}
            src={item.image}
          />
        ))}
      </Carousel>
      <Container>
        <h1 className={styles.title}>Recommended Movies</h1>
        <Box
          sx={{
            justifyContent: "left",
            display: "flex",
            paddingBottom: "16px",
          }}
        >
          <FormControl>
            <TextField
              size="small"
              variant="outlined"
              onChange={(e: any) => handleChange(e)}
              value={searchValue}
              placeholder="Search Film"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Grid container spacing={2}>
          <RenderMoviesList />
        </Grid>
        <Box sx={{ paddingTop: "40px" }}>
          <h1 className={styles.title}>Special Movie</h1>
        </Box>
        <Grid container spacing={2}>
          <RenderMoviesHotList />
        </Grid>
        <Box sx={{ paddingTop: "40px" }}>
          <h1 className={styles.title}>New Movie In Theaters</h1>
        </Box>
        <Grid container spacing={2}>
          <RenderMoviesListNews />
        </Grid>
        <Box className="box_top">
        <Button variant="contained"  onClick={scrollToTop} className="button_up">
          <ArrowUpwardIcon
            style={{ display: visible ? "inline" : "none", color: 'white' }}
          />
        </Button>
        </Box>
      </Container>
      
    </>
  );
}
