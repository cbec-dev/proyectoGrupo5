package com.mingeso.grupo5.proyecto.entities;
import java.util.Date;
import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Column;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;


@Entity
public class Statement {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer idStatement;

    @NotNull
    private String statementName;
    @Lob
    @NotNull
    private String statementText;
    @ManyToOne
    private Section section;
    @Lob
    @NotNull
    private String header;
    private Date initialDate;
    private Date finalDate;
    private Boolean isActive;
    @ManyToOne
    private ExpectedSolution expectedSolution;


    public Integer getIdStatement() {
        return this.idStatement;
    }
    
    public void setIdStatement(Integer id) {
        this.idStatement = id;
    }

    public Date getFinalDate() {
        return this.finalDate;
    }
    
    public void setFinalDate(Date finalDate) {
        this.finalDate = finalDate;
    }

    public Date getInitialDate() {
        return this.initialDate;
    }
    
    public void setInitialDate(Date initialDate) {
        this.initialDate = initialDate;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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

    public void setExpectedSolution(ExpectedSolution expectedSolution){
        this.expectedSolution=expectedSolution;
    }
    public ExpectedSolution getExpectedSolution(){
        return this.expectedSolution;
    }

}
