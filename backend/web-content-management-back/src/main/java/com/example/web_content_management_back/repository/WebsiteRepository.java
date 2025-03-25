package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.Website;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WebsiteRepository extends MongoRepository<Website, String> {
}