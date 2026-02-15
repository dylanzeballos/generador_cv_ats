import type { ResumeData } from '@/app/types/resume';
import './styles.css';

/**
 * Plantilla Harvard
 *
 * Diseño elegante inspirado en el formato de Harvard Business School.
 * Características distintivas:
 * - Tipografía serif (Georgia) para títulos
 * - Líneas decorativas en color borgoña (#8b0000)
 * - Énfasis en logros cuantificables
 * - Espaciado generoso y refinado
 * - Jerarquía tipográfica sofisticada
 *
 * Secciones:
 * - Header con nombre destacado
 * - Resumen ejecutivo
 * - Experiencia profesional (con énfasis en resultados)
 * - Educación
 * - Habilidades técnicas
 * - Idiomas
 */

interface HarvardTemplateProps {
  data: ResumeData;
}

export default function HarvardTemplate({ data }: HarvardTemplateProps) {
  const { personalInfo, experience, education, skills, languages, links } = data;

  return (
    <article className="harvard-template" role="document" aria-label="Currículum formato Harvard">
      {/* Header con diseño elegante */}
      <header className="harvard-header">
        <h1 className="harvard-name">{personalInfo.fullName}</h1>
        <div className="harvard-contact">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Resumen ejecutivo */}
      {personalInfo.summary && (
        <section className="harvard-section" aria-labelledby="summary-heading">
          <div className="harvard-section-header">
            <h2 id="summary-heading" className="harvard-section-title">
              Resumen Profesional
            </h2>
            <div className="harvard-section-line"></div>
          </div>
          <p className="harvard-summary">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experiencia profesional */}
      {experience.length > 0 && (
        <section className="harvard-section" aria-labelledby="experience-heading">
          <div className="harvard-section-header">
            <h2 id="experience-heading" className="harvard-section-title">
              Experiencia Profesional
            </h2>
            <div className="harvard-section-line"></div>
          </div>
          {experience.map((job) => (
            <div key={job.id} className="harvard-item">
              <div className="harvard-item-header">
                <div className="harvard-item-left">
                  <h3 className="harvard-item-title">{job.company}</h3>
                  <p className="harvard-item-subtitle">{job.position}</p>
                </div>
                <span className="harvard-item-date">
                  {job.startDate} – {job.current ? 'Presente' : job.endDate}
                </span>
              </div>
              <p className="harvard-item-description">{job.description}</p>
              {job.achievements && job.achievements.length > 0 && (
                <ul className="harvard-list">
                  {job.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Educación */}
      {education.length > 0 && (
        <section className="harvard-section" aria-labelledby="education-heading">
          <div className="harvard-section-header">
            <h2 id="education-heading" className="harvard-section-title">
              Educación
            </h2>
            <div className="harvard-section-line"></div>
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="harvard-item">
              <div className="harvard-item-header">
                <div className="harvard-item-left">
                  <h3 className="harvard-item-title">{edu.institution}</h3>
                  <p className="harvard-item-subtitle">
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </p>
                </div>
                <span className="harvard-item-date">
                  {edu.startDate} – {edu.current ? 'Presente' : edu.endDate}
                </span>
              </div>
              {edu.gpa && <p className="harvard-item-description">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      {skills.length > 0 && (
        <section className="harvard-section" aria-labelledby="skills-heading">
          <div className="harvard-section-header">
            <h2 id="skills-heading" className="harvard-section-title">
              Habilidades
            </h2>
            <div className="harvard-section-line"></div>
          </div>
          <div className="harvard-skills">
            {skills.map((skill) => (
              <span key={skill.id} className="harvard-skill">
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Idiomas */}
      {languages.length > 0 && (
        <section className="harvard-section" aria-labelledby="languages-heading">
          <div className="harvard-section-header">
            <h2 id="languages-heading" className="harvard-section-title">
              Idiomas
            </h2>
            <div className="harvard-section-line"></div>
          </div>
          <div className="harvard-languages">
            {languages.map((lang) => (
              <span key={lang.id} className="harvard-language">
                <strong>{lang.name}:</strong> {lang.level}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Enlaces */}
      {links.length > 0 && (
        <section className="harvard-section" aria-labelledby="links-heading">
          <div className="harvard-section-header">
            <h2 id="links-heading" className="harvard-section-title">
              Enlaces
            </h2>
            <div className="harvard-section-line"></div>
          </div>
          <div className="harvard-languages">
            {links.map((link) => (
              <span key={link.id} className="harvard-language">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
