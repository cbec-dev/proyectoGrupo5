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
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idTestCase;
    @NotNull
    private String testCase;
    @ManyToOne
    private Statement statement;

    public Integer getIdTestCase() {
        return this.idTestCase;
    }
    
    public void setIdTestCase(Integer id) {
        this.idTestCase = id;
    }
    public Statement getStatement() {
        return this.statement;
    }
    
    public void setStatement(Statement statement) {
        this.statement =statement;
    }
    public String gettestCase() {
        return this.testCase;
    }
    
    public void settestCase(String name) {
        this.testCase = name;
    }
}