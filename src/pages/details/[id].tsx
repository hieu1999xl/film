import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Container } from "@mui/material";
import { useGetMovies } from "../../services/movies";
import { Movie } from "../../constants/models/Movies";
import styles from "./Details.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { useContext } from "react";

const Details = () => {
  const { movies, isLoading, isError } = useGetMovies();
  const router = useRouter();
  const { id }: any = router.query;
  const movie = movies.find((mov: any) => mov.id === parseInt(id));

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

  if (!movie) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>{movie.name}</title>
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <img src={movie.img} width={250} height={375} />
          </Grid>
          <Grid item xs={12} ml={6} sm>
            <h1>{movie.name}</h1>
            <p>{movie.type}</p>
            <p>{movie.synopsis}</p>
            <p>{movie.runtimes}</p>
            <div>Ticket Cost: {movie.ticketCost}</div>
            <RenderBookTicketsButton />
          </Grid>
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
