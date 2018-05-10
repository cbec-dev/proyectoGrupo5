package com.mingeso.grupo5.proyecto.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Solution {
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private Integer IdSolution;
	 
	 @NotNull
	 private Integer IdStatement;
	 
	 @NotNull
	 private String solutionName;
	 
	 @NotNull
	 private String solutionText;
	 
	 @NotNull
	 private Integer idUser;

	 @OneToOne
	 private Statement statement;
	 
	 public Integer getIdSolution() {
		 return this.IdSolution;
	 }
	 
	 public void setIdSolution(Integer id) {
		 this.IdSolution = id;
	 }
	 
	 public Integer getIdStatement() {
		 return this.IdStatement;
	 }
	 
	 public void setIdStatement(Integer id) {
		 this.IdStatement = id;
	 }
	 
	 public String getSolutionName() {
		 return this.solutionName;
	 }
	 public void setSolutionName(String name) {
		 this.solutionName = name;
	 }
	 
	 public String getSolutionText() {
		 return this.solutionText;
	 }
	 
	 public void setSolutionText(String text) {
		 this.solutionText = text;
	 }
	 
	 public Integer getIdUser() {
		 return this.idUser;
	 }
	 public void setIdUser(Integer id) {
		 this.idUser = id;
	 }
	 
}
