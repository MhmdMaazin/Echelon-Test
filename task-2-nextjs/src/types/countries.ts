export interface Language {
  name: string;
}

export interface Continent {
  name: string;
}

export interface Country {
  name: string;
  code: string;
  languages: Language[];
  continent: Continent;
}

export interface CountriesGraphQLResponse {
  data?: {
    countries: Country[];
  };
  errors?: { message: string }[];
}
