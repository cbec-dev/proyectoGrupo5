package com.mingeso.grupo5.proyecto.controllers;

import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import com.mingeso.grupo5.proyecto.helpers.Compiler;
import com.mingeso.grupo5.proyecto.controllers.CompilerController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CompilerControllerTest {
	@Test
    public void runCode() throws IOException {
		String code = "print 4";
		CompilerController controlador = new CompilerController();
		Compiler compiler = new Compiler();
		String out = compiler.run(code);
		Assert.assertEquals(out, controlador.runCode(code));
		
    }

}
