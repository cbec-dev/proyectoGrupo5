package com.mingeso.grupo5.proyecto.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class User {
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idUser;
    @NotNull
    private Integer idCareer;
    @NotNull
	private String correo;
	@ManyToOne
    private Section section;
    @NotNull
    private String userName;
    

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
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public Section getSection() {
        return this.section;
    }
    public void setSection(Section section) {
        this.section = section;
    }
    public String getUserName() {
        return this.userName;
    }
    public void setUserName(String name) {
        this.userName = name;
    }

}