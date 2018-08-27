package com.mingeso.grupo5.proyecto.entities;

import com.mingeso.grupo5.proyecto.entities.Career;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@SpringBootTest
public class CareerTests {

    @Test
    public void getIdCareer() {
        Integer idCareer = 1;
        String careerName = "user";
        

        Career testCareer = new Career();
        testCareer.setIdCareer(idCareer);
        testCareer.setCareerName(careerName);
        

        Assert.assertNotNull(testCareer.getIdCareer());
    }

    @Test
    public void getCareerName() {
        Integer idCareer = 1;
        String careerName = "user";
        

        Career testCareer = new Career();
        testCareer.setIdCareer(idCareer);
        testCareer.setCareerName(careerName);
        

        Assert.assertNotNull(testCareer.getCareerName());
    }

    @Test
    public void setIdCareer() {
        Career testCareer = new Career();

        testCareer.setIdCareer(2);
        Assert.assertEquals(Integer.valueOf(2), testCareer.getIdCareer());

    }

    @Test
    public void setCareerName() {
        String career = "Ingenieria civil informatica";

        Career testCareer = new Career();
        testCareer.setCareerName(career);

        Assert.assertEquals(career, testCareer.getCareerName());
    }
    

}
