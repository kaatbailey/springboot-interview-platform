package com.interview.prep.config;

import com.interview.prep.model.Exercise;
import com.interview.prep.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;

    @Override
    public void run(String... args) throws Exception {
        if (exerciseRepository.count() == 0) {
            loadExercises();
        }
    }

    private void loadExercises() {
        // Exercise 1: Create First Functional Interface
        Exercise ex1 = Exercise.builder()
                .title("Create Your First Functional Interface")
                .description("Create a functional interface called StringProcessor with a method: String process(String input);")
                .theoryContent("A Functional Interface has exactly ONE abstract method.\n" +
                        "Examples: Runnable, Callable, Comparator\n" +
                        "Annotated with @FunctionalInterface")
                .difficulty(Exercise.Difficulty.EASY)
                .xpPoints(50)
                .orderIndex(1)
                .starterCode("// TODO: Create StringProcessor functional interface\n" +
                        "public interface StringProcessor {\n" +
                        "    // Your code here\n" +
                        "}")
                .solutionCode("@FunctionalInterface\n" +
                        "public interface StringProcessor {\n" +
                        "    String process(String input);\n" +
                        "}")
                .testCases("assert interface has @FunctionalInterface annotation\n" +
                        "assert exactly one abstract method named 'process'\n" +
                        "assert method signature: String process(String input)")
                .build();

        // Exercise 2: Lambda Basics
        Exercise ex2 = Exercise.builder()
                .title("Lambda Basics")
                .description("Convert anonymous inner class to lambda expression")
                .theoryContent("Lambda syntax: (parameters) -> expression\n" +
                        "Benefits: Concise code, enables functional programming")
                .difficulty(Exercise.Difficulty.EASY)
                .xpPoints(75)
                .orderIndex(2)
                .starterCode("// Convert this to lambda:\n" +
                        "Runnable r = new Runnable() {\n" +
                        "    public void run() {\n" +
                        "        System.out.println(\"Hello\");\n" +
                        "    }\n" +
                        "};")
                .solutionCode("Runnable r = () -> System.out.println(\"Hello\");")
                .testCases("assert lambda compiles\n" +
                        "assert lambda executes correctly")
                .build();

        // Exercise 3: Stream API
        Exercise ex3 = Exercise.builder()
                .title("Filter and Map with Streams")
                .description("Use Java 8 Streams to filter even numbers and square them")
                .theoryContent("Stream API enables functional-style operations on collections.\n" +
                        "Common operations: filter(), map(), collect()")
                .difficulty(Exercise.Difficulty.MEDIUM)
                .xpPoints(100)
                .orderIndex(3)
                .starterCode("List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n" +
                        "// TODO: Filter even numbers and square them\n" +
                        "List<Integer> result = numbers.stream()\n" +
                        "    // Your code here\n" +
                        "    .collect(Collectors.toList());")
                .solutionCode("List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n" +
                        "List<Integer> result = numbers.stream()\n" +
                        "    .filter(n -> n % 2 == 0)\n" +
                        "    .map(n -> n * n)\n" +
                        "    .collect(Collectors.toList());")
                .testCases("assert result equals [4, 16]\n" +
                        "assert uses filter and map\n" +
                        "assert uses streams")
                .build();

        exerciseRepository.save(ex1);
        exerciseRepository.save(ex2);
        exerciseRepository.save(ex3);

        System.out.println("✅ Loaded " + exerciseRepository.count() + " exercises");
    }
}