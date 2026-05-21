// Get the container that holds all session slides
const track = document.getElementById('sessionsTrack');

// Get the left arrow button
const arrowLeft = document.getElementById('arrowLeft');

// Get the right arrow button
const arrowRight = document.getElementById('arrowRight');

// Get all indicator dots
const indicators = document.querySelectorAll('.sessions__indicator');

// Get all session panels/slides
const panels = document.querySelectorAll('.sessions__panel');


// Store the current active slide
let current = 1;

// Store mouse starting position
let startX = 0;

// Check if user is dragging
let isDragging = false;

// Store current track position
let currentX = 0;


// X positions for each panel
const offsets = [0, -100, -200];


// Function to move to another panel
function goTo(index) {

  // Stop if index is out of range
  if (index < 0 || index > 2) return;

  // Update current panel
  current = index;

  // Add smooth slide animation
  track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  // Move track horizontally
  track.style.transform = `translateX(${offsets[current]}vw)`;


  // Remove active class from all panels
  panels.forEach(p => p.classList.remove('active'));

  // Activate current panel
  panels[current].classList.add('active');


  // Remove active class from all indicators
  indicators.forEach(i => i.classList.remove('active'));

  // Activate current indicator
  if (indicators[current]) indicators[current].classList.add('active');


  // Fade left arrow if at first panel
  arrowLeft.style.opacity = current === 0 ? '0.3' : '1';

  // Fade right arrow if at last panel
  arrowRight.style.opacity = current === 2 ? '0.3' : '1';
}


// Start at middle panel
goTo(1);


// Move to previous panel when clicking left arrow
arrowLeft.addEventListener('click', () => goTo(current - 1));

// Move to next panel when clicking right arrow
arrowRight.addEventListener('click', () => goTo(current + 1));


// Add click event to each indicator
indicators.forEach(ind => {

  // Move to selected panel
  ind.addEventListener('click', () => goTo(parseInt(ind.dataset.index)));
});


// Start dragging
track.addEventListener('mousedown', (e) => {

  // Save starting mouse position
  startX = e.clientX;

  // Set dragging state
  isDragging = true;

  // Get current track position
  currentX = offsets[current] * window.innerWidth / 100;

  // Remove animation during drag
  track.style.transition = 'none';
});


// Move track while dragging
window.addEventListener('mousemove', (e) => {

  // Stop if not dragging
  if (!isDragging) return;

  // Calculate drag distance
  const diff = e.clientX - startX;

  // Move track with mouse
  track.style.transform = `translateX(${currentX + diff}px)`;
});


// Release drag
window.addEventListener('mouseup', (e) => {

  // Stop if not dragging
  if (!isDragging) return;

  // End dragging
  isDragging = false;

  // Calculate final drag distance
  const diff = e.clientX - startX;

  // Move to next panel if dragged far left
  if (diff < -80) goTo(current + 1);

  // Move to previous panel if dragged far right
  else if (diff > 80) goTo(current - 1);

  // Return to current panel if drag is too small
  else goTo(current);
});