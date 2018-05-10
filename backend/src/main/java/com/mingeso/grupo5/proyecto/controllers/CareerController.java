package com.mingeso.grupo5.proyecto.controllers;

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
import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.repositories.CareerRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/Careers") 
public class CareerController {
	@Autowired 
	private CareerRepository CareerRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Career> getAllCareer() {
		
		Iterable<Career> findAll = CareerRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewCareer (
            @RequestParam Integer idUser,
            @RequestParam String CareerName) {
		

        Career n = new Career();
        n.setIdUser(idUser);
        n.setCareerName(CareerName);		
		CareerRepository.save(n);
		return "Carrera guardada";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateCareer (
			@RequestParam Integer IdCareer,
            @RequestParam String CareerName,
            @RequestParam Integer idUser) {
		

		Career n = new Career();
		n.setIdCareer(IdCareer);
        n.setCareerName(CareerName);
        n.setIdUser(idUser);
		
		CareerRepository.save(n);
		return "Carrera actualizada";
	}
	
	@GetMapping(path="/search/{IdCareer}")
	public @ResponseBody Career findOne(@PathVariable("IdCareer") Integer IdCareer) {
		Career retorno = CareerRepository.findById(IdCareer).get();
		return retorno;
	}
	
	@RequestMapping(value = "/delete/{IdCareer}")
    public @ResponseBody String delete(@PathVariable("IdCareer") Integer IdCareer) {
		
        CareerRepository.deleteById(IdCareer);
		return "Carrera eliminada";
	}
	
	
}
