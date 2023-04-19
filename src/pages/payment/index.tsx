import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Grid, TextField } from "@mui/material";
import { Movie, Seats } from "../../constants/models/Movies";
import styles from "./Payment.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { useGetMovieId, usePostTicket } from "../../services/movies";
import { useGetMovies } from "../../services/movies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Tickets = () => {
  const { movies, isLoading, isError } = useGetMovies();
  const router = useRouter();
  const [seconds, setSeconds] = useState(600);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const [cost, setCost] = useState();
  const [customer, setCustomer] = useState();

  const [selectItem, setSelectItem] = useState<any>();

  let movieSeatDetails: Seats = {};
  let bookingChargePerTicket = 0,
    ticketCost: number,
    bookingFee: number,
    totalCost: number;
  const { movieId, seatDetails }: any = router.query;
  const movie =
    movies && movies.find((mov: any) => mov.id === parseInt(movieId));
  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  });

  const computeSelectedSeats = () => {
    let selectedSeats: string[] = [];
    for (let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex + 1}`);
        }
      });
    }
    return selectedSeats;
  };

  useEffect(() => {
    setSelectItem(selectedSeats);
  }, []);

  const RenderSeatDetails = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    ticketCost = selectedSeats.length * (movie?.ticketCost || 0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(", ")} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>{ticketCost}$</div>
      </div>
    );
  };

  const RenderBookingCharge = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Booking Charge</div>
        <div className={styles.seatCost}>{bookingFee}$</div>
      </div>
    );
  };

  const RenderTotalCharge = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    totalCost = ticketCost + bookingFee;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Total</div>
        <div className={styles.seatCost}>{totalCost}$</div>
      </div>
    );
  };

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = { ...movieSeatDetails };
    for (let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      });
    }
    return newMovieSeatDetails;
  };
  const usePostData = () => {
    let params = {
      code: `VPA${Math.random().toString().slice(2, 11)}`,
      number_tickets: selectItem.join(", "),
      name_firm: movie.name,
      price: movie.ticketCost,
      total_price: ticketCost + bookingFee,
      total_ticket: selectItem.length,
      name_customer: customer ,
      showTime: movie.showTime || '2h',
    };
    usePostTicket(params)
      .then(() => {
        toast.success(`You have successfully booked your movie ticket VPA${Math.random().toString().slice(2, 11)}`, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setTimeout(()=> {
          router.push("/");
        }, 10000)
        
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const onConfirmButtonClick = async () => {
    let movieIndex =
      movies && movies.findIndex((mov: any) => mov.id === parseInt(movieId));
    usePostData();
    if (movieIndex !== -1) {
      movies[movieIndex].seats = modifiedSeatValue();
      // console.log(movies);
      // router.push("/");
    }
  };

  const RenderConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button
          variant="contained"
          disabled={isTimerCompleted}
          className={styles.paymentButton}
          onClick={onConfirmButtonClick}
        >
          {isTimerCompleted
            ? "Confirm Booking"
            : `Confirm Booking (${seconds}s)`}
        </Button>
      </div>
    );
  };

  const RenderList = () => {
    return <></>;
  };

  let selectedSeats: string[] = computeSelectedSeats();

  if (!movie) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Link
              href={{
                pathname: `/seats/${movie?.id}`,
                query: {
                  seats: isTimerCompleted ? null : JSON.stringify(seatDetails),
                },
              }}
            >
              <ArrowBackIcon />
            </Link>
            <div className={styles.cardTitle}>BOOKING SUMMARY</div>
          </div>
          <p className={styles.movieName}>{movie.name}</p>
          <RenderSeatDetails selectedSeats={selectedSeats} />
          <RenderBookingCharge selectedSeats={selectedSeats} />
          <hr className={styles.hrStyle} />
          <RenderTotalCharge selectedSeats={selectedSeats} />
          <hr className={styles.hrStyle} />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="synopsis"
                variant="outlined"
                label="Customer"
                onChange={(event: any) => {
                  setCustomer(event.target.value);
                }}
                type="text"
                required
              />
            </Grid>
          </Grid>
          <ToastContainer />
          <RenderConfirmButton />
        </div>
      </div>
    </>
  );
};

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
};

export default Tickets;
