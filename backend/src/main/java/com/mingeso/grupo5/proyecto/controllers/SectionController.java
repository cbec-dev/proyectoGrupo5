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
@CrossOrigin(origins = "http://209.97.152.30:5050")
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
            @RequestParam String sectionName) {
		Section n = new Section();
        n.setSectionName(sectionName);
		
		sectionRepository.save(n);
		return "Seccion agregada.";
	}

	@GetMapping(path="/search/{IdSection}")
	public @ResponseBody Section findOne(@PathVariable("IdSection") Integer IdSection) {
		Section retorno = sectionRepository.findById(IdSection).get();
		return retorno;
	}
	@RequestMapping(value="/removeP/{IdSection}", method = {RequestMethod.PUT, RequestMethod.GET})
	public @ResponseBody String removeProfesor(@PathVariable("IdSection") Integer IdSection){
		Section seccion = sectionRepository.findById(IdSection).get();
		seccion.setProfesor(null);
		sectionRepository.save(seccion);
		return "Profesor removido correctamente c:";

	}
	@RequestMapping(value="/addProfesor/{IdSection}/{idprofesor}", method = RequestMethod.PUT)
	public @ResponseBody String addProfesor(@PathVariable("IdSection") Integer IdSection, @PathVariable("idprofesor") Integer idprofesor){
		Section seccion = sectionRepository.findById(IdSection).get();
		User profesor = userRepository.findById(idprofesor).get();
		seccion.setProfesor(profesor);
		return "Profesor aniadido correctamente c:";

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
		

			s = sectionRepository.findById(section).orElse(null);

			if(p == null || s == null) {
				
				return null;
				
			}
			s.setIdSection(section);
			s.setProfesor(p);
			return sectionRepository.save(s);
		}
		@RequestMapping(value = "/updateProfesor/{section}", method = { RequestMethod.GET, RequestMethod.PUT})
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public Section deleteProfesor(@PathVariable("section") Integer section) {
			Section s = new Section();
			s = sectionRepository.findById(section).orElse(null);

			if(s == null) {
				
				return null;
				
			}
			s.setIdSection(section);
			s.setProfesor(null);
			return sectionRepository.save(s);
		}

	
	
}
