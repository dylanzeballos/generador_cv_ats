import type { ResumeData } from '@/app/types/resume';
import './styles.css';

/**
 * Plantilla ATS (Applicant Tracking System) Friendly
 *
 * Diseño optimizado para sistemas de seguimiento de candidatos:
 * - Formato limpio y simple
 * - Sin tablas, gráficos ni elementos complejos
 * - Fuentes estándar del sistema
 * - Estructura semántica clara
 * - Palabras clave destacadas
 * - Compatible con parsers ATS
 *
 * Ideal para:
 * - Aplicaciones corporativas
 * - Grandes empresas con ATS
 * - Sector público
 * - Posiciones donde el ATS filtra primero
 */

interface ATSTemplateProps {
  data: ResumeData;
}

export default function ATSTemplate({ data }: ATSTemplateProps) {
  const { personalInfo, experience, education, skills, languages, links } = data;

  return (
    <article className="ats-template" role="document" aria-label="Currículum formato ATS">
      {/* Header - Información de contacto */}
      <header className="ats-header">
        <h1 className="ats-name">{personalInfo.fullName}</h1>
        <div className="ats-contact">
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
              Web
            </a>
          )}
        </div>
      </header>

      {/* Resumen profesional */}
      {personalInfo.summary && (
        <section className="ats-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="ats-section-title">
            Resumen Profesional
          </h2>
          <p className="ats-text">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experiencia laboral */}
      {experience.length > 0 && (
        <section className="ats-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="ats-section-title">
            Experiencia Laboral
          </h2>
          {experience.map((job) => (
            <div key={job.id} className="ats-item">
              <div className="ats-item-header">
                <h3 className="ats-item-title">{job.position}</h3>
                <div>
                  <span className="ats-item-company">{job.company}</span>
                  <span className="ats-item-date">
                    {job.startDate} - {job.current ? 'Actual' : job.endDate}
                  </span>
                </div>
              </div>
              <p className="ats-item-description">{job.description}</p>
              {job.achievements && job.achievements.length > 0 && (
                <ul className="ats-list">
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
        <section className="ats-section" aria-labelledby="education-heading">
          <h2 id="education-heading" className="ats-section-title">
            Educación
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="ats-item">
              <div className="ats-item-header">
                <h3 className="ats-item-title">{edu.degree}</h3>
                <div>
                  <span className="ats-item-company">{edu.institution}</span>
                  {edu.field && <span> · {edu.field}</span>}
                  <span className="ats-item-date">
                    {edu.startDate} - {edu.current ? 'Actual' : edu.endDate}
                  </span>
                </div>
              </div>
              {edu.gpa && <p className="ats-item-description">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      {skills.length > 0 && (
        <section className="ats-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="ats-section-title">
            Habilidades
          </h2>
          <div className="ats-skills">
            {skills.map((skill) => (
              <span key={skill.id} className="ats-skill">
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Idiomas */}
      {languages.length > 0 && (
        <section className="ats-section" aria-labelledby="languages-heading">
          <h2 id="languages-heading" className="ats-section-title">
            Idiomas
          </h2>
          <div className="ats-languages">
            {languages.map((lang) => (
              <span key={lang.id} className="ats-language">
                {lang.name}: {lang.level}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Enlaces */}
      {links.length > 0 && (
        <section className="ats-section" aria-labelledby="links-heading">
          <h2 id="links-heading" className="ats-section-title">
            Enlaces
          </h2>
          <div className="ats-languages">
            {links.map((link) => (
              <span key={link.id} className="ats-language">
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
