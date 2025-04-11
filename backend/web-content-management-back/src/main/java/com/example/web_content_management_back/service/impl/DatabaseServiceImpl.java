package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.DatabaseDTO;
import com.example.web_content_management_back.mapper.DatabaseMapper;
import com.example.web_content_management_back.model.Database;
import com.example.web_content_management_back.repository.DatabaseRepository;
import com.example.web_content_management_back.service.DatabaseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DatabaseServiceImpl implements DatabaseService {
    private final DatabaseRepository repository;
    private final DatabaseMapper mapper;

    public DatabaseServiceImpl(DatabaseRepository repository, DatabaseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<DatabaseDTO> getAllDatabases() {
        return repository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DatabaseDTO getDatabaseById(String id) {
        return repository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Database not found"));
    }

    @Override
    public DatabaseDTO createDatabase(DatabaseDTO dto) {
        Database database = mapper.toEntity(dto);
        return mapper.toDTO(repository.save(database));
    }

    @Override
    public DatabaseDTO updateDatabase(String id, DatabaseDTO dto) {
        Database database = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Database not found"));
        database.setName(dto.getName());
        database.setType(dto.getType());
        database.setConnectionString(dto.getConnectionString());
        database.setDescription(dto.getDescription());
        database.setUsername(dto.getUsername());
        database.setPassword(dto.getPassword());
        return mapper.toDTO(repository.save(database));
    }

    @Override
    public void deleteDatabase(String id) {
        repository.deleteById(id);
    }
}