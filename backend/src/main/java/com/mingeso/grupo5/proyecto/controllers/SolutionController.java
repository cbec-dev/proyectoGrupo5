package com.mingeso.grupo5.proyecto.controllers;
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
import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.User;
import java.util.Date;
import com.mingeso.grupo5.proyecto.repositories.SolutionRepository;
import com.mingeso.grupo5.proyecto.repositories.StatementRepository;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

@Controller   
@CrossOrigin(origins = "http://209.97.152.30:5050")
@RequestMapping(path="/solutions") 
public class SolutionController {
	@Autowired 
	private SolutionRepository solutionRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StatementRepository statementRepository;
	
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
		return "Solucion guardada c:.";
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
	
	
}
