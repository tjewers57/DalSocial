package com.csci3130.group7.dalsocial.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csci3130.group7.dalsocial.model.Block;
import com.csci3130.group7.dalsocial.service.BlockService;


@RestController
@RequestMapping("/block")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class BlockController {

    @Autowired
    private BlockService blockService;

    @PostMapping("/save")
    public String saveBlock(@RequestBody Block block){
        return blockService.createBlock(block);
    }

    @GetMapping("/fetch/{userId}")
    public List<Block> fetchAllBlockedUsers(@PathVariable Integer userId){
        return blockService.fetchAllBlockedByUserId(userId);
    }

    @GetMapping("/get/{id}")
    public Block getBlockById(@PathVariable Integer id){
        return blockService.findBlockById(id);
    }

    @GetMapping("/status/{userId}/{targetId}")
    public Boolean getBlockStatus(@PathVariable Integer userId, @PathVariable Integer targetId){
        return blockService.checkBlockStatus(userId, targetId);
    }

    @GetMapping("/get/{userId}/{targetId}")
    public Block getBlockByUserIdAndTargetId(@PathVariable Integer userId, @PathVariable Integer targetId){
        return blockService.findBlockByUserIdAndTargetId(userId, targetId);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBlock(@PathVariable Integer id){
        return blockService.deleteBlock(id);
    }
}
