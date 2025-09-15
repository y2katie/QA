// Day 4: Advanced Input & Interaction Accessibility - Interactive Demo Scripts

document.addEventListener('DOMContentLoaded', function() {
    initializeTabSwitching();
    initializeLabelInNameDemo();
    initializeOnInputDemo();
    initializePointerCancellationDemo();
    initializeNameRoleValueDemo();
    initializeChecklistTracking();
    initializeHandsOnTestingExamples();
});

// Tab switching functionality
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const parentContainer = this.closest('.slide-content');
            
            if (!parentContainer || !targetTab) return;
            
            // Remove active class from all tabs and content in this container
            parentContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            parentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = parentContainer.querySelector(`#${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// SC 2.5.3 Label in Name Demo
function initializeLabelInNameDemo() {
    // Initialize demo buttons for label in name testing
    const goodSaveBtn = document.getElementById('good-save-btn');
    const goodSubmitBtn = document.getElementById('good-submit-btn');
    const badSaveBtn = document.getElementById('bad-save-btn');
    const badDownloadBtn = document.getElementById('bad-download-btn');

    // Add click handlers to demonstrate the difference
    if (goodSaveBtn) {
        goodSaveBtn.addEventListener('click', function() {
            alert('✅ Voice command "Click Save Document" would work!');
        });
    }

    if (goodSubmitBtn) {
        goodSubmitBtn.addEventListener('click', function() {
            alert('✅ Voice command "Click Submit" would work!');
        });
    }

    if (badSaveBtn) {
        badSaveBtn.addEventListener('click', function() {
            alert('❌ Voice command "Click Save" would fail - accessible name is "Submit Document"');
        });
    }

    if (badDownloadBtn) {
        badDownloadBtn.addEventListener('click', function() {
            alert('❌ Voice command "Click Download" would fail - accessible name is "Get File"');
        });
    }
}

// SC 3.2.2 On Input Demo
function initializeOnInputDemo() {
    const goodCountrySelect = document.getElementById('country-good');
    const badLanguageSelect = document.getElementById('language-bad');
    const testCountrySelect = document.getElementById('test-country');
    const testLanguageSelect = document.getElementById('test-language');
    let reloadTimeout = null;

    if (goodCountrySelect) {
        goodCountrySelect.addEventListener('change', function() {
            const shippingOptions = document.getElementById('shipping-options');
            if (this.value && shippingOptions) {
                shippingOptions.style.display = 'block';
            } else if (shippingOptions) {
                shippingOptions.style.display = 'none';
            }
        });
    }

    if (badLanguageSelect) {
        badLanguageSelect.addEventListener('change', function() {
            if (this.value) {
                startReloadCountdown();
            }
        });
    }

    if (testCountrySelect) {
        testCountrySelect.addEventListener('change', function() {
            console.log('✅ Good: Country changed without unexpected navigation');
        });
    }

    if (testLanguageSelect) {
        testLanguageSelect.addEventListener('change', function() {
            alert('⚠️ Bad Example: This would normally cause an unexpected page reload!');
        });
    }

    function startReloadCountdown() {
        const warningDiv = document.getElementById('reload-warning');
        const countdownSpan = document.getElementById('countdown');
        const cancelButton = document.getElementById('cancel-reload');
        
        if (!warningDiv || !countdownSpan) return;
        
        warningDiv.style.display = 'block';
        let countdown = 3;
        
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownSpan.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                // Actually reload the page to demonstrate the problematic behavior
                window.location.reload();
            }
        }, 1000);
        
        // Allow cancellation
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                clearInterval(countdownInterval);
                warningDiv.style.display = 'none';
                badLanguageSelect.value = '';
                alert('✅ Reload cancelled! In a real scenario, users would lose their work.');
            });
        }
    }
}

// SC 2.5.2 Pointer Cancellation Demo
function initializePointerCancellationDemo() {
    const safeDeleteButton = document.getElementById('safe-delete');
    const dangerousDeleteButton = document.getElementById('dangerous-delete');
    const safePointerTest = document.getElementById('safe-pointer-test');
    const dangerousPointerTest = document.getElementById('dangerous-pointer-test');

    if (safeDeleteButton) {
        safeDeleteButton.addEventListener('mousedown', function() {
            this.classList.add('pressed');
        });
        
        safeDeleteButton.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
            alert('✅ Safe: Action executed on mouseup - cancellation was possible');
        });
        
        safeDeleteButton.addEventListener('mouseleave', function() {
            this.classList.remove('pressed');
        });
    }

    if (dangerousDeleteButton) {
        dangerousDeleteButton.addEventListener('mousedown', function() {
            alert('❌ Dangerous: Action executed immediately on mousedown - no cancellation possible');
        });
    }

    if (safePointerTest) {
        safePointerTest.addEventListener('mousedown', function() {
            this.classList.add('pressed');
        });
        
        safePointerTest.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
            alert('✅ Safe: Action executed on mouseup - cancellation was possible');
        });
        
        safePointerTest.addEventListener('mouseleave', function() {
            this.classList.remove('pressed');
        });
    }

    if (dangerousPointerTest) {
        dangerousPointerTest.addEventListener('mousedown', function() {
            alert('❌ Dangerous: Action executed immediately on mousedown - no cancellation possible');
        });
    }
}

// SC 4.1.2 Name, Role, Value Demo
function initializeNameRoleValueDemo() {
    const customToggle = document.getElementById('custom-toggle');

    if (customToggle) {
        customToggle.addEventListener('click', function() {
            const isChecked = this.getAttribute('aria-checked') === 'true';
            this.setAttribute('aria-checked', !isChecked);
            
            // Visual feedback
            if (!isChecked) {
                this.classList.add('checked');
            } else {
                this.classList.remove('checked');
            }
        });

        // Keyboard support
        customToggle.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

// Checklist tracking functionality
function initializeChecklistTracking() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    const exportButton = document.getElementById('export-day4-results');
    const resetButton = document.getElementById('reset-day4');

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
        page: 'Day 4: Advanced Input & Interaction Accessibility',
        results: results
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'day4-accessibility-qa-results.json';
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

// Hands-on Testing Examples
function initializeHandsOnTestingExamples() {
    const inspectButtonsBtn = document.getElementById('inspect-buttons');
    const testContextChangesBtn = document.getElementById('test-context-changes');
    const analyzePointersBtn = document.getElementById('analyze-pointers');
    
    if (inspectButtonsBtn) {
        inspectButtonsBtn.addEventListener('click', function() {
            inspectButtonLabels();
        });
    }
    
    if (testContextChangesBtn) {
        testContextChangesBtn.addEventListener('click', function() {
            testContextChanges();
        });
    }
    
    if (analyzePointersBtn) {
        analyzePointersBtn.addEventListener('click', function() {
            analyzePointerEvents();
        });
    }
}

function inspectButtonLabels() {
    const resultsContainer = document.getElementById('button-inspection-results');
    const testButtons = document.querySelectorAll('.test-button');
    
    if (!resultsContainer) return;
    
    let results = '<h4>Button Label Analysis:</h4><div class="inspection-grid">';
    
    testButtons.forEach((button, index) => {
        const visibleText = button.textContent.trim();
        const accessibleName = button.getAttribute('aria-label') || visibleText;
        const isCompliant = accessibleName.includes(visibleText);
        
        results += `<div class="inspection-item ${isCompliant ? 'pass' : 'fail'}">
            <h5>Button ${index + 1}: "${visibleText}"</h5>
            <p><strong>Visible Text:</strong> "${visibleText}"</p>
            <p><strong>Accessible Name:</strong> "${accessibleName}"</p>
            <p><strong>Voice Command:</strong> "Click ${visibleText}" ${isCompliant ? '✅' : '❌'}</p>
            <p class="status ${isCompliant ? 'pass' : 'fail'}">${isCompliant ? 'PASS' : 'FAIL'} - ${isCompliant ? 'Complies with SC 2.5.3' : 'Violates SC 2.5.3'}</p>
        </div>`;
    });
    
    results += '</div>';
    resultsContainer.innerHTML = results;
    resultsContainer.style.display = 'block';
}

function testContextChanges() {
    const resultsContainer = document.getElementById('context-test-results');
    
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <h4>Context Change Analysis:</h4>
        <div class="context-analysis-grid">
            <div class="context-item good">
                <h5>✅ Country Selector</h5>
                <p>Changes content without navigation - complies with SC 3.2.2</p>
            </div>
            <div class="context-item bad">
                <h5>❌ Language Selector</h5>
                <p>Would cause page reload - violates SC 3.2.2</p>
            </div>
        </div>
    `;
    resultsContainer.style.display = 'block';
}

function analyzePointerEvents() {
    const resultsContainer = document.getElementById('pointer-analysis-results');
    
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <h4>Pointer Event Analysis Results</h4>
        <div class="analysis-grid">
            <div class="analysis-item good">
                <h5>✅ Safe Button</h5>
                <p>Action occurs on mouseup event - allows cancellation by dragging away</p>
                <p class="status pass">Complies with SC 2.5.2 Pointer Cancellation</p>
            </div>
            <div class="analysis-item bad">
                <h5>❌ Dangerous Button</h5>
                <p>Action occurs on mousedown event - no cancellation possible</p>
                <p class="status fail">Violates SC 2.5.2 Pointer Cancellation</p>
            </div>
        </div>
    `;
    resultsContainer.style.display = 'block';
}
