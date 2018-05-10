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
import com.mingeso.grupo5.proyecto.Solution;
import com.mingeso.grupo5.proyecto.SolutionRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/solutions") 
public class SolutionController {
	@Autowired 
	private SolutionRepository SolutionRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Solution> getAllsolution() {
		
		Iterable<Solution> findAll = SolutionRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewSolution (
            @RequestParam Integer idStatement,
            @RequestParam String solutionName,
            @RequestParam String solutionText,
            @RequestParam Integer idUser) {
		

		Solution n = new Solution();
        n.setIdStatement(idStatement);
        n.setSolutionName(solutionName);
        n.setSolutionText(solutionText);
        n.setIdUser(idUser);
		
		SolutionRepository.save(n);
		return "Producto guardado.";
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
        n.setIdStatement(idStatement);
        n.setSolutionName(solutionName);
        n.setSolutionText(solutionText);
        n.setIdUser(idUser);
		
		SolutionRepository.save(n);
		return "Producto actualizado.";
	}
	
	@GetMapping(path="/search/{IdSolution}")
	public @ResponseBody Solution findOne(@PathVariable("IdSolution") Integer IdSolution) {
		Solution solucion = SolutionRepository.findById(IdSolution).get();
		if (solucion != null) {
			return solucion;
		}
		else {
			return null;
		}
		
		
	}
	
	@RequestMapping(value = "/delete/{IdSolution}")
    public @ResponseBody String delete(@PathVariable("IdSolution") Integer IdSolution) {
		
        SolutionRepository.deleteById(IdSolution);
		return "Producto eliminado";
	}
	
	
}
