package com.mingeso.grupo5.proyecto;

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class Compiler {

    public void compilePython(String code) throws IOException
    {
        String fileName = "code";
        FileWriter fileWriter = new FileWriter(fileName);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.print(code);
        printWriter.close();

        String command = "python code.py";
        Process p = Runtime.getRuntime().exec(command);


        BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
        //String output = in.readLine();
        String output = in.toString();
        System.out.println(output);
    }
}