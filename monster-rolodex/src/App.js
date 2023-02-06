import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import logo from './logo.svg';
import './App.css';
import './App.css';
class App extends Component { //represents the entire app
  constructor() {
    super();

    this.state = {
      //keep track of/store the full list - <best practice>keep original state for reference esp after creating new arrays
      monsters: [],
      //store user input - to allow access of events in components
      searchField: ''
    };
  }

  //use whenever making API request for component to render
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(
      () => {
        return { monsters: users};
      },
      () => {

      }
    ))
  }
  //add a method for onChange callback function
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    //update setState acoordingly
    this.setState(() => {
      //if use a variable as the only field, JS use the variable as the key&Var value as the value -> update the searchField value here
      return { searchField };
    });
  }
  //include built-in render()method of Component
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    //filter from the original arr of data from state & referencing the updated searchField from state
    const filteredMonsters = monsters.filter((monster) => {
      //array.filter() - generate a new arr;  string.includes() method to filter the names partially match e.target.value (search term) - not case sensitive
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input 
        className='search-box' 
        type='search' 
        placeholder='search monsters' 
        onChange={ onSearchChange } 
        />
        {/* {filteredMonsters.map((monster) => {
          //add key value to the highest level of the div ele
          //use array method, e.g. .map() to effectively render multiple obj values
          return (
            <div key={monster.id}> 
              <h1>{monster.name}</h1>
            </div>
          );
          })}  */}
          <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
