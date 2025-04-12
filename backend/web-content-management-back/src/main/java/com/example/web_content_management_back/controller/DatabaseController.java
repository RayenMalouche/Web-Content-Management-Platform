package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.DatabaseDTO;
import com.example.web_content_management_back.service.DatabaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("databases")
public class DatabaseController {
    private final DatabaseService service;

    public DatabaseController(DatabaseService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DatabaseDTO>> getAllDatabases() {
        return ResponseEntity.ok(service.getAllDatabases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatabaseDTO> getDatabaseById(@PathVariable String id) {
        return ResponseEntity.ok(service.getDatabaseById(id));
    }

    @PostMapping
    public ResponseEntity<DatabaseDTO> createDatabase(@RequestBody DatabaseDTO dto) {
        return ResponseEntity.ok(service.createDatabase(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DatabaseDTO> updateDatabase(@PathVariable String id, @RequestBody DatabaseDTO dto) {
        return ResponseEntity.ok(service.updateDatabase(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatabase(@PathVariable String id) {
        service.deleteDatabase(id);
        return ResponseEntity.noContent().build();
    }
}