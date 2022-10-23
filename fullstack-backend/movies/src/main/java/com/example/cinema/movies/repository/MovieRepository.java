package com.example.cinema.movies.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.movies.model.MovieModel;

public interface MovieRepository extends JpaRepository<MovieModel, Long>{

}
