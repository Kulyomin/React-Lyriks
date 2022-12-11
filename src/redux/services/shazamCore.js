import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const options = {
   method: 'GET',
   headers: {
     'X-RapidAPI-Key': 'c13b548139msh678298a0382443ep1b1bc3jsndc0913a3c8a3',
     'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
   }
 };
 
 fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
   .then(response => response.json())
   .then(response => console.log(response))
   .catch(err => console.error(err));

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
      getTopCharts: builder.query({ query: () => '/charts/world'}),
      getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
      getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
   }),
});

export const {
   useGetTopChartsQuery,
   useGetSongDetailsQuery,
   useGetSongRelatedQuery,
} = shazamCoreApi;