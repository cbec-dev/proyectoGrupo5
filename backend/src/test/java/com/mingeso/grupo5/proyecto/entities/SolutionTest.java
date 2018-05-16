package com.mingeso.grupo5.proyecto.entities;

import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.Solution;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SolutionTest {
	@Test
    public void getIdSolution() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();

        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setIdStatement(idStatement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setIdUser(idUser);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getIdSolution());
    }
	@Test
	public void getIdStatement() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();

        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setIdStatement(idStatement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setIdUser(idUser);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getIdStatement());
    }
	@Test
	public void getSolutionName() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();

        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setIdStatement(idStatement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setIdUser(idUser);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getSolutionName());
    }
	@Test
	public void getSolutionText() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();

        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setIdStatement(idStatement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setIdUser(idUser);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getSolutionText());
    }
	@Test
	public void getIdUser() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();

        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setIdStatement(idStatement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setIdUser(idUser);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getIdUser());
    }
	@Test
	public void getStatement() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();

        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setIdStatement(idStatement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setIdUser(idUser);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getStatement());
    }
	@Test
    public void setIdSolution() {
        Solution solution = new Solution();

        solution.setIdSolution(2);
        Assert.assertEquals(Integer.valueOf(2), solution.getIdSolution());

    }
	@Test
    public void setIdStatement() {
        Solution solution = new Solution();

        solution.setIdStatement(2);
        Assert.assertEquals(Integer.valueOf(2), solution.getIdStatement());

    }
	@Test
    public void setSolutionName() {
		String solutionName = "solution";
		
        Solution solution = new Solution();

        solution.setSolutionName(solutionName);
        Assert.assertEquals(solutionName, solution.getSolutionName());

    }
	@Test
    public void setSolutionText() {
		String solutionText = "While true";
		
        Solution solution = new Solution();

        solution.setSolutionText(solutionText);
        Assert.assertEquals(solutionText, solution.getSolutionText());

    }
	@Test
    public void setIdUser() {
       
		Solution solution = new Solution();
        solution.setIdUser(2);
        Assert.assertEquals(Integer.valueOf(2), solution.getIdUser());

    }
	@Test
    public void setStatement() {
		Statement statement = new Statement();
		
        Solution solution = new Solution();

        solution.setStatement(statement);
        Assert.assertEquals(statement, solution.getSolutionText());

    }
}
