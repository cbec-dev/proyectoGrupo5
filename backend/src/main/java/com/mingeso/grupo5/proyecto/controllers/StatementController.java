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
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.repositories.StatementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import jdk.nashorn.internal.ir.annotations.Reference;

import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import java.time.LocalDateTime;
import java.text.DateFormat;
import java.text.SimpleDateFormat;;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(path="/api/statements")

public class StatementController {
	@Autowired 
	private StatementRepository statementRepository;
	@Autowired
	private SectionRepository sectionRepository;

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
			@RequestParam String finalDate,
			@RequestParam String initialDate) 
            {
		Section s = new Section();
		s = sectionRepository.findById(section).orElse(null);
		Statement n = new Statement();
		Date date = new Date();
		Date initial = new Date();
		//LocalDate localDate = LocalDate();
		//Date initialDate = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
			 date = formatter.parse(finalDate);
			 initial = formatter.parse(initialDate);
			}
		   catch (Exception e) {
			
		   }
		System.out.println("Fecha sin formato: " + finalDate);
		System.out.println("Fecha formateade: " + date);
		n.setStatementName(statementName);
        n.setStatementText(statementText);
		n.setSection(s);
		n.setHeader(header);
		n.setFinalDate(date);
		n.setInitialDate(initial);
		statementRepository.save(n);
		return "Enunciado guardado.";
	}
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public Statement create(@RequestBody Statement resource) {

	     return statementRepository.save(resource);
	}
	@RequestMapping(value = "/add/{statementName}/{section}/{statementText}/{header}", method = { RequestMethod.GET, RequestMethod.POST })
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public Statement addStatement(@PathVariable("statementName") String statementName, @PathVariable("section") Integer section, @PathVariable("statementText") String statementText, @PathVariable("header") String header) {
			Section s = new Section();
			System.out.println("Datos: " + s);
			s = sectionRepository.findById(section).orElse(null);
			System.out.println("Datos: " + s);
			Statement resource = new Statement();
			resource.setStatementName(statementName);
			resource.setSection(s);
			resource.setHeader(header);
			resource.setStatementText(statementText);
			return statementRepository.save(resource);
		}
	@GetMapping(path="/update") 
	public @ResponseBody String updateStatement (
			@RequestParam Integer id,
            @RequestParam String statementName,
            @RequestParam String statementText){
		

		Statement n = new Statement();
		n.setIdStatement(id);
        n.setStatementName(statementName);
        n.setStatementText(statementText);
		
		statementRepository.save(n);
		return "Enunciado actualizado.";
	}
	
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
	@GetMapping(path="/search/seccion/{section}")
	public @ResponseBody Iterable<Statement> findBySection(@PathVariable("section") Section section) {
		Iterable<Statement> statement = statementRepository.findBysection(section);
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