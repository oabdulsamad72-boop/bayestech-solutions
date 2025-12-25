// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// WhatsApp Form Submission for Bayestech Solutions
const whatsappForm = document.getElementById('whatsappForm');

if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const urgency = document.getElementById('urgency').value;
        
        // Validate form
        if (!name || !email || !phone || !service || !subject || !message) {
            showNotification('Please fill in all required fields marked with *', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Validate phone number (basic validation)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanedPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
            showNotification('Please enter a valid phone number with country code', 'error');
            return;
        }
        
        // Format the message for WhatsApp
        const formattedMessage = `*NEW QUERY - BAYESTECH SOLUTIONS*%0A%0A
*👤 Client Information:*%0A
• *Name:* ${name}%0A
• *Email:* ${email}%0A
• *Phone:* ${phone}%0A
• *Service Needed:* ${service}%0A
• *Urgency:* ${urgency}%0A%0A
*📝 Subject:*%0A${subject}%0A%0A
*💬 Message:*%0A${message}%0A%0A
*📅 Submitted:* ${new Date().toLocaleString()}%0A
*⚡ Bayestech Solutions*`;
        
        // Your WhatsApp number (REPLACE WITH YOUR ACTUAL NUMBER)
        const whatsappNumber = '2349169025365'; // Example: 1234567890 (without + sign)
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showNotification('Opening WhatsApp with your message. Please send it to complete the inquiry.', 'success');
        
        // Reset form
        setTimeout(() => {
            whatsappForm.reset();
        }, 2000);
    });
}

// Notification System
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    const icon = type === 'success' ? '✓' : '!';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation styles
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.required && this.value.trim() === '') {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '#10B981';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = '#ffd700';
    });
});

// Active navigation link highlighting
const currentPage = location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage || 
        (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Emergency button animation
const emergencyBtn = document.querySelector('.btn-emergency');
if (emergencyBtn) {
    setInterval(() => {
        emergencyBtn.style.boxShadow = emergencyBtn.style.boxShadow === '0 0 20px rgba(231, 76, 60, 0.7)' 
            ? '0 0 30px rgba(231, 76, 60, 0.9)' 
            : '0 0 20px rgba(231, 76, 60, 0.7)';
    }, 1000);
}

// Service cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (!value.startsWith('+')) {
                value = '+' + value;
            }
        }
        e.target.value = value;
    });
}

// Initialize tooltips for contact icons
document.querySelectorAll('.contact-item i').forEach(icon => {
    const parent = icon.parentElement;
    const title = icon.className.includes('fa-whatsapp') ? 'Chat on WhatsApp' :
                 icon.className.includes('fa-phone') ? 'Call us' :
                 icon.className.includes('fa-envelope') ? 'Email us' :
                 icon.className.includes('fa-map-marker-alt') ? 'Our location' : '';
    
    if (title) {
        parent.setAttribute('title', title);
    }
});