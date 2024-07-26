package com.csci3130.group7.dalsocial.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci3130.group7.dalsocial.model.Block;

@Repository
public interface BlockRepository extends JpaRepository<Block, Integer> {
    
    List<Block> findAllByUserId(Integer userId);

    Optional<Block> findByUserIdAndTargetId(Integer userId, Integer targetId);
    
}
