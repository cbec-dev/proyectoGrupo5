package com.mingeso.grupo5.proyecto.entities;

import com.mingeso.grupo5.proyecto.entities.Statement;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.entities.Section;
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
        String solutionName = "solucion";
        String solutionText = "while True";
        User user = new User();
        user.setIdUser(1);
        user.setUserName("name");
        user.setUserType(1);
        user.setCorreo("correo@usach.cl");
        Section section = new Section();
        section.setIdSection(1);
        section.setSectionName("A-1");
        Statement statement = new Statement();
        statement.setIdStatement(1);
        statement.setHeader("header");
        statement.setStatementName("name");
        statement.setStatementText("text");
        statement.setSection(section);
        Solution solution= new Solution();
        solution.setIdSolution(1);
        solution.setStatement(statement);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setUser(user);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getIdSolution());
    }
	@Test
	public void getSolutionName() {
        Integer idStatement = 1;
        String solutionName = "solucion";
        String solutionText = "while True";
        Integer idUser = 1;
        Statement statement = new Statement();
        Solution solution= new Solution();
        User user = new User();
        user.setIdUser(1);
        user.setUserName("name");
        user.setUserType(1);
        user.setCorreo("correo@usach.cl");
        Section section = new Section();
        section.setIdSection(1);
        section.setSectionName("A-1");
        statement.setHeader("header");
        statement.setStatementName("name");
        statement.setStatementText("text");
        statement.setSection(section);
        solution.setIdSolution(1);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setStatement(statement);
        solution.setUser(user);
        

        Assert.assertNotNull(solution.getSolutionName());
    }
	@Test
	public void getSolutionText() {

        String solutionName = "solucion";
        String solutionText = "while True";
        Statement statement = new Statement();
        Solution solution= new Solution();
        User user = new User();
        user.setIdUser(1);
        user.setUserName("name");
        user.setUserType(1);
        user.setCorreo("correo@usach.cl");
        Section section = new Section();
        section.setIdSection(1);
        section.setSectionName("A-1");
        statement.setHeader("header");
        statement.setStatementName("name");
        statement.setStatementText("text");
        statement.setSection(section);
        solution.setIdSolution(1);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setUser(user);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getSolutionText());
    }
	@Test
	public void getUser() {
        String solutionName = "solucion";
        String solutionText = "while True";
        Statement statement = new Statement();
        Solution solution= new Solution();
        User user = new User();
        user.setIdUser(1);
        user.setUserName("name");
        user.setUserType(1);
        user.setCorreo("correo@usach.cl");
        Section section = new Section();
        section.setIdSection(1);
        section.setSectionName("A-1");
        statement.setHeader("header");
        statement.setStatementName("name");
        statement.setStatementText("text");
        statement.setSection(section);
        solution.setIdSolution(1);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setUser(user);
        solution.setStatement(statement);
        

        Assert.assertNotNull(solution.getUser());
    }
	@Test
	public void getStatement() {
        String solutionName = "solucion";
        String solutionText = "while True";
        Statement statement = new Statement();
        Solution solution= new Solution();
        User user = new User();
        user.setIdUser(1);
        user.setUserName("name");
        user.setUserType(1);
        user.setCorreo("correo@usach.cl");
        Section section = new Section();
        section.setIdSection(1);
        section.setSectionName("A-1");
        statement.setHeader("header");
        statement.setStatementName("name");
        statement.setStatementText("text");
        statement.setSection(section);
        solution.setIdSolution(1);
        solution.setSolutionName(solutionName);
        solution.setSolutionText(solutionText);
        solution.setUser(user);
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
    public void setUser() {
       
		Solution solution = new Solution();
        User user = new User();
        user.setIdUser(1);
        user.setCorreo("correo");
        user.setUserName("name");
        user.setUserType(1);
        solution.setUser(user);
        Assert.assertEquals(user, solution.getUser());

    }
	@Test
    public void setStatement() {
		Statement statement = new Statement();
		
        Solution solution = new Solution();

        solution.setStatement(statement);
        Assert.assertEquals(statement, solution.getStatement());

    }
}
