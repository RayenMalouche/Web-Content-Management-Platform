package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.mapper.WebsiteMapper;
import com.example.web_content_management_back.model.Website;
import com.example.web_content_management_back.repository.WebsiteRepository;
import com.example.web_content_management_back.service.WebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WebsiteServiceImpl implements WebsiteService {

    @Autowired
    private WebsiteRepository websiteRepository;

    @Override
    public List<WebsiteDTO> getAllWebsites() {
        return websiteRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WebsiteDTO createWebsite(WebsiteDTO websiteDTO) {
        Website website = convertToEntity(websiteDTO);
        website.setId(UUID.randomUUID().toString()); // Generate and set the ID
        Website savedWebsite = websiteRepository.save(website);
        return convertToDTO(savedWebsite);
    }

    @Override
    public WebsiteDTO getWebsiteById(String id) {
        Website website = websiteRepository.findById(id).orElseThrow(() -> new RuntimeException("Website not found"));
        return convertToDTO(website);
    }

    @Override
    public WebsiteDTO updateWebsite(String id, WebsiteDTO websiteDTO) {
        Website website = convertToEntity(websiteDTO);
        website.setId(id);
        Website updatedWebsite = websiteRepository.save(website);
        return convertToDTO(updatedWebsite);
    }

    @Override
    public void deleteWebsite(String id) {
        websiteRepository.deleteById(id);
    }

    private WebsiteDTO convertToDTO(Website website) {
        WebsiteDTO websiteDTO = new WebsiteDTO();
        websiteDTO.setId(website.getId());
        websiteDTO.setName(website.getName());
        websiteDTO.setDomain(website.getDomain());
        websiteDTO.setType(website.getType());
        websiteDTO.setPrimaryColor(website.getPrimaryColor());
        return websiteDTO;
    }

    private Website convertToEntity(WebsiteDTO websiteDTO) {
        Website website = new Website();
        website.setId(websiteDTO.getId());
        website.setName(websiteDTO.getName());
        website.setDomain(websiteDTO.getDomain());
        website.setType(websiteDTO.getType());
        website.setPrimaryColor(websiteDTO.getPrimaryColor());
        return website;
    }
}