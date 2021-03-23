// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Country = {
  alpha2Code: string;
  name: string;
  area: number;
  capital: string;
  population: number;
  region: string;
  subregion: string;
};

export type nameobj = {
  name: string;
};

export type CountryDeatils = {
  alpha2Code: string;
  name: string;
  area: number;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  flag: string;
  languages: nameobj[];
  currencies: nameobj[];
  nativeName: string;
  gini: number;
};

export type Countries = {
  countries: Country[];
};
