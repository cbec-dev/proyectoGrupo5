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
        testUser.setIdUser(1);
        testUser.setCorreo(correo);
        testUser.setUserName(username);
        testUser.setCareer(career);
        testUser.setSection(section);

        Assert.assertNotNull(testUser.getIdUser());
    }

    @Test
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

    @Test
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

    @Test
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

    @Test
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


    @Test
    public void setIdUser() {
        User testUser = new User();

        testUser.setIdUser(2);
        Assert.assertEquals(Integer.valueOf(2), testUser.getIdUser());

    }

    @Test
    public void setCorreo() {
        String correo = "user@email.com";

        User testUser = new User();
        testUser.setCorreo(correo);

        Assert.assertEquals(correo, testUser.getCorreo());
    }

    @Test
    public void setUserName() {
        String username = "user";

        User testUser = new User();
        testUser.setUserName(username);

        Assert.assertEquals(username, testUser.getUserName());
    }

    @Test
    public void setSection() {
        Section section = new Section();

        User testUser = new User();
        testUser.setSection(section);

        Assert.assertEquals(section, testUser.getSection());

    }

    @Test
    public void setCareer() {
        Career career = new Career();

        User testUser = new User();
        testUser.setCareer(career);

        Assert.assertEquals(career, testUser.getCareer());
    }



}
