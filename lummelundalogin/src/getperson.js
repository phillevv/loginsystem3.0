import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetPersonUserData() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const host = 'localhost'

    useEffect(() => {
        axios.get('http://167.71.64.17:5000/personuppgifter')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error.message);
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>

                {data.map((item) => (
                    <li key={item.id}>{item.fornamn} - {item.efternamn}</li>
                ))}

        </div>
    );

    
}



export default GetPersonUserData;