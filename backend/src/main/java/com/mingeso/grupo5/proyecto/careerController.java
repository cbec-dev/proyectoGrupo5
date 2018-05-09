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
import com.mingeso.grupo5.proyecto.career;
import com.mingeso.grupo5.proyecto.careerRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/careers") 
public class careerController {
	@Autowired 
	private careerRepository careerRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<career> getAllCareer() {
		
		Iterable<career> findAll = careerRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewCareer (
            @RequestParam Integer idUser,
            @RequestParam String careerName) {
		

        career n = new career();
        n.setIdUser(idUser);
        n.setCareerName(careerName);		
		careerRepository.save(n);
		return "Carrera guardada";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateCareer (
			@RequestParam Integer IdCareer,
            @RequestParam String careerName,
            @RequestParam Integer idUser) {
		

		career n = new career();
		n.setIdCareer(IdCareer);
        n.setCareerName(careerName);
        n.setIdUser(idUser);
		
		careerRepository.save(n);
		return "Carrera actualizada";
	}
	
	@GetMapping(path="/search/{IdCareer}")
	public @ResponseBody career findOne(@PathVariable("IdCareer") Integer IdCareer) {
		career retorno = careerRepository.findById(IdCareer).get();
		return retorno;
	}
	
	@RequestMapping(value = "/delete/{IdCareer}")
    public @ResponseBody String delete(@PathVariable("IdCareer") Integer IdCareer) {
		
        careerRepository.deleteById(IdCareer);
		return "Carrera eliminada";
	}
	
	
}
