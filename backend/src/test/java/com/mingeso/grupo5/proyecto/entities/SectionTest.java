package com.mingeso.grupo5.proyecto.entities;
import com.mingeso.grupo5.proyecto.entities.User;
import com.mingeso.grupo5.proyecto.entities.Section;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SectionTest {
	@Test
    public void getidSection(){
       
        String sectionName = "A-1";
        User profesor = new User();

   

        Section section= new Section();
        section.setIdSection(1);
        section.setSectionName(sectionName);
        section.setProfesor(profesor);
        

        Assert.assertNotNull(section.getIdSection());
    }
	
	@Test
    public void getsectionName(){
       
        String sectionName = "A-1";
        User profesor = new User();

   

        Section section= new Section();
        section.setIdSection(1);
        section.setSectionName(sectionName);
        section.setProfesor(profesor);
        

        Assert.assertNotNull(section.getSectionName());
    }
	@Test
    public void getProfesor(){
       
        String sectionName = "A-1";
        User profesor = new User();

   

        Section section= new Section();
        section.setIdSection(1);
        section.setSectionName(sectionName);
        section.setProfesor(profesor);
        

        Assert.assertNotNull(section.getProfesor());
    }
	@Test
    public void setIdSection() {
        Section section = new Section();

        section.setIdSection(2);
        Assert.assertEquals(Integer.valueOf(2), section.getIdSection());

    }
	@Test
    public void setSectionName() {
		String sectionName = "section";
        Section section = new Section();

        section.setSectionName(sectionName);
        Assert.assertEquals(sectionName, section.getSectionName());

    }
	@Test
    public void setProfesor() {
		User profesor = new User();
        Section section = new Section();

        section.setProfesor(profesor);
        Assert.assertEquals(profesor, section.getProfesor());

    }
}