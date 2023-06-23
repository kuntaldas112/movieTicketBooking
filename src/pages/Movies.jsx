import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../component/MovieCard'
import {API_URL} from "../../src/constants"
function Movies() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchData =async () => {
                const response =await fetch(`${API_URL}/api/v1.0/moviebooking/all`);
                const data=await response.json();
                setData(data);
            
            };
        fetchData();
    },[])
  
    return (
        <>
            <h3>All Movies</h3>
            
        <div className='moviesContainer d-flex flex-wrap'>
         {
            data.map((movie,index)=>{
                return <MovieCard key={index} {...movie} />
             })
         }
        </div>
        </>
    )
}

export default Movies;