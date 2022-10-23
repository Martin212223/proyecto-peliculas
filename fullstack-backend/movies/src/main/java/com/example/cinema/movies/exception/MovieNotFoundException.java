package com.example.cinema.movies.exception;

public class MovieNotFoundException extends RuntimeException {
	
	public MovieNotFoundException(Long id) {
		super("No se pudo encontrar la película con el id " + id);
	}

}
