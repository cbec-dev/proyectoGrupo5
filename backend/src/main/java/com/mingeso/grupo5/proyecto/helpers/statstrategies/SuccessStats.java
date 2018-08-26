package com.mingeso.grupo5.proyecto.helpers.statstrategies;

import java.util.ArrayList;

import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.helpers.SolutionStatsStrategy;

public class SuccessStats implements SolutionStatsStrategy {

	@Override
	public Float getStats(ArrayList<Solution> solutions) {
		double totalSuccess = 0;	//Exito total
		float promSuccess = 0;	//Exito promedio
		int size = solutions.size(); //Cantidad total de soluciones
		for(Solution sol : solutions){
			if(sol.getpSuccess()!=null) {
				totalSuccess += sol.getpSuccess();
			}
		}
		if (totalSuccess==0) {
			promSuccess = (float) 0;
		}
		else {
			promSuccess = (float) totalSuccess/size;
		}

		return promSuccess;
	}
}