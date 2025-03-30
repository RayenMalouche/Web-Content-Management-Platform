package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.NodeDTO;
import com.example.web_content_management_back.model.Node;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class NodeMapper {

    public NodeDTO toDTO(Node node) {
        NodeDTO nodeDTO = new NodeDTO();
        nodeDTO.setId(node.getId());
        nodeDTO.setName(node.getName());
        nodeDTO.setType(node.getType());
        nodeDTO.setSelected(node.isSelected());
        nodeDTO.setDescription(node.getDescription());
        nodeDTO.setWidgetId(node.getWidgetId());
        nodeDTO.setWidth(node.getWidth()); // No conversion needed
        nodeDTO.setHeight(node.getHeight()); // No conversion needed
        nodeDTO.setBackgroundColor(node.getBackgroundColor());
        nodeDTO.setBorderColor(node.getBorderColor());
        nodeDTO.setChildren(node.getChildren().stream().map(this::toDTO).collect(Collectors.toList()));
        nodeDTO.setParent(node.getParent() != null ? toDTO(node.getParent()) : null);
        return nodeDTO;
    }

    public Node toEntity(NodeDTO nodeDTO) {
        Node node = new Node();
        node.setId(nodeDTO.getId());
        node.setName(nodeDTO.getName());
        node.setType(nodeDTO.getType());
        node.setSelected(nodeDTO.isSelected());
        node.setDescription(nodeDTO.getDescription());
        node.setWidgetId(nodeDTO.getWidgetId());
        node.setWidth(nodeDTO.getWidth()); // No conversion needed
        node.setHeight(nodeDTO.getHeight()); // No conversion needed
        node.setBackgroundColor(nodeDTO.getBackgroundColor());
        node.setBorderColor(nodeDTO.getBorderColor());
        node.setChildren(nodeDTO.getChildren().stream().map(this::toEntity).collect(Collectors.toList()));
        node.setParent(nodeDTO.getParent() != null ? toEntity(nodeDTO.getParent()) : null);
        return node;
    }
}