import axios from "axios";
import * as mocks from "./mocks";
import { FilmId, SearchValue } from "./types";
const config = {
  headers: {
    "X-API-KEY": process.env.KINO_POISK_KEY,
    accept: "application/json",
  },
};
export const kinopoiskResolvers = {
  getKpFilms: async (params: SearchValue) => {
    console.log(params.searchValue);

    try {
      // const kpFilms = await axios.get(
      //   `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${params.searchValue}`,
      //   config
      // );
      // console.log(kpFilms.data);
      // return kpFilms.data.docs;
      return mocks.searchMock;
    } catch (error) {
      console.log(error);

    }


  },
  getFilmDetails: async (params: FilmId) => {
    // const filmDetails = await axios.get(
    //   `https://api.kinopoisk.dev/v1.4/movie/${params.kpId}`,
    //   config
    // );
    // return filmDetails.data;
    return mocks.filmDetailsMock;
  },
};
