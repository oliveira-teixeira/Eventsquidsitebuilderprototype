import { BLOCK_REGISTRY } from "../components/site-builder/block-registry";

export const generateFullPageHtml = (blocks: any[]) => {
  // Validate input
  if (!Array.isArray(blocks)) {
    console.error('generateFullPageHtml: blocks is not an array', blocks);
    return '';
  }

  return blocks
    .filter(b => b && !b.hidden)
    .map(block => {
      // Validate block structure
      if (!block || !block.typeId) {
        console.warn('Invalid block structure:', block);
        return '';
      }

      const def = BLOCK_REGISTRY.find(d => d.id === block.typeId);
      if (!def) {
        console.warn('Block definition not found for typeId:', block.typeId);
        return '';
      }
      
      // Ensure def.html is a function
      if (typeof def.html !== 'function') {
        console.error('Block definition html is not a function for:', block.typeId);
        return '';
      }

      try {
        const html = def.html(block.id, block.variant || 'default', block.settings || {});
        
        // Validate generated HTML
        if (typeof html !== 'string') {
          console.error('Generated HTML is not a string for block:', block.typeId);
          return '';
        }
        
        return html;
      } catch (e) {
        console.error('Error generating HTML for block:', block.typeId, e);
        return '';
      }
    })
    .filter(html => html.length > 0)
    .join('\n');
};