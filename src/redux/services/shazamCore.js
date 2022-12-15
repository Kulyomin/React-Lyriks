import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Серверные параметры(Указываются индивидуально)
const options = {
   method: 'GET',    // Спецификатор запроса(GET - Получение данных)
   headers: {        // Заголовки(Уникальный ключ сервера хостинг клиента SHAZAM)
      'X-RapidAPI-Key': 'c13b548139msh678298a0382443ep1b1bc3jsndc0913a3c8a3',
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
   }
};

fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
   .then(response => response.json()) // Перекодировка в json формат 
   .then(response => console.log(response)) // Вывод в консоль полученный ответ из Shazam
   .catch(err => console.error(err)); // Вывод ошибки в консоль(обработчик)

export const shazamCoreApi = createApi({
   reducerPath: 'shazamCoreApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
      prepareHeaders: (headers) => {
         headers.set('X-RapidAPI-Key', 'c13b548139msh678298a0382443ep1b1bc3jsndc0913a3c8a3');

         return headers;
      },
   }),
   endpoints: (builder) => ({
      // Получение списка композиций мировых чартов
      getTopCharts: builder.query({ query: () => '/charts/world' }),
      // Получение списка композиций по определённому жанру
      getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
      // Получение списка композиций по определённой стране
      getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` }),
      // Получение списка композиций по поиску
      getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
      // Получение полной информации об исполнителе
      getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
      // Получение полной информации о композиции
      getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
      // Получение списка связанных композиций
      getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
   }),
});

// Экспортируем все методы через один объект
export const {
   useGetTopChartsQuery,
   useGetSongsByGenreQuery,
   useGetSongsByCountryQuery,
   useGetSongsBySearchQuery,
   useGetArtistDetailsQuery,
   useGetSongDetailsQuery,
   useGetSongRelatedQuery,
} = shazamCoreApi;