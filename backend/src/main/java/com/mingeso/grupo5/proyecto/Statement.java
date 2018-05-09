package com.mingeso.grupo5.proyecto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Statement {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @NotNull
    private String statementName;

    @NotNull
    private String statementText;


    public Integer getIdStatement() {
        return this.id;
    }
    
    public void setIdStatement(Integer id) {
        this.id = id;
    }

    public String getStatementName() {
        return this.statementName;
    }
    
    public void setStatementName(String name) {
        this.statementName = name;
    }

    public String getStatementText() {
        return this.statementText;
    }
    
    public void setStatementText(String text) {
        this.statementText = text;
    }
}
