package com.mingeso.grupo5.proyecto;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class section{
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idSection;
    @NotNull
	private String sectionName;
    @NotNull
	private Integer idProfesor;
	
	 
}