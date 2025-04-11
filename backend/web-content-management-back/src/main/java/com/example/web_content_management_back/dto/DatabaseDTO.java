package com.example.web_content_management_back.dto;

import lombok.Data;

@Data
public class DatabaseDTO {
    private String id;
    private String name;
    private String type;
    private String connectionString;
    private String description;
    private String username;
    private String password;
}