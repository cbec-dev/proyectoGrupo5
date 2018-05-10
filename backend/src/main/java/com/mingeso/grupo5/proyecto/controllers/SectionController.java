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
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.repositories.SectionsRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/sections") 
public class SectionController {
	@Autowired 
	private SectionsRepository sectionRepository;
	
	@GetMapping(path="/allSection")
	public @ResponseBody Iterable<Section> getAllsection() {
		
		Iterable<Section> findAll = sectionRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/addSection") 
	public @ResponseBody String addNewSection (
            @RequestParam Integer idSection,
            @RequestParam String sectionName,
            @RequestParam User user) {
		

		Section n = new Section();
        n.setIdSection(idSection);
        n.setSectionName(sectionName);
		
		sectionRepository.save(n);
		return "Seccion agregada.";
	}
	
	
}
