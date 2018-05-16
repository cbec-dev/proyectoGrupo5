package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

import com.mingeso.grupo5.proyecto.helpers.Compiler;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/api/compiler")

public class CompilerController {
    @Autowired 
    @GetMapping(path="/languages")
	public @ResponseBody String getAll() throws IOException {

        Compiler compiler = new Compiler();
        
        String languages = compiler.getLanguages();
		return languages;
    }

    @GetMapping(path="/runCode")
    public @ResponseBody String runCode() throws IOException {

        Compiler compiler = new Compiler();
        
        String out = compiler.run("print(400)");
		return out;
    }
    
}