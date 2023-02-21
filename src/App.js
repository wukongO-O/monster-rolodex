import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

// class App extends Component { //represents the entire app
//   constructor() {
//     super();

//     this.state = {
//       //keep track of/store the full list - <best practice>keep original state for reference esp after creating new arrays
//       monsters: [],
//       //store user input - to allow access of events in components
//       searchField: ''
//     };
//   }

//   //use whenever making API request for component to render
//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => this.setState(
//       () => {
//         return { monsters: users};
//       }
//     ))
//   }
//   //add a method for onChange callback function
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     //update setState acoordingly
//     this.setState(() => {
//       //if use a variable as the only field, JS use the variable as the key&Var value as the value -> update the searchField value here
//       return { searchField };
//     });
//   }
//   //include built-in render()method of Component
//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     //filter from the original arr of data from state & referencing the updated searchField from state
//     const filteredMonsters = monsters.filter((monster) => {
//       //array.filter() - generate a new arr;  string.includes() method to filter the names partially match e.target.value (search term) - not case sensitive
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
        
//         <SearchBox 
//           className='monsters-search-box'
//           onChangeHandler={onSearchChange} 
//           placeholder='search monsters' 
//         />
//         {/* {filteredMonsters.map((monster) => {
//           //add key value to the highest level of the div ele
//           //use array method, e.g. .map() to effectively render multiple obj values
//           return (
//             <div key={monster.id}> 
//               <h1>{monster.name}</h1>
//             </div>
//           );
//           })}  */}
//           <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

//function components version
import { useState, useEffect } from 'react';
const App = () => {
  //initialize searchField to '' - whatever is passed thru useState
  const [searchField, setSearchField] = useState(''); //[value, setValue function]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  //hook takes 2 arguments: a callback function (for effect/code inside function)& an arr of dependencies
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []);

  //only refilter when monsters & searchField change
  useEffect(() => {
    const newfilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newfilteredMonsters);
  }, [monsters, searchField])


  const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        //(vs this.setState)  
        setSearchField(searchFieldString);
      }

  return(
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        
        <SearchBox 
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters' 
        />
        <CardList monsters={filteredMonsters} />
      </div>
  )
}

export default App;
