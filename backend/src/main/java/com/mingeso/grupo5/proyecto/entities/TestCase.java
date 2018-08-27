package com.mingeso.grupo5.proyecto.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.persistence.ManyToOne;


@Entity
public class TestCase {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idTestCase;
    @NotNull
    private String testCase;

    public Integer getIdTestCase() {
        return this.idTestCase;
    }
    
    public void setIdTestCase(Integer id) {
        this.idTestCase = id;
    }
    public String gettestCase() {
        return this.testCase;
    }
    
    public void settestCase(String name) {
        this.testCase = name;
    }
}
