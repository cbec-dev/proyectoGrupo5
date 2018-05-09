package com.mingeso.grupo5.proyecto;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class user {
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idUser;
    @NotNull
    private Integer idCareer;
    @NotNull
	private String correo;
	@NotNull
    private String sectionName;
    

    public Integer getIdUser() {
        return this.idUser;
    }
    
    public void setIdUser(Integer id) {
        this.idUser = id;
    }
    public Integer getIdCareer() {
        return this.idCareer;
    }
    
    public void setIdCareer(Integer id) {
        this.idCareer = id;
    }    
    public String getCorreo() {
        return this.correo;
    }
    public void setCareerName(String name) {
        this.correo = name;
    }
    public String getSectionName() {
        return this.sectionName;
    }
    public void setSectionName(String name) {
        this.sectionName = name;
    }

}