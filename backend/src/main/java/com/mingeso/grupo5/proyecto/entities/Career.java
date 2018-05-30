package com.mingeso.grupo5.proyecto.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Career{
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idCareer;
	@NotNull
    private String careerName;
    
    public Integer getIdCareer() {
        return this.idCareer;
    }
    
    public void setIdCareer(Integer id) {
        this.idCareer = id;
    }
    public String getCareerName() {
        return this.careerName;
    }
    public void setCareerName(String name) {
        this.careerName = name;
    }
	 
}