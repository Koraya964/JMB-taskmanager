/**
 * ui.js — Helpers UI partagés
 */

/** Échappe le HTML pour éviter XSS (combiné avec un helmet et un cors)*/
export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Labels priorité */
export const PRIORITY_LABEL = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute',
  urgent: 'Urgente',
};

/** Badges HTML priorité */
export const priorityBadge = (p) =>
  `<span class="badge badge-${p}">${PRIORITY_LABEL[p] ?? p}</span>`;

/** Labels catégorie (une espèce de typage) */
export const CAT_LABEL = {
  semaine: 'Semaine',
  urgent: 'Urgent',
  aujourd_hui: "Aujourd'hui",
};

/** Affiche une alerte dans un conteneur .alert */
export const showAlert = (el, msg, type = 'error') => {
  el.textContent = msg;
  el.className = `alert ${type} show`;
};

/** Cache une alerte */
export const hideAlert = (el) => { el.className = 'alert'; };

/** Vérifie si l'utilisateur est connecté, sinon redirection */
export const requireAuth = () => {
  if (!localStorage.getItem('token')) {
    window.location.replace('/');
  }
};

/** Logout : vide le token et redirige */
export const logout = () => {
  localStorage.removeItem('token');
  window.location.replace('/');
};
