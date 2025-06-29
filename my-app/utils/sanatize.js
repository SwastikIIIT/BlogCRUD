import DOMPurify from 'isomorphic-dompurify';

const QUILL_CONFIG = {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre', 'img'],
   
    ALLOWED_ATTR: ['href', 'title', 'target', 'src', 'alt', 'width', 'height'],
  
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ALLOW_DATA_ATTR: false,
    FORBID_SCRIPT: true,
    FORBID_TAGS: [
    'script', 'object', 'embed', 'form', 'input', 'textarea', 
    'select', 'button', 'iframe', 'frame', 'frameset', 'meta', 
    'link', 'style', 'base', 'applet'
  ],
  FORBID_ATTR: [
    'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 
    'onblur', 'onkeyup', 'onkeydown', 'onmouseout', 'onmousemove',
    'onsubmit', 'onreset', 'onchange', 'onselect', 'onunload',
    'formaction', 'form', 'autofocus', 'autoplay', 'controls'
  ]
};

export const sanitizeForClient=(htmlContent)=>{
  if (!htmlContent || typeof htmlContent!=='string')
  return '';
  

  return DOMPurify.sanitize(htmlContent, QUILL_CONFIG);
};

export const sanitizeForServer=(htmlContent)=>{
    if(!htmlContent || typeof htmlContent!=='string') 
    return '';
  

  let cleaned = htmlContent.replace(/<p><br><\/p>/g, '');
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');

  const sanitized = DOMPurify.sanitize(cleaned,{
    ...QUILL_CONFIG,
    FORBID_ATTR: [...QUILL_CONFIG.FORBID_ATTR,'style']
  });

  return sanitized.trim();
};