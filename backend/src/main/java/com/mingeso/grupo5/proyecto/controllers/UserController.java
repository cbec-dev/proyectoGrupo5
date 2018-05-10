package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/users") 
public class UserController {
	@Autowired 
	private UserRepository userRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<User> getAllUser() {
		
		Iterable<User> findAll = userRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewUser (
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam Section section,
            @RequestParam String userName) {
		

        User n = new User();
        n.setUserName(userName);
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSection(section);
		userRepository.save(n);
		return "Usuarix guardadx";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateUser (
			@RequestParam Integer IdUser,
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam Section section,
            @RequestParam String userName) {
		

		User n = new User();
		n.setUserName(userName);
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSection(section);
		userRepository.save(n);
		return "Usuarix actualizadx";
	}
	
	@GetMapping(path="/search/{IdUser}")
	public @ResponseBody User findOne(@PathVariable("IdUser") Integer IdUser) {
		User retorno = userRepository.findById(IdUser).get();
		return retorno;
	}
	
	@RequestMapping(value = "/delete/{IdUser}")
    public @ResponseBody String delete(@PathVariable("IdUser") Integer IdUser) {
		
        userRepository.deleteById(IdUser);
		return "Usuarix eliminadx";
	}
	
	
}
