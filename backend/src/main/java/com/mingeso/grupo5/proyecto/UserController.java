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
import com.mingeso.grupo5.proyecto.User;
import com.mingeso.grupo5.proyecto.UserRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/Users") 
public class UserController {
	@Autowired 
	private UserRepository UserRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<User> getAllUser() {
		
		Iterable<User> findAll = UserRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewUser (
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam String sectionName,
            @RequestParam String UserName) {
		

        User n = new User();
        n.setUserName(UserName);
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
		n.setUserName(UserName);
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSectionName(sectionName);
		UserRepository.save(n);
		return "Usuarix actualizadx";
	}
	
	@GetMapping(path="/search/{IdUser}")
	public @ResponseBody User findOne(@PathVariable("IdUser") Integer IdUser) {
		User retorno = UserRepository.findById(IdUser).get();
		return retorno;
	}
	
	@RequestMapping(value = "/delete/{IdUser}")
    public @ResponseBody String delete(@PathVariable("IdUser") Integer IdUser) {
		
        UserRepository.deleteById(IdUser);
		return "Usuarix eliminadx";
	}
	
	
}
