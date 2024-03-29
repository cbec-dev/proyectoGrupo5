package com.mingeso.grupo5.proyecto.helpers;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


public class Compiler {
    
    public String getLanguages() throws IOException
    {
        URL url = new URL("https://run.glot.io/languages");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        int status = con.getResponseCode();

        BufferedReader in = new BufferedReader(
        new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        con.disconnect();

        String out = content.toString();
		return out;
    }

    public String run(String code, String lang) throws IOException
    {
        //Se agrega backslash de escape a posibles comillas dobles
        code = code.replaceAll("\"", "\\\\\"");

        //Conección y headers
        URL url = new URL("https://run.glot.io/languages/python/2");
        if(lang.equals("python")) url = new URL("https://run.glot.io/languages/python/2");
        if(lang.equals("c")) url = new URL("https://run.glot.io/languages/c/latest");
        if(lang.equals("java")) url = new URL("https://run.glot.io/languages/java/latest");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Token 630953e5-4643-4643-b7e0-107713756318");
        con.setConnectTimeout(10000);
        con.setReadTimeout(10000);

        //Parametros
        String params = "";
        if(lang.equals("python")) params = "{\"files\": [{\"name\": \"main.py\", \"content\": \"" + code +"\"}]}";
        if(lang.equals("c")) params = "{\"files\": [{\"name\": \"main.c\", \"content\": \"" + code +"\"}]}";
        if(lang.equals("java")) params = "{\"files\": [{\"name\": \"Main.java\", \"content\": \"" + code +"\"}]}";


        con.setDoOutput(true);
        DataOutputStream out = new DataOutputStream(con.getOutputStream());
        out.writeBytes(params);
        out.flush();
        out.close();



        int status = con.getResponseCode();

        BufferedReader in = new BufferedReader(
        new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        con.disconnect();

		return content.toString();
    }

    public int compareSolutions(String userSolution, List <String> solutions){
        int retorno=0;
        for (int i=0; i<solutions.size();i++){
            if(userSolution.equals(solutions.get(i))){
                retorno=1;
                return retorno;
            }
        }
        return retorno;
    }
    
    public static int checkCommentaries(String code, String lang) {
    	boolean comentarios = false;
    	
    	//Se busca que al menos hayan 3 comentarios a parte de los comenatrios que indican entrada,procesamiento y salida
    	switch (lang) {
    	
        case "python":  comentarios = code.matches("(.*#.*){6,}");
                        break;
        case "c":       comentarios = code.matches("((?is).*//.*){6,}");
                        break;
        case "java":    comentarios = code.matches("((?is).*//.*){6,}");
                        break;
        default:        comentarios = false;
                        break;
    	}
    	
    	if (comentarios) {
    		return 1;
    	}
    	else {
    		return 0;
    	}
    }
    
    
    public static int checkVariables(String code, String lang) {
    	boolean variable = false;
    	//Busca las variables que no cumplan con la longitud minima requerida 
        switch (lang) {
            case "python":  variable = code.matches("(?is).*(^|\\n| )([a-zA-Z0-9_]{1,2})(=| =).*");
                            break;
            case "c":       variable = code.matches("(?is).*(int |char |float |double )([a-zA-Z0-9_*]{1,2})(=| =|;).*");
                            break;
            case "java":    variable = code.matches("(?is).*(int |char |float |double |String )([a-zA-Z0-9_]{1,2})(=| =|;).*");
                            break;
            default:        variable = false;
                            break;
        }
        
        if(variable) return 0;
        
        else return 1;
    }
    
    public static int codeStructureCheck(String code, String lang) {

        boolean entrada = false;
        boolean procesamiento = false;
        boolean salida = false;
        /*Se busca la presencia de comentarios con los contenidos entrada, procesamiento o salida
        en cada posible lenguaje.*/
        switch (lang) {
            case "python":  entrada = code.matches("(?is).*#entrada.*");
                            procesamiento = code.matches("(?is).*#procesamiento.*");
                            salida = code.matches("(?is).*#salida.*");
                            break;
            case "c":       entrada = code.matches("(?is).*//entrada.*");
                            procesamiento = code.matches("(?is).*//procesamiento.*");
                            salida = code.matches("(?is).*//salida.*");
                            break;
            case "java":    entrada = code.matches("(?is).*//entrada.*");
                            procesamiento = code.matches("(?is).*//procesamiento.*");
                            salida = code.matches("(?is).*//salida.*");
                            break;
            default:        entrada = salida = procesamiento = false;
                            break;
        }
        System.out.println("-------BOOLEANS------------");
        System.out.println(entrada);
        System.out.println(procesamiento);
        System.out.println(salida);
        System.out.println("--------------------");

        boolean out = entrada && salida && procesamiento;

        //Si estan todos los comentarios de las secciones requeridas se retorna 1, caso contraro 0.
        if(out) return 1;
        else return 0;
    }
    
    public static int checkIdentacion(String code, String lang) {
    	boolean tab = false;
        String [] cadenas = code.split("\n");
        int contadorTab = 0;
        int largo = cadenas.length;
        //se separa el string code por los saltos de lineas
        //y se busca que al menos haya alguna identacion tanto por
        //tabulacion o por espacios
        for (int i = 0; i<largo;i++) {
	        switch (lang) {
	            case "python":  tab = cadenas[i].matches("^(\t| ).*");
	                            break;
	            case "c":       tab = cadenas[i].matches("^(\t| ).*");
	                            break;
	            case "java":    tab = cadenas[i].matches("^(\t| ).*");
	                            break;
	            default:        tab = false;
	                            break;
	        }
	        if(tab) contadorTab++;
	        tab = false;
	        
        }
        if(contadorTab >= 3) return 1;
        else return 0;
    }
}