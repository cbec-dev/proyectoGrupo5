package com.mingeso.grupo5.proyecto.controllers;


import org.junit.Test;
import java.util.List;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import com.mingeso.grupo5.proyecto.controllers.UserControllerTests;
import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.repositories.CareerRepository;
import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

import org.junit.Assert;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTests {

    @Autowired
    private UserRepository repository;
    @Autowired
    private CareerRepository careerRepository;
    @Autowired
    private SectionRepository sectionRepository;

    @Test
    public void addNewUser() {
    }

    @Test
    public void updateUser() {
    }

    @Test
    public void findOne() {
    }

    @Test
    public void delete() {

    }
}