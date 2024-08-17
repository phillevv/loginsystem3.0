import React, { useState } from 'react';
import axios from 'axios';


function PostTimein() {

        const [value1, setValue1] = useState('');
        const [value2, setValue2] = useState('');
        const [value3, setValue3] = useState('');

        const host = 'localhost'

        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {
                value1: value1,
                value2: value2,
                value3: value3,
            };

            axios.post('http://167.71.64.17:5000/', data)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        };

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={value1} 
                        onChange={(e) => setValue1(e.target.value)} 
                        placeholder="Value 1" 
                    />
                    <input 
                        type="text" 
                        value={value2} 
                        onChange={(e) => setValue2(e.target.value)} 
                        placeholder="Value 2" 
                    />
                    <input 
                        type="text" 
                        value={value3} 
                        onChange={(e) => setValue3(e.target.value)} 
                        placeholder="Value 3" 
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );

}

export default PostTimein;