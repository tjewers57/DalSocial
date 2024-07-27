package com.csci3130.group7.dalsocial;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.csci3130.group7.dalsocial.model.Block;
import com.csci3130.group7.dalsocial.repository.BlockRepository;
import com.csci3130.group7.dalsocial.service.Implementation.BlockServiceImpl;

@ExtendWith(MockitoExtension.class)
public class BlockServiceTest {

    @Mock
    private BlockRepository blockRepository;

    @InjectMocks
    private BlockServiceImpl blockService;

    @Before()
    public void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateBlock(){
        Block block = new Block();
        block.setUserId(1);
        block.setTargetId(2);

        when(blockRepository.save(block)).thenReturn(block);
        assertEquals("Block created successfully", blockService.createBlock(block));
    }

    @Test
    public void testFetchAllBlockedByUserId(){
        Block block1 = new Block();
        block1.setUserId(1);
        block1.setTargetId(2);

        Block block2 = new Block();
        block2.setUserId(1);
        block2.setTargetId(5);

        Block block3 = new Block();
        block3.setUserId(2);
        block3.setTargetId(5);

        blockRepository.save(block1);
        blockRepository.save(block2);
        blockRepository.save(block3);

        when(blockRepository.findAllByUserId(1)).thenReturn(List.of(block1, block2));
        assertEquals(List.of(block1, block2), blockService.fetchAllBlockedByUserId(1));
    }

    @Test
    public void testFindBlockById(){
        Block block = new Block();
        int id = anyInt();

        when(blockRepository.findById(id)).thenReturn(Optional.of(block));
        assertEquals(block, blockService.findBlockById(id));
    }

    @Test
    public void testCheckBlockStatusWhenTrue(){
        Block block = new Block();
        int userId = 1;
        int targetId = 2;

        block.setUserId(userId);
        block.setTargetId(targetId);

        when(blockRepository.findByUserIdAndTargetId(userId, targetId)).thenReturn(Optional.of(block));
        assertTrue(blockService.checkBlockStatus(userId, targetId));
    }

    @Test
    public void testCheckBlockStatusWhenFalse(){
        Block block = new Block();
        int userId = 1;
        int targetId = 2;

        block.setUserId(3);
        block.setTargetId(4);

        blockRepository.save(block);
        assertFalse(blockService.checkBlockStatus(userId, targetId));
    }

    @Test
    public void testFindBlockByUserAndTarget(){
        Block block = new Block();
        int userId = 1;
        int targetId = 2;

        block.setUserId(userId);
        block.setTargetId(targetId);

        when(blockRepository.findByUserIdAndTargetId(userId, targetId)).thenReturn(Optional.of(block));
        assertEquals(block, blockService.findBlockByUserIdAndTargetId(userId, targetId));
    }

    @Test
    public void testFindBlockByUserAndTargetWhenNull(){
        assertNull(blockService.findBlockByUserIdAndTargetId(1, 2));
    }

    @Test
    public void testDeleteBlock(){
        Block block = new Block();
        block.setUserId(1);
        block.setTargetId(2);

        when(blockRepository.save(block)).thenReturn(block);
        assertEquals("Block deleted successfully", blockService.deleteBlock(anyInt()));
    }
}
