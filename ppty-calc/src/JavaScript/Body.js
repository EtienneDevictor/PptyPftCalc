import '../Css/App.css';
import '../Css/Body.css';
import {useState} from 'react';

function Body() {
  const[address, setAddress] = useState('');

  const handleChange = event => {
    setAddress(event.target.value); 
  }
  const handleZillow = event => {
    setAddress("button working");
  }

  return (
    <div className="Basic Home Info">
      <div>
        <p> Address</p>
        <input 
          class="Textbox" 
          type="text"
          state={address}
          onChange={handleChange}></input>
        <button onClick={handleZillow}>Search Zillow</button> 
      </div>
    </div>
  );
}

export default Body;
