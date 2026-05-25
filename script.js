
/**
 * FEATURE 1: Toggle Section Visibility
 * Show/Hide a section when the Hide/Show button is clicked.
 * @param {string} sectionId - ID of the card-body element
 * @param {HTMLElement} btn   - The button that was clicked
 */
function toggleSection(sectionId, btn) {
  const section = document.getElementById(sectionId);

  if (section.classList.contains('hidden')) {
    // Show the section
    section.classList.remove('hidden');
    btn.textContent = 'Hide';
  } else {
    // Hide the section
    section.classList.add('hidden');
    btn.textContent = 'Show';
  }
}

/**
 * FEATURE 2: Active Navigation Highlight
 * Highlights the clicked nav link and removes active class from others.
 * @param {HTMLElement} clickedLink - The nav link that was clicked
 */
function setActive(clickedLink) {
  // Remove active class from all nav links
  const allLinks = document.querySelectorAll('.nav-link');
  allLinks.forEach(link => link.classList.remove('active'));

  // Add active class to the clicked link
  clickedLink.classList.add('active');
}

/**
 * FEATURE 3: Submit Assignment Alert
 * Shows a confirmation dialog before "submitting" the assignment.
 */
function showAlert() {
  const confirmed = confirm(
    '📤 Assignment 6 – Moodle Page\n\nAre you sure you want to submit?\n\nMake sure you have attached:\n  ✅ index.html\n  ✅ style.css\n  ✅ script.js\n  ✅ Screenshot of the page'
  );

  if (confirmed) {
    // Simulate submission success
    alert('✅ Submission Successful!\n\nYour assignment has been submitted.\nGood luck, Ambika! 🎉');

    // Update the pending badge to submitted dynamically
    const pendingBadge = document.querySelector('.badge.pending');
    if (pendingBadge) {
      pendingBadge.textContent = 'Submitted';
      pendingBadge.classList.remove('pending');
      pendingBadge.classList.add('submitted');

      // Remove highlight from the row
      const row = pendingBadge.closest('tr');
      if (row) row.classList.remove('highlight-row');
    }

    // Also update the submit button
    const btn = document.querySelector('.action-btn');
    if (btn) {
      btn.textContent = '✅ Submitted';
      btn.disabled = true;
      btn.style.background = '#10b981';
      btn.style.cursor = 'not-allowed';
    }
  }
}

// =============================================
//  FEATURE 4: Smooth Scroll for Nav Links
//  Scrolls smoothly to the target section
// =============================================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Only smooth scroll for hash links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

const sections = ['home', 'announcements', 'assignments', 'resources'];

window.addEventListener('scroll', function () {
  let currentSection = '';

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) {
        currentSection = id;
      }
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});