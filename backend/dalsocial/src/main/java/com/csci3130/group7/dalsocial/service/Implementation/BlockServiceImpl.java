package com.csci3130.group7.dalsocial.service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci3130.group7.dalsocial.model.Block;
import com.csci3130.group7.dalsocial.repository.BlockRepository;
import com.csci3130.group7.dalsocial.service.BlockService;

@Service
public class BlockServiceImpl implements BlockService {
    
    @Autowired
    BlockRepository blockRepository;

    @Override
    public String createBlock(Block block){
        if(block == null) {return "Error, block not saved";}

        blockRepository.save(block);
        return "Block created successfully";
    }

    @Override
    public List<Block> fetchAllBlockedByUserId(Integer userId){
        return blockRepository.findAllByUserId(userId);
    }

    @Override
    public Block findBlockById(Integer id){
        Optional<Block> optionalBlock = blockRepository.findById(id);
        if(optionalBlock.isPresent()){
            return optionalBlock.get();
        }
        else{
            System.out.println("Block not found with id: " + id);
            throw new RuntimeException("Block not found with id: " + id);
        }
    }

    @Override
    public Boolean checkBlockStatus(Integer userId, Integer targetId){
        Optional<Block> optionalBlock = blockRepository.findByUserIdAndTargetId(userId, targetId);
        if(optionalBlock.isPresent()){
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public Block findBlockByUserIdAndTargetId(Integer userId, Integer targetId){
        Optional<Block> optionalBlock = blockRepository.findByUserIdAndTargetId(userId, targetId);
        if(optionalBlock.isPresent()){
            return optionalBlock.get();
        }
        else{
            return null;
        }
    }

    @Override
    public String deleteBlock(Integer id){
        blockRepository.deleteById(id);
        return "Block deleted successfully";
    }
}
