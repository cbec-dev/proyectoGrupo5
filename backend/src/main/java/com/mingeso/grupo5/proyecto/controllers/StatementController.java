package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.repositories.StatementRepository;

@Controller
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/api/statements")

public class StatementController {
	@Autowired 
	private StatementRepository statementRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Statement> gettAllstatements() {
		
		Iterable<Statement> findAll = statementRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewStatement (
            @RequestParam String statementName,
            @RequestParam String statementText) 
            {
		

		Statement n = new Statement();
        n.setStatementName(statementName);
        n.setStatementText(statementText);
		
		statementRepository.save(n);
		return "Enunciado guardado.";
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
	
	@RequestMapping(value = "/delete/{idStatement}")
    public @ResponseBody String delete(@PathVariable("idStatement") Integer idStatement) {
		
        statementRepository.deleteById(idStatement);
		return "Enunciado eliminado";
	}
	@GetMapping(path="/search/by/section/{idSection}")
	public @ResponseBody String findBySection(@PathVariable("idSection") Integer idSection){
		Statement estatement = statementRepository.findBySection(idSection);

		return "statement";

	}
	
	
}