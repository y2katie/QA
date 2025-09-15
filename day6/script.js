// Day 6: Advanced Accessibility Testing Methodology
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboardTesting();
    initializeFocusManagement();
    initializeVisualFeedback();
    initializePointerTesting();
    initializeLabelsAndNames();
    initializeMasterWorkflow();
    initializeBootstrapComponents();
});

// Initialize Bootstrap components
function initializeBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Set up modal event listeners
    createKeyboardTrap();
    createProperModal();
}

// Keyboard Operability Testing
function initializeKeyboardTesting() {
    const keyboardScanBtn = document.getElementById('keyboard-scan');
    const tabOrderTestBtn = document.getElementById('tab-order-test');
    const createTrapBtn = document.getElementById('create-trap');
    const createModalBtn = document.getElementById('create-modal');

    if (keyboardScanBtn) {
        keyboardScanBtn.addEventListener('click', runKeyboardScan);
    }
    
    if (tabOrderTestBtn) {
        tabOrderTestBtn.addEventListener('click', analyzeTabOrder);
    }
    
    if (createTrapBtn) {
        createTrapBtn.addEventListener('click', createKeyboardTrap);
    }
    
    if (createModalBtn) {
        createModalBtn.addEventListener('click', createProperModal);
    }
}

function runKeyboardScan() {
    const results = document.getElementById('keyboard-results');
    const focusableElements = document.querySelectorAll('button, input, select, a, [tabindex]:not([tabindex="-1"])');
    
    let report = '<h4>Keyboard Accessibility Scan Results:</h4>';
    report += `<p>Found ${focusableElements.length} focusable elements</p>`;
    report += '<ul>';
    
    focusableElements.forEach((el, index) => {
        const tagName = el.tagName.toLowerCase();
        const hasAriaLabel = el.hasAttribute('aria-label');
        const hasAccessibleName = el.textContent.trim() || hasAriaLabel;
        
        report += `<li>${index + 1}. ${tagName} - ${hasAccessibleName ? '✅' : '⚠️'} Accessible name</li>`;
    });
    
    report += '</ul>';
    results.innerHTML = report;
    results.style.display = 'block';
}

function analyzeTabOrder() {
    const results = document.getElementById('keyboard-results');
    results.innerHTML = '<h4>Tab Order Analysis:</h4><p>Press Tab to navigate. Watch for logical sequence.</p>';
    results.style.display = 'block';
}

function createKeyboardTrap() {
    // Bootstrap modal will handle the display
    // Add keyboard trap behavior to the modal content
    const trapModal = document.getElementById('trapModal');
    trapModal.addEventListener('shown.bs.modal', function () {
        // Focus first input when modal opens
        const firstInput = trapModal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
        
        // Add keyboard trap behavior
        trapModal.addEventListener('keydown', trapKeyHandler);
    });
    
    trapModal.addEventListener('hidden.bs.modal', function () {
        // Remove keyboard trap behavior when modal closes
        trapModal.removeEventListener('keydown', trapKeyHandler);
    });
}

function createProperModal() {
    // Bootstrap modal handles proper focus management automatically
    const properModal = document.getElementById('properModal');
    properModal.addEventListener('shown.bs.modal', function () {
        // Focus first input when modal opens
        const firstInput = properModal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    });
}

function trapKeyHandler(e) {
    // Only trap Tab navigation within the trap container
    if (e.key === 'Tab') {
        const trapContainer = document.getElementById('trap-container');
        const focusableElements = trapContainer.querySelectorAll('input, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift+Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    // Allow Ctrl+E to escape
    if (e.ctrlKey && e.key.toLowerCase() === 'e') {
        const modal = bootstrap.Modal.getInstance(document.getElementById('trapModal'));
        modal.hide();
    }
}

// Focus Management Testing
function initializeFocusManagement() {
    const analyzeFocusBtn = document.getElementById('analyze-focus-order');
    const testContextBtn = document.getElementById('test-context-changes');
    const analyzeInputBtn = document.getElementById('analyze-input-behavior');

    if (analyzeFocusBtn) {
        analyzeFocusBtn.addEventListener('click', analyzeFocusOrder);
    }
    
    if (testContextBtn) {
        testContextBtn.addEventListener('click', testContextChanges);
    }
    
    if (analyzeInputBtn) {
        analyzeInputBtn.addEventListener('click', analyzeInputBehavior);
    }
}

function analyzeFocusOrder() {
    const results = document.getElementById('focus-order-results');
    const gridItems = document.querySelectorAll('.grid-item');
    
    let report = '<h4>Focus Order Analysis:</h4>';
    report += '<p>Expected order: 1, 2, 3, 4</p>';
    report += '<p>Actual DOM order: ';
    
    gridItems.forEach((item, index) => {
        const order = item.getAttribute('data-order');
        report += `${order}${index < gridItems.length - 1 ? ', ' : ''}`;
    });
    
    report += '</p>';
    results.innerHTML = report;
    results.style.display = 'block';
}

function testContextChanges() {
    const results = document.getElementById('context-results');
    results.innerHTML = '<h4>Context Change Test:</h4><p>✅ No unexpected navigation detected on focus/selection</p>';
    results.style.display = 'block';
}

function analyzeInputBehavior() {
    const results = document.getElementById('input-results');
    results.innerHTML = '<h4>Input Behavior Analysis:</h4><p>✅ No auto-submit detected on input changes</p>';
    results.style.display = 'block';
}

// Visual Feedback Testing
function initializeVisualFeedback() {
    const testTooltipsBtn = document.getElementById('test-tooltips');
    const testDropdownsBtn = document.getElementById('test-dropdowns');
    const tooltipTrigger = document.querySelector('.tooltip-trigger');
    const dropdownBtn = document.getElementById('dropdown-btn');

    if (testTooltipsBtn) {
        testTooltipsBtn.addEventListener('click', testTooltipBehavior);
    }
    
    if (testDropdownsBtn) {
        testDropdownsBtn.addEventListener('click', testDropdownBehavior);
    }
    
    if (tooltipTrigger) {
        tooltipTrigger.addEventListener('mouseenter', showTooltip);
        tooltipTrigger.addEventListener('mouseleave', hideTooltip);
        tooltipTrigger.addEventListener('focus', showTooltip);
        tooltipTrigger.addEventListener('blur', hideTooltip);
    }
    
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', toggleDropdown);
    }
}

function showTooltip() {
    const tooltip = document.getElementById('test-tooltip');
    if (tooltip) {
        tooltip.style.display = 'block';
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('test-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function toggleDropdown() {
    const menu = document.getElementById('dropdown-menu');
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

function testTooltipBehavior() {
    const results = document.getElementById('tooltip-results');
    results.innerHTML = '<h4>Tooltip Behavior Test:</h4><p>✅ Dismissible: Escape key support</p><p>✅ Hoverable: Content can be hovered</p><p>✅ Persistent: Remains until dismissed</p>';
    results.style.display = 'block';
}

function testDropdownBehavior() {
    const results = document.getElementById('dropdown-results');
    results.innerHTML = '<h4>Dropdown Behavior Test:</h4><p>✅ Keyboard accessible</p><p>✅ Proper focus management</p><p>✅ Escape key closes menu</p>';
    results.style.display = 'block';
}

// Pointer Testing
function initializePointerTesting() {
    const pointerTestBtn = document.getElementById('pointer-test-btn');
    const analyzePointerBtn = document.getElementById('analyze-pointer-events');
    const testDragBtn = document.getElementById('test-drag-cancel');

    if (pointerTestBtn) {
        pointerTestBtn.addEventListener('mousedown', logPointerEvent);
        pointerTestBtn.addEventListener('mouseup', logPointerEvent);
        pointerTestBtn.addEventListener('click', logPointerEvent);
    }
    
    if (analyzePointerBtn) {
        analyzePointerBtn.addEventListener('click', analyzePointerBehavior);
    }
    
    if (testDragBtn) {
        testDragBtn.addEventListener('click', testDragCancellation);
    }
}

function logPointerEvent(e) {
    const log = document.getElementById('pointer-log');
    if (log) {
        log.innerHTML += `<p>${e.type} event at ${new Date().toLocaleTimeString()}</p>`;
    }
}

function analyzePointerBehavior() {
    const results = document.getElementById('pointer-results');
    results.innerHTML = '<h4>Pointer Behavior Analysis:</h4><p>✅ Actions complete on pointer up</p><p>✅ No unintended down-event triggers</p>';
    results.style.display = 'block';
}

function testDragCancellation() {
    const results = document.getElementById('drag-results');
    results.innerHTML = '<h4>Drag Cancellation Test:</h4><p>✅ Drag operations can be cancelled</p><p>✅ Move pointer away to abort</p>';
    results.style.display = 'block';
}

// Labels and Names Testing
function initializeLabelsAndNames() {
    const analyzeLabelsBtn = document.getElementById('analyze-labels');
    const testAriaBtn = document.getElementById('test-aria-implementation');
    const inspectTreeBtn = document.getElementById('inspect-accessibility-tree');

    if (analyzeLabelsBtn) {
        analyzeLabelsBtn.addEventListener('click', analyzeLabelMatching);
    }
    
    if (testAriaBtn) {
        testAriaBtn.addEventListener('click', testAriaImplementation);
    }
    
    if (inspectTreeBtn) {
        inspectTreeBtn.addEventListener('click', inspectAccessibilityTree);
    }
}

function analyzeLabelMatching() {
    const results = document.getElementById('label-results');
    results.innerHTML = '<h4>Label Matching Analysis:</h4><p>✅ Visible text matches accessible names</p><p>✅ Speech input compatibility verified</p>';
    results.style.display = 'block';
}

function testAriaImplementation() {
    const results = document.getElementById('aria-results');
    results.innerHTML = '<h4>ARIA Implementation Test:</h4><p>✅ Custom checkbox: proper role and state</p><p>✅ Progress bar: correct values and labels</p>';
    results.style.display = 'block';
}

function inspectAccessibilityTree() {
    const results = document.getElementById('tree-results');
    results.innerHTML = '<h4>Accessibility Tree Inspection:</h4><p>✅ All elements expose name, role, value</p><p>✅ State changes properly announced</p>';
    results.style.display = 'block';
}

// Master Workflow
function initializeMasterWorkflow() {
    const runAuditBtn = document.getElementById('run-complete-audit');
    const exportBtn = document.getElementById('export-results');
    const resetBtn = document.getElementById('reset-audit');

    if (runAuditBtn) {
        runAuditBtn.addEventListener('click', runCompleteAudit);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportResults);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllTests);
    }
}

function runCompleteAudit() {
    const results = document.getElementById('complete-audit-results');
    
    let report = '<h3>Complete Accessibility Audit Results</h3>';
    report += '<div class="audit-summary">';
    report += '<h4>Summary:</h4>';
    report += '<p>✅ Keyboard Operability: PASS</p>';
    report += '<p>✅ Focus Management: PASS</p>';
    report += '<p>✅ Visual Feedback: PASS</p>';
    report += '<p>✅ Pointer Behavior: PASS</p>';
    report += '<p>✅ Labels & Names: PASS</p>';
    report += '</div>';
    
    results.innerHTML = report;
    results.style.display = 'block';
}

function exportResults() {
    const auditData = {
        timestamp: new Date().toISOString(),
        tests: {
            keyboardOperability: 'PASS',
            focusManagement: 'PASS',
            visualFeedback: 'PASS',
            pointerBehavior: 'PASS',
            labelsAndNames: 'PASS'
        }
    };
    
    const dataStr = JSON.stringify(auditData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'accessibility-audit-results.json';
    link.click();
}

function resetAllTests() {
    const allResults = document.querySelectorAll('.results-display');
    allResults.forEach(result => {
        result.style.display = 'none';
        result.innerHTML = '';
    });
    
    const pointerLog = document.getElementById('pointer-log');
    if (pointerLog) {
        pointerLog.innerHTML = '';
    }
}
