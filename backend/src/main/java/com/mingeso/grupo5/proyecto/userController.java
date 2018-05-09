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
import com.mingeso.grupo5.proyecto.user;
import com.mingeso.grupo5.proyecto.userRepository;
import org.springframework.http.HttpStatus;

@Controller   
@CrossOrigin(origins = "http://104.236.68.75:8080/frontendGrupo5")
@RequestMapping(path="/users") 
public class userController {
	@Autowired 
	private userRepository userRepository;
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<user> getAllUser() {
		
		Iterable<user> findAll = userRepository.findAll();
		return findAll;
	}
	
	@GetMapping(path="/add") 
	public @ResponseBody String addNewUser (
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam String sectionName,
            @RequestParam String userName) {
		

        user n = new user();
        n.setUserName(userName);
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSectionName(sectionName);
		userRepository.save(n);
		return "Usuarix guardadx";
	}
	@GetMapping(path="/update") 
	public @ResponseBody String updateUser (
			@RequestParam Integer IdUser,
            @RequestParam Integer idCareer,
            @RequestParam String correo,
            @RequestParam String sectionName,
            @RequestParam String userName) {
		

		user n = new user();
		n.setUserName(userName);
        n.setCorreo(correo);		
        n.setIdCareer(idCareer);
        n.setSectionName(sectionName);
		userRepository.save(n);
		return "Usuarix actualizadx";
	}
	
	@GetMapping(path="/search/{IdUser}")
	public @ResponseBody user findOne(@PathVariable("IdUser") Integer IdUser) {
		user retorno = userRepository.findById(IdUser).get();
		return retorno;
	}
	
	@RequestMapping(value = "/delete/{IdUser}")
    public @ResponseBody String delete(@PathVariable("IdUser") Integer IdUser) {
		
        userRepository.deleteById(IdUser);
		return "Usuarix eliminadx";
	}
	
	
}
