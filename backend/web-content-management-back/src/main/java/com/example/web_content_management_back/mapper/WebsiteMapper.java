package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.model.Website;
import org.springframework.stereotype.Component;
import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.model.Page;
import com.example.web_content_management_back.dto.LayoutDTO;

import java.util.stream.Collectors;

@Component
public class WebsiteMapper {

    public WebsiteDTO toDTO(Website website) {
        WebsiteDTO websiteDTO = new WebsiteDTO();
        websiteDTO.setId(website.getId());
        websiteDTO.setName(website.getName());
        websiteDTO.setDomain(website.getDomain());
        websiteDTO.setType(website.getType());
        websiteDTO.setPrimaryColor(website.getPrimaryColor());
        websiteDTO.setDescription(website.getDescription());
        websiteDTO.setPages(website.getPages().stream().map(new PageMapper()::toDTO).collect(Collectors.toList()));
        return websiteDTO;
    }

    public Website toEntity(WebsiteDTO websiteDTO) {
        Website website = new Website();
        website.setId(websiteDTO.getId());
        website.setName(websiteDTO.getName());
        website.setDomain(websiteDTO.getDomain());
        website.setType(websiteDTO.getType());
        website.setPrimaryColor(websiteDTO.getPrimaryColor());
        website.setDescription(websiteDTO.getDescription());
        website.setPages(websiteDTO.getPages().stream().map(new PageMapper()::toEntity).collect(Collectors.toList()));
        return website;
    }
    public PageDTO toPageDTO(Page page) {
            if (page == null) {
                return null;
            }
            PageDTO pageDTO = new PageDTO();
            pageDTO.setId(page.getId());
            pageDTO.setName(page.getName());
            if (page.getLayout() != null) {
                LayoutDTO layoutDTO = new LayoutDTO();
                layoutDTO.setId(page.getLayout().getId());
                layoutDTO.setName(page.getLayout().getName());
                pageDTO.setLayout(layoutDTO);
            }
            return pageDTO;
        }
}