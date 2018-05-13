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
	private String correo;
    @NotNull
    private String userName;

    @ManyToOne
    private Section section;

    @ManyToOne
    private Career career;

    public Integer getIdUser() {
        return this.idUser;
    }
    
    public void setIdUser(Integer id) {
        this.idUser = id;
    }

    public String getCorreo() {
        return this.correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getUserName() {
        return this.userName;
    }
    public void setUserName(String name) {
        this.userName = name;
    }

    public Section getSection() {
        return this.section;
    }
    public void setSection(Section section) {
        this.section = section;
    }

    public Career getCareer() {
        return this.career;
    }
    public void setCareer(Career career) {
        this.career = career;
    }

}