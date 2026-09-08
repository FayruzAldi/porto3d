import { SKILL_CATEGORIES } from '../../../data/portfolioData';
import { Cpu, Monitor, Server } from 'lucide-react';

export const SkillsApp = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor size={16} />;
      case 'Server': return <Server size={16} />;
      default: return <Cpu size={16} />;
    }
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
      <div className="win98-box-inset" style={{ padding: '10px', fontSize: '11px', color: '#444' }}>
        <strong>System Diagnostics:</strong> Memori keahlian & kapabilitas teknologi teridentifikasi. Evaluasi tingkat penguasaan berbasis pengalaman proyek riil.
      </div>

      {SKILL_CATEGORIES.map(category => (
        <div key={category.category} className="win98-box-outset" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid #aaa', paddingBottom: '6px' }}>
            {getIcon(category.icon)}
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--accent-color)' }}>
              {category.category}
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {category.skills.map(skill => (
              <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#555' }}>
                    {skill.experience} | <strong>{skill.level}%</strong>
                  </span>
                </div>

                {/* Retro Segmented Progress Bar */}
                <div 
                  className="win98-box-inset" 
                  style={{ 
                    height: '16px', 
                    padding: '2px', 
                    background: '#e0e0e0', 
                    display: 'flex', 
                    gap: '2px', 
                    overflow: 'hidden' 
                  }}
                >
                  <div 
                    style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
                      boxShadow: 'inset 1px 1px 0px #fff',
                      transition: 'width 0.6s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
