package com.mingeso.grupo5.proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import com.mingeso.grupo5.proyecto.entities.TestCase;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.entities.Career;
import com.mingeso.grupo5.proyecto.entities.ExpectedSolution;
import com.mingeso.grupo5.proyecto.entities.Section;
import com.mingeso.grupo5.proyecto.entities.Solution;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import com.mingeso.grupo5.proyecto.helpers.Compiler;
import com.mingeso.grupo5.proyecto.helpers.GraphValues;
import com.mingeso.grupo5.proyecto.helpers.SolutionStatsContext;
import com.mingeso.grupo5.proyecto.helpers.statstrategies.TimeStats;
import com.mingeso.grupo5.proyecto.repositories.CareerRepository;
import com.mingeso.grupo5.proyecto.repositories.SectionRepository;
import com.mingeso.grupo5.proyecto.repositories.SolutionRepository;
import com.mingeso.grupo5.proyecto.repositories.UserRepository;

@Controller
@CrossOrigin(origins = "http://209.97.152.30:5050")
@RequestMapping(path="/api/compiler")



public class CompilerController {
    @Autowired 
    private SolutionRepository solutionRepository;
	@Autowired
    private CareerRepository careerRepository;
    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
	private UserRepository userRepository;
    
    @GetMapping(path="/languages")
	public @ResponseBody String getAll() throws IOException {

        Compiler compiler = new Compiler();
        
		return "languages";
    }

    @RequestMapping(value = "/runCode", method = RequestMethod.POST)    
    public @ResponseBody String runCode(
            @RequestParam String code,
            @RequestParam String lang) throws IOException {
            /*if(lang=="c"){
                uwu.split(" ")[1].split("\\(")[0]    
            }
            else if(lang=="python"){

            }
            else{
                //java
            }*/
            Compiler compiler = new Compiler();
            String out = compiler.run(code, lang); 
    
            return out;
        }

    @RequestMapping(path="/checkCode", method = RequestMethod.POST)
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
            if(Compiler.checkVariables(code, lang)==1) variables = variables + "Correcto";
            else variables = variables + "Incorrecto";

            //Checkear identación
            if(Compiler.checkIdentacion(code, lang)==1) identation = identation + "Correcto";
            else identation = identation + "Incorrecto";

            //Checkear comentarios
            if(Compiler.checkCommentaries(code, lang)==1) comments = comments + "Correcto";
            else comments = comments + "Incorrecto";


            String feedback = header + "\n" + structure + "\n" + variables + "\n" + identation + "\n" + comments + "\n";

			return feedback;

        }

    @RequestMapping(path="/checkSolutions", method = RequestMethod.POST)
    @ResponseBody List<String> checkSolutions(
        @RequestParam String code,
        @RequestParam String lang,
        @RequestParam(value = "expectedSolution", required = false) List<String> expectedSolution,
        @RequestParam(value = "testCases", required = false) List<String> testCases) throws IOException {

            String salidas_string = "Salidas: ";
            String test_cases = "Casos de prueba totales: ";
            String test_cases_string = "Casos de prueba: ";
            String expected = "Soluciones Esperadas: ";
            int casos_exitosos = 0;
            test_cases = test_cases + testCases.size();
            List<String> salidas = new ArrayList<String>();
            List<String> retorno = new ArrayList<String>();
            for(String str : expectedSolution){
                expected = expected + str + "\n";
            }
            for(String str : testCases){
                String new_code = code.replace("entradas", str);
                Compiler compiler = new Compiler();
                salidas.add(compiler.run(new_code, lang)); 
            }
            for(String str : salidas){
                salidas_string = salidas_string +str.split(",")[0].split(":")[1] +" " +str.split(",")[1].split(":")[1] + " " + str.split(",")[2].split(":")[1].split("}")[0]+ "\n";
            }
            for(String str : testCases){
                test_cases_string = test_cases_string + str + "\n";
            }
            for (int i = 0; i<expectedSolution.size();i++){
            if(salidas.get(i).split(",")[0].split(":")[1].contains(expectedSolution.get(i))){
                casos_exitosos = casos_exitosos+1;
            }
        }
            //for (int i=0; i<solutions.size();i++){
            //if(userSolution.equals(solutions.get(i))){
            //    retorno=1;
            //    return retorno;
            //}

        //}



            String feedback = test_cases+ "\n" +salidas_string + test_cases_string + expected;
            retorno.add(feedback);
            retorno.add(""+testCases.size());
            retorno.add(""+casos_exitosos);
            return retorno;

        }

        @RequestMapping(value="/getStats", method = RequestMethod.POST)
        @ResponseBody String getStats(
            @RequestParam String filter,
            @RequestParam String method) throws IOException {
                String out = "";

                //Se obtiene la lista de soluciones base
                ArrayList<Career> careers = (ArrayList<Career>) careerRepository.findAll();
                ArrayList<Section> sections = (ArrayList<Section>) sectionRepository.findAll();

                ArrayList<String> x = new ArrayList<String>();
                ArrayList<Float> y = new ArrayList<Float>();
                ArrayList<GraphValues> values = new ArrayList<GraphValues>();
    
                //Se crea contexto y se elige método a utilizar
                SolutionStatsContext ctx = new SolutionStatsContext();
                switch (method) {
                    case "time":	ctx.setStatsStrategy(new TimeStats());
                                    break;
                    
                    default:        ctx=null;
                                    break;
                }
    
                if(filter.equals("career"))
                {
                    out = out + "inside the if statement";
                    for(Career car : careers){
                        Iterable<User> users = userRepository.findByCareer(car);
                        ArrayList<Solution> sols = new ArrayList<Solution>();

                        for(User user : users){
                            Iterable<Solution> solsAux = solutionRepository.findByUser(user);
                            for(Solution solAux : solsAux){
                                sols.add(solAux);
                             }
                        }

                        GraphValues currentValue = new GraphValues();
                        currentValue.setGroup(car.getCareerName());
                        currentValue.setValue(ctx.getStats(sols));

                        values.add(currentValue);

                    }
                }
    
                // if (solutions.size()==0) return "ERROR: no se han encontrado soluciones.";
    
                //String out = ctx.getStats(solutions).toString();
                String out2 = method + " - " + filter;
                Integer out3 = values.size();

                return values.toString();
        }
    
}

    

