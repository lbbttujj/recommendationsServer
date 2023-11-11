import axios from "axios";
import * as mocks from "./mocks";
import { FilmId, SearchValue } from "./types";
import {gptPrompt} from "../../../gptApi";
const config = {
  headers: {
    "X-API-KEY": process.env.KINO_POISK_KEY,
    accept: "application/json",
  },
};
export const kinopoiskResolvers = {
  getKpFilms: async (params: SearchValue) => {
    const {value, isSmart} = params

    try {
      if(isSmart){
        const generateFilm = await gptPrompt(value)
        console.log(generateFilm)
        const kpFilms = await axios.get(
          `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${generateFilm}`,
          config
        );
        return kpFilms.data.docs;
      } else {
        const kpFilms = await axios.get(
            `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${value}`,
            config
        );
        return kpFilms.data.docs;
        // return mocks.searchMock;
      }
    } catch (error) {
      console.log(error);

    }


  },
  getFilmDetails: async (params: FilmId) => {
    const filmDetails = await axios.get(
      `https://api.kinopoisk.dev/v1.4/movie/${params.kpId}`,
      config
    );
    return filmDetails.data;
    // return mocks.filmDetailsMock;
  },
};
