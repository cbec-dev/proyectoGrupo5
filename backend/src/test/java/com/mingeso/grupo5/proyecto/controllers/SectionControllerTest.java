package com.mingeso.grupo5.proyecto.controllers;


import org.junit.Test;
import java.util.List;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import com.mingeso.grupo5.proyecto.controllers.UserControllerTests;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

import org.junit.Assert;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SectionControllerTest {
	@Autowired 
	private SectionRepository sectionRepository;
	@Autowired
	private UserRepository userRepository;
	
	SectionController controlador = new SectionController();
	
	Integer idSection = 1;
	String sectionName = "section";
	
	
	@Test
    public void getAllSection() {
		Assert.assertNotNull(controlador.getAllsection());
		
    }
	@Test
    public void addNewSection() {
		String resultadoEsperado = "Seccion agregada.";
		Assert.assertEquals(resultadoEsperado ,controlador.addNewSection(idSection, sectionName));
		
    }
	@Test
    public void updateSection() {
		
    }

}
