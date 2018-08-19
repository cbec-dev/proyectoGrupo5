package com.mingeso.grupo5.proyecto.helpers;

import java.util.ArrayList;

import com.mingeso.grupo5.proyecto.entities.Solution;

public class SolutionSorterContext {
    private SolutionSorterStrategy strategy;

    //Este método setea la estrategia a utilizar
    public void setSolutionSorterStrategy(SolutionSorterStrategy strategy) {
      this.strategy = strategy;
    }


    //Este método utiliza el algoritmo de la estrategia seteada
    public void createArchive(ArrayList<Solution> solutions) {
    strategy.sortSolutions(solutions);
    }
}