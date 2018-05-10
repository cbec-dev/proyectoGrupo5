package com.mingeso.grupo5.proyecto.repositories;

import org.springframework.data.repository.CrudRepository;

import com.mingeso.grupo5.proyecto.entities.User;


public interface UserRepository extends CrudRepository<User, Integer> {

}