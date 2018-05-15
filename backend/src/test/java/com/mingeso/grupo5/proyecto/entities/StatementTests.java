package com.mingeso.grupo5.proyecto.entities;


import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StatementTests {


    @Test
    public void getIdStatement() {
        String name = "Tarea 1";
        String text = "Instrucciones";
        Section section = new Section();

        Statement testStatement = new Statement();
        testStatement.setIdStatement(1);
        testStatement.setStatementName(name);
        testStatement.setStatementText(text);
        testStatement.setStatementSection(section);

        Assert.assertNotNull(testStatement.getIdStatement());
    }

    @Test
    public void getStatementName() {
        String name = "Tarea 1";
        String text = "Instrucciones";
        Section section = new Section();

        Statement testStatement = new Statement();
        testStatement.setIdStatement(1);
        testStatement.setStatementName(name);
        testStatement.setStatementText(text);
        testStatement.setStatementSection(section);

        Assert.assertNotNull(testStatement.getStatementName());
    }

    @Test
    public void getStatementText() {
        String name = "Tarea 1";
        String text = "Instrucciones";
        Section section = new Section();

        Statement testStatement = new Statement();
        testStatement.setIdStatement(1);
        testStatement.setStatementName(name);
        testStatement.setStatementText(text);
        testStatement.setStatementSection(section);

        Assert.assertNotNull(testStatement.getStatementText());
    }

    @Test
    public void getStatementSection() {
        String name = "Tarea 1";
        String text = "Instrucciones";
        Section section = new Section();

        Statement testStatement = new Statement();
        testStatement.setIdStatement(1);
        testStatement.setStatementName(name);
        testStatement.setStatementText(text);
        testStatement.setStatementSection(section);

        Assert.assertNotNull(testStatement.getStatementSection());
    }

    @Test
    public void setIdStatement() {

        Statement testStatement = new Statement();

        testStatement.setIdStatement(2);
        Assert.assertEquals(Integer.valueOf(2), testStatement.getIdStatement());
        
    }

    @Test
    public void setStatementName() {

        String name = "Tarea1";

        Statement testStatement = new Statement();
        testStatement.setStatementName(name);
        
        Assert.assertEquals(name, testStatement.getStatementName());
        
    }

    @Test
    public void setStatementText() {
        
        String text = "Instrucciones";

        Statement testStatement = new Statement();
        testStatement.setStatementName(text);
        
        Assert.assertEquals(text, testStatement.getStatementText());
    }

    @Test
    public void setStatementSection() {

        Section section = new Section();

        Statement testStatement = new Statement();
        testStatement.setStatementSection(section);

        Assert.assertEquals(section, testStatement.getStatementSection());
    }
    
}