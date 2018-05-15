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

    
}