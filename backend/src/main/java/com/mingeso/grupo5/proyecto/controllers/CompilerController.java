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
    public @ResponseBody String runCode(
        @RequestParam String code,
        @RequestParam String lang) throws IOException {

        Compiler compiler = new Compiler();
        
        String out = compiler.run(code, lang);
		return out;
    }

    @GetMapping(path="/checkCode")
    @ResponseBody String checkCode(
        @RequestParam String code,
        @RequestParam String lang) throws IOException {

            String header = "Calidad del código:";
            String structure = "Estructura: ";
            String variables = "Variables: ";
            String identation = "Identación: ";
            String comments = "Comentarios: ";

            //Se checkea estructura del código
            if(Compiler.codeStructureCheck(code, lang)==1) structure = structure + "Correcto";
            else structure = structure + "Incorrecto";

            //Checkear variables

            //Checkear identación

            //Checkear comentarios


            String out = header + "\n" + structure + "\n" + variables + "\n" + identation + "\n" + comments + "\n";
			return out;

        }
    
}