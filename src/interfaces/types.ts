export interface Country {
  name: string;
  alpha2Code: string,
  alpha3Code: string,
  population: number;
  region: string;
  capital?: string;
  flag: string;
  subregion: string;
  nativeName: string;
  topLevelDomain?: string[];
  currencies?: {
        code: string,
        name: string,
      }[],
  languages?: { iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;}[],
  borders?: string[]
}
export type Region = 'Africa'| 'Americas'| 'Asia'| 'Europe'| 'Oceania';