// Page Meaning & Structure Demo - Interactive JavaScript

class PageMeaningDemo {
    constructor() {
        this.currentView = 'good';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showGoodStructure(); // Start with good example
    }

    bindEvents() {
        // Structure demo buttons
        const goodBtn = document.getElementById('show-good-structure');
        const badBtn = document.getElementById('show-bad-structure');
        const analyzeBtn = document.getElementById('analyze-structure');

        if (goodBtn) {
            goodBtn.addEventListener('click', () => this.showGoodStructure());
        }

        if (badBtn) {
            badBtn.addEventListener('click', () => this.showBadStructure());
        }

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeCurrentStructure());
        }

        // Smooth scrolling for navigation
        this.setupSmoothScrolling();
    }

    showGoodStructure() {
        const container = document.getElementById('structure-demo');
        this.currentView = 'good';
        
        container.innerHTML = `
            <header class="demo-header">
                <h1>E-commerce Product Page</h1>
                <nav aria-label="Breadcrumb">
                    <ol>
                        <li><a href="/">Home</a></li>
                        <li><a href="/electronics">Electronics</a></li>
                        <li aria-current="page">Laptop</li>
                    </ol>
                </nav>
            </header>
            
            <main class="demo-main">
                <section aria-labelledby="product-info">
                    <h2 id="product-info">Product Information</h2>
                    <article>
                        <h3>Gaming Laptop Pro</h3>
                        <p>High-performance laptop for gaming and creative work.</p>
                        <dl>
                            <dt>Price:</dt>
                            <dd>$1,299.99</dd>
                            <dt>Rating:</dt>
                            <dd>4.5/5 stars</dd>
                        </dl>
                    </article>
                </section>
                
                <section aria-labelledby="reviews-heading">
                    <h2 id="reviews-heading">Customer Reviews</h2>
                    <article>
                        <h3>Great performance!</h3>
                        <p>This laptop handles all my games perfectly.</p>
                        <footer>
                            <p>By <cite>John D.</cite> on <time datetime="2024-01-15">January 15, 2024</time></p>
                        </footer>
                    </article>
                </section>
            </main>
            
            <aside aria-labelledby="related-heading">
                <h2 id="related-heading">Related Products</h2>
                <ul>
                    <li><a href="/mouse">Gaming Mouse</a></li>
                    <li><a href="/keyboard">Mechanical Keyboard</a></li>
                </ul>
            </aside>
        `;
        
        this.updateButtonStates('good');
        this.showNotification('Showing well-structured page with proper semantics', 'success');
    }

    showBadStructure() {
        const container = document.getElementById('structure-demo');
        this.currentView = 'bad';
        
        container.innerHTML = `
            <div class="demo-header">
                <div class="big-text">E-commerce Product Page</div>
                <div class="breadcrumb">
                    <span>Home</span> > <span>Electronics</span> > <span>Laptop</span>
                </div>
            </div>
            
            <div class="demo-main">
                <div class="section">
                    <div class="heading">Product Information</div>
                    <div class="product">
                        <div class="title">Gaming Laptop Pro</div>
                        <div>High-performance laptop for gaming and creative work.</div>
                        <div>Price: $1,299.99</div>
                        <div>Rating: 4.5/5 stars</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="heading">Customer Reviews</div>
                    <div class="review">
                        <div class="review-title">Great performance!</div>
                        <div>This laptop handles all my games perfectly.</div>
                        <div class="review-meta">By John D. on January 15, 2024</div>
                        <div class="review-author">- John D.</div>
                    </div>
                </div>
            </div>
            
            <div class="sidebar">
                <div class="heading">Related Products</div>
                <div class="link">Gaming Mouse</div>
                <div class="link">Mechanical Keyboard</div>
            </div>
        `;
        
        this.updateButtonStates('bad');
        this.showNotification('Showing poorly structured page without semantic meaning', 'warning');
    }

    analyzeCurrentStructure() {
        const analysisOutput = document.getElementById('structure-analysis');
        analysisOutput.style.display = 'block';
        
        if (this.currentView === 'good') {
            analysisOutput.innerHTML = `
                <h4>Structure Analysis - Good Example</h4>
                <div class="analysis-results">
                    <div class="analysis-section">
                        <strong>✅ Semantic Elements Found:</strong>
                        <ul>
                            <li>header, main, aside, section, article</li>
                            <li>nav with aria-label for breadcrumb</li>
                            <li>Proper heading hierarchy (h1 → h2 → h3)</li>
                            <li>dl/dt/dd for structured data</li>
                            <li>time element with datetime attribute</li>
                            <li>cite element for attribution</li>
                        </ul>
                    </div>
                    
                    <div class="analysis-section">
                        <strong>✅ Accessibility Features:</strong>
                        <ul>
                            <li>aria-labelledby connects sections to headings</li>
                            <li>aria-current="page" for breadcrumb</li>
                            <li>Logical reading order</li>
                            <li>Clear content relationships</li>
                        </ul>
                    </div>
                    
                    <div class="analysis-section">
                        <strong>📊 Screen Reader Experience:</strong>
                        <p>"Header landmark, heading level 1: E-commerce Product Page, navigation landmark breadcrumb, main landmark, section, heading level 2: Product Information..."</p>
                    </div>
                </div>
            `;
        } else {
            analysisOutput.innerHTML = `
                <h4>Structure Analysis - Poor Example</h4>
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

// Initialize the demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageMeaningDemo();
});
