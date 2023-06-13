import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../component/MovieCard'
function Movies() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        

    const fetchData = () => {
            fetch(`http://localhost:8081/api/v1.0/moviebooking/all`).then(res => res.json()).then(data => {
                setData(data);
            })
        };
        fetchData();
    },[])
  
    return (
        <div className='moviesContainer d-flex flex-wrap'>
         {
            data.map((movie,index)=>{
                return <MovieCard key={index} {...movie} />
             })
         }
        </div>
    )
}

export default Movies;