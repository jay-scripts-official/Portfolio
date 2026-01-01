const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Toast Notification
const toast = $("#toast");
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};

// Clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  } catch (err) {
    showToast("Failed to copy");
  }
};

const bindCopy = (selector) => {
  const el = $(selector);
  if (el) {
    el.addEventListener("click", () => {
      const text = el.getAttribute("data-copy");
      copyToClipboard(text);
    });
  }
};

bindCopy("#copyEmail");
bindCopy("#copyEmail2");
bindCopy("#copyDiscord");

// Dynamic Year
$("#year").textContent = new Date().getFullYear();
