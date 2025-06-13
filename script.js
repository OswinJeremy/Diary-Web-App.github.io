let selectedEmoji = null;
const emojis = document.querySelectorAll('.emoji');
const textarea = document.getElementById('thoughts');
const saveBtn = document.getElementById('saveBtn');
const memories = document.getElementById('memories');

// Load saved memories from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  saved.forEach(entry => addMemoryToDOM(entry));
});

// Emoji click logic
emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    selectedEmoji = emoji.getAttribute('data-emoji');
    emojis.forEach(e => e.classList.add('disabled'));
    emoji.classList.remove('disabled');
  });
});

// Save button logic
saveBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (!selectedEmoji || !text) return;

  const entry = {
    emoji: selectedEmoji,
    text: text,
    timestamp: new Date().toLocaleString()
  };

  const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  entries.unshift(entry);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));

  addMemoryToDOM(entry);

  // Reset input
  textarea.value = '';
  emojis.forEach(e => e.classList.remove('disabled'));
  selectedEmoji = null;
});

// Helper to add a memory to the page
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

    const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    const updated = entries.filter(e =>
      !(e.emoji === entry.emoji && e.text === entry.text && e.timestamp === entry.timestamp)
    );
    localStorage.setItem('diaryEntries', JSON.stringify(updated));
  });
}
