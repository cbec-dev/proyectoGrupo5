package com.mingeso.grupo5.proyecto.entities;

import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;

import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTests {

    @Test
    public void getIdUser() {
        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);

        Assert.assertNotNull(testUser.getIdUser());
    }

    public void getCorreo() {
        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);

        Assert.assertNotNull(testUser.getCorreo());
    }

    public void getUserName() {
        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);

        Assert.assertNotNull(testUser.getUserName());
    }

    public void getSection() {
        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);

        Assert.assertNotNull(testUser.getSection());
    }

    public void getCareer() {
        String correo = "user@email.com";
        String username = "user";
        Career career = new Career();
        Section section = new Section();

        User testUser = new User();
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);

        Assert.assertNotNull(testUser.getCareer());
    }



}
