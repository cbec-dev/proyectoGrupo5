package com.mingeso.grupo5.proyecto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Statement {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

}