import { projects } from '../content/projects';
import { SectionHeader } from './ui/SectionHeader';
import { ProjectEntry } from './ProjectEntry';
import styles from './Work.module.css';

export function Work() {
  return (
    <section id="work" data-theme="light" className={styles.section}>
      <div className="container">
        <SectionHeader
          number="01"
          title={<>Selected <em className="serif">work</em></>}
          aside="Four things I've helped build — a hackathon product, a beta program, and two internal tools people rely on."
        />
        <div className={styles.list}>
          {projects.map((p, i) => (
            <ProjectEntry key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
