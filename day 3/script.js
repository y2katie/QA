// Day 3: Page Meaning & Accessibility JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Meaning Demo Functionality
    const showMeaninglessBtn = document.getElementById('show-meaningless');
    const showMeaningfulBtn = document.getElementById('show-meaningful');
    const analyzeMeaningBtn = document.getElementById('analyze-meaning');
    const meaningDemo = document.getElementById('meaning-demo');
    const meaningAnalysis = document.getElementById('meaning-analysis');

    // Meaningless page example
    const meaninglessPage = `
        <div class="page-example meaningless">
            <div class="top-area">
                <div class="big-text">Online Store</div>
                <div class="links">
                    <div class="link">Products</div>
                    <div class="link">About</div>
                    <div class="link">Contact</div>
                </div>
            </div>
            
            <div class="content-area">
                <div class="big-heading">Featured Items</div>
                <div class="item-box">
                    <div class="item-title">Wireless Headphones</div>
                    <div class="price-text">$199.99</div>
                    <div class="description">Great sound quality</div>
                    <div class="buy-button">Buy Now</div>
                </div>
            </div>
            
            <div class="side-area">
                <div class="side-title">Customer Reviews</div>
                <div class="review-box">
                    <div class="review-text">"Amazing product!"</div>
                    <div class="reviewer">- Sarah M.</div>
                </div>
            </div>
        </div>
    `;

    // Meaningful page example
    const meaningfulPage = `
        <div class="page-example meaningful">
            <header role="banner">
                <h1>Online Store</h1>
                <nav role="navigation" aria-label="Main navigation">
                    <ul>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            
            <main role="main">
                <section aria-labelledby="featured-heading">
                    <h2 id="featured-heading">Featured Items</h2>
                    <article>
                        <header>
                            <h3>Wireless Headphones</h3>
                            <p class="price">$199.99</p>
                        </header>
                        <p>Great sound quality</p>
                        <button type="button">Buy Now</button>
                    </article>
                </section>
            </main>
            
            <aside role="complementary" aria-labelledby="reviews-heading">
                <h2 id="reviews-heading">Customer Reviews</h2>
                <blockquote>
                    <p>"Amazing product!"</p>
                    <cite>Sarah M.</cite>
                </blockquote>
            </aside>
        </div>
    `;

    if (showMeaninglessBtn) {
        showMeaninglessBtn.addEventListener('click', function() {
            meaningDemo.innerHTML = meaninglessPage;
            showNotification('Showing meaningless page structure', 'warning');
        });
    }

    if (showMeaningfulBtn) {
        showMeaningfulBtn.addEventListener('click', function() {
            meaningDemo.innerHTML = meaningfulPage;
            showNotification('Showing meaningful page structure', 'success');
        });
    }

    if (analyzeMeaningBtn) {
        analyzeMeaningBtn.addEventListener('click', function() {
            const currentContent = meaningDemo.innerHTML;
            let analysis = '';
            
            if (currentContent.includes('meaningless')) {
                analysis = `
                    <h4>❌ Meaningless Structure Analysis</h4>
                    <ul>
                        <li><strong>No Semantic Elements:</strong> Only generic divs with class names</li>
                        <li><strong>No Landmarks:</strong> Screen readers can't identify page regions</li>
                        <li><strong>No Heading Hierarchy:</strong> No h1-h6 elements for structure</li>
                        <li><strong>No Relationships:</strong> Content connections unclear</li>
                        <li><strong>Screen Reader Impact:</strong> Users hear "clickable" repeatedly with no context</li>
                        <li><strong>SEO Impact:</strong> Search engines can't understand content importance</li>
                        <li><strong>Accessibility Tree:</strong> Flat structure with no semantic meaning</li>
                    </ul>
                `;
            } else if (currentContent.includes('meaningful')) {
                analysis = `
                    <h4>✅ Meaningful Structure Analysis</h4>
                    <ul>
                        <li><strong>Semantic Elements:</strong> header, main, aside, article, section</li>
                        <li><strong>Clear Landmarks:</strong> banner, main, complementary regions</li>
                        <li><strong>Proper Headings:</strong> h1→h2→h3 hierarchy</li>
                        <li><strong>Content Relationships:</strong> aria-labelledby connects headings to sections</li>
                        <li><strong>Screen Reader Impact:</strong> Users can navigate by landmarks and headings</li>
                        <li><strong>SEO Benefits:</strong> Clear content hierarchy and importance</li>
                        <li><strong>Accessibility Tree:</strong> Rich semantic structure with roles and properties</li>
                    </ul>
                `;
            } else {
                analysis = '<p>Please select a page example first to analyze.</p>';
            }
            
            meaningAnalysis.innerHTML = analysis;
            meaningAnalysis.style.display = 'block';
            showNotification('Page meaning analysis complete', 'info');
        });
    }

    // Semantic Element Tabs
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${category}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Hierarchy Demo
    const showGoodHierarchy = document.getElementById('show-good-hierarchy');
    const showBrokenHierarchy = document.getElementById('show-broken-hierarchy');
    const testHierarchy = document.getElementById('test-hierarchy');
    const hierarchyDemo = document.getElementById('hierarchy-demo');
    const hierarchyResults = document.getElementById('hierarchy-results');

    const goodHierarchy = `
        <div class="hierarchy-example good">
            <h1>E-commerce Platform Documentation</h1>
            <h2>Getting Started</h2>
            <h3>Account Setup</h3>
            <h4>Personal Information</h4>
            <h4>Payment Methods</h4>
            <h3>First Purchase</h3>
            <h4>Product Selection</h4>
            <h4>Checkout Process</h4>
            <h2>Advanced Features</h2>
            <h3>Wishlist Management</h3>
            <h3>Order Tracking</h3>
        </div>
    `;

    const brokenHierarchy = `
        <div class="hierarchy-example bad">
            <h1>E-commerce Platform Documentation</h1>
            <h4>Getting Started</h4>
            <h2>Account Setup</h2>
            <h5>Personal Information</h5>
            <h3>Payment Methods</h3>
            <h1>First Purchase</h1>
            <h6>Product Selection</h6>
            <h2>Checkout Process</h2>
            <h4>Advanced Features</h4>
            <h3>Wishlist Management</h3>
            <h2>Order Tracking</h2>
        </div>
    `;

    if (showGoodHierarchy) {
        showGoodHierarchy.addEventListener('click', function() {
            hierarchyDemo.innerHTML = goodHierarchy;
            showNotification('Showing proper heading hierarchy', 'success');
        });
    }

    if (showBrokenHierarchy) {
        showBrokenHierarchy.addEventListener('click', function() {
            hierarchyDemo.innerHTML = brokenHierarchy;
            showNotification('Showing broken heading hierarchy', 'warning');
        });
    }

    if (testHierarchy) {
        testHierarchy.addEventListener('click', function() {
            const currentContent = hierarchyDemo.innerHTML;
            let results = '';
            
            if (currentContent.includes('good')) {
                results = `
                    <h4>✅ Hierarchy Test Results</h4>
                    <pre>
Heading Structure Analysis:
h1: "E-commerce Platform Documentation" (1 found ✅)
├── h2: "Getting Started" (1 found ✅)
│   ├── h3: "Account Setup" (1 found ✅)
│   │   ├── h4: "Personal Information" (1 found ✅)
│   │   └── h4: "Payment Methods" (1 found ✅)
│   └── h3: "First Purchase" (1 found ✅)
│       ├── h4: "Product Selection" (1 found ✅)
│       └── h4: "Checkout Process" (1 found ✅)
└── h2: "Advanced Features" (1 found ✅)
    ├── h3: "Wishlist Management" (1 found ✅)
    └── h3: "Order Tracking" (1 found ✅)

✅ Single h1 element
✅ No skipped heading levels
✅ Logical progression
✅ Screen reader friendly
                    </pre>
                `;
            } else if (currentContent.includes('bad')) {
                results = `
                    <h4>❌ Hierarchy Test Results</h4>
                    <pre>
Heading Structure Analysis:
h1: "E-commerce Platform Documentation" (1 found)
h4: "Getting Started" (⚠️ SKIPPED h2, h3)
h2: "Account Setup" (⚠️ WRONG LEVEL after h4)
h5: "Personal Information" (⚠️ SKIPPED h3, h4)
h3: "Payment Methods" (⚠️ WRONG LEVEL after h5)
h1: "First Purchase" (❌ MULTIPLE h1 elements)
h6: "Product Selection" (⚠️ SKIPPED h2-h5)
h2: "Checkout Process" (⚠️ WRONG LEVEL after h6)
h4: "Advanced Features" (⚠️ SKIPPED h3)
h3: "Wishlist Management" (⚠️ WRONG LEVEL after h4)
h2: "Order Tracking" (⚠️ WRONG LEVEL after h3)

❌ Multiple h1 elements
❌ Skipped heading levels
❌ Illogical progression
❌ Confusing for screen readers
                    </pre>
                `;
            } else {
                results = '<p>Please select a hierarchy example first to test.</p>';
            }
            
            hierarchyResults.innerHTML = results;
            hierarchyResults.style.display = 'block';
            showNotification('Hierarchy test complete', 'info');
        });
    }

    // ARIA Testing Tools
    const testAriaLabels = document.getElementById('test-aria-labels');
    const testRelationships = document.getElementById('test-relationships');
    const simulateScreenReader = document.getElementById('simulate-screen-reader');
    const ariaTestResults = document.getElementById('aria-test-results');

    if (testAriaLabels) {
        testAriaLabels.addEventListener('click', function() {
            const results = `
// ARIA Labels Analysis
Found aria-labelledby attributes: 4
✅ section[aria-labelledby="featured-heading"] → h2#featured-heading
✅ nav[aria-label="Main navigation"] → Clear navigation purpose
✅ aside[aria-labelledby="reviews-heading"] → h2#reviews-heading
✅ All referenced IDs exist and are valid

Found aria-describedby attributes: 0
ℹ️ No aria-describedby found (not required but can enhance UX)

Accessibility Name Calculation:
✅ All interactive elements have accessible names
✅ All landmarks have proper labels
✅ All sections have identifying headings or labels
            `;
            ariaTestResults.innerHTML = results;
            ariaTestResults.classList.add('active');
            showNotification('ARIA labels tested successfully', 'success');
        });
    }

    if (testRelationships) {
        testRelationships.addEventListener('click', function() {
            const results = `
// Content Relationships Analysis
Heading-Section Relationships:
✅ h2#featured-heading labels section content
✅ h2#reviews-heading labels aside content
✅ h1 provides page title context

Form Label Relationships:
ℹ️ No form elements found on current page

Table Relationships:
ℹ️ No tables found on current page

List Relationships:
✅ Navigation uses proper ul/li structure
✅ List semantics preserved

Parent-Child Relationships:
✅ article contains related product information
✅ blockquote contains cite for attribution
✅ header contains page/section titles
            `;
            ariaTestResults.innerHTML = results;
            ariaTestResults.classList.add('active');
            showNotification('Content relationships analyzed', 'success');
        });
    }

    if (simulateScreenReader) {
        simulateScreenReader.addEventListener('click', function() {
            const results = `
// Screen Reader Simulation
[NVDA Voice Simulation]

"Page Meaning and Accessibility, Advanced QA Testing"
"Banner landmark"
"Main navigation, list with 7 items"
"Link, Introduction"
"Link, Fundamentals" 
"Link, Semantic Elements"
"Link, Content Relationships"
"Link, ARIA and Meaning"
"Link, Testing Strategies"
"Link, QA Checklist"

"Main landmark"
"Page Meaning and Accessibility, heading level 1"
"From Beginner to Technical QA, heading level 2"

Navigation Commands Available:
• H - Next heading
• R - Next region/landmark  
• L - Next list
• B - Next button
• 1-6 - Headings by level
            `;
            ariaTestResults.innerHTML = results;
            ariaTestResults.classList.add('active');
            showNotification('Screen reader simulation complete', 'info');
        });
    }

    // Testing Strategy Tools
    const demoButtons = document.querySelectorAll('.demo-btn');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tool = this.dataset.tool;
            let message = '';
            
            switch(tool) {
                case 'axe':
                    message = 'axe-core accessibility scan initiated';
                    break;
                case 'lighthouse':
                    message = 'Lighthouse accessibility audit started';
                    break;
                case 'wave':
                    message = 'WAVE evaluation tool activated';
                    break;
            }
            
            showNotification(message, 'info');
        });
    });

    // Manual Testing Buttons
    const testKeyboard = document.getElementById('test-keyboard');
    const testScreenReaderBtn = document.getElementById('test-screen-reader');
    const testStructure = document.getElementById('test-structure');

    if (testKeyboard) {
        testKeyboard.addEventListener('click', function() {
            const output = document.getElementById('keyboard-results');
            output.innerHTML = `
Tab Order Analysis:
1. Navigation links (7 items) ✅
2. Demo control buttons ✅  
3. Interactive form elements ✅
4. Testing tool buttons ✅
5. Checklist checkboxes ✅

Focus Indicators: ✅ Visible
Skip Links: ⚠️ Not implemented
Keyboard Traps: ✅ None detected
            `;
            output.classList.add('active');
            showNotification('Keyboard navigation tested', 'success');
        });
    }

    if (testScreenReaderBtn) {
        testScreenReaderBtn.addEventListener('click', function() {
            const output = document.getElementById('sr-results');
            output.innerHTML = `
Screen Reader Compatibility:
• NVDA: ✅ Full support
• JAWS: ✅ Full support  
• VoiceOver: ✅ Full support
• TalkBack: ✅ Mobile support

Landmark Navigation: ✅ Working
Heading Navigation: ✅ Working
Content Announcements: ✅ Clear
            `;
            output.classList.add('active');
            showNotification('Screen reader compatibility verified', 'success');
        });
    }

    if (testStructure) {
        testStructure.addEventListener('click', function() {
            const output = document.getElementById('structure-results');
            output.innerHTML = `
Document Structure Analysis:
• DOCTYPE: ✅ HTML5
• Language: ✅ en declared
• Title: ✅ Descriptive
• Headings: ✅ Logical hierarchy
• Landmarks: ✅ All regions identified
• Semantic Elements: ✅ Properly used
• ARIA: ✅ Enhances semantics
            `;
            output.classList.add('active');
            showNotification('Document structure analyzed', 'success');
        });
    }

    // Checklist Functionality
    const checklistTabs = document.querySelectorAll('.checklist-tab');
    const checklistContents = document.querySelectorAll('.checklist-content');
    
    checklistTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const checklist = this.dataset.checklist;
            
            // Update active tab
            checklistTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            checklistContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${checklist}-checklist`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Checklist Progress Tracking
    const checkboxes = document.querySelectorAll('.checklist-container input[type="checkbox"]');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    function updateProgress() {
        const totalItems = checkboxes.length;
        const completedItems = document.querySelectorAll('.checklist-container input[type="checkbox"]:checked').length;
        const percentage = Math.round((completedItems / totalItems) * 100);
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Complete (${completedItems}/${totalItems} items)`;
        
        if (percentage === 100) {
            showNotification('🎉 All accessibility tests completed!', 'success');
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.parentElement;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#6b7280';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '#374151';
            }
            updateProgress();
        });
    });

    // Export and Reset Functionality
    const exportResults = document.getElementById('export-results');
    const resetChecklist = document.getElementById('reset-checklist');

    if (exportResults) {
        exportResults.addEventListener('click', function() {
            const completedItems = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    completedItems.push(checkbox.parentElement.textContent.trim());
                }
            });
            
            const results = {
                timestamp: new Date().toISOString(),
                completedTests: completedItems,
                totalTests: checkboxes.length,
                completionRate: Math.round((completedItems.length / checkboxes.length) * 100)
            };
            
            const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `accessibility-test-results-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            showNotification('Test results exported successfully', 'success');
        });
    }

    if (resetChecklist) {
        resetChecklist.addEventListener('click', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                const label = checkbox.parentElement;
                label.style.textDecoration = 'none';
                label.style.color = '#374151';
            });
            updateProgress();
            showNotification('Checklist reset successfully', 'info');
        });
    }

    // Initialize progress
    updateProgress();

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') notification.style.background = '#10b981';
        else if (type === 'warning') notification.style.background = '#f59e0b';
        else if (type === 'error') notification.style.background = '#ef4444';
        else notification.style.background = '#6366f1';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
});
