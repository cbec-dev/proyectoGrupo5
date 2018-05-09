package com.mingeso.grupo5.proyecto;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Career{
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idCareer;
    @NotNull
	private Integer idUser;
	@NotNull
    private String careerName;
    
    public Integer getIdCareer() {
        return this.idCareer;
    }
    
    public void setIdCareer(Integer id) {
        this.idCareer = id;
    }

    public Integer getIdUser() {
        return this.idUser;
    }
    
    public void setIdUser(Integer id) {
        this.idUser = id;
    }
    public String getCareerName() {
        return this.careerName;
    }
    public void setCareerName(String name) {
        this.careerName = name;
    }
	 
}