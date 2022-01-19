//IIFE- immediately invoked function
(function(){
    function buildQuiz(){
        const output = [];
    
        // for each question...
        myQuestions.forEach(
          (currentQuestion, questionNumber) => {
    
            // variable to store the list of possible answers
            
            const answers = [];
    
            // and for each available answer...
            for(letter in currentQuestion.answers){
    
              // ...add an HTML radio button
              answers.push(
                `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} : ${currentQuestion.answers[letter]}
                </label>`
              );
            }
    
            // add this question and its answers to the output#
            //.join() returns array as a string
            output.push(
              `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
              </div>`
              
            );
          }
        );
    
        // combine questions/answers, added to the output
        quizContainer.innerHTML = output.join('');
      }
    
     
    function showResults(){
        //asnwers from the quiz
        //const answerContainer = myQuestions.answers;
        const answerContainers = quizContainer.querySelectorAll('.answers');
        
    
        let correctAnswers = 0;
    
        myQuestions.forEach((currentQuestion, questionNumber) => {
            //find selected answers

            const answerContainer = answerContainers[questionNumber];
            //css selector - which radio button is checked from the generated html with answers
            const selector = `input[name=question${questionNumber}]:checked`;
            //use the selector to find user answers/no answer and get the value  
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
            if(userAnswer === currentQuestion.correctAnswer){
                correctAnswers++;
                answerContainers[questionNumber].style.color = 'lightgreen';
                resultContainer.innerHTML = `Поздравления! Вие преминахте успешно изпита с ${correctAnswers} верни отговора от ${myQuestions.length}`
            }else{
                answerContainers[questionNumber].style.color = 'red';
                resultContainer.innerHTML = `Неуспеншно взет изпит! Имате ${correctAnswers} верни отговора от ${myQuestions.length}`
            }
        });
        //resultContainer.innerHTML = `Вие имате ${correctAnswers} вeрни отговора от ${myQuestions.length}`;
    }
    
    function showSlide(n){
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;

        if(currentSlide === 0){
            previousButton.style.display = 'none';
            restartButton.style.display = "none"
        }else{
            previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1){
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
            //RESTART BUTTON
            restartButton.style.display = 'inline-block';
        }else{
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide(){
        showSlide(currentSlide + 1);
    }
    
    function showPreviousSlide(){
        showSlide(currentSlide - 1);
    }

    //variables quiz elements
    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    //questions
    const myQuestions = [
        {
            question: "Участници в джижението са:",
            answers: {
                a: "водачите",
                b: "животните",
                c: "пътните превозни средства",
                d: "моторните превозни средства"
            },
            correctAnswer: "а"
        },
        {
            question: "Масата с товар на превозното средство:",
            answers: {
                a: "не включва масата на превозното срество",
                b: "не включва масата на водача",
                c: "не включва масата на пътниците",
                d: "включва масата на товара"
            },
            correctAnswer: "d" 
        },
        {
            question: "При изпреварването на кое от изброените ППС трябва да се осигури по-голяма странична дистанция:  ",
            answers: {
                a: "велосипед",
                b: "мотопед",
                c: "съчленен автобус",
                d: "трактор"
            },
            correctAnswer: "c"  
        },
        {
            question: "Тракторът принадлежи към групата на:  ",
            answers: {
                a: "моторните превозни средства",
                b: "пътните превозни средства",
                c: "специалните автомобили",
                d: "товарните автомобили"
            },
            correctAnswer: "a"   
        },
        {
            question: "Кой е единния европейски телефонен номер за спешни и аварийни обаждания?:",
            answers: {
                a: "160",
                b: "144",
                c: "112",
                d: "196"
            },
            correctAnswer: "c" 
        },
        {
            question: `Каква е максималната стойност на отношението "мошност/тегло" при мотоциклетите, които може да се управяват с правоспособност за категория А2`,
            answers: {
                a: "0,1 kW/kg",
                b: "0.2 kW/kg",
                c: "0.3 kW/kg",
            },
            correctAnswer: "a"  
        },
        {
            question: "Правилата за движение в населено място се прилагат:",
            answers: {
                a: "след знака, с който е обозначено началото на населеното място",
                b: "от първата сграда на населеното място",
                c: "по всички участъци от пътя, по които се движат пешеходците",
            },
            correctAnswer: "a"
        }
    ]

    buildQuiz();

    //Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const restartButton = document.getElementById("restart");
    let currentSlide = 0;

    
    showSlide(currentSlide);
    

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

})();

