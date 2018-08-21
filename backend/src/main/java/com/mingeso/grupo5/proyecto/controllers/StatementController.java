package com.mingeso.grupo5.proyecto.controllers;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Map.Entry;
import com.mingeso.grupo5.proyecto.entities.ExpectedSolution;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.TestCase;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.repositories.StatementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.mingeso.grupo5.proyecto.repositories.TestCaseRepository; 
import jdk.nashorn.internal.ir.annotations.Reference;

import com.mingeso.grupo5.proyecto.repositories.ExpectedSolutionRepository;
import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import java.time.LocalDateTime;
import java.text.DateFormat;
import java.text.SimpleDateFormat;;


@CrossOrigin(origins = "http://209.97.152.30:5050")
@Controller
@RequestMapping(path="/api/statements")

public class StatementController {
	@Autowired 
	private StatementRepository statementRepository;
	@Autowired
	private SectionRepository sectionRepository;
	@Autowired
	private ExpectedSolutionRepository expectedSolutionRepository;
	@Autowired
	private TestCaseRepository testCaseRepository;
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Statement> gettAllstatements() {
		
		Iterable<Statement> findAll = statementRepository.findAll();
		return findAll;
	}

	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public @ResponseBody String addNewStatement (
            @RequestParam String statementName,
			@RequestParam String statementText,
			@RequestParam Integer section,
			@RequestParam String header,
			@RequestParam Date finalDate,
			@RequestParam Date initialDate,
			@RequestParam(value = "expectedSolution", required = false) List<String> expectedSolution,
			@RequestParam(value = "testCases", required = false) List<String> testCases) 
            {
		Section s = new Section();
		//int num = expectedSolution.size();
		s = sectionRepository.findById(section).orElse(null);
		Statement n = new Statement();
		List<ExpectedSolution> expectSol=new ArrayList<ExpectedSolution>();
		List<TestCase> testC = new ArrayList<TestCase>();
		//Date date = new Date();
		//Date initial = new Date();
		//LocalDate localDate = LocalDate();
		//Date initialDate = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		//DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		//try {
		//	 date = formatter.parse(finalDate);
		//	 initial = formatter.parse(initialDate);
		//	}
		//   catch (Exception e) {
			
		//   }
		for(String str : expectedSolution){
    		ExpectedSolution temp = new ExpectedSolution();
    		temp.setExpectedSolution(str);
    		expectedSolutionRepository.save(temp);
    		expectSol.add(temp);
			}
		for(String str : testCases){
    		TestCase tempCase = new TestCase();
    		tempCase.settestCase(str);
    		testCaseRepository.save(tempCase);
    		testC.add(tempCase);
			}
		//System.out.println("Fecha sin formato: " + finalDate);
		//System.out.println("Fecha formateade: " + date);
		n.setStatementName(statementName);
        n.setStatementText(statementText);
		n.setSection(s);
		n.setHeader(header);
		n.setFinalDate(finalDate);
		n.setInitialDate(initialDate);
		//expectSol.setExpectedSolution(expectedSolution);
		//expectedSolutionRepository.save(expectSol);
		n.setExpectedSolution(expectSol);
		n.setTestCases(testC);
		statementRepository.save(n);
		
		return "Enunciado guardado: ";
	}
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public Statement create(@RequestBody Statement resource) {

	     return statementRepository.save(resource);
	}
	/*@RequestMapping(value = "/add/{statementName}/{section}/{statementText}/{header}/{expectedSolution}", method = { RequestMethod.GET, RequestMethod.POST })
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public Statement addStatement(@PathVariable("statementName") String statementName, @PathVariable("section") Integer section, @PathVariable("statementText") String statementText, @PathVariable("header") String header, @PathVariable("expectedSolution") String expectedSolution) {
			Section s = new Section();
			System.out.println("Datos: " + s);
			s = sectionRepository.findById(section).orElse(null);
			System.out.println("Datos: " + s);
			Statement resource = new Statement();
			resource.setStatementName(statementName);
			resource.setSection(s);
			resource.setHeader(header);
			resource.setStatementText(statementText);
			ExpectedSolution expectSol=new ExpectedSolution();
			expectSol.setExpectedSolution(expectedSolution);
			expectedSolutionRepository.save(expectSol);
			resource.setExpectedSolution(expectSol);
			return statementRepository.save(resource);
		}
	@GetMapping(path="/update") 
	public @ResponseBody String updateStatement (
			@RequestParam Integer id,
            @RequestParam String statementName,
			@RequestParam String statementText,
			@RequestParam String expectedSolution){
		

		Statement n = new Statement();
		n.setIdStatement(id);
        n.setStatementName(statementName);
		n.setStatementText(statementText);
		ExpectedSolution expectSol=new ExpectedSolution();
		expectSol.setExpectedSolution(expectedSolution);
		expectedSolutionRepository.save(expectSol);
		n.setExpectedSolution(expectSol);
		
		statementRepository.save(n);
		return "Enunciado actualizado.";
	}*/
	
	@GetMapping(path="/search/{idStatement}")
	public @ResponseBody Statement findOne(@PathVariable("idStatement") Integer idStatement) {
		Statement statement = statementRepository.findById(idStatement).get();
		if (statement != null) {
			return statement;
		}
		else {
			return null;
		}
		
		
	}
	@GetMapping(path="/search/seccion/{idSection}")
	public @ResponseBody Iterable<Statement> findBySection(@PathVariable("idSection") Integer idSection) {
		Section s = sectionRepository.findById(idSection).get();
		Iterable<Statement> statement = statementRepository.findBysection(s);
		if (statement != null) {
			return statement;
		}
		else {
			return null;
		}
		
		
	}
	
	@RequestMapping(value = "/delete/{idStatement}")
    public @ResponseBody String delete(@PathVariable("idStatement") Integer idStatement) {
		
        statementRepository.deleteById(idStatement);
		return "Enunciado eliminado";
	}

	
	
}