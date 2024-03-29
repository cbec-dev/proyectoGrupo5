package com.mingeso.grupo5.proyecto.repositories;

import org.springframework.data.repository.CrudRepository;

import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.Section;

public interface StatementRepository extends CrudRepository<Statement, Integer> {
    Iterable<Statement> findBysection(Section section);
}