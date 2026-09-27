import { useState, useMemo, type ChangeEvent } from 'react'
import type { Country, Region } from './interfaces/types';

import countriesData from './assets/data/countries.json';
const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const countries: any[] = countriesData.map((country) => ({
  name: country.name,
  alpha3Code: country.alpha3Code,
  population: country.population,
  region: country.region,
  capital: country.capital ?? '',
  flag: country.flag,
  currencies: country.currencies, 
  languages: country.languages,
  borders: country.borders,  
  alpha2Code: country.alpha2Code,
subregion: country.subregion,
nativeName: country.nativeName,
topLevelDomain: country.topLevelDomain
}));


function Country({data, choose}: {data: Country;  choose: React.Dispatch<React.SetStateAction<Country | null>>;}) {
  const {name, population, region, capital, flag} = data;
  return (
    <div onClick={() => choose(data)} className='w-full shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200 bg-bg-element'>
                  <figure className='lg:max-h-32 lg:min-h-32 bg-black/2'>
                    <img src={flag} alt={name} className='lg:min-h-32 lg:max-h-32 w-full block' />
                  </figure>
                  <div className='p-4 rounded-b-xl'>
                    <h3 className='font-bold text-xl'>{name}</h3>
                    <div className='mt-3'>
                      <p><span>Population: </span>{population}</p>
                      <p><span>Region: </span>{region}</p>
                      <p><span>Capital: </span>{capital ?? ''}</p>
                    </div>
                  </div>
              </div>
  )
}
function App() {
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<Region>('Europe');

  const [country, setCountry] = useState<Country|null>(null)
   let allCountriesFilter: Country[] | [] = [];
  const toggleDarkLight = () => {
    document.documentElement.classList.toggle('dark');
  }

  const handleFilterCountries = (e: ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setSearch('');
    if (region) setRegion(region as Region);
    
  }
  allCountriesFilter = useMemo(() => {
    let countriesFilter: Country[] | [] = [];

      if (search && search.length >= 3) {
         const country = countries.filter((c) => c.name.toLowerCase().includes(search));
        return country;
      }

      switch (region) {
        case 'Africa':
          countriesFilter = countries.filter((c) => c.region === region);
          break;
        case 'Americas': 
          countriesFilter = countries.filter((c) => c.region === region);
          break;
        case 'Oceania': 
           countriesFilter = countries.filter((c) => c.region === region);
          break;
        case 'Asia': 
           countriesFilter = countries.filter((c) => c.region === region);
          break;
        case 'Europe': 
           countriesFilter = countries.filter((c) => c.region === region);
          break;
        default: 
          countriesFilter = countries;
          break;
      }
    return countriesFilter;
  }, [countries, region, search]);

  function borderCountries(codes: string[]): string[] {
    let namesCountries = codes.map((code) => {
      const countryFind = countries.find((c: Country) => c.alpha3Code === code);
      if (countryFind) return countryFind.name;
    });
    return namesCountries as string[];
  }

  function back() {
    setCountry(null);
  }

  return (
    <>
     <header className='bg-bg-element shadow-lg flex items-center justify-between px-4 h-25 lg:px-20'>
      <h2 className='font-bold lg:text-2xl'>Where in the world?</h2>
      <button className='text-text cursor-pointer flex items-center gap-4'
        onClick={toggleDarkLight}
      >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path d="M0 0h16v16H0z" fill="none" />
            <path fill="currentColor" d="M6 .278a.77.77 0 0 1 .08.858a7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316a.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71C0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
          </svg>
        Dark Mode</button>
     </header>
     <main>
      <div className='py-10 px-4 grid gap-8 lg:px-20 max-w-325 mx-auto'>

        {
          country ?
          <button className='cursor-pointer text-text shadow-lg py-1 w-50 bg-bg-element'
            onClick={back}
          >Back</button>
          :
          (
            <section className='flex flex-col gap-6 lg:flex-row lg:justify-between'>
              <search>
                <form>
                  <div className='bg-bg-element px-10 py-4 shadow-lg flex items-center gap-8'>
                    <button className='w-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z" />
                      </svg>
                    </button>
                    <input type="search" name="country" id="country" 
                      className='placeholder:text-gray-400 text-sm h-5 focus:outline-none' placeholder='Search for a country...'
                      value={search}
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                  </div>
                </form>
              </search>
              <div>
                  <form>
                    <div>
                      <select name="region" id="region"
                        className='bg-bg-element shadow-lg min-w-60 max-w-60 px-10 py-4 select'
                        onChange={handleFilterCountries}
                      >
                        <option value='' className='mb-4'>Filter by Region</option>
                        {
                          regions.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                          ))
                        }
                      </select>
                    </div>
                  </form>
              </div>
            </section>
          )
        }
          
          {/* COUNTRIES */}
          <section className='w-70 mx-auto grid gap-8 lg:w-full lg:grid-cols-4'>
              {
             !country  && allCountriesFilter  &&  allCountriesFilter.length > 0 &&
                allCountriesFilter.map((c: Country, i) => (
                 <Country key={i} data={c} choose={setCountry}/>

                ))  
              }
          </section>
          {/* COUNTRY */}
          {
            country &&
            <div className='mx-auto lg:flex gap-20 lg:items-center'>
              <figure className='lg:max-w-200'>
                <img src={country.flag} alt={country.name} />
              </figure>
              <div className='mt-10 grid gap-8'>
                <h3 className='font-black text-3xl'>{country.name}</h3>
                <section className='flex flex-col gap-8 lg:flex-row'>
                  <div className='grid gap-2'>
                    <p><span className='font-bold'>Native Name: </span>{country.nativeName}</p>
                    <p><span className='font-bold'>Population: </span>{country.population}</p>
                    <p><span className='font-bold'>Region: </span>{country.region}</p>
                    <p><span className='font-bold'>Sub Region: </span>{country.subregion}</p>
                    <p><span className='font-bold'>Capital: </span>{country.capital}</p>
                  </div>
                  <div className='grid gap-2 lg:flex lg:flex-col'>
                    <p><span className='font-bold'>Top Level Domain: </span>{country.topLevelDomain ? country.topLevelDomain.join(', ') : ''}</p>
                    <p><span className='font-bold'>Currencies: </span>{country.currencies && country.currencies[0].name}</p>
                    <p><span className='font-bold'>Laguanges: </span>{country.languages && country.languages.map((l) => l.name).join(', ')}</p>
                  </div>
                </section>
                <div className='lg:flex lg:items-center gap-4'>
                  <h3 className='font-bold'>Border Countries: </h3>
                  <div className='flex flex-wrap gap-4'>
                    {
                     country.borders && country.borders.length > 0 && borderCountries.length > 0 &&
                      borderCountries(country.borders).map((name, i) => (
                        <div key={i} className='p-2 shadow-2xl bg-bg-element'>
                          {name}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
     </main>
    </>
  )
}

export default App
