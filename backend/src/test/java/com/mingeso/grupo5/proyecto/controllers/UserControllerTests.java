package com.mingeso.grupo5.proyecto.controllers;


import org.junit.Test;
import java.sql.Date;
import java.util.List;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.social.facebook.api.TestUser;
import org.springframework.test.context.junit4.SpringRunner;


import com.mingeso.grupo5.proyecto.controllers.UserControllerTests;
import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

import org.junit.Assert;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTests {

    @Autowired
    private UserRepository repository;

    @Test
    public void addNewUser() {

        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);
        
        repository.save(testUser);

        List <User> userList = (List <User>) repository.findAll();

        Assert.assertNotNull(userList);
        //Se revisa que la lista no sea nula ya que se debió agregar un usuario.
    }

    @Test
    public void deleteUser() {

        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);
        //Se crea un nuevo usuario
        
        repository.save(testUser);
        repository.deleteById(1);
        //Se elimina usuario agregado

        List <User> userList = (List <User>) repository.findAll();

        Assert.assertNull(userList);
        //Se revisa que la lista se encuentre vacía ya que se eliminó el usuario agregado
    }
}