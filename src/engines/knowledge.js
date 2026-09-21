/**
 * KnowLab — Knowledge Engine
 * Manages Concepts, Prerequisite Maps, Glossary Terms, and Search Queries.
 */

import { SeedData } from '../data/seedData.js';

export const KnowledgeEngine = {
  getDomains() {
    return SeedData.domains;
  },

  getDomainById(id) {
    return SeedData.domains.find(d => d.id === id);
  },

  getConceptsByDomain(domainId, levelFilter = null) {
    return SeedData.concepts.filter(c => {
      const matchesDomain = c.domainId === domainId;
      const matchesLevel = levelFilter !== null ? c.level === Number(levelFilter) : true;
      return matchesDomain && matchesLevel;
    });
  },

  getConceptById(id) {
    return SeedData.concepts.find(c => c.id === id);
  },

  search(query) {
    if (!query || query.trim() === '') return { concepts: [], glossary: [] };
    const q = query.toLowerCase().trim();

    const matchedConcepts = SeedData.concepts.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.summary.toLowerCase().includes(q) ||
      c.explanation.toLowerCase().includes(q)
    );

    const matchedGlossary = SeedData.glossary.filter(g => 
      g.term.toLowerCase().includes(q) || 
      g.shortDef.toLowerCase().includes(q)
    );

    return {
      concepts: matchedConcepts,
      glossary: matchedGlossary
    };
  },

  getGlossaryTerms(domainId = null) {
    if (!domainId) return SeedData.glossary;
    return SeedData.glossary.filter(g => g.domainId === domainId);
  },

  checkPrerequisites(conceptId, completedConceptIds = []) {
    const concept = this.getConceptById(conceptId);
    if (!concept || !concept.prerequisites || concept.prerequisites.length === 0) {
      return { isSatisfied: true, missingPrereqs: [] };
    }

    const missingPrereqs = concept.prerequisites.filter(reqId => !completedConceptIds.includes(reqId));
    return {
      isSatisfied: missingPrereqs.length === 0,
      missingPrereqs: missingPrereqs.map(id => this.getConceptById(id)).filter(Boolean)
    };
  }
};
