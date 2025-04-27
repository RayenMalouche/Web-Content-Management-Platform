package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.model.Page;
import com.example.web_content_management_back.repository.PageRepository;
import com.example.web_content_management_back.repository.LayoutRepository;


import java.util.List;

public interface PageService {
    List<PageDTO> getAllPages();
    PageDTO createPage(PageDTO pageDTO);
    PageDTO getPageById(String id);
    PageDTO updatePage(String id, PageDTO pageDTO);
    void deletePage(String id);
    public PageDTO assignLayoutToPage(String pageId, String layoutId);
}