let selectedEmoji = null;
const emojis = document.querySelectorAll('.emoji');
const textarea = document.getElementById('thoughts');
const saveBtn = document.getElementById('saveBtn');
const memories = document.getElementById('memories');

// --- Load saved memories from localStorage on page load ---
window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  saved.forEach(entry => addMemoryToDOM(entry));
});

// --- Emoji selection ---
emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    selectedEmoji = emoji.getAttribute('data-emoji');
    emojis.forEach(e => e.classList.add('disabled'));
    emoji.classList.remove('disabled');
  });
});

// --- Save button ---
saveBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (!selectedEmoji || !text) return;

  const entry = {
    emoji: selectedEmoji,
    text: text,
    timestamp: new Date().toLocaleString()
  };

  // Save to localStorage
  const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  entries.unshift(entry); // Add to beginning
  localStorage.setItem('diaryEntries', JSON.stringify(entries));

  // Add to DOM
  addMemoryToDOM(entry);

  // Reset UI
  textarea.value = '';
  emojis.forEach(e => e.classList.remove('disabled'));
  selectedEmoji = null;
});

// --- Add memory block to the page ---
function addMemoryToDOM(entry) {
  const memory = document.createElement('div');
  memory.className = 'memory';
  memory.innerHTML = `
    <time>${entry.emoji} ${entry.timestamp}</time>
    <p>${entry.text}</p>
    <button class="delete-btn">🗑️</button>
  `;

  memories.prepend(memory);

  memory.querySelector('.delete-btn').addEventListener('click', () => {
    memory.remove();

    // Update localStorage
    const updated = JSON.parse(localStorage.getItem('diaryEntries') || '[]')
      .filter(e => !(e.emoji === entry.emoji && e.text === entry.text && e.timestamp === entry.timestamp));
    localStorage.setItem('diaryEntries', JSON.stringify(updated));
  });
}
