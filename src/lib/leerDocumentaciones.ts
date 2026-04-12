import fs from 'fs';
import path from 'path';

interface DocChunk {
  app: 'desktop' | 'admin' | 'online' | 'offline';
  title: string;
  content: string;
};

function splitMarkdownBySections(markdown: string, app: DocChunk['app']): DocChunk[] {
  const sections = markdown.split(/^##\s+/gm).filter(Boolean);

  return sections.map((section) => {
    const lines = section.trim().split('\n');
    const title = lines[0]?.trim() || 'Sin título';
    const content = lines.slice(1).join('\n').trim();

    return {
      app,
      title,
      content,
    };
  });
}

const desktop = fs.readFileSync(path.join(process.cwd(), 'docs/desktop.md'), 'utf-8');
const admin = fs.readFileSync(path.join(process.cwd(), 'docs/admin.md'), 'utf-8');
const online = fs.readFileSync(path.join(process.cwd(), 'docs/online.md'), 'utf-8');
const offline = fs.readFileSync(path.join(process.cwd(), 'docs/offline.md'), 'utf-8');

export const allChunks: DocChunk[] = [
  ...splitMarkdownBySections(desktop, 'desktop'),
  ...splitMarkdownBySections(admin, 'admin'),
  ...splitMarkdownBySections(online, 'online'),
  ...splitMarkdownBySections(offline, 'offline'),
];