package com.mingeso.grupo5.proyecto.helpers.statstrategies;

import java.util.ArrayList;

import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.helpers.SolutionStatsStrategy;

public class TimeStats implements SolutionStatsStrategy {

	@Override
	public Float getStats(ArrayList<Solution> solutions) {
		int totalTime = 0;	//Tiempo total
		float promTime = 0;	//Tiempo promedio
		int size = solutions.size(); //Cantidad total de soluciones
		for(Solution sol : solutions){
			if(sol.getTime()!=null) {
				totalTime += sol.getTime();
			}
		}
		if (totalTime==0) {
			promTime = (float) 0;
		}
		else {
			promTime = (float) totalTime/size;
		}

		return promTime;
	}
}