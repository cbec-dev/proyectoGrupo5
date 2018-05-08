package com.mingeso.grupo5.proyecto;

import org.springframework.web.bind.annotation.ResponseStatus;
import java.sql.Date;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import com.mingeso.grupo5.proyecto.solution;
import com.mingeso.grupo5.proyecto.solutionRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/api/solution") 
public class solutionController {
	@Autowired 
	private solutionRepository solutionRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<solution> getAllsolution() {
		
		Iterable<solution> findAll = solutionRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewSolution (
            @RequestParam Integer idStament,
            @RequestParam String solutionName,
            @RequestParam String solutionText,
            @RequestParam Integer idUser) {
		

		solution n = new solution();
        n.setIdStatement(idStament);
        n.setSolutionName(solutionName);
        n.setSolutionText(solutionText);
        n.setIdUser(idUser);
		
		solutionRepository.save(n);
		return "Producto guardado.";
}
}
