let selectedEmoji = null;
const emojis = document.querySelectorAll('.emoji');
const textarea = document.getElementById('thoughts');
const saveBtn = document.getElementById('saveBtn');
const memories = document.getElementById('memories');

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    selectedEmoji = emoji.getAttribute('data-emoji');
    emojis.forEach(e => e.classList.add('disabled'));
    emoji.classList.remove('disabled');
  });
});

saveBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (!selectedEmoji || !text) return;

  const memory = document.createElement('div');
  memory.className = 'memory';
  memory.innerHTML = `
    <time>${selectedEmoji} ${new Date().toLocaleString()}</time>
    <p>${text}</p>
    <button class="delete-btn">🗑️</button>
  `;

  memories.prepend(memory);
  textarea.value = '';
  emojis.forEach(e => e.classList.remove('disabled'));
  selectedEmoji = null;

  memory.querySelector('.delete-btn').addEventListener('click', () => {
    memory.remove();
  });
});