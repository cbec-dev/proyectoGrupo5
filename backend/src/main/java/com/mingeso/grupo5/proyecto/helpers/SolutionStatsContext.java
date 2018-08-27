package com.mingeso.grupo5.proyecto.helpers;

import java.util.ArrayList;

import com.mingeso.grupo5.proyecto.entities.Solution;

public class SolutionStatsContext {
    private SolutionStatsStrategy strategy;

    //Este método setea la estrategia a utilizar
    public void setStatsStrategy(SolutionStatsStrategy strategy) {
      this.strategy = strategy;
    }


    //Este método utiliza el algoritmo de la estrategia seteada
    public Float execStrat(ArrayList<Solution> solutions) {
      return strategy.getStats(solutions);
    }
}