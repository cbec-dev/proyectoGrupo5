package com.mingeso.grupo5.proyecto.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Section{
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idSection;
    @NotNull
	private String sectionName;
    
    public Integer getIdSection() {
        return this.idSection;
    }
    
    public void setIdSection(Integer id) {
        this.idSection = id;
    }
    
    public String getSectionName() {
        return this.sectionName;
    }
    public void setSectionName(String name) {
        this.sectionName = name;
    }
    	
	 
}