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
import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.Career;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;
import com.mingeso.grupo5.proyecto.repositories.CareerRepository;
import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import com.mingeso.grupo5.proyecto.controllers.CareerController;
import com.mingeso.grupo5.proyecto.controllers.SectionController;





@Controller   
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/users") 
public class UserController {
	@Autowired 
	private UserRepository userRepository;
	@Autowired
	private CareerRepository careerRepository;
	@Autowired
	private SectionRepository sectionRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<User> getAllUser() {
		
		Iterable<User> findAll = userRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewUser (
            @RequestParam Career career,
            @RequestParam String correo,
            @RequestParam Section section,
			@RequestParam String userName,
			@RequestParam Integer userType) {
		

        User n = new User();
        n.setUserName(userName);
        n.setCorreo(correo);		
        n.setCareer(career);
		n.setSection(section);
		n.setUserType(userType);
		userRepository.save(n);
		return "Usuarix guardadx";
	}
	@RequestMapping(value = "/add/{career}/{section}/{userName}/{userType}/{email}", method = { RequestMethod.GET, RequestMethod.POST })
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public User addUser2(@PathVariable("career") Integer career, @PathVariable("section") Integer section, @PathVariable("userName") String userName, @PathVariable("email") String email, @PathVariable("userType") Integer userType) {

			Career c = new Career();
			Section s = new Section();
			c = careerRepository.findById(career).orElse(null);
			System.out.println("Datos: " + c);
			s = sectionRepository.findById(section).orElse(null);
			if(c == null || s == null) {
				
				return null;
				
			}
			System.out.println("Datos: " + s);
			User resource = new User();
			resource.setCareer(c);
			resource.setSection(s);
			resource.setCorreo(email);
			resource.setUserType(userType);
			resource.setUserName(userName);
			return userRepository.save(resource);
		}
		@RequestMapping(value = "/add/{userName}/{userType}/{email}", method = { RequestMethod.GET, RequestMethod.POST })
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public User addProfesor(@PathVariable("userName") String userName, @PathVariable("email") String email, @PathVariable("userType") Integer userType) {

			User resource = new User();
			resource.setCorreo(email);
			resource.setUserType(userType);
			resource.setUserName(userName);
			return userRepository.save(resource);
		}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public User create(@RequestBody User resource) {
	     return userRepository.save(resource);
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateUser (
			@RequestParam Integer IdUser,
            @RequestParam Career career,
            @RequestParam String correo,
            @RequestParam Section section,
            @RequestParam String userName) {
		

		User n = new User();
		n.setUserName(userName);
        n.setCorreo(correo);		
        n.setCareer(career);
        n.setSection(section);
		userRepository.save(n);
		return "Usuarix actualizadx";
	}
	
	@GetMapping(path="/search/{IdUser}")
	public @ResponseBody User findOne(@PathVariable("IdUser") Integer IdUser) {
		User retorno = userRepository.findById(IdUser).get();
		return retorno;
	}
	@GetMapping(path="/searchbyEmail/{email}")
	public @ResponseBody User findOneEmail(@PathVariable("email") String email) {
		User retorno = userRepository.findBycorreo(email);
		System.out.println("USUARIO ENCONTRADO: " + retorno.getUserName());
		return retorno;
	}
	

	@GetMapping(path="/searchtype/{typeUser}")
	public @ResponseBody Iterable<User> findByType(@PathVariable("typeUser") Integer typeUser) {
		Iterable<User> retorno = userRepository.findByuserType(typeUser);
		return retorno;
	}

	@RequestMapping(value = "/searchby/{email}", method = RequestMethod.GET)
	@ResponseBody
	public  User findByE(@PathVariable("email") String email) {
		return userRepository.findBycorreo(email);
	}

	
	@RequestMapping(value = "/delete/{IdUser}")
    public @ResponseBody String delete(@PathVariable("IdUser") Integer IdUser) {
		
        userRepository.deleteById(IdUser);
		return "Usuarix eliminadx";
	}
	
	
}
