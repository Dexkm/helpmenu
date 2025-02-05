document.addEventListener('DOMContentLoaded', () => {
    const helpData = {
        faq: [
            {
                question: "How can I pay my bills?",
                answer: "You can view and pay your bills in the bank application on your phone."
            },
            // Add more FAQ items here
        ],
        inventory: [
            {
                question: "How do I organize my inventory?",
                answer: "Click and drag items to rearrange them. Right-click for additional options."
            }
            // Add more inventory items
        ]
        // Add more categories
    };

    const overlay = document.querySelector('.help-overlay');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const questionsList = document.querySelector('.questions-list');
    const answerPanel = document.querySelector('.answer-panel');
    const searchInput = document.getElementById('searchInput');

    // Show overlay
    overlay.classList.add('active');

    // Handle ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlay.classList.remove('active');
        }
    });

    // Category button clicks
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayQuestions(category);
        });
    });

    // Display questions for category
    function displayQuestions(category) {
        questionsList.innerHTML = '';
        helpData[category]?.forEach((item, index) => {
            const questionEl = document.createElement('div');
            questionEl.classList.add('question-item');
            questionEl.textContent = item.question;
            questionEl.addEventListener('click', () => {
                document.querySelectorAll('.question-item').forEach(q => q.classList.remove('active'));
                questionEl.classList.add('active');
                displayAnswer(item.answer);
            });
            questionsList.appendChild(questionEl);
        });
    }

    // Display answer
    function displayAnswer(answer) {
        answerPanel.style.opacity = '0';
        setTimeout(() => {
            answerPanel.textContent = answer;
            answerPanel.style.opacity = '1';
        }, 300);
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const questions = document.querySelectorAll('.question-item');
        
        questions.forEach(question => {
            const text = question.textContent.toLowerCase();
            question.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Show FAQ by default
    categoryBtns[0].click();
});