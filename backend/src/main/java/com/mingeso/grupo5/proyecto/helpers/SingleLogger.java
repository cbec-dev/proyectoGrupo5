package com.mingeso.grupo5.proyecto.helpers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class SingleLogger {

    private static SingleLogger instance = new SingleLogger();

    public String logname = "log";
    protected String path = System.getProperty("user.dir");;
    private static File logFile;
 
    private SingleLogger(){}
 
    public static SingleLogger getInstance(){
       return instance;
    }
 
    public void showMsg(){
       System.out.println("Hola soy tu logger!");
    }

    public void createLogFile(){
		//Determine if a logs directory exists or not.
		File logsFolder = new File(path + '/' + "logs");
		if(!logsFolder.exists()){
			//Create the directory 
			System.out.println("LOGGER: Se crea nuevo directorio para logs en: " + path);
			logsFolder.mkdir();
			
		}

        //Se obtiene fecha y hora
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	   	Calendar cal = Calendar.getInstance();
	   	
	   	//Se crea el nombre del archivo log-fecha-hora.txt
		logname =  logname + '-' +  dateFormat.format(cal.getTime()) + ".txt";
		SingleLogger.logFile = new File(logsFolder.getName(),logname);
		try{
			if(logFile.createNewFile()){
				// Se crea el archivo
				System.out.println("LOGGER: Se ha creado un nuevo archivo log");	
			}
		}catch(IOException e){
			System.out.println("LOGGER: ERROR, No se pudo crear el archivo log");
			System.exit(1);
        }
    }

    public void log(String msg){
        DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	   	Calendar cal = Calendar.getInstance();
		try{
            FileWriter out = new FileWriter(SingleLogger.logFile, true);
            String time = dateFormat.format(cal.getTime());
            msg = time + " - " + msg;
			out.write(msg.toCharArray());
			out.close();
		}catch(IOException e){
			System.out.println("LOGGER: ERROR, no se pudo escribir en el archivo log");
		}
	}


 }