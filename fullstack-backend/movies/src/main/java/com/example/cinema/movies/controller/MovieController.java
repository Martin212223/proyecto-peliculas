package com.example.cinema.movies.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.cinema.movies.exception.MovieNotFoundException;
import com.example.cinema.movies.model.MovieModel;
import com.example.cinema.movies.repository.MovieRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class MovieController {
	
	@Autowired
	private MovieRepository movieRepository;
	
	@PostMapping("/movie")
	ResponseEntity<MovieModel> newMovie(@RequestBody MovieModel newMovie) {
		return new ResponseEntity<>(movieRepository.save(newMovie), HttpStatus.CREATED);
	}
	
	@GetMapping("/movies")
	ResponseEntity<List<MovieModel>> getAllMovies() {
		return new ResponseEntity<>(movieRepository.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/movie/{id}")
	ResponseEntity<MovieModel> getUserById(@PathVariable Long id) {
		return new ResponseEntity<>(movieRepository.findById(id).orElseThrow(() -> new MovieNotFoundException(id)), HttpStatus.OK);
	}
	
	@PutMapping("/movie/{id}")
	MovieModel updateMovie(@RequestBody MovieModel newMovie, @PathVariable Long id) {
		return movieRepository.findById(id).map(movie -> {
			movie.setDirector(newMovie.getDirector());
			movie.setTitle(newMovie.getTitle());
			movie.setDuration(newMovie.getDuration());
			return movieRepository.save(movie);
		}).orElseThrow(() -> new MovieNotFoundException(id));
	}
	
	@DeleteMapping("/movie/{id}")
	String deleteUser(@PathVariable Long id) {
		if (movieRepository.existsById(id)) {
			movieRepository.deleteById(id);
			return "La película con el id " + id + " ha sido eliminada exitosamente.";
		}
		throw new MovieNotFoundException(id);
	}

}
