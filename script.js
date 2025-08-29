// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initParallax();
    initInteractiveDemos();
    initFloatingElements();
    // initScrollAnimations(); // DISABLED - causes fading animations
    // initCodeHighlighting(); // DISABLED - causes HTML corruption
    initSyntaxNavigation(); // Added this line
    initScrollToTop(); // Added this line
});

// Clean up corrupted code blocks - DISABLED
// function cleanupCorruptedCode() {
//     const codeBlocks = document.querySelectorAll('pre code');
//     
//     codeBlocks.forEach(block => {
//         // Remove any existing highlighting classes
//         block.classList.remove('highlighted');
//         
//         // If the block contains malformed HTML, reset it to clean text
//         if (block.innerHTML.includes('class="keyword">') || 
//             block.innerHTML.includes('class="string">') || 
//             block.innerHTML.includes('class="number">') || 
//             block.innerHTML.includes('class="comment">')) {
//             
//             // Get the original text content and reset the innerHTML
//             const originalText = block.textContent || block.innerText || '';
//             block.innerHTML = originalText;
//         }
//     });
// }

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Handle navigation between HTML files
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a link to another HTML file, let it navigate normally
            if (href && href.endsWith('.html')) {
                return; // Allow normal navigation
            }
            
            // If it's an anchor link, handle smooth scrolling
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 27, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(13, 27, 42, 0.95)';
        }
    });
}

// Parallax effects
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Scroll animations - DISABLED to prevent fading effects
// function initScrollAnimations() {
//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     };
// 
//     const observer = new IntersectionObserver(function(entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//             }
//         });
//     }, observerOptions);
// 
//     // Observe all content sections
//     const sections = document.querySelectorAll('.content-section');
//     sections.forEach(section => {
//         section.style.opacity = '0';
//         section.style.transform = 'translateY(50px)';
//         section.style.transition = 'all 0.8s ease';
//         observer.observe(section);
//     });
// }

// Code highlighting - COMPLETELY DISABLED to prevent HTML corruption
// function initCodeHighlighting() {
//     const codeBlocks = document.querySelectorAll('pre code');
//     
//     codeBlocks.forEach(block => {
//         // Remove any existing highlighting class
//         block.classList.remove('highlighted');
//         
//         // Get clean text content
//         const cleanText = block.textContent || block.innerText || '';
//         
//         // Skip if no content
//         if (!cleanText.trim()) {
//             return;
//         }
//         
//         // Just set the clean text without any highlighting to prevent HTML errors
//         block.textContent = cleanText;
//         block.classList.add('highlighted');
//     });
// }

// Interactive demos
function initInteractiveDemos() {
    // Score slider functionality
    const scoreSlider = document.getElementById('score-slider');
    const scoreValue = document.getElementById('score-value');
    const gradeDisplay = document.getElementById('grade-display');
    
    if (scoreSlider && scoreValue && gradeDisplay) {
        scoreSlider.addEventListener('input', function() {
            const score = parseInt(this.value);
            scoreValue.textContent = score;
            updateGrade(score);
        });
    }

    // Operation buttons functionality
    const opButtons = document.querySelectorAll('.op-btn');
    const calcA = document.getElementById('calc-a');
    const calcOp = document.getElementById('calc-op');
    const calcB = document.getElementById('calc-b');
    const calcResult = document.getElementById('calc-result');
    
    opButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            opButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const operation = this.getAttribute('data-op');
            calcOp.textContent = operation;
            calculateResult(operation);
        });
    });

    // Initialize array visualization
    initArrayVisualization();
    
    // Initialize pointer visualization
    initPointerVisualization();
}

// Update grade based on score
function updateGrade(score) {
    const gradeDisplay = document.getElementById('grade-display');
    const grade = gradeDisplay.querySelector('.grade');
    const gradeText = gradeDisplay.querySelector('.grade-text');
    
    let letterGrade, text;
    
    if (score >= 90) {
        letterGrade = 'A';
        text = 'Excellent!';
    } else if (score >= 80) {
        letterGrade = 'B';
        text = 'Good!';
    } else if (score >= 70) {
        letterGrade = 'C';
        text = 'Average';
    } else if (score >= 60) {
        letterGrade = 'D';
        text = 'Below Average';
    } else {
        letterGrade = 'F';
        text = 'Failing';
    }
    
    grade.textContent = letterGrade;
    gradeText.textContent = text;
}

// Calculate result for switch demo
function calculateResult(operation) {
    const a = 10;
    const b = 5;
    let result;
    
    switch(operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = b !== 0 ? (a / b).toFixed(2) : 'Error';
            break;
        default:
            result = 'Invalid';
    }
    
    document.getElementById('calc-result').textContent = result;
}

// Array visualization
function initArrayVisualization() {
    let currentArray = [];
    
    window.generateArray = function() {
        currentArray = [];
        for (let i = 0; i < 8; i++) {
            currentArray.push(Math.floor(Math.random() * 100) + 1);
        }
        displayArray();
    };
    
    window.sortArray = function() {
        if (currentArray.length > 0) {
            currentArray.sort((a, b) => a - b);
            displayArray();
        }
    };
    
    window.reverseArray = function() {
        if (currentArray.length > 0) {
            currentArray.reverse();
            displayArray();
        }
    };
    
    function displayArray() {
        const container = document.getElementById('array-container');
        if (!container) return;
        
        container.innerHTML = '';
        currentArray.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            element.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(element);
        });
    }
    
    // Generate initial array
    generateArray();
}

// Pointer visualization
function initPointerVisualization() {
    let currentValue = 42;
    let currentAddress = '0x7fff1234abcd';
    
    window.modifyPointer = function() {
        currentValue = Math.floor(Math.random() * 100) + 1;
        document.getElementById('value-display').textContent = currentValue;
        
        // Animate the change
        const valueCell = document.getElementById('value-cell');
        valueCell.style.transform = 'scale(1.1)';
        setTimeout(() => {
            valueCell.style.transform = 'scale(1)';
        }, 200);
    };
    
    window.showAddress = function() {
        // Generate a random address
        const hex = '0123456789abcdef';
        let newAddress = '0x';
        for (let i = 0; i < 12; i++) {
            newAddress += hex[Math.floor(Math.random() * hex.length)];
        }
        currentAddress = newAddress;
        
        document.getElementById('pointer-address').textContent = currentAddress;
        
        // Animate the change
        const pointerCell = document.getElementById('pointer-cell');
        pointerCell.style.transform = 'scale(1.1)';
        setTimeout(() => {
            pointerCell.style.transform = 'scale(1)';
        }, 200);
    };
}

// Syntax navigation functionality
function initSyntaxNavigation() {
    const syntaxNavLinks = document.querySelectorAll('.syntax-nav-link');
    const syntaxCards = document.querySelectorAll('.syntax-card');
    
    // Add click event listeners to navigation links
    syntaxNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            syntaxNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the target section briefly
                targetSection.style.border = '2px solid var(--primary-color)';
                setTimeout(() => {
                    targetSection.style.border = '';
                }, 2000);
            }
        });
    });
    
    // Highlight active section based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200; // Offset for better detection
        
        syntaxCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardBottom = cardTop + card.offsetHeight;
            
            if (scrollPosition >= cardTop && scrollPosition < cardBottom) {
                // Remove active class from all links
                syntaxNavLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to corresponding nav link
                if (syntaxNavLinks[index]) {
                    syntaxNavLinks[index].classList.add('active');
                }
            }
        });
    });
}

// Loop visualization functions
window.startForLoop = function() {
    const counter = document.getElementById('for-counter');
    const output = document.getElementById('for-output');
    
    if (!counter || !output) return;
    
    let count = 0;
    output.innerHTML = '';
    
    const interval = setInterval(() => {
        if (count <= 5) {
            counter.textContent = count;
            output.innerHTML += `Iteration ${count}<br>`;
            count++;
        } else {
            clearInterval(interval);
            counter.textContent = '0';
        }
    }, 500);
};

window.resetForLoop = function() {
    const counter = document.getElementById('for-counter');
    const output = document.getElementById('for-output');
    
    if (counter) counter.textContent = '0';
    if (output) output.innerHTML = '';
};

window.startWhileLoop = function() {
    const counter = document.getElementById('while-counter');
    const output = document.getElementById('while-output');
    
    if (!counter || !output) return;
    
    let count = 0;
    output.innerHTML = '';
    
    const interval = setInterval(() => {
        if (count < 5) {
            counter.textContent = count;
            output.innerHTML += `Count: ${count}<br>`;
            count++;
        } else {
            clearInterval(interval);
            counter.textContent = '0';
        }
    }, 600);
};

window.resetWhileLoop = function() {
    const counter = document.getElementById('while-counter');
    const output = document.getElementById('while-output');
    
    if (counter) counter.textContent = '0';
    if (output) output.innerHTML = '';
};

// Function demo
window.runFunctions = function() {
    const a = parseInt(document.getElementById('func-a').value) || 5;
    const b = parseInt(document.getElementById('func-b').value) || 3;
    const radius = parseFloat(document.getElementById('func-radius').value) || 5.0;
    const primeCheck = parseInt(document.getElementById('func-prime').value) || 17;
    
    const results = document.getElementById('function-results');
    
    // Calculate results
    const sum = a + b;
    const area = Math.PI * radius * radius;
    const isPrime = checkPrime(primeCheck);
    
    results.innerHTML = `
        <strong>Function Results:</strong><br><br>
        add(${a}, ${b}) = ${sum}<br>
        calculateArea(${radius}) = ${area.toFixed(2)}<br>
        isPrime(${primeCheck}) = ${isPrime ? 'true' : 'false'}<br>
    `;
};

// Prime number checker
function checkPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

// Input/Output demo
window.processInput = function() {
    const name = document.getElementById('demo-name').value;
    const age = document.getElementById('demo-age').value;
    const output = document.getElementById('demo-output');
    
    if (name && age) {
        output.innerHTML = `
            <strong>Input Processed:</strong><br><br>
            Name: ${name}<br>
            Age: ${age}<br><br>
            <em>This simulates std::cin reading user input</em>
        `;
    } else {
        output.innerHTML = '<em>Please enter both name and age</em>';
    }
};

// Code execution simulation
window.runCode = function(button) {
    const codeBlock = button.previousElementSibling;
    const code = codeBlock.textContent;
    
    // Simulate code execution
    button.textContent = 'Running...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Output: Hello, World!';
        button.style.background = '#27ca3f';
        
        setTimeout(() => {
            button.textContent = 'Run Code';
            button.disabled = false;
            button.style.background = '';
        }, 2000);
    }, 1000);
};

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) { // Show after scrolling down 300px
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Add CSS for array elements only
const style = document.createElement('style');
style.textContent = `
    .array-element {
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
}, 16)); // ~60fps
