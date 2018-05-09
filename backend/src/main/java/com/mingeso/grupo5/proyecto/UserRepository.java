package com.mingeso.grupo5.proyecto;

import org.springframework.data.repository.CrudRepository;

import com.mingeso.grupo5.proyecto.User;


public interface UserRepository extends CrudRepository<User, Integer> {

}