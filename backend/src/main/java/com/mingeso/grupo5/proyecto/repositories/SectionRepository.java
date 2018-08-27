package com.mingeso.grupo5.proyecto.repositories;

import org.springframework.data.repository.CrudRepository;

import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;


public interface SectionRepository extends CrudRepository<Section, Integer> {
    void delete(Section section);
    Section findByprofesor(User profesor);

}