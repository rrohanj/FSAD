package com.vibecheck;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="artists")
@Data
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String genre;
    private Integer pledges;
    private Integer goal;
    private String city;
    private Integer eco; // Must be 'eco' to match your React frontend
    private String bio;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public Integer getPledges() {
		return pledges;
	}
	public void setPledges(Integer pledges) {
		this.pledges = pledges;
	}
	public Integer getGoal() {
		return goal;
	}
	public void setGoal(Integer goal) {
		this.goal = goal;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Integer getEco() {
		return eco;
	}
	public void setEco(Integer eco) {
		this.eco = eco;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
}