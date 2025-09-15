// Day 5: Comprehensive Accessibility Testing - Interactive Demo Scripts

document.addEventListener('DOMContentLoaded', function() {
    console.log('Day 5 script loaded');
    initializeTabSwitching();
    initializeKeyboardOperability();
    initializeKeyboardTraps();
    initializeFocusOrder();
    initializeContextChanges();
    initializeHoverFocus();
    initializeComprehensiveTesting();
    initializeChecklistTracking();
});

// Tab switching functionality
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const parentContainer = this.closest('.slide-content');
            
            if (!parentContainer || !targetTab) return;
            
            parentContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            parentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = parentContainer.querySelector(`#${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// SC 2.1.1: Keyboard Operability
function initializeKeyboardOperability() {
    const scanButton = document.getElementById('scan-keyboard-elements');
    const testTabButton = document.getElementById('test-tab-order');
    
    if (scanButton) {
        scanButton.addEventListener('click', scanKeyboardElements);
    }
    
    if (testTabButton) {
        testTabButton.addEventListener('click', testTabOrder);
    }
    
    // Make custom button keyboard accessible
    const customButton = document.querySelector('.custom-button');
    if (customButton) {
        customButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                alert('Custom button activated via keyboard!');
            }
        });
        
        customButton.addEventListener('click', function() {
            alert('Custom button clicked!');
        });
    }
}

function scanKeyboardElements() {
    const results = document.getElementById('keyboard-scan-results');
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex], [role="button"], [role="link"]');
    
    let report = '<h4>Keyboard Accessibility Scan Results:</h4><div class="scan-grid">';
    
    interactiveElements.forEach((element, index) => {
        const tagName = element.tagName.toLowerCase();
        const hasTabindex = element.hasAttribute('tabindex');
        const tabindexValue = element.getAttribute('tabindex');
        const isKeyboardAccessible = (
            ['button', 'a', 'input', 'select', 'textarea'].includes(tagName) ||
            (hasTabindex && tabindexValue !== '-1')
        );
        
        report += `<div class="scan-item ${isKeyboardAccessible ? 'pass' : 'fail'}">
            <h6>Element ${index + 1}: ${tagName}</h6>
            <p><strong>Keyboard Accessible:</strong> ${isKeyboardAccessible ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Tabindex:</strong> ${tabindexValue || 'default'}</p>
        </div>`;
    });
    
    report += '</div>';
    results.innerHTML = report;
    results.style.display = 'block';
}

function testTabOrder() {
    const results = document.getElementById('keyboard-scan-results');
    results.innerHTML = '<h4>Tab Order Test:</h4><p>Press Tab to navigate through elements. Watch the focus indicators to verify logical order.</p>';
    results.style.display = 'block';
}

// SC 2.1.2: Keyboard Traps
function initializeKeyboardTraps() {
    console.log('Initializing keyboard traps...');
    const enterTrapButton = document.getElementById('enter-trap');
    const trapContainer = document.getElementById('keyboard-trap');
    const openModalButton = document.getElementById('open-good-modal');
    const closeModalButton = document.getElementById('close-good-modal');
    const modal = document.getElementById('good-modal');
    const detectTrapsButton = document.getElementById('detect-traps');
    
    console.log('Elements found:', {
        enterTrapButton,
        trapContainer,
        openModalButton,
        closeModalButton,
        modal,
        detectTrapsButton
    });
    
    let trapActive = false;
    let previousFocus = null;
    
    if (enterTrapButton && trapContainer) {
        enterTrapButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked - showing trap');
            
            trapActive = true;
            previousFocus = document.activeElement;
            
            // Force show the container
            trapContainer.style.display = 'block';
            trapContainer.style.visibility = 'visible';
            trapContainer.style.opacity = '1';
            
            console.log('Trap container styles:', trapContainer.style.cssText);
            
            // Focus first input in trap
            setTimeout(() => {
                const firstInput = trapContainer.querySelector('input');
                if (firstInput) {
                    firstInput.focus();
                    console.log('Focused first input');
                }
            }, 50);
            
            // Add trap behavior (remove existing listener first)
            document.removeEventListener('keydown', trapKeyHandler);
            document.addEventListener('keydown', trapKeyHandler);
        });
    } else {
        console.error('Elements not found:', { enterTrapButton, trapContainer });
    }
    
    function trapKeyHandler(e) {
        if (!trapActive) return;
        
        console.log('Trap key pressed:', e.key, 'Ctrl:', e.ctrlKey);
        
        // Escape mechanism
        if (e.ctrlKey && e.key.toLowerCase() === 'e') {
            e.preventDefault();
            exitTrap();
            return;
        }
        
        // Trap Tab navigation
        if (e.key === 'Tab') {
            e.preventDefault();
            const trapElements = trapContainer.querySelectorAll('input, button');
            const firstElement = trapElements[0];
            const lastElement = trapElements[trapElements.length - 1];
            const currentElement = document.activeElement;
            
            if (e.shiftKey) {
                // Shift+Tab - go backwards
                if (currentElement === firstElement) {
                    lastElement.focus();
                } else {
                    const currentIndex = Array.from(trapElements).indexOf(currentElement);
                    if (currentIndex > 0) {
                        trapElements[currentIndex - 1].focus();
                    } else {
                        lastElement.focus();
                    }
                }
            } else {
                // Tab - go forwards
                if (currentElement === lastElement) {
                    firstElement.focus();
                } else {
                    const currentIndex = Array.from(trapElements).indexOf(currentElement);
                    if (currentIndex < trapElements.length - 1) {
                        trapElements[currentIndex + 1].focus();
                    } else {
                        firstElement.focus();
                    }
                }
            }
        }
    }
    
    function exitTrap() {
        console.log('Exiting trap');
        trapActive = false;
        trapContainer.style.display = 'none';
        document.removeEventListener('keydown', trapKeyHandler);
        if (previousFocus) {
            previousFocus.focus();
        }
    }
    
    // Click outside to exit trap
    document.addEventListener('click', function(e) {
        if (trapActive && !trapContainer.contains(e.target)) {
            exitTrap();
        }
    });
    
    // Good modal implementation
    if (openModalButton) {
        openModalButton.addEventListener('click', function() {
            previousFocus = document.activeElement;
            modal.style.display = 'flex';
            closeModalButton.focus();
        });
    }
    
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            modal.style.display = 'none';
            if (previousFocus) {
                previousFocus.focus();
            }
        });
    }
    
    // Modal escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            if (previousFocus) {
                previousFocus.focus();
            }
        }
    });
    
    if (detectTrapsButton) {
        detectTrapsButton.addEventListener('click', detectKeyboardTraps);
    }
}

function detectKeyboardTraps() {
    const results = document.getElementById('trap-detection-results');
    results.innerHTML = `
        <h4>Keyboard Trap Detection Results:</h4>
        <div class="trap-analysis">
            <div class="trap-item good">
                <h6>✅ Good Modal</h6>
                <p>Proper focus management with Escape key support</p>
            </div>
            <div class="trap-item bad">
                <h6>⚠️ Keyboard Trap Demo</h6>
                <p>Intentional trap with Ctrl+E escape mechanism</p>
            </div>
        </div>
    `;
    results.style.display = 'block';
}

// SC 2.4.3: Focus Order
function initializeFocusOrder() {
    const analyzeButton = document.getElementById('analyze-focus-order');
    const highlightButton = document.getElementById('highlight-focus-path');
    
    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzeFocusOrder);
    }
    
    if (highlightButton) {
        highlightButton.addEventListener('click', highlightFocusPath);
    }
    
    // Initialize bad focus order simulation
    const badForm = document.querySelector('.bad-focus-order');
    if (badForm) {
        simulateBadFocusOrder(badForm);
    }
}

function simulateBadFocusOrder(form) {
    const elements = form.querySelectorAll('[data-focus-order]');
    const sortedElements = Array.from(elements).sort((a, b) => {
        return parseInt(a.getAttribute('data-focus-order')) - parseInt(b.getAttribute('data-focus-order'));
    });
    
    sortedElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const currentOrder = parseInt(this.getAttribute('data-focus-order'));
                let nextElement;
                
                if (e.shiftKey) {
                    // Shift+Tab - go to previous in bad order
                    const prevOrder = currentOrder === 1 ? 5 : currentOrder - 1;
                    nextElement = form.querySelector(`[data-focus-order="${prevOrder}"]`);
                } else {
                    // Tab - go to next in bad order
                    const nextOrder = currentOrder === 5 ? 1 : currentOrder + 1;
                    nextElement = form.querySelector(`[data-focus-order="${nextOrder}"]`);
                }
                
                if (nextElement) {
                    nextElement.focus();
                }
            }
        });
    });
}

function analyzeFocusOrder() {
    const results = document.getElementById('focus-analysis-results');
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    let report = '<h4>Focus Order Analysis:</h4><div class="focus-order-list">';
    
    focusableElements.forEach((element, index) => {
        const tabindex = element.getAttribute('tabindex') || '0';
        const elementText = element.textContent.trim() || element.placeholder || element.tagName;
        
        report += `<div class="focus-item">
            <span class="focus-number">${index + 1}</span>
            <span class="focus-element">${elementText}</span>
            <span class="focus-tabindex">tabindex: ${tabindex}</span>
        </div>`;
    });
    
    report += '</div>';
    results.innerHTML = report;
    results.style.display = 'block';
}

function highlightFocusPath() {
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    let currentIndex = 0;
    
    function highlightNext() {
        // Remove previous highlight
        document.querySelectorAll('.focus-highlight').forEach(el => {
            el.classList.remove('focus-highlight');
        });
        
        if (currentIndex < focusableElements.length) {
            const element = focusableElements[currentIndex];
            element.classList.add('focus-highlight');
            element.focus();
            currentIndex++;
            setTimeout(highlightNext, 1000);
        }
    }
    
    highlightNext();
}

// Context Changes
function initializeContextChanges() {
    const predictableSelect = document.getElementById('predictable-select');
    const focusTrapInput = document.getElementById('focus-trap-input');
    const autoSubmitSelect = document.getElementById('auto-submit-select');
    const popup = document.getElementById('focus-popup');
    const closePopup = document.getElementById('close-popup');
    const testButton = document.getElementById('test-context-changes');
    
    if (predictableSelect) {
        predictableSelect.addEventListener('change', function() {
            const shippingInfo = document.getElementById('shipping-info');
            if (this.value) {
                shippingInfo.style.display = 'block';
            } else {
                shippingInfo.style.display = 'none';
            }
        });
    }
    
    if (focusTrapInput) {
        focusTrapInput.addEventListener('focus', function() {
            popup.style.display = 'flex';
        });
    }
    
    if (autoSubmitSelect) {
        autoSubmitSelect.addEventListener('change', function() {
            if (this.value) {
                alert('⚠️ Form would auto-submit here - violates SC 3.2.2!');
            }
        });
    }
    
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }
    
    if (testButton) {
        testButton.addEventListener('click', testContextChanges);
    }
}

function testContextChanges() {
    const results = document.getElementById('context-change-results');
    results.innerHTML = `
        <h4>Context Change Test Results:</h4>
        <div class="context-results">
            <div class="context-item good">
                <h6>✅ Predictable Select</h6>
                <p>Shows content without navigation - complies with SC 3.2.2</p>
            </div>
            <div class="context-item bad">
                <h6>❌ Focus Popup</h6>
                <p>Unexpected popup on focus - violates SC 3.2.1</p>
            </div>
            <div class="context-item bad">
                <h6>❌ Auto-submit</h6>
                <p>Form submission on change - violates SC 3.2.2</p>
            </div>
        </div>
    `;
    results.style.display = 'block';
}

// Hover/Focus Content
function initializeHoverFocus() {
    const tooltipTrigger = document.querySelector('.tooltip-trigger');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const testButton = document.getElementById('test-hover-content');
    
    // Accessible tooltip
    if (tooltipTrigger) {
        let tooltip = null;
        
        function showTooltip() {
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.className = 'accessible-tooltip';
                tooltip.textContent = tooltipTrigger.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
            }
            tooltip.style.display = 'block';
            positionTooltip();
        }
        
        function hideTooltip() {
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        }
        
        function positionTooltip() {
            if (tooltip) {
                const rect = tooltipTrigger.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.bottom + 5) + 'px';
            }
        }
        
        tooltipTrigger.addEventListener('mouseenter', showTooltip);
        tooltipTrigger.addEventListener('mouseleave', hideTooltip);
        tooltipTrigger.addEventListener('focus', showTooltip);
        tooltipTrigger.addEventListener('blur', hideTooltip);
        
        // Escape key dismissal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && tooltip && tooltip.style.display === 'block') {
                hideTooltip();
                tooltipTrigger.focus();
            }
        });
    }
    
    // Accessible dropdown
    if (dropdownTrigger) {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        dropdownTrigger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            dropdownMenu.style.display = isExpanded ? 'none' : 'block';
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                dropdownTrigger.setAttribute('aria-expanded', 'false');
                dropdownTrigger.focus();
            }
        });
    }
    
    if (testButton) {
        testButton.addEventListener('click', testHoverContent);
    }
}

function testHoverContent() {
    const results = document.getElementById('hover-test-results');
    results.innerHTML = `
        <h4>Hover/Focus Content Analysis:</h4>
        <div class="hover-results">
            <div class="hover-item good">
                <h6>✅ Accessible Tooltip</h6>
                <p>Hoverable, dismissible with Escape, persistent</p>
            </div>
            <div class="hover-item good">
                <h6>✅ Dropdown Menu</h6>
                <p>Proper ARIA, keyboard accessible, dismissible</p>
            </div>
            <div class="hover-item bad">
                <h6>❌ Title Attribute</h6>
                <p>Not hoverable, not dismissible</p>
            </div>
        </div>
    `;
    results.style.display = 'block';
}

// Comprehensive Testing
function initializeComprehensiveTesting() {
    const keyboardAuditBtn = document.getElementById('full-keyboard-audit');
    const focusAuditBtn = document.getElementById('focus-management-audit');
    const interactiveAuditBtn = document.getElementById('interactive-content-audit');
    const fullReportBtn = document.getElementById('generate-full-report');
    
    if (keyboardAuditBtn) {
        keyboardAuditBtn.addEventListener('click', runKeyboardAudit);
    }
    
    if (focusAuditBtn) {
        focusAuditBtn.addEventListener('click', runFocusAudit);
    }
    
    if (interactiveAuditBtn) {
        interactiveAuditBtn.addEventListener('click', runInteractiveAudit);
    }
    
    if (fullReportBtn) {
        fullReportBtn.addEventListener('click', generateFullReport);
    }
}

function runKeyboardAudit() {
    const results = document.getElementById('keyboard-audit-results');
    results.innerHTML = `
        <h4>Complete Keyboard Audit Results:</h4>
        <div class="audit-summary">
            <div class="audit-stat good">✅ 95% keyboard accessible</div>
            <div class="audit-stat warning">⚠️ 2 elements need attention</div>
            <div class="audit-stat bad">❌ 1 keyboard trap detected</div>
        </div>
    `;
    results.style.display = 'block';
}

function runFocusAudit() {
    const results = document.getElementById('focus-audit-results');
    results.innerHTML = `
        <h4>Focus Management Analysis:</h4>
        <div class="audit-summary">
            <div class="audit-stat good">✅ Focus order logical</div>
            <div class="audit-stat good">✅ Focus indicators visible</div>
            <div class="audit-stat warning">⚠️ 1 modal needs focus management</div>
        </div>
    `;
    results.style.display = 'block';
}

function runInteractiveAudit() {
    const results = document.getElementById('interactive-audit-results');
    results.innerHTML = `
        <h4>Interactive Content Validation:</h4>
        <div class="audit-summary">
            <div class="audit-stat good">✅ All labels match names</div>
            <div class="audit-stat good">✅ Pointer cancellation works</div>
            <div class="audit-stat warning">⚠️ Some hover content needs improvement</div>
        </div>
    `;
    results.style.display = 'block';
}

function generateFullReport() {
    const results = document.getElementById('full-report-results');
    results.innerHTML = `
        <h4>Complete Accessibility Report:</h4>
        <div class="full-report">
            <div class="report-section">
                <h6>Overall Score: 87/100</h6>
                <div class="score-breakdown">
                    <div class="score-item">Keyboard: 95%</div>
                    <div class="score-item">Focus: 90%</div>
                    <div class="score-item">Interactive: 85%</div>
                </div>
            </div>
            <button class="demo-btn primary" onclick="exportReport()">Export Detailed Report</button>
        </div>
    `;
    results.style.display = 'block';
}

function exportReport() {
    const reportData = {
        date: new Date().toISOString(),
        page: 'Day 5: Comprehensive Accessibility Testing',
        overallScore: 87,
        sections: {
            keyboard: 95,
            focus: 90,
            interactive: 85
        }
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comprehensive-accessibility-report.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Checklist tracking
function initializeChecklistTracking() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    const exportButton = document.getElementById('export-day5-results');
    const resetButton = document.getElementById('reset-day5');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    if (exportButton) {
        exportButton.addEventListener('click', exportResults);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetChecklist);
    }
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    const checked = document.querySelectorAll('.checklist-items input[type="checkbox"]:checked');
    const progress = (checked.length / checkboxes.length) * 100;
    
    console.log(`Progress: ${Math.round(progress)}% (${checked.length}/${checkboxes.length})`);
}

function exportResults() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    const results = [];
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.closest('label').textContent.trim();
        results.push({
            item: label,
            completed: checkbox.checked
        });
    });
    
    const exportData = {
        date: new Date().toISOString(),
        page: 'Day 5: Comprehensive Accessibility Testing',
        results: results
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'day5-comprehensive-testing-results.json';
    a.click();
    URL.revokeObjectURL(url);
}

function resetChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateProgress();
}
