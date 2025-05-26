package com.example.Quiz.app.dao;

import com.example.Quiz.app.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDAO extends JpaRepository<Question, Integer> {
    // Custom query to find questions by category
    List<Question> findByCategory(String category);
}
