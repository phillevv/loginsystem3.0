import "./styles.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyComponent from "./component";
import GetPersonUserData from "./getperson";
import PostTimein from "./posttime";
import axios from 'axios';
import Home from "./home";



export default function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get('http://167.71.64.17:5000/personuppgifter/personnummer')
          .then((response) => {
              setData(response.data);
          })
          .catch((error) => {
              setError(error.message);
              console.error('There was an error!', error);
          });
  }, []);
  

  const [result, setResult] = useState("");
  const [count, setCount] = useState("");

  let buttonList = [];
  for (let i = 1; i < 10; i++) {
    buttonList.push(
      <button key={i} value={i} onClick={(e) => add(e)}>
        {i}
      </button>
    );
  }

  function reset() {
    setResult("");
    setCount("");
  }

  function add(e) {
    const value = e.target.value;
    setCount((curr) => (curr === "" && value === "0" ? "0" : curr + value));
  }

  

  //STÄMPLA IN 
  function CheckUserData() {
    const list = data.map(item => item.personnummer); // Directly map the personnummer values
  
    if (list.includes(count)) {
      const persondata = {
        value1: count,
        value2: count,
        value3: count,
      };
  
      axios.get('http://167.71.64.17:5000/personuppgifter/login', { params: persondata })
        .then((response) => {
          const responseData = response.data;
          if (Array.isArray(responseData)) {
            const firstNames = responseData.map((item) => item.fornamn);
            const lastNames = responseData.map((item) => item.efternamn);
  
            const postData = {
              value1: count,
              value2: firstNames,
              value3: lastNames,
              value4: Today,
              value5: Today,
              value6: Today,
              value7: '',
            };
  
            axios.post('http://167.71.64.17:5000/', postData)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error('There was an error with the POST request!', error);
              });
          } else {
            console.error('Response data is not an array:', responseData);
          }
        })
        .catch((error) => {
          console.error('There was an error with the GET request!', error);
        });
    } else {
      console.log("SORRY");
    }
    setCount("");
  }
  



  function CheckUserDataOut() {
    const list = data.map(item => item.personnummer); // Directly map the personnummer values
  
    if (list.includes(count)) {
      const persondata = {
        value1: count,
        value2: count,
        value3: count,
      };
  
      axios.get('http://167.71.64.17:5000/personuppgifter/login', { params: persondata })
        .then((response) => {
          const responseData = response.data;
          if (Array.isArray(responseData)) {
            const firstNames = responseData.map((item) => item.fornamn);
            const lastNames = responseData.map((item) => item.efternamn);
  
            const postData = {
              value1: count,
              value2: Today,
              value3: Today,
            };
  
            axios.put('http://167.71.64.17:5000/timein', postData)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error('There was an error with the POST request!', error);
              });
          } else {
            console.error('Response data is not an array:', responseData);
          }
        })
        .catch((error) => {
          console.error('There was an error with the GET request!', error);
        });
    } else {
      console.log("SORRY");
    }
    setCount("");
  }
  

var d = new Date();
var datestring = d.getFullYear() + "-" + (d.getMonth()+1)  + "-" + d.getDate()
var Today = new Date().toLocaleString()
let date = new Date();
let formattedDate = new Intl.DateTimeFormat('sv-SV').format(date);

  return (
    

    <div className="App">
        <div className="boxContainer">
        <h1 className="title">Lummelunda Grill</h1>
    <div className="Calculator">
    
      <div className="flex">
        <div className="counter">
          <h1><a className="hide">I</a>{count === "" ? result : count}</h1>
        </div>
      </div>

      <div className="flex">
        <div className="buttons btn-style">
          {buttonList}
          <button id="reset" onClick={reset}>X</button>
          <button value={0} onClick={(e) => add(e)}>
            0
          </button>
          <button id="hidden">X</button>
          <button id="in" onClick={CheckUserData}>IN</button>
          <button id="ut" onClick={CheckUserDataOut}>UT</button>
        </div>
        
      </div>
    
      
    </div>


    <div className="datablock">

<section>
  <h2>Personalliggare</h2>
  <MyComponent />
  <Router>
      <div>
        <nav>
              <Link className="Timeslist" to="http://167.71.64.17:5000/alltime">Tidslogg</Link>
        </nav>
        <Routes>
          <Route path="http://167.71.64.17:5000/alltime" element={<Home />} />
        </Routes>
      </div>
    </Router>
</section>
        </div>
        
        </div>
        
        <footer>
        <p>
            Lummelunda Grill
        </p>
        <p>
            WallEric AB
        </p>
        <p>
            559674-7174
        </p>
      </footer>
    </div>
  );
}
