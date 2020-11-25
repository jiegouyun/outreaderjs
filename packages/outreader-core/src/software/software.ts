import path from 'path';
import fs from 'fs';

export function checkSoftware(dir: string): string {
  const filenames = fs.readdirSync(dir);
  const extnames = filenames.map((item) => {
    return path.extname(item);
  });
  const extnameSet = new Set(extnames);
  if (extnameSet.has('.out') && !extnameSet.has('.OUT')) {
    return 'YJK';
  } else if (extnameSet.has('.OUT') && !extnameSet.has('.out')) {
    return 'PKPM';
  }
  return 'unknown';
}
