// Day 2: Page Meaning & Accessibility - Interactive Features

// Tab Manager Class
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

// Page Structure Analyzer
class PageStructureAnalyzer {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeChecklist();
        this.initializeTabs();
    }

    initializeChecklist() {
        // This is a placeholder for checklist functionality
    }

    initializeTabs() {
        // Initialize demo tabs
        new TabManager('.demo-tabs .tab-btn', '.demo-tabs ~ .tab-content');
        // Initialize scenario tabs  
        new TabManager('.scenario-tabs .tab-btn', '.scenario-tabs ~ .tab-content');
    }

    setupEventListeners() {
        // Structure analysis buttons
        const analyzeBtn = document.getElementById('analyze-structure');
        const testHeadingsBtn = document.getElementById('test-headings');
        const checkLandmarksBtn = document.getElementById('check-landmarks');

        if (analyzeBtn) analyzeBtn.addEventListener('click', () => this.analyzeCurrentStructure());
        if (testHeadingsBtn) testHeadingsBtn.addEventListener('click', () => this.testHeadingHierarchy());
        if (checkLandmarksBtn) checkLandmarksBtn.addEventListener('click', () => this.checkLandmarks());

        // Heading hierarchy buttons
        const scanHeadingsBtn = document.getElementById('scan-headings');
        const validateHierarchyBtn = document.getElementById('validate-hierarchy');
        const simulateNavigationBtn = document.getElementById('simulate-navigation');

        if (scanHeadingsBtn) scanHeadingsBtn.addEventListener('click', () => this.scanPageHeadings());
        if (validateHierarchyBtn) validateHierarchyBtn.addEventListener('click', () => this.validateHierarchy());
        if (simulateNavigationBtn) simulateNavigationBtn.addEventListener('click', () => this.simulateScreenReaderNavigation());

        // Form analysis buttons
        const analyzeFormBtn = document.getElementById('analyze-form');
        const testFormFlowBtn = document.getElementById('test-form-flow');

        if (analyzeFormBtn) analyzeFormBtn.addEventListener('click', () => this.analyzeFormStructure());
        if (testFormFlowBtn) testFormFlowBtn.addEventListener('click', () => this.testFormReadingFlow());

        // Landmark testing buttons
        const highlightLandmarksBtn = document.getElementById('highlight-landmarks');
        const testNavigationBtn = document.getElementById('test-navigation');
        const checkLabelsBtn = document.getElementById('check-labels');

        if (highlightLandmarksBtn) highlightLandmarksBtn.addEventListener('click', () => this.highlightLandmarks());
        if (testNavigationBtn) testNavigationBtn.addEventListener('click', () => this.testLandmarkNavigation());
        if (checkLabelsBtn) checkLabelsBtn.addEventListener('click', () => this.checkLandmarkLabels());

        // Scenario testing buttons
        const testEcommerceBtn = document.getElementById('test-ecommerce');
        const testBlogBtn = document.getElementById('test-blog');
        const testWebappBtn = document.getElementById('test-webapp');

        if (testEcommerceBtn) testEcommerceBtn.addEventListener('click', () => this.testEcommerceStructure());
        if (testBlogBtn) testBlogBtn.addEventListener('click', () => this.testBlogStructure());
        if (testWebappBtn) testWebappBtn.addEventListener('click', () => this.testWebappStructure());

        // Checklist management
        const exportBtn = document.getElementById('export-checklist');
        const resetBtn = document.getElementById('reset-checklist');

        if (exportBtn) exportBtn.addEventListener('click', () => this.exportChecklist());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetChecklist());
    }

    analyzeCurrentStructure() {
        const resultsContainer = document.getElementById('structure-results');
        if (!resultsContainer) return;

        const activeTab = document.querySelector('.tab-content.active');
        const isGoodStructure = activeTab && activeTab.id === 'good-structure';

        if (isGoodStructure) {
            resultsContainer.innerHTML = `
                <div class="analysis-summary good">
                    <h4>GOOD Structure Analysis</h4>
                    <div class="analysis-grid">
                        <div class="analysis-item">
                            <span class="status good">GOOD</span>
                            <span>Semantic landmarks found: header, main, aside</span>
                        </div>
                        <div class="analysis-item">
                            <span class="status good">GOOD</span>
                            <span>Proper heading hierarchy (H1 → H2 → H3)</span>
                        </div>
                        <div class="analysis-item">
                            <span class="status good">GOOD</span>
                            <span>Article and section elements used correctly</span>
                        </div>
                        <div class="analysis-item">
                            <span class="status good">GOOD</span>
                            <span>Navigation has descriptive aria-label</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="analysis-summary bad">
                    <h4>POOR Structure Analysis</h4>
                    <div class="analysis-grid">
                        <div class="analysis-item">
                            <span class="status error">ERROR</span>
                            <span>No semantic landmarks - only generic divs</span>
                        </div>
                        <div class="analysis-item">
                            <span class="status error">ERROR</span>
                            <span>No heading hierarchy - styled text instead</span>
                        </div>
                        <div class="analysis-item">
                            <span class="status error">ERROR</span>
                            <span>No semantic content grouping</span>
                        </div>
                        <div class="analysis-item">
                            <span class="status warning">WARNING</span>
                            <span>Screen readers cannot navigate efficiently</span>
                        </div>
                <div class="analysis-results">
                    <div class="analysis-section">
                        <strong>❌ Issues Found:</strong>
                        <ul>
                            <li>No semantic landmarks (header, main, nav, aside)</li>
                            <li>Generic div elements throughout</li>
                            <li>No proper heading hierarchy</li>
                            <li>Missing semantic relationships</li>
                            <li>No structured data markup</li>
                            <li>No time or citation elements</li>
                        </ul>
                    </div>
                    
                    <div class="analysis-section">
                        <strong>❌ Accessibility Problems:</strong>
                        <ul>
                            <li>Screen readers can't identify page regions</li>
                            <li>No skip navigation possible</li>
                            <li>Content relationships unclear</li>
                            <li>Poor keyboard navigation</li>
                        </ul>
                    </div>
                    
                    <div class="analysis-section">
                        <strong>📊 Screen Reader Experience:</strong>
                        <p>"E-commerce Product Page, Home Electronics Laptop, Product Information, Gaming Laptop Pro..." (flat, confusing structure)</p>
                    </div>
                </div>
            `;
        }
        
        this.showNotification('Structure analysis complete', 'info');
    }

    updateButtonStates(activeView) {
        const goodBtn = document.getElementById('show-good-structure');
        const badBtn = document.getElementById('show-bad-structure');
        
        if (goodBtn && badBtn) {
            goodBtn.classList.toggle('active', activeView === 'good');
            badBtn.classList.toggle('active', activeView === 'bad');
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    targetElement.focus();
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem',
            borderRadius: '0',
            color: 'white',
            fontWeight: '400',
            zIndex: '9999',
            maxWidth: '300px',
            transform: 'translateX(100%)',
            transition: 'transform 0.2s ease',
            fontSize: '0.9rem'
        });
        
        const colors = {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#6366f1'
        };
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Heading Hierarchy Validator Class
class HeadingHierarchyValidator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const scanBtn = document.getElementById('scan-headings');
        const validateBtn = document.getElementById('validate-hierarchy');
        const simulateBtn = document.getElementById('simulate-navigation');

        if (scanBtn) {
            scanBtn.addEventListener('click', () => this.scanPageHeadings());
        }
        if (validateBtn) {
            validateBtn.addEventListener('click', () => this.validateHierarchy());
        }
        if (simulateBtn) {
            simulateBtn.addEventListener('click', () => this.simulateScreenReaderNavigation());
        }
    }

    scanPageHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const analysisOutput = document.getElementById('heading-analysis');
        
        if (!analysisOutput) return;

        let output = '<div class="scan-results">';
        output += '<h4>Page Headings Scan Results</h4>';
        output += `<p class="scan-summary">Found ${headings.length} headings on this page:</p>`;
        output += '<div class="heading-list">';

        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();
            const indent = '  '.repeat(level - 1);
            
            output += `<div class="heading-item level-${level}">`;
            output += `<span class="heading-tag">${heading.tagName}</span>`;
            output += `<span class="heading-text">${indent}${text}</span>`;
            output += '</div>';
        });

        output += '</div></div>';
        analysisOutput.innerHTML = output;
        analysisOutput.style.display = 'block';
    }

    validateHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const analysisOutput = document.getElementById('heading-analysis');
        
        if (!analysisOutput) return;

        let issues = [];
        let previousLevel = 0;
        let h1Count = 0;

        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();

            // Check for H1 count
            if (level === 1) {
                h1Count++;
                if (h1Count > 1) {
                    issues.push({
                        type: 'error',
                        message: `Multiple H1 elements found. Page should have only one H1.`,
                        element: heading.tagName,
                        text: text
                    });
                }
            }

            // Check for skipped levels
            if (previousLevel > 0 && level > previousLevel + 1) {
                issues.push({
                    type: 'warning',
                    message: `Heading level skipped from H${previousLevel} to H${level}. Consider using H${previousLevel + 1} instead.`,
                    element: heading.tagName,
                    text: text
                });
            }

            // Check for empty headings
            if (!text) {
                issues.push({
                    type: 'error',
                    message: `Empty heading found.`,
                    element: heading.tagName,
                    text: '(empty)'
                });
            }

            previousLevel = level;
        });

        // Check if page starts with H1
        if (headings.length > 0 && parseInt(headings[0].tagName.charAt(1)) !== 1) {
            issues.push({
                type: 'warning',
                message: 'Page should start with an H1 element.',
                element: headings[0].tagName,
                text: headings[0].textContent.trim()
            });
        }

        let output = '<div class="validation-results">';
        output += '<h4>Heading Hierarchy Validation</h4>';

        if (issues.length === 0) {
            output += '<div class="validation-success">✅ No hierarchy issues found! Your heading structure follows accessibility best practices.</div>';
        } else {
            output += `<div class="validation-summary">Found ${issues.length} issue(s):</div>`;
            output += '<div class="issues-list">';
            
            issues.forEach(issue => {
                const iconClass = issue.type === 'error' ? 'error' : 'warning';
                const icon = issue.type === 'error' ? '❌' : '⚠️';
                
                output += `<div class="issue-item ${iconClass}">`;
                output += `<span class="issue-icon">${icon}</span>`;
                output += `<div class="issue-content">`;
                output += `<div class="issue-message">${issue.message}</div>`;
                output += `<div class="issue-element">${issue.element}: "${issue.text}"</div>`;
                output += '</div></div>';
            });
            
            output += '</div>';
        }

        output += '</div>';
        analysisOutput.innerHTML = output;
        analysisOutput.style.display = 'block';
    }

    simulateScreenReaderNavigation() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const analysisOutput = document.getElementById('heading-analysis');
        
        if (!analysisOutput) return;

        let output = '<div class="navigation-simulation">';
        output += '<h4>Screen Reader Navigation Simulation</h4>';
        output += '<p class="simulation-intro">This shows how a screen reader user would navigate through headings using keyboard shortcuts:</p>';
        
        output += '<div class="navigation-controls">';
        output += '<button id="nav-next" class="nav-btn">Next Heading (H key)</button>';
        output += '<button id="nav-prev" class="nav-btn">Previous Heading (Shift+H)</button>';
        output += '<button id="nav-reset" class="nav-btn">Reset Navigation</button>';
        output += '</div>';

        output += '<div class="current-heading-display">';
        output += '<div id="current-heading" class="current-heading">Press "Next Heading" to start navigation</div>';
        output += '<div id="heading-context" class="heading-context"></div>';
        output += '</div>';

        output += '<div class="heading-outline">';
        output += '<h5>Complete Heading Outline:</h5>';
        output += '<div class="outline-list">';

        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();
            const indent = '  '.repeat(level - 1);
            
            output += `<div class="outline-item" data-heading-index="${index}">`;
            output += `<span class="outline-level">${heading.tagName}</span>`;
            output += `<span class="outline-text">${indent}${text}</span>`;
            output += '</div>';
        });

        output += '</div></div></div>';
        
        analysisOutput.innerHTML = output;
        analysisOutput.style.display = 'block';

        // Initialize navigation simulation
        this.initializeNavigation(headings);
    }

    initializeNavigation(headings) {
        let currentIndex = -1;
        
        const nextBtn = document.getElementById('nav-next');
        const prevBtn = document.getElementById('nav-prev');
        const resetBtn = document.getElementById('nav-reset');
        const currentDisplay = document.getElementById('current-heading');
        const contextDisplay = document.getElementById('heading-context');
        const outlineItems = document.querySelectorAll('.outline-item');

        const updateDisplay = () => {
            // Clear previous highlights
            outlineItems.forEach(item => item.classList.remove('current'));
            
            if (currentIndex >= 0 && currentIndex < headings.length) {
                const heading = headings[currentIndex];
                const level = parseInt(heading.tagName.charAt(1));
                const text = heading.textContent.trim();
                
                currentDisplay.innerHTML = `<strong>${heading.tagName}:</strong> ${text}`;
                contextDisplay.innerHTML = `Heading ${currentIndex + 1} of ${headings.length} | Level ${level}`;
                
                // Highlight current item in outline
                if (outlineItems[currentIndex]) {
                    outlineItems[currentIndex].classList.add('current');
                }
            } else {
                currentDisplay.innerHTML = currentIndex < 0 ? 
                    'Press "Next Heading" to start navigation' : 
                    'End of headings reached';
                contextDisplay.innerHTML = '';
            }
        };

        nextBtn.addEventListener('click', () => {
            if (currentIndex < headings.length - 1) {
                currentIndex++;
                updateDisplay();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateDisplay();
            }
        });

        resetBtn.addEventListener('click', () => {
            currentIndex = -1;
            updateDisplay();
        });
    }
}

// Landmark Tester Class
class LandmarkTester {
    constructor() {
        this.highlightedElements = [];
        this.currentLandmarkIndex = -1;
        this.landmarks = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const highlightBtn = document.getElementById('highlight-landmarks');
        const testNavBtn = document.getElementById('test-navigation');
        const checkLabelsBtn = document.getElementById('check-labels');

        if (highlightBtn) {
            highlightBtn.addEventListener('click', () => this.highlightLandmarks());
        }
        if (testNavBtn) {
            testNavBtn.addEventListener('click', () => this.testNavigation());
        }
        if (checkLabelsBtn) {
            checkLabelsBtn.addEventListener('click', () => this.checkLabels());
        }
    }

    getLandmarks() {
        // Define landmark selectors
        const landmarkSelectors = {
            'main': 'main, [role="main"]',
            'navigation': 'nav, [role="navigation"]',
            'banner': 'header, [role="banner"]',
            'contentinfo': 'footer, [role="contentinfo"]',
            'complementary': 'aside, [role="complementary"]',
            'region': '[role="region"]',
            'search': '[role="search"]',
            'form': 'form[aria-label], form[aria-labelledby], [role="form"]',
            'article': 'article',
            'section': 'section[aria-label], section[aria-labelledby]'
        };

        const landmarks = [];
        
        Object.entries(landmarkSelectors).forEach(([type, selector]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                landmarks.push({
                    element,
                    type,
                    label: this.getLandmarkLabel(element, type),
                    implicit: this.isImplicitLandmark(element, type)
                });
            });
        });

        return landmarks.sort((a, b) => {
            const aRect = a.element.getBoundingClientRect();
            const bRect = b.element.getBoundingClientRect();
            return aRect.top - bRect.top;
        });
    }

    getLandmarkLabel(element, type) {
        // Check for explicit labels
        if (element.hasAttribute('aria-label')) {
            return element.getAttribute('aria-label');
        }
        
        if (element.hasAttribute('aria-labelledby')) {
            const labelId = element.getAttribute('aria-labelledby');
            const labelElement = document.getElementById(labelId);
            if (labelElement) {
                return labelElement.textContent.trim();
            }
        }

        // Check for implicit labels
        if (type === 'navigation') {
            return 'Navigation';
        } else if (type === 'banner') {
            return 'Banner';
        } else if (type === 'contentinfo') {
            return 'Content Information';
        } else if (type === 'main') {
            return 'Main Content';
        } else if (type === 'complementary') {
            return 'Complementary';
        }

        return null;
    }

    isImplicitLandmark(element, type) {
        const tagName = element.tagName.toLowerCase();
        return (
            (type === 'main' && tagName === 'main') ||
            (type === 'navigation' && tagName === 'nav') ||
            (type === 'banner' && tagName === 'header') ||
            (type === 'contentinfo' && tagName === 'footer') ||
            (type === 'complementary' && tagName === 'aside') ||
            (type === 'article' && tagName === 'article')
        );
    }

    highlightLandmarks() {
        // Clear previous highlights
        this.clearHighlights();
        
        this.landmarks = this.getLandmarks();
        const resultsContainer = document.getElementById('landmark-results');
        
        if (!resultsContainer) return;

        // Create visual highlights
        this.landmarks.forEach((landmark, index) => {
            this.highlightElement(landmark.element, landmark.type, index);
        });

        // Generate results display
        let output = '<div class="landmark-highlight-results">';
        output += '<h4>Landmark Highlights</h4>';
        output += `<p class="highlight-summary">Found ${this.landmarks.length} landmarks on this page:</p>`;
        
        output += '<div class="landmark-sidebar">';
        this.landmarks.forEach((landmark, index) => {
            const color = this.getLandmarkColor(landmark.type);
            output += `<div class="landmark-item" data-landmark-index="${index}">`;
            output += `<span class="landmark-badge" style="background-color: ${color}">${landmark.type.toUpperCase()}</span>`;
            output += `<span class="landmark-label">${landmark.label || 'Unlabeled'}</span>`;
            output += `<span class="landmark-element">&lt;${landmark.element.tagName.toLowerCase()}&gt;</span>`;
            output += '</div>';
        });
        output += '</div>';
        
        output += '<div class="highlight-controls">';
        output += '<button id="clear-highlights" class="control-btn secondary">Clear Highlights</button>';
        output += '</div>';
        
        output += '</div>';
        
        resultsContainer.innerHTML = output;
        resultsContainer.style.display = 'block';

        // Add clear highlights functionality
        document.getElementById('clear-highlights')?.addEventListener('click', () => {
            this.clearHighlights();
            resultsContainer.style.display = 'none';
        });
    }

    highlightElement(element, type, index) {
        const color = this.getLandmarkColor(type);
        
        // Create highlight overlay
        const highlight = document.createElement('div');
        highlight.className = 'landmark-highlight';
        highlight.style.cssText = `
            position: absolute;
            border: 3px solid ${color};
            background: ${color}20;
            pointer-events: none;
            z-index: 9999;
            border-radius: 4px;
            transition: all 0.3s ease;
        `;
        
        // Create badge
        const badge = document.createElement('div');
        badge.className = 'landmark-badge-overlay';
        badge.textContent = type.toUpperCase();
        badge.style.cssText = `
            position: absolute;
            top: -12px;
            left: -3px;
            background: ${color};
            color: white;
            padding: 2px 6px;
            font-size: 10px;
            font-weight: bold;
            border-radius: 3px;
            font-family: monospace;
        `;
        
        highlight.appendChild(badge);
        document.body.appendChild(highlight);
        
        // Position the highlight
        this.positionHighlight(highlight, element);
        
        this.highlightedElements.push(highlight);
        
        // Update position on scroll/resize
        const updatePosition = () => this.positionHighlight(highlight, element);
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
    }

    positionHighlight(highlight, element) {
        const rect = element.getBoundingClientRect();
        highlight.style.left = (rect.left + window.scrollX - 3) + 'px';
        highlight.style.top = (rect.top + window.scrollY - 3) + 'px';
        highlight.style.width = (rect.width + 6) + 'px';
        highlight.style.height = (rect.height + 6) + 'px';
    }

    getLandmarkColor(type) {
        const colors = {
            'main': '#3b82f6',        // Blue
            'navigation': '#10b981',   // Green
            'banner': '#8b5cf6',      // Purple
            'contentinfo': '#f59e0b', // Orange
            'complementary': '#ef4444', // Red
            'region': '#06b6d4',      // Cyan
            'search': '#84cc16',      // Lime
            'form': '#f97316',        // Orange
            'article': '#ec4899',     // Pink
            'section': '#6366f1'      // Indigo
        };
        return colors[type] || '#64748b';
    }

    clearHighlights() {
        this.highlightedElements.forEach(highlight => {
            if (highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            }
        });
        this.highlightedElements = [];
    }

    testNavigation() {
        this.landmarks = this.getLandmarks();
        const resultsContainer = document.getElementById('landmark-results');
        
        if (!resultsContainer) return;

        let output = '<div class="landmark-navigation-test">';
        output += '<h4>Landmark Navigation Test</h4>';
        output += '<p class="navigation-intro">Simulate how screen reader users navigate between landmarks:</p>';
        
        output += '<div class="navigation-controls">';
        output += '<button id="nav-next-landmark" class="nav-btn">Next Landmark (D key)</button>';
        output += '<button id="nav-prev-landmark" class="nav-btn">Previous Landmark (Shift+D)</button>';
        output += '<button id="nav-reset-landmark" class="nav-btn">Reset Navigation</button>';
        output += '</div>';

        output += '<div class="current-landmark-display">';
        output += '<div id="current-landmark" class="current-landmark">Press "Next Landmark" to start navigation</div>';
        output += '<div id="landmark-context" class="landmark-context"></div>';
        output += '<div id="landmark-announcement" class="landmark-announcement"></div>';
        output += '</div>';

        output += '<div class="landmark-outline">';
        output += '<h5>Complete Landmark Structure:</h5>';
        output += '<div class="landmark-outline-list">';

        this.landmarks.forEach((landmark, index) => {
            const color = this.getLandmarkColor(landmark.type);
            output += `<div class="landmark-outline-item" data-landmark-index="${index}">`;
            output += `<span class="landmark-type-badge" style="background-color: ${color}">${landmark.type}</span>`;
            output += `<span class="landmark-info">${landmark.label || 'Unlabeled'} &lt;${landmark.element.tagName.toLowerCase()}&gt;</span>`;
            output += '</div>';
        });

        output += '</div></div></div>';
        
        resultsContainer.innerHTML = output;
        resultsContainer.style.display = 'block';

        // Initialize navigation
        this.initializeLandmarkNavigation();
    }

    initializeLandmarkNavigation() {
        this.currentLandmarkIndex = -1;
        
        const nextBtn = document.getElementById('nav-next-landmark');
        const prevBtn = document.getElementById('nav-prev-landmark');
        const resetBtn = document.getElementById('nav-reset-landmark');
        const currentDisplay = document.getElementById('current-landmark');
        const contextDisplay = document.getElementById('landmark-context');
        const announcementDisplay = document.getElementById('landmark-announcement');
        const outlineItems = document.querySelectorAll('.landmark-outline-item');

        const updateDisplay = () => {
            // Clear previous highlights
            outlineItems.forEach(item => item.classList.remove('current'));
            this.clearHighlights();
            
            if (this.currentLandmarkIndex >= 0 && this.currentLandmarkIndex < this.landmarks.length) {
                const landmark = this.landmarks[this.currentLandmarkIndex];
                
                currentDisplay.innerHTML = `<strong>${landmark.type.toUpperCase()}:</strong> ${landmark.label || 'Unlabeled'}`;
                contextDisplay.innerHTML = `Landmark ${this.currentLandmarkIndex + 1} of ${this.landmarks.length}`;
                
                // Generate screen reader announcement
                let announcement = `${landmark.type} landmark`;
                if (landmark.label) {
                    announcement += `, ${landmark.label}`;
                }
                announcementDisplay.innerHTML = `<strong>Screen Reader:</strong> "${announcement}"`;
                
                // Highlight current landmark
                this.highlightElement(landmark.element, landmark.type, this.currentLandmarkIndex);
                
                // Highlight current item in outline
                if (outlineItems[this.currentLandmarkIndex]) {
                    outlineItems[this.currentLandmarkIndex].classList.add('current');
                }
                
                // Scroll to landmark
                landmark.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                currentDisplay.innerHTML = this.currentLandmarkIndex < 0 ? 
                    'Press "Next Landmark" to start navigation' : 
                    'End of landmarks reached';
                contextDisplay.innerHTML = '';
                announcementDisplay.innerHTML = '';
            }
        };

        nextBtn?.addEventListener('click', () => {
            if (this.currentLandmarkIndex < this.landmarks.length - 1) {
                this.currentLandmarkIndex++;
                updateDisplay();
            }
        });

        prevBtn?.addEventListener('click', () => {
            if (this.currentLandmarkIndex > 0) {
                this.currentLandmarkIndex--;
                updateDisplay();
            }
        });

        resetBtn?.addEventListener('click', () => {
            this.currentLandmarkIndex = -1;
            updateDisplay();
        });
    }

    checkLabels() {
        this.landmarks = this.getLandmarks();
        const resultsContainer = document.getElementById('landmark-results');
        
        if (!resultsContainer) return;

        let issues = [];
        let mainCount = 0;
        let labelCounts = {};

        // Analyze landmarks for issues
        this.landmarks.forEach(landmark => {
            const { element, type, label } = landmark;
            
            // Count main landmarks
            if (type === 'main') {
                mainCount++;
            }

            // Check for missing labels on navigation landmarks
            if ((type === 'navigation' || type === 'region' || type === 'form') && !label) {
                issues.push({
                    type: 'error',
                    message: `${type} landmark missing accessible name`,
                    element: element.tagName.toLowerCase(),
                    suggestion: 'Add aria-label or aria-labelledby attribute'
                });
            }

            // Check for duplicate labels
            if (label) {
                const key = `${type}-${label}`;
                labelCounts[key] = (labelCounts[key] || 0) + 1;
            }

            // Check for generic labels
            if (label && (label.toLowerCase() === 'navigation' || label.toLowerCase() === 'menu') && type === 'navigation') {
                issues.push({
                    type: 'warning',
                    message: `Generic navigation label "${label}"`,
                    element: element.tagName.toLowerCase(),
                    suggestion: 'Use more descriptive labels like "Main navigation" or "Footer links"'
                });
            }
        });

        // Check main landmark count
        if (mainCount === 0) {
            issues.push({
                type: 'error',
                message: 'No main landmark found',
                element: 'page',
                suggestion: 'Add a <main> element or role="main"'
            });
        } else if (mainCount > 1) {
            issues.push({
                type: 'error',
                message: `Multiple main landmarks found (${mainCount})`,
                element: 'page',
                suggestion: 'Page should have exactly one main landmark'
            });
        }

        // Check for duplicate labels
        Object.entries(labelCounts).forEach(([key, count]) => {
            if (count > 1) {
                const [type, label] = key.split('-');
                issues.push({
                    type: 'warning',
                    message: `Duplicate ${type} landmark label "${label}" (${count} instances)`,
                    element: 'multiple',
                    suggestion: 'Use unique labels to distinguish between similar landmarks'
                });
            }
        });

        // Generate results
        let output = '<div class="landmark-validation-results">';
        output += '<h4>Landmark Label Validation</h4>';

        if (issues.length === 0) {
            output += '<div class="validation-success">✅ All landmarks are properly labeled! Great accessibility structure.</div>';
        } else {
            output += `<div class="validation-summary">Found ${issues.length} issue(s):</div>`;
            output += '<div class="issues-list">';
            
            issues.forEach(issue => {
                const iconClass = issue.type === 'error' ? 'error' : 'warning';
                const icon = issue.type === 'error' ? '❌' : '⚠️';
                
                output += `<div class="issue-item ${iconClass}">`;
                output += `<span class="issue-icon">${icon}</span>`;
                output += `<div class="issue-content">`;
                output += `<div class="issue-message">${issue.message}</div>`;
                output += `<div class="issue-element">Element: ${issue.element}</div>`;
                output += `<div class="issue-suggestion">💡 ${issue.suggestion}</div>`;
                output += '</div></div>';
            });
            
            output += '</div>';
        }

        // Add landmark summary
        output += '<div class="landmark-summary">';
        output += '<h5>Landmark Summary:</h5>';
        output += '<div class="summary-grid">';
        
        const typeCounts = {};
        this.landmarks.forEach(landmark => {
            typeCounts[landmark.type] = (typeCounts[landmark.type] || 0) + 1;
        });
        
        Object.entries(typeCounts).forEach(([type, count]) => {
            const color = this.getLandmarkColor(type);
            output += `<div class="summary-item">`;
            output += `<span class="summary-badge" style="background-color: ${color}">${type}</span>`;
            output += `<span class="summary-count">${count}</span>`;
            output += '</div>';
        });
        
        output += '</div></div></div>';
        
        resultsContainer.innerHTML = output;
        resultsContainer.style.display = 'block';
    }
}

// Form Structure Tester Class
class FormStructureTester {
    constructor() {
        this.currentFormIndex = -1;
        this.formElements = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const analyzeBtn = document.getElementById('analyze-form');
        const testFlowBtn = document.getElementById('test-form-flow');

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeFormStructure());
        }
        if (testFlowBtn) {
            testFlowBtn.addEventListener('click', () => this.testReadingFlow());
        }
    }

    getFormElements() {
        const forms = document.querySelectorAll('form');
        const formData = [];

        forms.forEach((form, formIndex) => {
            const elements = [];
            
            // Get all form controls
            const controls = form.querySelectorAll('input, select, textarea, button');
            controls.forEach((control, index) => {
                elements.push({
                    element: control,
                    type: control.type || control.tagName.toLowerCase(),
                    id: control.id,
                    name: control.name,
                    label: this.getFormElementLabel(control),
                    required: control.hasAttribute('required'),
                    tabIndex: control.tabIndex,
                    fieldset: this.getFieldset(control),
                    legend: this.getLegend(control)
                });
            });

            formData.push({
                form,
                elements,
                fieldsets: form.querySelectorAll('fieldset'),
                legends: form.querySelectorAll('legend')
            });
        });

        return formData;
    }

    getFormElementLabel(element) {
        // Check for explicit label
        if (element.id) {
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label) {
                return label.textContent.trim();
            }
        }

        // Check for implicit label (wrapped)
        const parentLabel = element.closest('label');
        if (parentLabel) {
            return parentLabel.textContent.replace(element.value || '', '').trim();
        }

        // Check for aria-label
        if (element.hasAttribute('aria-label')) {
            return element.getAttribute('aria-label');
        }

        // Check for aria-labelledby
        if (element.hasAttribute('aria-labelledby')) {
            const labelId = element.getAttribute('aria-labelledby');
            const labelElement = document.getElementById(labelId);
            if (labelElement) {
                return labelElement.textContent.trim();
            }
        }

        // Check for placeholder (not recommended as primary label)
        if (element.hasAttribute('placeholder')) {
            return `[Placeholder: ${element.getAttribute('placeholder')}]`;
        }

        return null;
    }

    getFieldset(element) {
        const fieldset = element.closest('fieldset');
        return fieldset ? fieldset : null;
    }

    getLegend(element) {
        const fieldset = this.getFieldset(element);
        if (fieldset) {
            const legend = fieldset.querySelector('legend');
            return legend ? legend.textContent.trim() : null;
        }
        return null;
    }

    analyzeFormStructure() {
        const formData = this.getFormElements();
        const resultsContainer = document.getElementById('form-analysis');
        
        if (!resultsContainer) return;

        let issues = [];
        let totalElements = 0;

        formData.forEach((formInfo, formIndex) => {
            const { form, elements, fieldsets, legends } = formInfo;
            totalElements += elements.length;

            // Check each form element
            elements.forEach(elementInfo => {
                const { element, type, id, name, label, required } = elementInfo;

                // Check for missing labels
                if (!label && type !== 'submit' && type !== 'button' && type !== 'hidden') {
                    issues.push({
                        type: 'error',
                        message: `Form control missing accessible label`,
                        element: `${type} element`,
                        suggestion: 'Add a <label> element or aria-label attribute',
                        formIndex
                    });
                }

                // Check for placeholder-only labels
                if (label && label.includes('[Placeholder:')) {
                    issues.push({
                        type: 'warning',
                        message: `Using placeholder as primary label`,
                        element: `${type} element: ${label}`,
                        suggestion: 'Add a proper <label> element. Placeholders disappear when typing.',
                        formIndex
                    });
                }

                // Check for missing IDs on form controls
                if (!id && label && type !== 'submit' && type !== 'button') {
                    issues.push({
                        type: 'warning',
                        message: `Form control missing ID for explicit labeling`,
                        element: `${type} element`,
                        suggestion: 'Add an ID attribute and connect it to a label with for="id"',
                        formIndex
                    });
                }

                // Check required field indicators
                if (required && label && !label.includes('*') && !label.toLowerCase().includes('required')) {
                    issues.push({
                        type: 'warning',
                        message: `Required field not clearly indicated`,
                        element: `${type} element: ${label}`,
                        suggestion: 'Add visual indicator (*) and aria-required="true"',
                        formIndex
                    });
                }
            });

            // Check fieldset usage
            if (elements.length > 3 && fieldsets.length === 0) {
                issues.push({
                    type: 'warning',
                    message: `Complex form without fieldsets for grouping`,
                    element: `Form ${formIndex + 1}`,
                    suggestion: 'Use <fieldset> and <legend> to group related form controls',
                    formIndex
                });
            }

            // Check legend usage
            fieldsets.forEach(fieldset => {
                const legend = fieldset.querySelector('legend');
                if (!legend) {
                    issues.push({
                        type: 'error',
                        message: `Fieldset missing legend`,
                        element: 'fieldset element',
                        suggestion: 'Add a <legend> element as the first child of <fieldset>',
                        formIndex
                    });
                }
            });
        });

        // Generate results
        let output = '<div class="form-analysis-results">';
        output += '<h4>Form Structure Analysis</h4>';

        if (issues.length === 0) {
            output += '<div class="validation-success">✅ Excellent form structure! All accessibility best practices are followed.</div>';
        } else {
            output += `<div class="validation-summary">Found ${issues.length} issue(s) across ${formData.length} form(s):</div>`;
            output += '<div class="issues-list">';
            
            issues.forEach(issue => {
                const iconClass = issue.type === 'error' ? 'error' : 'warning';
                const icon = issue.type === 'error' ? '❌' : '⚠️';
                
                output += `<div class="issue-item ${iconClass}">`;
                output += `<span class="issue-icon">${icon}</span>`;
                output += `<div class="issue-content">`;
                output += `<div class="issue-message">${issue.message}</div>`;
                output += `<div class="issue-element">Element: ${issue.element}</div>`;
                output += `<div class="issue-suggestion">💡 ${issue.suggestion}</div>`;
                output += '</div></div>';
            });
            
            output += '</div>';
        }

        // Add form summary
        output += '<div class="form-summary">';
        output += '<h5>Form Structure Summary:</h5>';
        output += '<div class="summary-stats">';
        
        formData.forEach((formInfo, index) => {
            const { elements, fieldsets } = formInfo;
            const controlCount = elements.filter(el => el.type !== 'submit' && el.type !== 'button').length;
            const labeledCount = elements.filter(el => el.label && !el.label.includes('[Placeholder:')).length;
            const requiredCount = elements.filter(el => el.required).length;
            
            output += `<div class="form-stat-card">`;
            output += `<h6>Form ${index + 1}</h6>`;
            output += `<div class="stat-item"><span class="stat-label">Form Controls:</span> <span class="stat-value">${controlCount}</span></div>`;
            output += `<div class="stat-item"><span class="stat-label">Properly Labeled:</span> <span class="stat-value">${labeledCount}/${controlCount}</span></div>`;
            output += `<div class="stat-item"><span class="stat-label">Required Fields:</span> <span class="stat-value">${requiredCount}</span></div>`;
            output += `<div class="stat-item"><span class="stat-label">Fieldsets:</span> <span class="stat-value">${fieldsets.length}</span></div>`;
            output += '</div>';
        });
        
        output += '</div></div></div>';
        
        resultsContainer.innerHTML = output;
        resultsContainer.style.display = 'block';
    }

    testReadingFlow() {
        const formData = this.getFormElements();
        const resultsContainer = document.getElementById('form-analysis');
        
        if (!resultsContainer || formData.length === 0) return;

        // Get all focusable elements in tab order
        this.formElements = [];
        formData.forEach(formInfo => {
            formInfo.elements.forEach(elementInfo => {
                if (elementInfo.element.tabIndex >= 0 || 
                    (elementInfo.element.tabIndex === -1 && 
                     ['input', 'select', 'textarea', 'button'].includes(elementInfo.element.tagName.toLowerCase()))) {
                    this.formElements.push(elementInfo);
                }
            });
        });

        // Sort by tab index and DOM order
        this.formElements.sort((a, b) => {
            if (a.element.tabIndex !== b.element.tabIndex) {
                return a.element.tabIndex - b.element.tabIndex;
            }
            // If same tab index, sort by DOM order
            return Array.from(document.querySelectorAll('*')).indexOf(a.element) - 
                   Array.from(document.querySelectorAll('*')).indexOf(b.element);
        });

        let output = '<div class="form-flow-test">';
        output += '<h4>Form Reading Flow Test</h4>';
        output += '<p class="flow-intro">Simulate how users navigate through the form using keyboard and screen readers:</p>';
        
        output += '<div class="flow-controls">';
        output += '<button id="flow-next" class="nav-btn">Next Field (Tab)</button>';
        output += '<button id="flow-prev" class="nav-btn">Previous Field (Shift+Tab)</button>';
        output += '<button id="flow-reset" class="nav-btn">Reset Flow</button>';
        output += '</div>';

        output += '<div class="current-field-display">';
        output += '<div id="current-field" class="current-field">Press "Next Field" to start navigation</div>';
        output += '<div id="field-context" class="field-context"></div>';
        output += '<div id="screen-reader-output" class="screen-reader-output"></div>';
        output += '</div>';

        output += '<div class="flow-outline">';
        output += '<h5>Complete Tab Order:</h5>';
        output += '<div class="flow-list">';

        this.formElements.forEach((elementInfo, index) => {
            const { element, type, label, required, legend } = elementInfo;
            output += `<div class="flow-item" data-flow-index="${index}">`;
            output += `<span class="flow-number">${index + 1}</span>`;
            output += `<span class="flow-type">${type.toUpperCase()}</span>`;
            output += `<span class="flow-label">${label || 'Unlabeled'}</span>`;
            if (required) output += `<span class="flow-required">*</span>`;
            if (legend) output += `<span class="flow-group">(${legend})</span>`;
            output += '</div>';
        });

        output += '</div></div></div>';
        
        resultsContainer.innerHTML = output;
        resultsContainer.style.display = 'block';

        // Initialize flow navigation
        this.initializeFlowNavigation();
    }

    initializeFlowNavigation() {
        this.currentFormIndex = -1;
        
        const nextBtn = document.getElementById('flow-next');
        const prevBtn = document.getElementById('flow-prev');
        const resetBtn = document.getElementById('flow-reset');
        const currentDisplay = document.getElementById('current-field');
        const contextDisplay = document.getElementById('field-context');
        const screenReaderDisplay = document.getElementById('screen-reader-output');
        const flowItems = document.querySelectorAll('.flow-item');

        const updateDisplay = () => {
            // Clear previous highlights
            flowItems.forEach(item => item.classList.remove('current'));
            
            if (this.currentFormIndex >= 0 && this.currentFormIndex < this.formElements.length) {
                const elementInfo = this.formElements[this.currentFormIndex];
                const { element, type, label, required, legend } = elementInfo;
                
                currentDisplay.innerHTML = `<strong>${type.toUpperCase()}:</strong> ${label || 'Unlabeled'}`;
                contextDisplay.innerHTML = `Field ${this.currentFormIndex + 1} of ${this.formElements.length}${required ? ' (Required)' : ''}`;
                
                // Generate screen reader announcement
                let announcement = '';
                if (legend) announcement += `${legend}, `;
                announcement += `${label || 'Unlabeled'} ${type}`;
                if (required) announcement += ', required';
                
                screenReaderDisplay.innerHTML = `<strong>Screen Reader:</strong> "${announcement}"`;
                
                // Highlight current item in flow
                if (flowItems[this.currentFormIndex]) {
                    flowItems[this.currentFormIndex].classList.add('current');
                }
                
                // Focus and scroll to element
                element.focus();
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                currentDisplay.innerHTML = this.currentFormIndex < 0 ? 
                    'Press "Next Field" to start navigation' : 
                    'End of form reached';
                contextDisplay.innerHTML = '';
                screenReaderDisplay.innerHTML = '';
            }
        };

        nextBtn?.addEventListener('click', () => {
            if (this.currentFormIndex < this.formElements.length - 1) {
                this.currentFormIndex++;
                updateDisplay();
            }
        });

        prevBtn?.addEventListener('click', () => {
            if (this.currentFormIndex > 0) {
                this.currentFormIndex--;
                updateDisplay();
            }
        });

        resetBtn?.addEventListener('click', () => {
            this.currentFormIndex = -1;
            updateDisplay();
        });
    }
}

// QA Checklist Manager Class
class QAChecklistManager {
    constructor() {
        this.checkboxes = [];
        this.totalItems = 0;
        this.completedItems = 0;
        this.init();
    }

    init() {
        this.setupCheckboxes();
        this.setupEventListeners();
        this.updateProgress();
    }

    setupCheckboxes() {
        this.checkboxes = document.querySelectorAll('.checklist-checkbox');
        this.totalItems = this.checkboxes.length;
        
        // Add event listeners to each checkbox
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleCheckboxChange());
        });
    }

    setupEventListeners() {
        const exportBtn = document.getElementById('export-checklist');
        const resetBtn = document.getElementById('reset-checklist');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportResults());
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetChecklist());
        }
    }

    handleCheckboxChange() {
        this.updateProgress();
        this.saveProgress();
        
        // Check if all items are completed
        if (this.completedItems === this.totalItems) {
            this.showCompletionCelebration();
        } else {
            this.hideCompletionCelebration();
        }
    }

    updateProgress() {
        this.completedItems = Array.from(this.checkboxes).filter(cb => cb.checked).length;
        
        // Update progress text
        const progressText = document.getElementById('checklist-progress-text');
        if (progressText) {
            progressText.textContent = `${this.completedItems} of ${this.totalItems} completed`;
        }
        
        // Update progress bar
        const progressBar = document.getElementById('checklist-progress-bar');
        if (progressBar) {
            const percentage = (this.completedItems / this.totalItems) * 100;
            progressBar.style.width = `${percentage}%`;
            
            // Change color based on progress
            if (percentage === 100) {
                progressBar.style.background = '#10b981'; // Green when complete
            } else if (percentage >= 50) {
                progressBar.style.background = '#f59e0b'; // Orange when halfway
            } else {
                progressBar.style.background = '#64748b'; // Gray when starting
            }
        }
    }

    showCompletionCelebration() {
        const celebration = document.getElementById('completion-celebration');
        if (celebration) {
            celebration.style.display = 'block';
            celebration.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Add some animation
            celebration.style.opacity = '0';
            celebration.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                celebration.style.transition = 'all 0.5s ease';
                celebration.style.opacity = '1';
                celebration.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    hideCompletionCelebration() {
        const celebration = document.getElementById('completion-celebration');
        if (celebration) {
            celebration.style.display = 'none';
        }
    }

    exportResults() {
        const results = {
            timestamp: new Date().toISOString(),
            totalItems: this.totalItems,
            completedItems: this.completedItems,
            completionPercentage: Math.round((this.completedItems / this.totalItems) * 100),
            categories: {}
        };

        // Group results by category
        const categories = document.querySelectorAll('.checklist-category');
        categories.forEach(category => {
            const categoryName = category.querySelector('h4').textContent;
            const categoryCheckboxes = category.querySelectorAll('.checklist-checkbox');
            const categoryItems = Array.from(categoryCheckboxes).map(checkbox => {
                const itemText = checkbox.parentElement.querySelector('.item-text').textContent;
                return {
                    text: itemText,
                    completed: checkbox.checked
                };
            });
            
            const categoryCompleted = categoryItems.filter(item => item.completed).length;
            
            results.categories[categoryName] = {
                items: categoryItems,
                completed: categoryCompleted,
                total: categoryItems.length,
                percentage: Math.round((categoryCompleted / categoryItems.length) * 100)
            };
        });

        // Create downloadable file
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `qa-checklist-results-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Show success message
        this.showNotification('Checklist results exported successfully!', 'success');
    }

    resetChecklist() {
        // Confirm reset
        if (this.completedItems > 0) {
            const confirmed = confirm('Are you sure you want to reset the checklist? This will uncheck all items.');
            if (!confirmed) return;
        }

        // Uncheck all checkboxes
        this.checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Update progress
        this.updateProgress();
        this.hideCompletionCelebration();
        this.clearSavedProgress();

        // Show reset message
        this.showNotification('Checklist has been reset.', 'info');
    }

    saveProgress() {
        // Save progress to localStorage
        const progress = Array.from(this.checkboxes).map(checkbox => checkbox.checked);
        localStorage.setItem('qa-checklist-progress', JSON.stringify(progress));
    }

    loadProgress() {
        // Load progress from localStorage
        const saved = localStorage.getItem('qa-checklist-progress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                progress.forEach((checked, index) => {
                    if (this.checkboxes[index]) {
                        this.checkboxes[index].checked = checked;
                    }
                });
                this.updateProgress();
                
                if (this.completedItems === this.totalItems) {
                    this.showCompletionCelebration();
                }
            } catch (e) {
                console.warn('Could not load saved checklist progress');
            }
        }
    }

    clearSavedProgress() {
        localStorage.removeItem('qa-checklist-progress');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `checklist-notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageStructureAnalyzer();
    new HeadingHierarchyValidator();
    new LandmarkTester();
    new FormStructureTester();
    
    // Initialize QA Checklist with a slight delay to ensure DOM is ready
    setTimeout(() => {
        const checklistManager = new QAChecklistManager();
        checklistManager.loadProgress(); // Load any saved progress
    }, 100);
});
