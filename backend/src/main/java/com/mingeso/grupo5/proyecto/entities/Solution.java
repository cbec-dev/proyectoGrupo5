package com.mingeso.grupo5.proyecto.entities;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.entities.Statement;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;


@Entity
public class Solution {
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	 private Integer IdSolution;
	 @NotNull
	 private String solutionName;
	 @NotNull
	 private String solutionText;
	 @OneToOne
	 private User user;
	 @OneToOne
	 private Statement statement;
	 private Date date;
	 private Integer score;
	 private Integer testCasesSuccess;
	 private Integer testCasesFailed;
	 private Integer time;
	 
	 public Integer getIdSolution() {
		 return this.IdSolution;
	 }
	 
	 public void setIdSolution(Integer id) {
		 this.IdSolution = id;
	 }
	 
	 public String getSolutionName() {
		 return this.solutionName;
	 }
	 public void setSolutionName(String name) {
		 this.solutionName = name;
	 }
	 
	 public Date getDate() {
		return this.date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	 public String getSolutionText() {
		 return this.solutionText;
	 }
	 
	 public void setSolutionText(String text) {
		 this.solutionText = text;
	 }
	 
	 public User getUser() {
		 return this.user;
	 }
	 public void setUser(User user) {
		 this.user = user;
	 }
	 
	 public Statement getStatement() {
		 return this.statement;
	 }
	 public void setStatement(Statement statement) {
		 this.statement = statement;
	 }
	 public Integer getScore() {
		 return this.score;
	 }
	 public void setScore(Integer score) {
		 this.score = score;
	 }
	 public Integer getTestCasesSuccess() {
		 return this.testCasesSuccess;
	 }
	 public void setTestCasesSuccess(Integer testCasesSuccess) {
		 this.testCasesSuccess = testCasesSuccess;
	 }
	 public Integer getTestCasesFailed() {
		 return this.testCasesFailed;
	 }
	 public void setTestCasesFailed(Integer testCasesFailed) {
		 this.testCasesFailed = testCasesFailed;
	 }
	 public Integer getTime() {
		 return this.time;
	 }
	 public void setTime(Integer time) {
		 this.time = time;
	 }
}
