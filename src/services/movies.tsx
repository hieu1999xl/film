import axios from "axios";
import useSWR from "swr";
import { Seats } from "../constants/models/Movies";

function useGetMovies() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://testapi.io/api/movies/resource/movies`,
    fetcher
  );

  return {
    movies: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useGetMovieById(id: string) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://testapi.io/api/movies/resource/movies/${id}`,
    fetcher
  );

  return {
    movie: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

async function useBookTicketByMovieId(id: string, seatDetails: Seats) {
  return await axios.put(
    `https://testapi.io/api/movies/resource/movies/${id}`,
    { seatDetails }
  );
}

async function useDeleteMovie(id: string)  {
  return await axios.delete(`https://testapi.io/api/movies/resource/movies/${id}`)
}

async function usePutMovie(id: string, params: any)  {
  return await axios.delete(`https://testapi.io/api/movies/resource/movies/${id}`, params)
}

async function useGetMovie()  {
  return await axios.get(`https://testapi.io/api/movies/resource/movies/`)
}

async function usePostMovie(params: any)  {
  return await axios.post(`https://testapi.io/api/movies/resource/movies/`, params)
}


export { useGetMovies, useGetMovieById, useBookTicketByMovieId, useDeleteMovie, usePutMovie, useGetMovie, usePostMovie };
