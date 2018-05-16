package com.mingeso.grupo5.proyecto.entities;
import com.mingeso.grupo5.proyecto.entities.Compiler;
import org.junit.Test;

import java.io.IOException;

import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CompilerTest {
	@Test
    public void compilerPython() throws IOException {
		String code = "a = 5";
		String salida;
        Compiler compiler = new Compiler();

        salida = compiler.compilePython(code);
        Assert.assertEquals(salida, compiler.compilePython(code));

    }
	@Test
    public void compilerNotNull() throws IOException {
		String code = "a = 5";
	
        Compiler compiler = new Compiler();

      
        Assert.assertNotNull(compiler.compilePython(code));

    }
}
