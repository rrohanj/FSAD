package com.vibecheck;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/artists")
@CrossOrigin(origins = "http://localhost:3000") 
public class ArtistController {

    @Autowired
    private ArtistRepository repository;

    @GetMapping
    public List<Artist> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Artist createArtist(@RequestBody Artist artist) {
    	if (artist.getPledges() == null) artist.setPledges(0);
        if (artist.getGoal() == null) artist.setGoal(500);
        if (artist.getEco() == null) artist.setEco(90);
    	return repository.save(artist);
    }
    @PostMapping("/{id}/pledge")
    public Artist addPledge(@PathVariable Long id) {
        Artist artist = repository.findById(id).orElseThrow();
        artist.setPledges(artist.getPledges() + 1);
        return repository.save(artist);
    }

    @DeleteMapping("/{id}/pledge")
    public Artist removePledge(@PathVariable Long id) {
        Artist artist = repository.findById(id).orElseThrow();
        artist.setPledges(Math.max(0, artist.getPledges() - 1));
        return repository.save(artist);
    }
}