package com.mingeso.grupo5.proyecto.helpers.statstrategies;

import java.util.ArrayList;

import com.mingeso.grupo5.proyecto.entities.Solution;
import com.mingeso.grupo5.proyecto.helpers.SolutionStatsStrategy;

public class TimeStats implements SolutionStatsStrategy {

	@Override
	public String getStats(ArrayList<Solution> solutions) {
		String timeStats = "";

		String header = "Estadísticas de tiempo: ";
		String total = "Tiempo total invertido: ";
		String prom = "Tiempo promedio invertido: ";

		int totalTime = 0;	//Tiempo total
		float promTime = 0;	//Tiempo promedio
		int size = solutions.size(); //Cantidad total de soluciones
		for(Solution sol : solutions){
			totalTime += sol.getTime();
		}

		promTime = (float) totalTime/size;


		total = total + Integer.toString(totalTime) + "segundos.";
		prom = prom + Float.toString(promTime) + "segundos.";

		timeStats = header + "\n" + total + "\n" + prom + "\n";

		return timeStats;
	}
}