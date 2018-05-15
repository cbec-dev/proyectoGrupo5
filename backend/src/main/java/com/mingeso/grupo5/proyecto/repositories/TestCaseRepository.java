package com.mingeso.grupo5.proyecto.repositories;

import org.springframework.data.repository.CrudRepository;

import com.mingeso.grupo5.proyecto.entities.TestCase;


public interface TestCaseRepository extends CrudRepository<TestCase, Integer> {

}