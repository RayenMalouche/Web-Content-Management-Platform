package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.model.Website;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WebsiteMapper {
    WebsiteDTO toDTO(Website website);
    Website toEntity(WebsiteDTO websiteDTO);
}