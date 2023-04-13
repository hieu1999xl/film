import { Grid, Button, Paper } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import styles from "../styles/Home.module.scss";
import { useGetMovies } from "../services/movies";
import { Movie } from "../constants/models/Movies";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const { movies, isLoading, isError } = useGetMovies();

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
    if (movies) {
      return movies.map((movie: Movie) => (
        <Grid item xs={3} key={movie.id}>
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
      <Carousel height="612px">
        {items.map((item, i) => (
          <Paper
            key={item.name}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              height: "100%",
            }}
          ></Paper>
        ))}
      </Carousel>
      <div className={styles.moviesContainer}>
        <h1 className={styles.title}>Recommended Movies</h1>
        <Grid container spacing={2}>
          <RenderMoviesList />
        </Grid>
      </div>
    </>
  );
}
