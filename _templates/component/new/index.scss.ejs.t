---
to: src/components/<%= h.inflection.pluralize(level) %>/<%= h.changeCase.param(name) %>/index.scss
sh: prettier --write src/components/<%= h.inflection.pluralize(level) %>/<%= h.changeCase.param(name) %>/index.scss
---
.<%= level[0] %>-<%= h.changeCase.param(name) %> {
  color: black;
  background-color: white;
}
