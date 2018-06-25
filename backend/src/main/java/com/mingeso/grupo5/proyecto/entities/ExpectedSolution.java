package com.mingeso.grupo5.proyecto.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class ExpectedSolution{
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idExpectedSolution;
	@NotNull
    private String expectedSolution;

    public Integer getIdExpectedSolution() {
        return this.idExpectedSolution;
    }
    public void setIdExpectedSolution(Integer id) {
        this.idExpectedSolution = id;
    }
    public String getExpectedSolution() {
        return this.expectedSolution;
    }
    public void setExpectedSolution(String text) {
        this.expectedSolution = text;
    }
}