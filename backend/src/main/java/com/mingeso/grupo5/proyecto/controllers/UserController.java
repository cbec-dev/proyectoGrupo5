package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
<<<<<<< HEAD:backend/src/main/java/com/mingeso/grupo5/proyecto/controllers/UserController.java
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/users") 
public class UserController {
	@Autowired 
	private UserRepository userRepository;
=======
import org.springframework.web.bind.annotation.RequestBody;
import com.mingeso.grupo5.proyecto.User;
import com.mingeso.grupo5.proyecto.UserRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/Users") 
public class UserController {
	@Autowired 
	private UserRepository UserRepository;
>>>>>>> develop:backend/src/main/java/com/mingeso/grupo5/proyecto/UserController.java
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<User> getAllUser() {
		
<<<<<<< HEAD:backend/src/main/java/com/mingeso/grupo5/proyecto/controllers/UserController.java
		Iterable<User> findAll = userRepository.findAll();
=======
		Iterable<User> findAll = UserRepository.findAll();
>>>>>>> develop:backend/src/main/java/com/mingeso/grupo5/proyecto/UserController.java
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewUser (
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam String sectionName,
            @RequestParam String UserName) {
		

        User n = new User();
<<<<<<< HEAD:backend/src/main/java/com/mingeso/grupo5/proyecto/controllers/UserController.java
        n.setUserName(userName);
=======
        n.setUserName(UserName);
>>>>>>> develop:backend/src/main/java/com/mingeso/grupo5/proyecto/UserController.java
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSectionName(sectionName);
		UserRepository.save(n);
		return "Usuarix guardadx";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateUser (
			@RequestParam Integer IdUser,
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam String sectionName,
            @RequestParam String UserName) {
		

		User n = new User();
<<<<<<< HEAD:backend/src/main/java/com/mingeso/grupo5/proyecto/controllers/UserController.java
		n.setUserName(userName);
=======
		n.setUserName(UserName);
>>>>>>> develop:backend/src/main/java/com/mingeso/grupo5/proyecto/UserController.java
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSectionName(sectionName);
		UserRepository.save(n);
		return "Usuarix actualizadx";
	}
	
	@GetMapping(path="/search/{IdUser}")
	public @ResponseBody User findOne(@PathVariable("IdUser") Integer IdUser) {
<<<<<<< HEAD:backend/src/main/java/com/mingeso/grupo5/proyecto/controllers/UserController.java
		User retorno = userRepository.findById(IdUser).get();
=======
		User retorno = UserRepository.findById(IdUser).get();
>>>>>>> develop:backend/src/main/java/com/mingeso/grupo5/proyecto/UserController.java
		return retorno;
	}
	
	@RequestMapping(value = "/delete/{IdUser}")
    public @ResponseBody String delete(@PathVariable("IdUser") Integer IdUser) {
		
        UserRepository.deleteById(IdUser);
		return "Usuarix eliminadx";
	}
	
	
}
