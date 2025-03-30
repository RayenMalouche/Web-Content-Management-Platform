package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.LayoutDTO;
import com.example.web_content_management_back.service.LayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/layouts")
public class LayoutController {

    @Autowired
    private LayoutService layoutService;

    @GetMapping
    public List<LayoutDTO> getAllLayouts() {
        return layoutService.getAllLayouts();
    }

    @PostMapping
    public LayoutDTO createLayout(@RequestBody LayoutDTO layoutDTO) {
        return layoutService.createLayout(layoutDTO);
    }

    @GetMapping("/{id}")
    public LayoutDTO getLayoutById(@PathVariable String id) {
        return layoutService.getLayoutById(id);
    }

    @PutMapping("/{id}")
    public LayoutDTO updateLayout(@PathVariable String id, @RequestBody LayoutDTO layoutDTO) {
        return layoutService.updateLayout(id, layoutDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteLayout(@PathVariable String id) {
        layoutService.deleteLayout(id);
    }
}