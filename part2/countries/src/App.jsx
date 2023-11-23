import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all/')
      .then((res) => setCountries(res.data));
  }, []);

  if (!countries) {
    return null;
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredArr = countries.filter((country) => {
      if (query === '') {
        return null;
      }
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredCountries(filteredArr);
  };

  return (
    <div>
      find countries
      <input type="text" value={searchQuery} onChange={handleSearch} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

const Countries = ({ countries }) => {
  const length = countries.length;

  if (length > 10) return <p>Too many matches, specify another filter</p>;

  if (length <= 10 && length !== 1) {
    return (
      <>
        {countries.map((country) => (
          <p key={countries.indexOf(country)}>{country.name.common}</p>
        ))}
      </>
    );
  }
  return (
    <>
      {countries.map((country) => (
        <Country
          key={0}
          name={country.name.common}
          area={country.area}
          capital={country.capital}
          languages={country.languages}
          flag={country.flags.png}
        />
      ))}
    </>
  );
};

const Country = ({ name, area, capital, languages, flag }) => {
  const arrOfLang = Object.values(languages);
  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>languages: </h3>
      <ul>
        {arrOfLang.map((lang) => (
          <Language key={arrOfLang.indexOf(lang)} lang={lang} />
        ))}
      </ul>
      <img src={flag} alt="" />
    </div>
  );
};

const Language = ({ lang }) => {
  return <li>{lang}</li>;
};

export default App;
