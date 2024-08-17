import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";

function Home() {
  const host = 'localhost'
  const instance = axios.create({ baseURL: 'http://167.71.64.17:5000/alltime' });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      instance.get('')
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    };

    // Fetch data initially
    fetchData();

    // Set up polling every 5 seconds (adjust interval as needed)
    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

    // Function to mask the last 4 digits
    const maskPersonnummer = (personnummer) => {
      if (personnummer.length > 4) {
        return personnummer.slice(0, -4) + "****";
      }
      return personnummer;
    };

  return (
    <div className="tbl-content">
      <table cellPadding="2" cellSpacing="2" border="2">
        <tbody>
          <tr>
            <th>Förnamn</th>
            <th>Efternamn</th>
            <th>Personnummer</th>
            <th>Tid in</th>
            <th>Tid ut</th>
          </tr>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.fornamn}</td>
              <td>{item.efternamn}</td>
              <td>{item.personnummer}</td>
              <td>{item.timein}</td>
              <td>{item.timeout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;