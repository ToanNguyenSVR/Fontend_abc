---
to: src/components/<%= h.inflection.pluralize(level) %>/<%= h.changeCase.param(name) %>/index.tsx
sh: prettier --write src/components/<%= h.inflection.pluralize(level) %>/<%= h.changeCase.param(name) %>/index.tsx
---
import React from 'react';
import './index.scss';
export interface <%= h.changeCase.pascal(name) %>Props {
  
}

export const <%= h.changeCase.pascal(name) %>: React.FC<<%= h.changeCase.pascal(name) %>Props> = (props) => {
  return <div className='<%= h.changeCase.param(name) %>'>
    
  </div>
};
