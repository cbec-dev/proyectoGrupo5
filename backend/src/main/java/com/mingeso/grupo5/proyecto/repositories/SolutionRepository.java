package com.mingeso.grupo5.proyecto.repositories;

import org.springframework.data.repository.CrudRepository;
import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.User;


public interface SolutionRepository extends CrudRepository<Solution,Integer> {
	Solution findByUserAndStatement(User user, Statement statement);
    Iterable<Solution> findByUser(User user);
    Iterable<Solution> findByStatement(Statement statement);
}

