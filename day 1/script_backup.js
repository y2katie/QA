// Name, Role & Value Interactive Demo Script
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab Management System
    class TabManager {
        constructor(tabSelector, contentSelector) {
            this.tabs = document.querySelectorAll(tabSelector);
            this.contents = document.querySelectorAll(contentSelector);
            this.init();
        }
        
        init() {
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => this.switchTab(index));
            });
        }
        
        switchTab(activeIndex) {
            this.tabs.forEach((tab, index) => {
                tab.classList.toggle('active', index === activeIndex);
            });
            this.contents.forEach((content, index) => {
                content.classList.toggle('active', index === activeIndex);
            });
        }
    }
    
    // Initialize all tab systems
    new TabManager('.tab-btn', '.tab-content');
    new TabManager('.role-tab-btn', '.role-tab-content');
    new TabManager('.checklist-tab', '.checklist-content');
    new TabManager('.challenge-tab-btn', '.challenge-content');
    
    // Screen Reader Simulator
    class ScreenReaderSimulator {
        constructor() {
            this.isActive = false;
            this.currentElement = null;
            this.mode = 'browse';
        }
        
        announce(text, priority = 'polite') {
            if (!this.isActive) return;
            
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', priority);
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-announcement';
            announcement.textContent = text;
            
            document.body.appendChild(announcement);
            
            // Remove after announcement
            setTimeout(() => {
                if (announcement.parentNode) {
                    announcement.parentNode.removeChild(announcement);
                }
            }, 1000);
        }
        
        getAccessibleName(element) {
            // Check aria-label first
            if (element.getAttribute('aria-label')) {
                return element.getAttribute('aria-label');
            }
            
            // Check aria-labelledby
            const labelledBy = element.getAttribute('aria-labelledby');
            if (labelledBy) {
                const labelElement = document.getElementById(labelledBy);
                if (labelElement) {
                    return labelElement.textContent.trim();
                }
            }
            
            // Check associated label
            if (element.id) {
                const label = document.querySelector(`label[for="${element.id}"]`);
                if (label) {
                    return label.textContent.trim();
                }
            }
            
            // Check if element is wrapped in label
            const parentLabel = element.closest('label');
            if (parentLabel) {
                return parentLabel.textContent.trim();
            }
            
            // For navigation elements, check aria-label
            if (element.tagName.toLowerCase() === 'nav' && element.getAttribute('aria-label')) {
                return element.getAttribute('aria-label');
            }
            
            // For header elements with h1, use the h1 text
            if (element.tagName.toLowerCase() === 'header') {
                const h1 = element.querySelector('h1');
                if (h1) {
                    return h1.textContent.trim();
                }
            }
            
            // Check title attribute
            if (element.title) {
                return element.title;
            }
            
            // For images, check alt text
            if (element.tagName.toLowerCase() === 'img' && element.alt) {
                return element.alt;
            }
            
            // Fall back to text content for buttons, links, etc.
            if (['button', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element.tagName.toLowerCase())) {
                return element.textContent.trim();
            }
            
            return '';
        }
        
        getRole(element) {
            if (element.getAttribute('role')) {
                return element.getAttribute('role');
            }
            
            // Implicit roles
            const tagRoles = {
                'button': 'button',
                'a': 'link',
                'input': this.getInputRole(element),
                'select': 'combobox',
                'textarea': 'textbox',
                'h1': 'heading',
                'h2': 'heading',
                'h3': 'heading',
                'h4': 'heading',
                'h5': 'heading',
                'h6': 'heading',
                'nav': 'navigation',
                'main': 'main',
                'header': 'banner',
                'footer': 'contentinfo',
                'aside': 'complementary'
            };
            
            return tagRoles[element.tagName.toLowerCase()] || 'generic';
        }
        
        getInputRole(input) {
            const type = input.type || 'text';
            const roleMap = {
                'text': 'textbox',
                'email': 'textbox',
                'password': 'textbox',
                'search': 'searchbox',
                'tel': 'textbox',
                'url': 'textbox',
                'checkbox': 'checkbox',
                'radio': 'radio',
                'button': 'button',
                'submit': 'button',
                'reset': 'button'
            };
            return roleMap[type] || 'textbox';
        }
        
        getValue(element) {
            const values = [];
            
            // Form values
            if (element.value !== undefined && element.value !== '') {
                values.push(element.value);
            }
            
            // States
            if (element.getAttribute('aria-pressed')) {
                values.push(element.getAttribute('aria-pressed') === 'true' ? 'pressed' : 'not pressed');
            }
            
            if (element.getAttribute('aria-expanded')) {
                values.push(element.getAttribute('aria-expanded') === 'true' ? 'expanded' : 'collapsed');
            }
            
            if (element.checked !== undefined) {
                values.push(element.checked ? 'checked' : 'not checked');
            }
            
            // Properties
            if (element.getAttribute('aria-required') === 'true') {
                values.push('required');
            }
            
            if (element.getAttribute('aria-invalid') === 'true') {
                values.push('invalid');
            }
            
            if (element.disabled) {
                values.push('disabled');
            }
            
            return values.join(', ');
        }
        
        announceElement(element) {
            if (!element) return { name: '', role: '', value: '', announcement: '' };
            
            const tagName = element.tagName.toLowerCase();
            const role = element.getAttribute('role') || this.getRole(element);
            const name = this.getAccessibleName(element);
            const value = this.getAccessibleValue(element);
            
            let announcement = '';
            if (name) announcement += name;
            
            // Special handling for landmark roles
            if (role && this.isLandmarkRole(role)) {
                announcement += (announcement ? ', ' : '') + this.getLandmarkAnnouncement(role);
            } else if (role && role !== 'generic') {
                announcement += (announcement ? ', ' : '') + role;
            }
            
            if (value) announcement += ', ' + value;
            
            // Simulate speech
            if (this.isActive && this.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance(announcement);
                utterance.rate = 0.8;
                utterance.pitch = 1;
                this.speechSynthesis.speak(utterance);
            }
            
            return {
                name,
                role,
                value,
                announcement
            };
        }
        
        isLandmarkRole(role) {
            return ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'search', 'form', 'region'].includes(role);
        }
        
        getLandmarkAnnouncement(role) {
            const landmarkNames = {
                'banner': 'banner',
                'navigation': 'navigation',
                'main': 'main',
                'complementary': 'complementary',
                'contentinfo': 'contentinfo',
                'search': 'search',
                'form': 'form',
                'region': 'region'
            };
            return landmarkNames[role] || role;
        }
    }
    
    const screenReader = new ScreenReaderSimulator();
    
    // Demo Analysis Functions
    function analyzeDemoButtons() {
        const goodBtn = document.getElementById('demo-good-button');
        const badBtn = document.getElementById('demo-bad-button');
        const output = document.getElementById('demo-analysis');
        
        if (!goodBtn || !badBtn || !output) return;
        
        const goodAnalysis = screenReader.announceElement(goodBtn);
        const badAnalysis = screenReader.announceElement(badBtn);
        
        output.innerHTML = `
            <h4>Button Analysis Results - The Key Differences</h4>
            <div class="analysis-comparison">
                <div class="analysis-item good">
                    <h5>✅ Good Button (Left)</h5>
                    <p><strong>Name:</strong> "${goodAnalysis.name}"</p>
                    <p><strong>Role:</strong> ${goodAnalysis.role}</p>
                    <p><strong>Value:</strong> ${goodAnalysis.value || 'None'}</p>
                    <p><strong>Screen Reader Announces:</strong> "${goodAnalysis.announcement}"</p>
                    <p class="explanation">Clear, descriptive name tells users exactly what this button does.</p>
                </div>
                <div class="analysis-item bad">
                    <h5>❌ Bad Button (Right)</h5>
                    <p><strong>Name:</strong> "${badAnalysis.name}"</p>
                    <p><strong>Role:</strong> ${badAnalysis.role}</p>
                    <p><strong>Value:</strong> ${badAnalysis.value || 'None'}</p>
                    <p><strong>Screen Reader Announces:</strong> "${badAnalysis.announcement}"</p>
                    <p class="explanation">Confusing name - screen reader says "floppy disk" or "Click here" instead of explaining the button's purpose.</p>
                </div>
            </div>
            <div class="demo-instructions">
                <h5>🎧 To Hear the Difference:</h5>
                <ol>
                    <li>Turn on your screen reader (VoiceOver on Mac: Cmd+F5, NVDA/JAWS on Windows)</li>
                    <li>Navigate to each button with Tab key</li>
                    <li>Listen to how differently they're announced</li>
                    <li>Or click "Start Simulation" in the Testing Tools section below</li>
                </ol>
            </div>
        `;
        output.style.display = 'block';
    }
    
    // Form Demo Functions
    function showBasicForm() {
        const container = document.getElementById('form-demo');
        if (!container) return;
        
        container.innerHTML = `
            <div class="form-example basic">
                <h5>Basic Form (Poor Accessibility)</h5>
                <div class="form-field">
                    <div>Email</div>
                    <input type="text" placeholder="Enter email">
                </div>
                <div class="form-field">
                    <div>Password</div>
                    <input type="password">
                </div>
                <div class="form-field">
                    <input type="checkbox"> Subscribe to newsletter
                </div>
                <button type="button">Submit</button>
            </div>
        `;
    }
    
    function showEnhancedForm() {
        const container = document.getElementById('form-demo');
        if (!container) return;
        
        container.innerHTML = `
            <div class="form-example enhanced">
                <h5>Enhanced Form (Good Accessibility)</h5>
                <div class="form-field">
                    <label for="enhanced-email">Email Address</label>
                    <input type="email" id="enhanced-email" aria-required="true" aria-describedby="email-help">
                    <div id="email-help">We'll never share your email</div>
                </div>
                <div class="form-field">
                    <label for="enhanced-password">Password</label>
                    <input type="password" id="enhanced-password" aria-required="true" aria-describedby="pwd-help">
                    <div id="pwd-help">Must be at least 8 characters</div>
                </div>
                <div class="form-field">
                    <label>
                        <input type="checkbox" id="enhanced-newsletter"> 
                        Subscribe to newsletter
                    </label>
                </div>
                <button type="submit" aria-describedby="submit-help">Create Account</button>
                <div id="submit-help">By submitting, you agree to our terms</div>
            </div>
        `;
    }
    
    function testFormNames() {
        const container = document.getElementById('form-demo');
        const output = document.getElementById('form-analysis');
        if (!container || !output) return;
        
        const inputs = container.querySelectorAll('input, button');
        let results = '<h4>Form Element Analysis</h4><div class="form-analysis-results">';
        
        inputs.forEach((input, index) => {
            const analysis = screenReader.announceElement(input);
            const hasGoodName = analysis.name && analysis.name !== input.tagName.toLowerCase();
            
            results += `
                <div class="analysis-result ${hasGoodName ? 'good' : 'bad'}">
                    <h6>Element ${index + 1}: ${input.tagName.toLowerCase()}</h6>
                    <p><strong>Name:</strong> ${analysis.name}</p>
                    <p><strong>Role:</strong> ${analysis.role}</p>
                    <p><strong>Value:</strong> ${analysis.value || 'None'}</p>
                    <p><strong>Announcement:</strong> "${analysis.announcement}"</p>
                    ${!hasGoodName ? '<p class="warning">⚠️ Missing or poor accessible name</p>' : '<p class="success">✅ Good accessible name</p>'}
                </div>
            `;
        });
        
        results += '</div>';
        output.innerHTML = results;
        output.style.display = 'block';
    }
    
    // Interactive Value Testing
    function setupValueTesting() {
        // Input value testing
        const checkInputBtn = document.getElementById('check-input-value');
        if (checkInputBtn) {
            checkInputBtn.addEventListener('click', () => {
                const input = document.getElementById('test-input');
                const results = document.getElementById('form-value-results');
                if (input && results) {
                    const analysis = screenReader.announceElement(input);
                    results.innerHTML = `
                        <h5>Input Analysis</h5>
                        <p><strong>Current Value:</strong> "${input.value || '(empty)'}"</p>
                        <p><strong>Screen Reader Announcement:</strong> "${analysis.announcement}"</p>
                    `;
                    results.style.display = 'block';
                }
            });
        }
        
        // Select value testing
        const checkSelectBtn = document.getElementById('check-select-value');
        if (checkSelectBtn) {
            checkSelectBtn.addEventListener('click', () => {
                const select = document.getElementById('test-select');
                const results = document.getElementById('form-value-results');
                if (select && results) {
                    const selectedOption = select.options[select.selectedIndex];
                    const analysis = screenReader.announceElement(select);
                    results.innerHTML = `
                        <h5>Select Analysis</h5>
                        <p><strong>Selected Value:</strong> "${select.value || '(none selected)'}"</p>
                        <p><strong>Selected Text:</strong> "${selectedOption ? selectedOption.textContent : '(none)'}"</p>
                        <p><strong>Screen Reader Announcement:</strong> "${analysis.announcement}"</p>
                    `;
                    results.style.display = 'block';
                }
            });
        }
        
        // Checkbox values testing
        const checkCheckboxBtn = document.getElementById('check-checkbox-values');
        if (checkCheckboxBtn) {
            checkCheckboxBtn.addEventListener('click', () => {
                const newsletter = document.getElementById('newsletter');
                const updates = document.getElementById('updates');
                const results = document.getElementById('form-value-results');
                if (results) {
                    let html = '<h5>Checkbox Analysis</h5>';
                    
                    [newsletter, updates].forEach(checkbox => {
                        if (checkbox) {
                            const analysis = screenReader.announceElement(checkbox);
                            html += `
                                <div class="checkbox-result">
                                    <p><strong>${checkbox.value}:</strong> ${checkbox.checked ? 'Checked' : 'Unchecked'}</p>
                                    <p><strong>Screen Reader:</strong> "${analysis.announcement}"</p>
                                </div>
                            `;
                        }
                    });
                    
                    results.innerHTML = html;
                    results.style.display = 'block';
                }
            });
        }
    }
    
    // State Testing
    function setupStateTesting() {
        // Toggle button
        const toggleBtn = document.getElementById('toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const pressed = toggleBtn.getAttribute('aria-pressed') === 'true';
                toggleBtn.setAttribute('aria-pressed', !pressed);
                toggleBtn.textContent = `Toggle Button (${!pressed ? 'On' : 'Off'})`;
            });
        }
        
        const checkToggleBtn = document.getElementById('check-toggle-state');
        if (checkToggleBtn) {
            checkToggleBtn.addEventListener('click', () => {
                const toggleBtn = document.getElementById('toggle-btn');
                const results = document.getElementById('state-results');
                if (toggleBtn && results) {
                    const analysis = screenReader.announceElement(toggleBtn);
                    results.innerHTML = `
                        <h5>Toggle Button State</h5>
                        <p><strong>aria-pressed:</strong> ${toggleBtn.getAttribute('aria-pressed')}</p>
                        <p><strong>Screen Reader:</strong> "${analysis.announcement}"</p>
                    `;
                    results.style.display = 'block';
                }
            });
        }
        
        // Expandable section
        const expandBtn = document.getElementById('expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                const content = document.getElementById('expandable-content');
                const expanded = expandBtn.getAttribute('aria-expanded') === 'true';
                
                expandBtn.setAttribute('aria-expanded', !expanded);
                if (content) {
                    content.style.display = !expanded ? 'block' : 'none';
                }
                expandBtn.textContent = `Expandable Section (${!expanded ? 'Expanded' : 'Collapsed'})`;
            });
        }
        
        const checkExpandBtn = document.getElementById('check-expand-state');
        if (checkExpandBtn) {
            checkExpandBtn.addEventListener('click', () => {
                const expandBtn = document.getElementById('expand-btn');
                const results = document.getElementById('state-results');
                if (expandBtn && results) {
                    const analysis = screenReader.announceElement(expandBtn);
                    results.innerHTML = `
                        <h5>Expandable Section State</h5>
                        <p><strong>aria-expanded:</strong> ${expandBtn.getAttribute('aria-expanded')}</p>
                        <p><strong>Screen Reader:</strong> "${analysis.announcement}"</p>
                    `;
                    results.style.display = 'block';
                }
            });
        }
    }
    
    // Testing Tools
    function setupTestingTools() {
        // DevTools simulation
        const inspectBtn = document.getElementById('inspect-page-elements');
        if (inspectBtn) {
            inspectBtn.addEventListener('click', () => {
                const results = document.getElementById('devtools-results');
                if (results) {
                    const interactiveElements = document.querySelectorAll('button, input, select, a, [role="button"], [role="link"]');
                    let html = '<h5>Page Elements Inspection</h5>';
                    
                    interactiveElements.forEach((el, index) => {
                        if (index < 10) { // Limit to first 10 for demo
                            const analysis = screenReader.announceElement(el);
                            html += `
                                <div class="element-inspection">
                                    <strong>${el.tagName.toLowerCase()}</strong> - ${analysis.announcement}
                                </div>
                            `;
                        }
                    });
                    
                    results.innerHTML = html;
                    results.style.display = 'block';
                }
            });
        }
        
        // Screen reader simulation controls
        const startSimBtn = document.getElementById('start-simulation');
        const stopSimBtn = document.getElementById('stop-simulation');
        
        if (startSimBtn) {
            startSimBtn.addEventListener('click', () => {
                screenReader.isActive = true;
                screenReader.announce('Screen reader simulation started');
                const output = document.getElementById('sr-output');
                if (output) {
                    output.innerHTML = '<p>Screen reader simulation active. Click elements to hear announcements.</p>';
                    output.style.display = 'block';
                }
            });
        }
        
        if (stopSimBtn) {
            stopSimBtn.addEventListener('click', () => {
                screenReader.isActive = false;
                const output = document.getElementById('sr-output');
                if (output) {
                    output.innerHTML = '<p>Screen reader simulation stopped.</p>';
                }
            });
        }
        
        // Add click listeners to all interactive elements for simulation
        document.addEventListener('click', (e) => {
            if (screenReader.isActive && (e.target.matches('button, input, select, a, [role="button"], [role="link"]'))) {
                const analysis = screenReader.announceElement(e.target);
                
                // Show visual feedback for demo buttons
                if (e.target.id === 'demo-good-button' || e.target.id === 'demo-bad-button') {
                    const feedback = document.createElement('div');
                    feedback.className = 'sr-feedback';
                    feedback.textContent = `Screen Reader: "${analysis.announcement}"`;
                    feedback.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #1e293b;
                        color: #e2e8f0;
                        padding: 1rem;
                        border-radius: 6px;
                        z-index: 9999;
                        max-width: 300px;
                        font-family: monospace;
                        font-size: 0.9rem;
                    `;
                    document.body.appendChild(feedback);
                    
                    setTimeout(() => {
                        if (feedback.parentNode) {
                            feedback.parentNode.removeChild(feedback);
                        }
                    }, 3000);
                }
            }
        });
    }
    
    // Challenge Scenarios
    function setupChallengeScenarios() {
        // Form challenge
        const analyzeFormBtn = document.getElementById('analyze-form-issues');
        if (analyzeFormBtn) {
            analyzeFormBtn.addEventListener('click', () => {
                const results = document.getElementById('form-challenge-results');
                if (results) {
                    results.innerHTML = `
                        <h5>Form Issues Identified</h5>
                        <div class="issues-list">
                            <div class="issue">
                                <strong>❌ Email field:</strong> No proper label association
                            </div>
                            <div class="issue">
                                <strong>❌ Password field:</strong> Help text not connected with aria-describedby
                            </div>
                            <div class="issue">
                                <strong>❌ Checkbox:</strong> No label association
                            </div>
                            <div class="issue">
                                <strong>❌ Submit button:</strong> Not a real button element
                            </div>
                        </div>
                    `;
                    results.style.display = 'block';
                }
            });
        }
        
        // Navigation challenge
        const testNavBtn = document.getElementById('test-nav-accessibility');
        if (testNavBtn) {
            testNavBtn.addEventListener('click', () => {
                const results = document.getElementById('nav-challenge-results');
                if (results) {
                    results.innerHTML = `
                        <h5>Navigation Issues</h5>
                        <div class="nav-issues">
                            <div class="issue">
                                <strong>❌ No accessible names:</strong> Icons have no text alternatives
                            </div>
                            <div class="issue">
                                <strong>❌ No semantic roles:</strong> Using generic divs instead of buttons/links
                            </div>
                            <div class="issue">
                                <strong>❌ No keyboard support:</strong> Cannot navigate with Tab key
                            </div>
                            <div class="issue">
                                <strong>❌ No current state:</strong> Active item not announced to screen readers
                            </div>
                        </div>
                    `;
                    results.style.display = 'block';
                }
            });
        }
    }
    
    // Reveal Answer Functionality
    function setupRevealAnswers() {
        const revealBtns = document.querySelectorAll('.reveal-btn');
        revealBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const answerId = btn.getAttribute('data-answer');
                const answer = document.getElementById(answerId);
                if (answer) {
                    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                    btn.textContent = answer.style.display === 'none' ? 'Reveal Answer' : 'Hide Answer';
                }
            });
        });
    }
    
    // Master Checklist Progress
    function setupMasterChecklist() {
        const checkboxes = document.querySelectorAll('.master-checklist input[type="checkbox"]');
        
        function updateProgress() {
            const total = checkboxes.length;
            const checked = document.querySelectorAll('.master-checklist input[type="checkbox"]:checked').length;
            const percentage = Math.round((checked / total) * 100);
            
            const progressText = document.getElementById('progress-text');
            const progressFill = document.getElementById('progress-fill');
            
            if (progressText) progressText.textContent = `${percentage}% Complete (${checked}/${total})`;
            if (progressFill) progressFill.style.width = `${percentage}%`;
            
            // Celebration for 100%
            if (percentage === 100) {
                setTimeout(() => {
                    alert('🎉 Congratulations! You\'ve completed the Name, Role & Value QA checklist!');
                }, 500);
            }
        }
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateProgress);
        });
        
        // Export functionality
        const exportBtn = document.getElementById('export-checklist');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const checkedItems = [];
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkedItems.push(checkbox.parentElement.textContent.trim());
                    }
                });
                
                const exportData = {
                    title: 'Name, Role & Value QA Checklist',
                    date: new Date().toISOString().split('T')[0],
                    completedItems: checkedItems,
                    totalItems: checkboxes.length,
                    completionRate: `${Math.round((checkedItems.length / checkboxes.length) * 100)}%`
                };
                
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = 'name-role-value-checklist.json';
                link.click();
                
                URL.revokeObjectURL(url);
            });
        }
        
        // Reset functionality
        const resetBtn = document.getElementById('reset-master-checklist');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all checklist items?')) {
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    updateProgress();
                }
            });
        }
        
        // Initial progress update
        updateProgress();
    }
    
    // Event Listeners for Demo Controls
    document.getElementById('analyze-demo')?.addEventListener('click', analyzeDemoButtons);
    
    // Add hover effects for demo buttons to show the difference
    const goodBtn = document.getElementById('demo-good-button');
    const badBtn = document.getElementById('demo-bad-button');
    
    if (goodBtn) {
        goodBtn.addEventListener('mouseenter', () => {
            if (!screenReader.isActive) {
                const tooltip = document.createElement('div');
                tooltip.className = 'demo-tooltip';
                tooltip.textContent = 'Screen reader will say: "Save document - well implemented with clear accessible name, button"';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #059669;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    max-width: 200px;
                    z-index: 1000;
                    top: 100%;
                    left: 0;
                    margin-top: 0.5rem;
                `;
                goodBtn.style.position = 'relative';
                goodBtn.appendChild(tooltip);
            }
        });
        
        goodBtn.addEventListener('mouseleave', () => {
            const tooltip = goodBtn.querySelector('.demo-tooltip');
            if (tooltip) tooltip.remove();
        });
    }
    
    if (badBtn) {
        badBtn.addEventListener('mouseenter', () => {
            if (!screenReader.isActive) {
                const tooltip = document.createElement('div');
                tooltip.className = 'demo-tooltip';
                tooltip.textContent = 'Screen reader will say: "floppy disk, button" or "Click here, button" - confusing!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #ef4444;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    max-width: 200px;
                    z-index: 1000;
                    top: 100%;
                    left: 0;
                    margin-top: 0.5rem;
                `;
                badBtn.style.position = 'relative';
                badBtn.appendChild(tooltip);
            }
        });
        
        badBtn.addEventListener('mouseleave', () => {
            const tooltip = badBtn.querySelector('.demo-tooltip');
            if (tooltip) tooltip.remove();
        });
    }
    document.getElementById('show-basic-form')?.addEventListener('click', showBasicForm);
    document.getElementById('show-enhanced-form')?.addEventListener('click', showEnhancedForm);
    document.getElementById('test-form-names')?.addEventListener('click', testFormNames);
    
    // Setup Role Testing Buttons
    function setupRoleTesting() {
        const roleButtons = document.querySelectorAll('.test-role-btn');
        
        roleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const role = button.getAttribute('data-role');
                const roleExample = button.closest('.meaning-example, .role-example');
                const codeBlock = roleExample.querySelector('code');
                
                if (!codeBlock) return;
                
                // Create a temporary element to test the role
                const testElement = document.createElement('div');
                testElement.innerHTML = codeBlock.textContent;
                const elementWithRole = testElement.querySelector(`[role="${role}"]`) || testElement.firstElementChild;
                
                if (elementWithRole) {
                    const analysis = screenReader.announceElement(elementWithRole);
                    
                    // Show role analysis popup
                    const popup = document.createElement('div');
                    popup.className = 'role-analysis-popup';
                    popup.innerHTML = `
                        <div class="popup-content">
                            <h4>Role Analysis: ${role}</h4>
                            <div class="analysis-details">
                                <p><strong>Element:</strong> ${elementWithRole.tagName.toLowerCase()}</p>
                                <p><strong>Role:</strong> ${analysis.role}</p>
                                <p><strong>Name:</strong> "${analysis.name}"</p>
                                <p><strong>Screen Reader Announces:</strong> "${analysis.announcement}"</p>
                                <div class="role-explanation">
                                    ${getRoleExplanation(role)}
                                </div>
                            </div>
                            <button class="close-popup">Close</button>
                        </div>
                    `;
                    
                    popup.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                    `;
                    
                    const content = popup.querySelector('.popup-content');
                    content.style.cssText = `
                        background: white;
                        padding: 2rem;
                        border-radius: 8px;
                        max-width: 500px;
                        max-height: 80vh;
                        overflow-y: auto;
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    `;
                    
                    document.body.appendChild(popup);
                    
                    // Close popup functionality
                    const closeBtn = popup.querySelector('.close-popup');
                    const closePopup = () => {
                        if (popup.parentNode) {
                            popup.parentNode.removeChild(popup);
                        }
                        // Return focus to the button that opened the modal
                        button.focus();
                    };
                    
                    closeBtn.addEventListener('click', closePopup);
                    popup.addEventListener('click', (e) => {
                        if (e.target === popup) closePopup();
                    });
                    
                    // Keyboard navigation
                    popup.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape') {
                            closePopup();
                        }
                        
                        // Trap focus within modal
                        if (e.key === 'Tab') {
                            const focusableElements = popup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                            const firstElement = focusableElements[0];
                            const lastElement = focusableElements[focusableElements.length - 1];
                            
                            if (e.shiftKey) {
                                if (document.activeElement === firstElement) {
                                    e.preventDefault();
                                    lastElement.focus();
                                }
                            } else {
                                if (document.activeElement === lastElement) {
                                    e.preventDefault();
                                    firstElement.focus();
                                }
                            }
                        }
                    });
                    
                    // Focus the close button when modal opens
                    setTimeout(() => closeBtn.focus(), 100);
                }
            });
        });
    }
    
    function getRoleExplanation(role) {
        const explanations = {
            'banner': 'The banner role identifies site-wide content like headers, logos, and main navigation. Screen readers announce this as a landmark that users can navigate to directly.',
            'navigation': 'The navigation role identifies collections of links for navigating the site. Screen readers provide shortcuts to jump between navigation areas.',
            'complementary': 'The complementary role identifies supporting content that complements the main content, like sidebars or related articles. Screen readers treat this as a landmark.',
            'main': 'The main role identifies the primary content of the page. There should only be one main landmark per page.',
            'contentinfo': 'The contentinfo role identifies footer information like copyright, contact details, or site links.',
            'search': 'The search role identifies search functionality. Screen readers announce this as a search landmark.',
            'form': 'The form role identifies a form region. When used with aria-label or aria-labelledby, it becomes a landmark.',
            'region': 'The region role identifies significant content areas. When labeled, it becomes a navigable landmark.'
        };
        
        return explanations[role] || 'This role provides semantic meaning to help screen readers understand the purpose and structure of content.';
    }
    
    // Initialize all functionality
    setupValueTesting();
    setupStateTesting();
    setupTestingTools();
    setupChallengeScenarios();
    setupRevealAnswers();
    setupMasterChecklist();
    setupRoleTesting();
    
    // Smooth scrolling for navigation
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
    
    console.log('🚀 Name, Role & Value demo initialized successfully!');
});
