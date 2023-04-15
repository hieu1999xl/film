import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Container, Box } from "@mui/material";
import { useGetMovies } from "../../services/movies";
import { Movie } from "../../constants/models/Movies";
import styles from "./Details.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { useContext, useEffect } from "react";

const Details = () => {
  const { movies, isLoading, isError } = useGetMovies();
  const router = useRouter();
  const { id }: any = router.query;
  const movie = movies && movies?.find((mov: any) => mov.id === parseInt(id));

  const RenderBookTicketsButton = () => {
    return (
      <Link href={`/seats/${movie?.id}`}>
        <div className={styles.paymentButtonContainer}>
          <Button
            variant="contained"
            href="#contained-buttons"
            className={styles.paymentButton}
          >
            Book Ticket
          </Button>
        </div>
      </Link>
    );
  };

  const RenderCustomizeRowsButton = () => {
    return (
      <Link href={`/customize/${movie?.id}`}>
        <div className={styles.paymentButtonContainer}>
          <Button
            variant="contained"
            href="#contained-buttons"
            className={styles.paymentButton}
          >
            Customize Row
          </Button>
        </div>
      </Link>
    );
  };

  const RenderMoviesList = () => {
    if (movies) {
      return movies && movies.slice(0, 4).map((movie: any) => (
        <Grid item xs={12} md={3} key={movie.id}>
          <Link href={`/details/${movie.id}`}>
            <div>
              <img src={movie.img} alt="site logo" width='100%' height={375} />
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

  if (!movie) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>{movie.name}</title>
      </Head>
      <Container sx={{paddingTop: '40px'}}>
        <Grid container spacing={2}>
          <Grid item>
            <img src={movie.img} width={250} height={375} />
          </Grid>
          <Grid item xs={12} ml={4} sm>
            <h1 className={styles.titleFilm}>{movie.name}</h1>
            <ul className={styles.listFilm}>
              <li className={styles.listFilmItem}>Type:<p className={styles.listFilmItemContent}>{movie.type}</p></li>
              <li className={styles.listFilmItem}>synopsis:<p className={styles.listFilmItemContent}>{movie.synopsis}</p></li>
              <li className={styles.listFilmItem}>Run Times:<p className={styles.listFilmItemContent}>{movie.runtimes}</p></li>
              <li className={styles.listFilmItem}><p>Ticket Cost: {movie.ticketCost}</p></li>
            </ul>
            <RenderBookTicketsButton />
          </Grid>
        </Grid>
        <Box sx={{paddingTop: '40px'}}><h3 className={styles.title}>Recommended Movies</h3></Box>
        <Grid container spacing={2}>
      
          <RenderMoviesList />
        </Grid>
      </Container>
      
    </>
  );
};

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
};

export default Details;
