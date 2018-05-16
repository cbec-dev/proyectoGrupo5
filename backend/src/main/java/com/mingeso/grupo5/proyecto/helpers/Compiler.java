package com.mingeso.grupo5.proyecto.helpers;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.hibernate.loader.custom.Return;

public class Compiler {

    public String compilePythonOLD(String code) throws IOException
    {
        String fileName = "code.py";
        FileWriter fileWriter = new FileWriter(fileName);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.print(code);
        printWriter.close();

        String command = "python code.py";
        Process p = Runtime.getRuntime().exec(command);


        BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
        //String output = in.readLine();
        String output = in.toString();
        //System.out.println(output);
        return output;
    }

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

    public String run(String code) throws IOException
    {
        //Conección y headers
        URL url = new URL("https://run.glot.io/languages/python/2");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Token 630953e5-4643-4643-b7e0-107713756318");
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);

        //Parametros
        String params = "{\"files\": [{\"name\": \"main.py\", \"content\": \"" + code +"\"}]}";

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
}