package com.shop.onlinestore.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="category")
@Setter
@Getter
@ToString
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name")
    private String categoryName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> books;
}
