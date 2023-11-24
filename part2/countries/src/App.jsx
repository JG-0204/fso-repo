import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './Countries';

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

export default App;
