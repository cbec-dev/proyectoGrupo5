package com.mingeso.grupo5.proyecto.controllers;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.helpers.SolutionStatsContext;
import com.mingeso.grupo5.proyecto.helpers.statstrategies.TimeStats;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.mingeso.grupo5.proyecto.repositories.CareerRepository;
import com.mingeso.grupo5.proyecto.repositories.SolutionRepository;
import com.mingeso.grupo5.proyecto.repositories.StatementRepository;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

@Controller   
@CrossOrigin(origins = {"http://209.97.152.30:5050", "http://localhost:5050"})
@RequestMapping(path="/solutions") 
public class SolutionController {
	@Autowired 
	private SolutionRepository solutionRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StatementRepository statementRepository;
	@Autowired
	private CareerRepository careerRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Solution> getAllsolution() {
		
		Iterable<Solution> findAll = solutionRepository.findAll();
		return findAll;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public @ResponseBody String addNewSolution (
            @RequestParam Integer idStatement,
            @RequestParam String solutionName,
            @RequestParam String solutionText,
            @RequestParam Integer idUser,
            @RequestParam Integer time,
            @RequestParam Integer testCasesSuccess,
            @RequestParam Integer testCases) {
		

		Solution n = new Solution();
		Statement s = new Statement();
		//LocalDate localDate = LocalDate();
		User u = new User();
		//Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		Date date = new Date();
		u = userRepository.findById(idUser).get();
		s = statementRepository.findById(idStatement).get();
		Solution verify = new Solution();
		verify = solutionRepository.findByUserAndStatement(u, s);
		if(verify!=null){
			return "Ya existe una solucion para este usuario y enunciado";
		}
		n.setStatement(s);
        n.setSolutionName(solutionName);
		n.setSolutionText(solutionText);
		n.setDate(date);
        n.setUser(u);
        n.setTime(time);
        n.setTestCases(testCases);
        n.setTestCasesSuccess(testCasesSuccess);
		Double percent = 100.0*testCasesSuccess/testCases;
		n.setpSuccess(percent);
		solutionRepository.save(n);
		return "Solucion guardada";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateSolution (
			@RequestParam Integer IdSolution,
            @RequestParam Integer idStatement,
            @RequestParam String solutionName,
            @RequestParam String solutionText,
            @RequestParam Integer idUser) {
		

		Solution n = new Solution();
		n.setIdSolution(IdSolution);
        //n.setIdStatement(idStatement);
        n.setSolutionName(solutionName);
        n.setSolutionText(solutionText);
        //n.setIdUser(idUser);
		
		solutionRepository.save(n);
		return "Producto actualizado.";
	}
	
	@GetMapping(path="/search/{IdSolution}")
	public @ResponseBody Solution findOne(@PathVariable("IdSolution") Integer IdSolution) {
		Solution solution = solutionRepository.findById(IdSolution).get();
		if (solution != null) {
			return solution;
		}
		else {
			return null;
		}
		
		
	}

	@GetMapping(path="/searchbyUser/{IdUser}")
	public @ResponseBody Iterable<Solution> findOneByUser(@PathVariable("IdUser") Integer IdUser) {
		User user = new User();
		user = userRepository.findById(IdUser).get();
		Iterable<Solution> solution = solutionRepository.findByUser(user);
		if (solution != null) {
			return solution;
		}
		else {
			return null;
		}
		
		
	}
	
	@GetMapping(path="/searchbyStatement/{IdStatement}")
	public @ResponseBody Iterable<Solution> findOneByStatement(@PathVariable("IdStatement") Integer IdStatement) {
		Statement statement = new Statement();
		statement = statementRepository.findById(IdStatement).get();
		Iterable<Solution> solution = solutionRepository.findByStatement(statement);
		if (solution != null) {
			return solution;
		}
		else {
			return null;
		}
		
		
	}

	@RequestMapping(value = "/delete/{IdSolution}")
    public @ResponseBody String delete(@PathVariable("IdSolution") Integer IdSolution) {
		
        solutionRepository.deleteById(IdSolution);
		return "Producto eliminado";
	}

	@GetMapping(path="/searchbyCareer/{IdCareer}")
	public @ResponseBody ArrayList<Solution> findByCareer(@PathVariable("IdCareer") Integer IdCareer) {
		
		Career career = new Career();
		career=careerRepository.findById(IdCareer).get();
		Iterable<User> estudiantes = userRepository.findByCareer(career);
		ArrayList <Solution> retorno= new ArrayList<Solution>();
		for(User estudiante : estudiantes){
			Iterable<Solution> solutions = solutionRepository.findByUser(estudiante);
			for(Solution solution : solutions){
				retorno.add(solution);
			}
			
		}

		return retorno;
	}

	@RequestMapping(path="/getStats", method = RequestMethod.GET)
    @ResponseBody String getStats(
		@RequestParam String filter,
		@RequestParam String method) throws IOException {

			//Se crea contexto y se elige método a utilizar
			SolutionStatsContext ctx = new SolutionStatsContext();
			switch (method) {
				case "time":	ctx.setStatsStrategy(new TimeStats());
								break;
				
				default:        ctx=null;
								break;
			}

			//Se obtiene la lista de soluciones base
			ArrayList<Solution> solutions = (ArrayList<Solution>) solutionRepository.findAll();
			switch (filter) {
				case "career":  
								break;
				case "section": //solutions = findBySection(id);
								break;
				default:        solutions = null;
								break;
			}

			if (solutions.size()==0) return "ERROR: no se han encontrado soluciones.";

			String out = ctx.getStats(solutions);

			return out;
	}


	
	
}
