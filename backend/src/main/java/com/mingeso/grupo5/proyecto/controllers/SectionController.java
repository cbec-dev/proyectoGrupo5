package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.web.bind.annotation.ResponseStatus;

import antlr.collections.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;

import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/sections") 
public class SectionController {
	@Autowired 
	private SectionRepository sectionRepository;
	@Autowired
	private UserRepository userRepository;

	@GetMapping(path="/allSection")
	public @ResponseBody Iterable<Section> getAllsection() {
		
		Iterable<Section> findAll = sectionRepository.findAll();
		return findAll;
	}
	

	@GetMapping(path="/addSection") 
	public @ResponseBody String addNewSection (
            @RequestParam Integer idSection,
            @RequestParam String sectionName) {
		

		Section n = new Section();
        n.setIdSection(idSection);
        n.setSectionName(sectionName);
		
		sectionRepository.save(n);
		return "Seccion agregada.";
	}

	@GetMapping(path="/search/{IdSection}")
	public @ResponseBody Section findOne(@PathVariable("IdSection") Integer IdSection) {
		Section retorno = sectionRepository.findById(IdSection).get();
		return retorno;
	}
	@GetMapping(path="/search/profesor/{idprofesor}")
	public @ResponseBody Section findOneByProfesor(@PathVariable("idprofesor") Integer idprofesor) {
		User profesor = new User();
		profesor = userRepository.findById(idprofesor).get();
		Section retorno = new Section();
		retorno = sectionRepository.findByprofesor(profesor);
		return retorno;
	}

		@RequestMapping(value = "/update/{profesor}/{section}", method = { RequestMethod.GET, RequestMethod.PUT})
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public Section updateSection(@PathVariable("profesor") String profesor, @PathVariable("section") Integer section) {

			User p = new User();
			Section s = new Section();
			p = userRepository.findBycorreo(profesor);
			System.out.println("Datos: " + userRepository.findBycorreo(profesor));
			System.out.println("Datos2: " + p);

			s = sectionRepository.findById(section).orElse(null);

			if(p == null || s == null) {
				
				return null;
				
			}
			System.out.println("Datos: " + s);
			s.setIdSection(section);
			s.setProfesor(p);
			return sectionRepository.save(s);
		}

	
	
}
