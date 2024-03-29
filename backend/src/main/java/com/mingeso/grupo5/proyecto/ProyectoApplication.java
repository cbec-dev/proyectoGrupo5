package com.mingeso.grupo5.proyecto;

import com.mingeso.grupo5.proyecto.helpers.SingleLogger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ProyectoApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ProyectoApplication.class);
    }
	public static void main(String[] args) {

		SpringApplication.run(ProyectoApplication.class, args);
		
	}
}