package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.mingeso.grupo5.proyecto.entities.TestCase;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.repositories.TestCaseRepository;

@Controller
@CrossOrigin(origins = "http://142.93.191.219:3000")
@RequestMapping(path="/api/testcase")

public class TestCaseController {
	@Autowired 
	private TestCaseRepository testCaseRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<TestCase> gettAllTestCases() {
		
		Iterable<TestCase> findAll = testCaseRepository.findAll();
		return findAll;
	}
	
/*	@GetMapping(path="/add") 
	public @ResponseBody String addNewTestCase (
            @RequestParam String testCase,
            @RequestParam Statement statement) 
            {
		

		TestCase n = new TestCase();
        n.settestCase(testCase);
        n.setStatement(statement);
		
		testCaseRepository.save(n);
		return "TestCase guardado.";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateStatement (
			@RequestParam Integer id,
            @RequestParam String testCase,
            @RequestParam Statement statement){
		

		TestCase n = new TestCase();
		n.setIdTestCase(id);
        n.setStatement(statement);
        n.settestCase(testCase);
		
		testCaseRepository.save(n);
		return "Caso de prueba actualizado.";
	}
	*/
	@GetMapping(path="/search/{idTestCase}")
	public @ResponseBody TestCase findOne(@PathVariable("idTestCase") Integer idTestCase) {
		TestCase testCase = testCaseRepository.findById(idTestCase).get();
		if (testCase != null) {
			return testCase;
		}
		else {
			return null;
		}
		
		
	}
	
	@RequestMapping(value = "/delete/{idTestCase}")
    public @ResponseBody String delete(@PathVariable("idTestCase") Integer idTestCase) {
		
        testCaseRepository.deleteById(idTestCase);
		return "Caso de prueba eliminado";
	}
	
	
}