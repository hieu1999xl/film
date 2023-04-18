import React, { FunctionComponent, useState, useEffect } from "react";
import { Grid, Button, Paper } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import styles from "../styles/Home.module.scss";
import { useGetMovie } from "../services/movies";
import Container from '@mui/material/Container';
import { Movie } from "../constants/models/Movies";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  FormControl,
  InputAdornment,
  TextField,
  createStyles,
  Box
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";


export default function Home() {
  const [movies, setMovies] = React.useState([])
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchValue, setSearchValue] = useState("")
  const [valueFilm, setValue] = useState<any>()
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchValue(event.target.value)
  };
  useEffect(() => {
    const newPacientes = movies && movies.filter((value: any) => value.name.toLowerCase().includes(searchValue.toLowerCase()))
    setValue(newPacientes)
  }, [searchValue])
  const getData = () => {
    setIsLoading(true)
    useGetMovie().then((res: any)=> {
      setValue(res.data.data)
      setMovies(res.data.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log('err', err);
    })
  }

  React.useEffect(() => {
    getData()
  }, [])

  const handleClick = (): void => {
    // TODO: Clear the search input
    setSearchValue('')
    console.log("clicked the clear icon...");
  };
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://files.betacorp.vn/files/ecm/2023/04/04/untitled-2-163409-040423-38.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://files.betacorp.vn/files/ecm/2023/04/03/1702x621-103531-030423-25.jpg",
    },
  ];
  const RenderMoviesList = () => {
  
    if (valueFilm) {
      return valueFilm && valueFilm.map((movie: any) => (
        <Grid item xs={12} md={3} key={movie.id}>
          <Link href={`/details/${movie.id}`}>
            <div>
              <img src={movie.img} alt="site logo" width={250} height={375} />
              <div className={styles.movieTitle}> {movie.name} </div>
              <div className={styles.movieLanguage}> {movie.language} </div>
            </div>
          </Link>
        </Grid>
      ));
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
          <img width={'100%'} height={'auto'} key={item.name} src={item.image}/>
        ))}
      </Carousel>
      <Container>
        <h1 className={styles.title}>Recommended Movies</h1>
        <Box sx={{ justifyContent: 'left', display: 'flex', paddingBottom: '16px' }}>
            <FormControl>
              <TextField
                size="small"
                variant="outlined"
                onChange={(e:any) => handleChange(e)}
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
      </Container>
    </>
  );
}