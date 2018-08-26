package com.mingeso.grupo5.proyecto.repositories;

import org.springframework.data.repository.CrudRepository;

import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;


public interface UserRepository extends CrudRepository<User, Integer> {
    Iterable<User> findByuserType(Integer userType);
    User findBycorreo(String correo);
    Iterable<User> findByCareer(Career career);
    Iterable<User> findBySection(Section section);
}