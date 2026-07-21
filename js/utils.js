// Formate les dates ISO au format français
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Nettoyage basique contre les injections XSS
export function sanitizeMarkdown(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}