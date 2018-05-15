package com.mingeso.grupo5.proyecto.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.persistence.ManyToOne;


@Entity
public class Statement {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer idStatement;

    @NotNull
    private String statementName;

    @NotNull
    private String statementText;
    @ManyToOne
    private Section section;
    @NotNull
    private String header;

    public Integer getIdStatement() {
        return this.idStatement;
    }
    
    public void setIdStatement(Integer id) {
        this.idStatement = id;
    }
    public Section getSection() {
        return this.section;
    }
    
    public void setSection(Section section) {
        this.section =section;
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
    public String getHeader() {
        return this.header;
    }
    
    public void setHeader(String header) {
        this.header = header;
    }

}
