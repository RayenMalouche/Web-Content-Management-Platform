package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.LayoutDTO;
import com.example.web_content_management_back.mapper.LayoutMapper;
import com.example.web_content_management_back.model.Layout;
import com.example.web_content_management_back.repository.LayoutRepository;
import com.example.web_content_management_back.service.LayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.web_content_management_back.model.Node;
import com.example.web_content_management_back.service.NodeService;


import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;

@Service
public class LayoutServiceImpl implements LayoutService {

    @Autowired
    private LayoutRepository layoutRepository;

    @Autowired
    private LayoutMapper layoutMapper;

    @Autowired
    private NodeService nodeService;

    @Override
    public List<LayoutDTO> getAllLayouts() {
        return layoutRepository.findAll().stream()
                .map(layoutMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LayoutDTO createLayout(LayoutDTO layoutDTO) {
        Layout layout = layoutMapper.toEntity(layoutDTO);
        layout = layoutRepository.save(layout);
        return layoutMapper.toDTO(layout);
    }

    @Override
    public LayoutDTO getLayoutById(String id) {
        return layoutRepository.findById(id)
                .map(layoutMapper::toDTO)
                .orElse(null);
    }

    @Override
    public LayoutDTO updateLayout(String id, LayoutDTO layoutDTO) {
        if (layoutRepository.existsById(id)) {
            Layout layout = layoutMapper.toEntity(layoutDTO);
            layout.setId(id);
            layout = layoutRepository.save(layout);
            return layoutMapper.toDTO(layout);
        }
        return null;
    }

    @Override
    public void deleteLayout(String id) {
        layoutRepository.deleteById(id);
    }

   @Override
       public void clearLayoutNodes(String layoutId) {
           Layout layout = layoutRepository.findById(layoutId)
                   .orElseThrow(() -> new RuntimeException("Layout non trouvé avec l'ID : " + layoutId));


           if (layout.getNodes() != null) {
               for (Node node : layout.getNodes()) {
                   nodeService.deleteNode(node.getId());
               }
           }

           layout.setNodes(Collections.emptyList());
           layoutRepository.save(layout);
       }
}