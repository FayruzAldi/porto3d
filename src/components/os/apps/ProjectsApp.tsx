import React, { useState } from 'react';
import { PROJECTS } from '../../../data/portfolioData';
import type { ProjectItem } from '../../../types/portfolio';
import { sound } from '../../../utils/sound';
import { ExternalLink, Star } from 'lucide-react';

export const ProjectsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', '3D / WebGL', 'Fullstack', 'AI / Tools', 'Mobile'];

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleFilterClick = (cat: string) => {
    sound.playClick();
    setActiveCategory(cat);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Category Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        padding: '8px 12px 0 12px', 
        borderBottom: '2px solid var(--win-border-dark)',
        background: 'var(--win-bg)',
        overflowX: 'auto'
      }}>
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={isActive ? 'win98-box-outset' : 'win98-btn'}
              style={{
                borderBottom: isActive ? 'none' : undefined,
                background: isActive ? '#e0e0e0' : 'var(--btn-bg)',
                fontWeight: isActive ? 700 : 500,
                padding: '6px 12px',
                borderTopLeftRadius: '3px',
                borderTopRightRadius: '3px',
                fontSize: '11px',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Project List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="win98-box-outset"
            style={{ 
              padding: '12px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              border: selectedProject?.id === project.id ? '2px solid var(--accent-color)' : undefined
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{project.title}</h3>
                  {project.featured && (
                    <span style={{ 
                      fontSize: '9px', 
                      background: '#d97706', 
                      color: '#ffffff', 
                      padding: '1px 5px', 
                      borderRadius: '2px', 
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <Star size={9} fill="#fff" /> FEATURED
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: 600, marginTop: '2px' }}>
                  {project.tagline}
                </div>
              </div>

              <span style={{ 
                fontSize: '10px', 
                padding: '2px 8px', 
                background: '#475569', 
                color: '#fff', 
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)' 
              }}>
                {project.category}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5', color: '#333333' }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '4px 0' }}>
              {project.tags.map(tag => (
                <span 
                  key={tag}
                  className="win98-box-inset"
                  style={{ fontSize: '10px', padding: '2px 6px', fontFamily: 'var(--font-mono)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button 
                className="win98-btn"
                onClick={() => {
                  sound.playClick();
                  alert(`Demo project: ${project.title}`);
                }}
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                <ExternalLink size={12} /> Live Preview
              </button>
              <button 
                className="win98-btn"
                onClick={() => {
                  sound.playClick();
                  window.open(project.githubUrl, '_blank');
                }}
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Source Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
