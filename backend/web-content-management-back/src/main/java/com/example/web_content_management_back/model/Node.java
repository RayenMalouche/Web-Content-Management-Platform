package com.example.web_content_management_back.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "nodes")
@Data
public class Node {
    @Id
    private String id;
    private String name;
    private String type;
    private boolean selected;
    private String description;
    private String widgetId;
    private String width;
    private String height;
    private String backgroundColor;
    private String borderColor;

    @DBRef
    private List<Node> children;

    @DBRef
    private Node parent;
}