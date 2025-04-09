package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.model.Page;
import com.example.web_content_management_back.service.WebsiteService;
import com.example.web_content_management_back.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/websites")
public class WebsiteController {

    @Autowired
    private WebsiteService websiteService;

    @Autowired
    private PageService pageService;

    @GetMapping
    public ResponseEntity<List<WebsiteDTO>> getAllWebsites() {
        List<WebsiteDTO> websites = websiteService.getAllWebsites();
        return ResponseEntity.ok(websites);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WebsiteDTO> getWebsiteById(@PathVariable String id) {
        WebsiteDTO website = websiteService.getWebsiteById(id);
        return ResponseEntity.ok(website);
    }

    @PostMapping
    public ResponseEntity<WebsiteDTO> createWebsite(@RequestBody WebsiteDTO websiteDTO) {
        WebsiteDTO createdWebsite = websiteService.createWebsite(websiteDTO);
        return ResponseEntity.ok(createdWebsite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WebsiteDTO> updateWebsite(@PathVariable String id, @RequestBody WebsiteDTO websiteDTO) {
        WebsiteDTO updatedWebsite = websiteService.updateWebsite(id, websiteDTO);
        return ResponseEntity.ok(updatedWebsite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWebsite(@PathVariable String id) {
        websiteService.deleteWebsite(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/{id}/pages")
    public ResponseEntity<PageDTO> addPageToWebsite(@PathVariable String id, @RequestBody PageDTO pageDTO) {
        PageDTO addedPage = websiteService.addPageToWebsite(id, pageDTO);
        return ResponseEntity.ok(addedPage);
    }

    @GetMapping("/{id}/pages")
       public ResponseEntity<List<PageDTO>> getPages(@PathVariable String id) {
           List<PageDTO> pages = websiteService.getPagesByWebsiteId(id);
           return ResponseEntity.ok(pages);
       }

}