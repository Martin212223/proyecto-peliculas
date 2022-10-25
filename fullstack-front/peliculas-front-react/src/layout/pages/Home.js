import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [movies, setMovies] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        const result = await axios.get("http://localhost:8080/movies");
        setMovies(result.data);
    }

    const deleteMovie = async (id) => {
        await axios.delete(`http://localhost:8080/movie/${id}`);
        loadMovies();
    }

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Título</th>
                            <th scope="col">Duración</th>
                            <th scope="col">Director</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((movie, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{movie.title}</td>
                                    <td>{movie.duration}</td>
                                    <td>{movie.director}</td>
                                    <td>
                                        <Link className="btn btn-primary mx-2" to={`/viewmovie/${movie.id}`}>Ver</Link>
                                        <Link className="btn btn-outline-primary mx-2" to={`/editmovie/${movie.id}`}>Editar</Link>
                                        <button className="btn btn-danger mx-2" onClick={() => deleteMovie(movie.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}