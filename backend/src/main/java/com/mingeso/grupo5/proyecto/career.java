package com.mingeso.grupo5.proyecto;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class career{
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idCareer;
    @NotNull
	private Integer idUser;
	@NotNull
	private String careerName;
	 
}