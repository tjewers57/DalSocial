package com.csci3130.group7.dalsocial.service;

import java.util.List;

import com.csci3130.group7.dalsocial.model.Block;

public interface BlockService {
    
    String createBlock(Block block);

    List<Block> fetchAllBlockedByUserId(Integer userId);

    Block findBlockById(Integer id);

    Boolean checkBlockStatus(Integer userId, Integer targetId);

    Block findBlockByUserIdAndTargetId(Integer userId, Integer targetId);

    String deleteBlock(Integer id);
}
