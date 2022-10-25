import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewMovie() {

    const [movie, setMovie] = useState({
        title: "",
        duration: "",
        email: ""
    });

    const {id} = useParams();

    useEffect(() => {
        loadMovie();
    }, []);

    const loadMovie = async () => {
        const result = await axios.get(`http://localhost:8080/movie/${id}`);
        setMovie(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Detalles</h2>

                    <div className="card">
                        <div className="card-header">
                            Detalles para película id: {movie.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Título: </b>
                                    {movie.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Duración: </b>
                                    {movie.duration}
                                </li>
                                <li className="list-group-item">
                                    <b>Director: </b>
                                    {movie.director}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to="/">Ir al inicio</Link>
                </div>
            </div>
        </div>
    )

}