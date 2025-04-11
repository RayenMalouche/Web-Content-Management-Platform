package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.DatabaseDTO;

import java.util.List;

public interface DatabaseService {
    List<DatabaseDTO> getAllDatabases();
    DatabaseDTO getDatabaseById(String id);
    DatabaseDTO createDatabase(DatabaseDTO dto);
    DatabaseDTO updateDatabase(String id, DatabaseDTO dto);
    void deleteDatabase(String id);
}