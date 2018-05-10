package com.mingeso.grupo5.proyecto.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Statement {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idStatement;

    @NotNull
    private String statementName;

    @NotNull
    private String statementText;

    @OneToOne
    private Section section;

    public Integer getIdStatement() {
        return this.idStatement;
    }
    
    public void setIdStatement(Integer id) {
        this.idStatement = id;
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
