import axios from 'axios';

export const getSearchBox = async () => {
  const address = 'Avenida Boa Viagem, Recife - PE';
  const ISO_3166_country_code_A3 = 'BRA';
  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const response = await axios.get(
    `https://api.mapbox.com/search/searchbox/v1/forward?q=${address}&language=pt&country=${ISO_3166_country_code_A3}&access_token=${apiKey}`
  );
  return response.data;
};
