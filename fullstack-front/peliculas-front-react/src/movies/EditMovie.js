import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditMovie() {

    const navigate = useNavigate();

    const {id} = useParams();

    const [movie, setMovie] = useState({
        title:"",
        duration:"",
        director:""
    });

    const {title, duration, director} = movie;

    const onInputChange = (event) => {
        setMovie({...movie, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        loadMovie();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:8080/movie/${id}`, movie);
        navigate("/");
    }

    const loadMovie = async () => {
        const result = await axios.get(`http://localhost:8080/movie/${id}`);
        setMovie(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Editar película</h2>

                    <form onSubmit={(event) => onSubmit(event)}>
                        <div className="mb-3">
                            <label htmlFor="Title" className="form-label">Título</label>

                            <input type={"text"} className="form-control" placeholder="Ingresa el título" name="title" value={title} onChange={(event) => onInputChange(event)}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Duration" className="form-label">Duración</label>

                            <input type={"text"} className="form-control" placeholder="Ingresa la duración" name="duration" value={duration} onChange={(event) => onInputChange(event)}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Director" className="form-label">Director</label>

                            <input type={"text"} className="form-control" placeholder="Ingresa al director" name="director" value={director} onChange={(event) => onInputChange(event)}/>
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Enviar</button>

                        <Link className="btn btn-outline-danger mx-2" to="/">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}