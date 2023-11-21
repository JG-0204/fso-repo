import { useState, useEffect } from 'react';
import personServices from './services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Person from './Person';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [newSearchText, setNewSearchText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  const [message, setMessage] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
    });
  }, []);

  const handleFilterInput = (e) => {
    const searchInputText = e.target.value;
    setNewSearchText(searchInputText);

    const filteredResult = persons.filter((person) =>
      person.name.toLowerCase().includes(searchInputText.toLowerCase()),
    );

    setFilteredPersons(filteredResult);
  };

  const checkIfAlreadyInArray = () => {
    if (persons.find((person) => person.name === newName) !== undefined) {
      return true;
    }
    return false;
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const updatePersonNumber = () => {
    const person = persons.find((person) => person.name === newName);
    const id = person.id;
    const personCopy = { ...person, number: newNumber };

    personServices
      .update(id, personCopy)
      .then((person) => {
        setPersons(persons.map((p) => (p.id !== id ? p : person)));
        setFilteredPersons(persons.map((p) => (p.id !== id ? p : person)));
      })
      .catch(() => {
        setIsErrorMessage(true);
        setMessage(
          `Information of ${person.name} has already been removed from server`,
        );
        setTimeout(() => {
          setMessage(null);
          setIsErrorMessage(false);
        }, 3000);
        setPersons(persons.filter((p) => p.id !== id));
        setFilteredPersons(persons.filter((p) => p.id !== id));
      });
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (checkIfAlreadyInArray()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replce the old number with a new one?`,
        )
      ) {
        updatePersonNumber();
        setMessage(`${newName}'s new number has been saved.`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personServices.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
        setFilteredPersons(persons.concat(person));
      });
      setMessage(`${newName} has been added.`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id) => () => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Remove ${person.name} from the phonebook?`)) {
      personServices.remove(id, person);
      setFilteredPersons(persons.filter((p) => p !== person));
      setPersons(persons.filter((p) => p !== person));
    }
  };

  // style
  const h2Style = {
    fontFamily: 'Arial',
  };

  return (
    <div>
      <h2 style={h2Style}>Phonebook</h2>
      <Notification message={message} errorMessage={isErrorMessage} />
      <Filter value={newSearchText} event={handleFilterInput} />
      <h2 style={h2Style}>Add a new</h2>
      <PersonForm
        formEvent={handleAddPerson}
        nameInputEvent={handleNameInput}
        numberInputEvent={handleNumberInput}
        nameInputValue={newName}
        numberInputValue={newNumber}
      />
      <h2 style={h2Style}>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          event={deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
