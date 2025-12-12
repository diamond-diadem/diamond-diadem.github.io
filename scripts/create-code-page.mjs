#!/usr/bin/env node

import { mkdir, writeFile, access, readdir, readFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const LOCALE_STRINGS = {
  en: {
    label: 'English',
    retrieveHeading: 'Retrieve the Apptainer image',
    tutorialHeading: 'Tutorial',
    documentationHeading: (name) => `${name} documentation`,
    documentationWebsiteLabel: 'Official website',
    documentationDocsLabel: 'Official documentation',
    tutorialPlaceholderDescription: '<i>Learn to use this container image</i>',
    examplesHeading: 'Examples',
    examplesPlaceholderDescription: '<i>Download input files</i>',
    placeholderTitle: 'Content to be added',
    descriptionFallback: 'TODO: describe this code.',
  },
  fr: {
    label: 'Français',
    retrieveHeading: "Récupérez l'image Apptainer",
    tutorialHeading: 'Tutoriel',
    documentationHeading: (name) => `Documentation ${name}`,
    documentationWebsiteLabel: 'Site officiel',
    documentationDocsLabel: 'Documentation officielle',
    tutorialPlaceholderDescription: '<i>Apprenez à utiliser cette image de conteneur</i>',
    examplesHeading: 'Exemples',
    examplesPlaceholderDescription: "<i>Téléchargez des fichiers d'entrée</i>",
    placeholderTitle: 'Contenu à venir',
    descriptionFallback: 'TODO: décrire ce code.',
  },
};

const TARGET_LOCALES = ['en', 'fr'];

const CATEGORY_CHOICES = {
  s: 'scientific-computing',
  v: 'visualisation',
};

const DEFAULT_REGISTRY_PREFIX =
  'oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects';

const LAST_RUN_LOG = path.join(process.cwd(), '.last-generated-code-pages.json');
const UNDO_FLAGS = new Set(['--undo', '--cancel']);

const LOCALE_LINK_PREFIX = {
  en: '/en',
  fr: '',
};

const TABLE_FIRST_COLUMN_CLASS = {
  en: '',
  fr: ' class="table-cell-left"',
};

const OPTGROUP_LABELS = {
  en: {
    'scientific-computing': 'Scientific Computing',
    visualisation: 'Visualisation',
  },
  fr: {
    'scientific-computing': 'Calcul Scientifique',
    visualisation: 'Visualisation',
  },
};

const rl = readline.createInterface({ input, output });

async function ask(question, defaultValue = '') {
  const hint = defaultValue ? ` (default value: ${defaultValue})` : '';
  const answer = (await rl.question(`${question}${hint}: `)).trim();
  return answer || defaultValue || '';
}

async function askYesNo(question, defaultValue = true) {
  const hint = defaultValue ? 'Y/n' : 'y/N';
  const answer = (await rl.question(`${question} [${hint}]: `)).trim().toLowerCase();
  if (!answer) {
    return defaultValue;
  }
  if (answer.startsWith('y')) {
    return true;
  }
  if (answer.startsWith('n')) {
    return false;
  }
  console.log('Please answer with y or n.');
  return askYesNo(question, defaultValue);
}

async function askMultiline(prompt) {
  console.log(
    `${prompt}\nPaste your Markdown, then finish with either a single '.' line or by pressing Enter twice on an empty line.`,
  );
  const lines = [];
  let emptyStreak = 0;
  return new Promise((resolve) => {
    const finish = () => {
      rl.off('line', handler);
      resolve(lines.join('\n').trim());
    };
    const handler = (input) => {
      if (input.trim() === '.') {
        finish();
        return;
      }
      if (input === '') {
        emptyStreak += 1;
        if (emptyStreak >= 2) {
          finish();
          return;
        }
      } else {
        emptyStreak = 0;
      }
      lines.push(input);
    };
    rl.on('line', handler);
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function recordCreation(changeLog, relativePath) {
  if (!changeLog.createdFiles.some((file) => file === relativePath)) {
    changeLog.createdFiles.push(relativePath);
  }
}

function recordModification(changeLog, relativePath, previousContent) {
  if (!changeLog.modifiedFiles.some((entry) => entry.path === relativePath)) {
    changeLog.modifiedFiles.push({ path: relativePath, previousContent });
  }
}

async function existingCategories() {
  const categories = new Set();
  for (const locale of Object.keys(LOCALE_STRINGS)) {
    const base = path.join(process.cwd(), 'content', locale, 'codes');
    try {
      const entries = await readdir(base, { withFileTypes: true });
      entries
        .filter((entry) => entry.isDirectory())
        .forEach((entry) => categories.add(entry.name));
    } catch {
      // ignore missing locales
    }
  }
  return Array.from(categories).sort();
}

function ensureUrl(value) {
  if (!value) {
    return '';
  }
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) {
    return value;
  }
  return `https://${value.replace(/^\/+/, '')}`;
}

function buildDocBlock(localeStrings, { officialWebsite, documentationUrl }) {
  const cards = [];
  if (officialWebsite) {
    cards.push(
      `{{< link-card title="${localeStrings.documentationWebsiteLabel}" href="${officialWebsite}" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}`,
    );
  }
  if (documentationUrl) {
    cards.push(
      `{{< link-card title="${localeStrings.documentationDocsLabel}" href="${documentationUrl}" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}`,
    );
  }
  if (!cards.length) {
    return '';
  }
  return `{{< card-grid >}}
${cards.join('\n')}
{{< /card-grid >}}`;
}

function buildTutorialPlaceholder(localeStrings) {
  return `{{< link-card title="${localeStrings.placeholderTitle}" description="${localeStrings.tutorialPlaceholderDescription}" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}`;
}

function buildExamplesPlaceholder(localeStrings) {
  return `{{< link-card title="${localeStrings.placeholderTitle}" description="${localeStrings.examplesPlaceholderDescription}" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}`;
}

function buildFrontMatter(data) {
  const lines = [
    '---',
    `title: ${data.title}`,
    'title_visible: true',
    `linkTitle: ${data.linkTitle}`,
    'toc: false',
    `weight: ${data.weight}`,
  ];
  lines.push('---');
  return lines.join('\n');
}

function buildPage(locale, data) {
  const strings = LOCALE_STRINGS[locale];
  const frontMatter = buildFrontMatter(data);
  const docBlock = buildDocBlock(strings, data);
  const description = (data.descriptions[locale] || strings.descriptionFallback).trim();
  const tutorialPlaceholder = buildTutorialPlaceholder(strings);
  const examplesPlaceholder = buildExamplesPlaceholder(strings);

  return `${frontMatter}

### ${strings.retrieveHeading}

\`\`\`bash
${data.apptainerCommand}
\`\`\`

<div align="justify">

${description}

</div>

<h3 class="mb-1">${strings.tutorialHeading}</h3>

${tutorialPlaceholder}

${docBlock ? `<h3 class="mb-1 mt-3">${strings.documentationHeading(data.title)}</h3>

${docBlock}
` : ''}

<h3 class="mb-1 mt-3">${strings.examplesHeading}</h3>

${examplesPlaceholder}
`;
}

async function askCategory() {
  while (true) {
    const answer = (await rl.question('Category [s = scientific-computing, v = visualisation]: ')).trim().toLowerCase();
    if (CATEGORY_CHOICES[answer]) {
      return CATEGORY_CHOICES[answer];
    }
    console.log('Please choose either "s" or "v".');
  }
}

async function extractWeight(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const match = content.match(/weight:\s*(\d+)/);
    if (match) {
      return Number.parseInt(match[1], 10);
    }
  } catch {
    // ignore read errors
  }
  return null;
}

async function highestWeightInCategory(category, locales) {
  let maxWeight = 0;
  for (const locale of locales) {
    const dir = path.join(process.cwd(), 'content', locale, 'codes', category);
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || path.extname(entry.name) !== '.md' || entry.name.startsWith('_')) {
          continue;
        }
        const weight = await extractWeight(path.join(dir, entry.name));
        if (typeof weight === 'number' && weight > maxWeight) {
          maxWeight = weight;
        }
      }
    } catch {
      // ignore missing directories
    }
  }
  return maxWeight;
}

async function modifyFile(filePath, changeLog, updateFn) {
  let content;
  try {
    content = await readFile(filePath, 'utf8');
  } catch {
    return false;
  }
  const updated = updateFn(content);
  if (updated == null || updated === content) {
    return false;
  }
  await writeFile(filePath, updated, 'utf8');
  recordModification(changeLog, path.relative(process.cwd(), filePath), content);
  return true;
}

function buildAnchor(href, iconClass, linkTitle) {
  return `<a href="${href}"><i class="${iconClass}"></i>${linkTitle}</a>`;
}

function buildTableRow(locale, category, anchor) {
  const firstColumnClass = TABLE_FIRST_COLUMN_CLASS[locale] || '';
  if (category === 'scientific-computing') {
    const firstCell = `<td${firstColumnClass}>${anchor}</td>`;
    return [
      '        <tr>',
      `            ${firstCell}`,
      '            <td></td>',
      '        </tr>',
    ].join('\n');
  }
  const firstCell = `<td${firstColumnClass}></td>`;
  const secondCell = `<td>${anchor}</td>`;
  return [
    '        <tr>',
    `            ${firstCell}`,
    `            ${secondCell}`,
    '        </tr>',
  ].join('\n');
}

function insertRowIntoTable(content, locale, data, newRow, anchor) {
  const otherCategory = data.category === 'scientific-computing' ? 'visualisation' : 'scientific-computing';
  const currentCount = countCategoryEntries(content, locale, data.category);
  const otherCount = countCategoryEntries(content, locale, otherCategory);
  if (currentCount < otherCount) {
    const filled = fillExistingRow(content, locale, data, anchor);
    if (filled) {
      return filled;
    }
  }
  if (currentCount > otherCount) {
    return insertRowAtEnd(content, newRow);
  }
  const inserted = insertRowAfterLastCategory(content, locale, data.category, newRow);
  return inserted || insertRowAtEnd(content, newRow);
}

function insertRowAtEnd(content, newRow) {
  const marker = '\n    </tbody>';
  const index = content.indexOf(marker);
  if (index === -1) {
    return content;
  }
  return `${content.slice(0, index)}\n${newRow}\n${content.slice(index)}`;
}

function insertRowAfterLastCategory(content, locale, category, newRow) {
  const localePrefix = LOCALE_LINK_PREFIX[locale] ?? '';
  const baseHref = `${localePrefix}/codes/${category}/`;
  const lastIndex = content.lastIndexOf(baseHref);
  if (lastIndex === -1) {
    return null;
  }
  const closingIndex = content.indexOf('</tr>', lastIndex);
  if (closingIndex === -1) {
    return null;
  }
  const insertPosition = closingIndex + '</tr>'.length;
  return `${content.slice(0, insertPosition)}\n${newRow}\n${content.slice(insertPosition)}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function countCategoryEntries(content, locale, category) {
  const localePrefix = LOCALE_LINK_PREFIX[locale] ?? '';
  const hrefPrefix = `href="${localePrefix}/codes/${category}/`;
  const regex = new RegExp(escapeRegExp(hrefPrefix), 'g');
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

function getTableRows(content) {
  const rowRegex = /(\s*<tr>[\s\S]*?<\/tr>)/g;
  const rows = [];
  let match;
  while ((match = rowRegex.exec(content)) !== null) {
    rows.push({
      text: match[1],
      start: match.index,
      end: rowRegex.lastIndex,
    });
  }
  return rows;
}

function replaceCellContent(rowText, cellIndex, newContent) {
  const cellRegex = /<td[^>]*>[\s\S]*?<\/td>/g;
  const cells = [];
  let match;
  while ((match = cellRegex.exec(rowText)) !== null) {
    cells.push({
      start: match.index,
      end: cellRegex.lastIndex,
      text: match[0],
    });
  }
  const cell = cells[cellIndex];
  if (!cell) {
    return null;
  }
  const openTagMatch = cell.text.match(/^<td[^>]*>/);
  const openTag = openTagMatch ? openTagMatch[0] : '<td>';
  const closeTag = '</td>';
  const newCell = `${openTag}${newContent}${closeTag}`;
  return rowText.slice(0, cell.start) + newCell + rowText.slice(cell.end);
}

function cellIsEmpty(cellText) {
  const inner = cellText.replace(/^<td[^>]*>/, '').replace(/<\/td>\s*$/, '').trim();
  return inner.length === 0;
}

function fillExistingRow(content, locale, data, anchor) {
  const localePrefix = LOCALE_LINK_PREFIX[locale] ?? '';
  const categoryPrefix = `${localePrefix}/codes/${data.category}/`;
  const rows = getTableRows(content);
  let lastIndex = -1;
  rows.forEach((row, index) => {
    if (row.text.includes(categoryPrefix)) {
      lastIndex = index;
    }
  });
  if (lastIndex === -1) {
    return null;
  }
  const targetColumn = data.category === 'scientific-computing' ? 0 : 1;
  for (let i = lastIndex + 1; i < rows.length; i += 1) {
    const row = rows[i];
    const cellRegex = /<td[^>]*>[\s\S]*?<\/td>/g;
    const cells = row.text.match(cellRegex);
    if (!cells || !cells[targetColumn]) {
      continue;
    }
    if (!cellIsEmpty(cells[targetColumn])) {
      continue;
    }
    const updatedRow = replaceCellContent(row.text, targetColumn, anchor);
    if (!updatedRow) {
      return null;
    }
    return content.slice(0, row.start) + updatedRow + content.slice(row.end);
  }
  return null;
}

function getHighestNumericOption(content, suffix) {
  const regex = new RegExp(`option(\\d+)${suffix}`, 'g');
  let match;
  let max = 0;
  while ((match = regex.exec(content)) !== null) {
    const value = Number.parseInt(match[1], 10);
    if (!Number.isNaN(value) && value > max) {
      max = value;
    }
  }
  return max;
}

function getHighestLetterOption(content, suffix) {
  const regex = new RegExp(`option([a-z])${suffix}`, 'g');
  let match;
  let maxCode = 96; // before 'a'
  while ((match = regex.exec(content)) !== null) {
    const code = match[1].charCodeAt(0);
    if (code > maxCode) {
      maxCode = code;
    }
  }
  return maxCode;
}

function insertOptionInOccurrence(content, label, snippet, occurrenceIndex) {
  const labelTag = `<optgroup label="${label}">`;
  let searchStart = 0;
  let location = -1;
  for (let count = 0; count < occurrenceIndex; count += 1) {
    location = content.indexOf(labelTag, searchStart);
    if (location === -1) {
      return content;
    }
    searchStart = location + labelTag.length;
  }
  const closingIndex = content.indexOf('</optgroup>', searchStart);
  if (closingIndex === -1) {
    return content;
  }
  return `${content.slice(0, closingIndex)}${snippet}${content.slice(closingIndex)}`;
}

function insertBeforeMarker(content, marker, block) {
  const index = content.indexOf(marker);
  if (index === -1) {
    return content;
  }
  return `${content.slice(0, index)}${block}${content.slice(index)}`;
}

function insertBeforeSmallVisualSelect(content, block) {
  const smallSectionStart = content.indexOf('<div class="container-pulls-small">');
  if (smallSectionStart === -1) {
    return content;
  }
  const marker =
    '<div class="col-6 col-diamond container-select container-select-2 container-rtl" align="right">';
  const markerIndex = content.indexOf(marker, smallSectionStart);
  if (markerIndex === -1) {
    return content;
  }
  return `${content.slice(0, markerIndex)}${block}${content.slice(markerIndex)}`;
}

function insertBeforeLargeContainerClose(content, block) {
  const marker = '\n\n</div>\n\n<div class="container-pulls-small">';
  const index = content.indexOf(marker);
  if (index === -1) {
    return content;
  }
  return `${content.slice(0, index)}${block}${content.slice(index)}`;
}

function insertBeforeSmallContainerClose(content, block) {
  const marker = '</div>';
  const index = content.lastIndexOf(marker);
  if (index === -1) {
    return content;
  }
  return `${content.slice(0, index)}${block}${content.slice(index)}`;
}

async function updateCodesTable(locale, data, changeLog) {
  const part2Path = path.join(
    process.cwd(),
    'content',
    locale,
    'codes',
    'start-here',
    'home',
    'part-2.md',
  );
  const localePrefix = LOCALE_LINK_PREFIX[locale] ?? '';
  const href = `${localePrefix}/codes/${data.category}/${data.slug}/`;
  const anchor = buildAnchor(href, `icon-${data.slug}`, data.linkTitle);
  const newRow = buildTableRow(locale, data.category, anchor);
  await modifyFile(part2Path, changeLog, (content) => {
    if (content.includes(href)) {
      return content;
    }
    return insertRowIntoTable(content, locale, data, newRow, anchor);
  });
}

function buildScientificBlocks(index, command) {
  return {
    large: `<div id="content-option${index}A" class="hidden">\n\n\`\`\`bash\n${command}\n\`\`\`\n\n</div>\n\n`,
    small: `<div id="content-option${index}B" style="margin-top: -1rem;" class="hidden">\n\n\`\`\`bash\n${command}\n\`\`\`\n\n</div>\n\n`,
  };
}

function buildVisualBlocks(letter, command) {
  return {
    large: `\n<div id="content-option${letter}A" class="hidden">\n\n\`\`\`bash\n${command}\n\`\`\`\n\n</div>`,
    small: `<div id="content-option${letter}B" class="hidden">\n\n\`\`\`bash\n${command}\n\`\`\`\n\n</div>\n\n`,
  };
}

function buildVisualOptionSnippets(letter, linkTitle) {
  return {
    large: `    <option value="option${letter}A">${linkTitle}</option>\n            `,
    small: `    <option value="option${letter}B">${linkTitle}</option>\n        `,
  };
}

function updateScientificPart3(content, locale, data) {
  if (content.includes(data.apptainerCommand)) {
    return content;
  }
  const label = OPTGROUP_LABELS[locale]?.['scientific-computing'] ?? 'Scientific Computing';
  const highestIndex = Math.max(
    getHighestNumericOption(content, 'A'),
    getHighestNumericOption(content, 'B'),
  );
  const newIndex = highestIndex + 1 || 1;
  const optionSnippets = {
    large: `    <option value="option${newIndex}A">${data.linkTitle}</option>\n            `,
    small: `    <option value="option${newIndex}B">${data.linkTitle}</option>\n        `,
  };
  const blocks = buildScientificBlocks(newIndex, data.apptainerCommand);

  let updated = insertOptionInOccurrence(content, label, optionSnippets.large, 1);
  updated = insertOptionInOccurrence(updated, label, optionSnippets.small, 2);
  updated = insertBeforeMarker(updated, '<div id="content-optionaA"', blocks.large);
  updated = insertBeforeSmallVisualSelect(updated, blocks.small);
  return updated;
}

function updateVisualPart3(content, locale, data) {
  if (content.includes(data.apptainerCommand)) {
    return content;
  }
  const label = OPTGROUP_LABELS[locale]?.visualisation ?? 'Visualisation';
  const highestLetter = Math.max(
    getHighestLetterOption(content, 'A'),
    getHighestLetterOption(content, 'B'),
  );
  const nextCode = Math.max(highestLetter, 96) + 1;
  const letter = String.fromCharCode(nextCode);
  const optionSnippets = buildVisualOptionSnippets(letter, data.linkTitle);
  const blocks = buildVisualBlocks(letter, data.apptainerCommand);

  let updated = insertOptionInOccurrence(content, label, optionSnippets.large, 1);
  updated = insertOptionInOccurrence(updated, label, optionSnippets.small, 2);
  updated = insertBeforeLargeContainerClose(updated, blocks.large);
  updated = insertBeforeSmallContainerClose(updated, blocks.small);
  return updated;
}

async function updateApptainerSelects(locale, data, changeLog) {
  const part3Path = path.join(
    process.cwd(),
    'content',
    locale,
    'codes',
    'start-here',
    'home',
    'part-3.md',
  );
  await modifyFile(part3Path, changeLog, (content) => {
    if (data.category === 'scientific-computing') {
      return updateScientificPart3(content, locale, data);
    }
    return updateVisualPart3(content, locale, data);
  });
}

async function readLastRunLog() {
  try {
    const content = await readFile(LAST_RUN_LOG, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function saveLastRunLog(changeLog) {
  const payload = {
    createdAt: new Date().toISOString(),
    createdFiles: changeLog.createdFiles,
    modifiedFiles: changeLog.modifiedFiles,
  };
  await writeFile(LAST_RUN_LOG, JSON.stringify(payload, null, 2), 'utf8');
}

async function clearLastRunLog() {
  try {
    await unlink(LAST_RUN_LOG);
  } catch {
    // ignore missing file
  }
}

async function undoLastRun() {
  const lastRun = await readLastRunLog();
  const createdFiles = Array.isArray(lastRun?.createdFiles)
    ? lastRun.createdFiles
    : Array.isArray(lastRun?.files)
      ? lastRun.files
      : [];
  const modifiedFiles = Array.isArray(lastRun?.modifiedFiles) ? lastRun.modifiedFiles : [];
  if (!createdFiles.length && !modifiedFiles.length) {
    console.log('No previous code generation run to cancel.');
    return;
  }

  let removedCount = 0;
  for (const relativePath of createdFiles) {
    const absolutePath = path.join(process.cwd(), relativePath);
    try {
      await unlink(absolutePath);
      removedCount += 1;
      console.log(`Removed ${relativePath}`);
    } catch {
      console.log(`Could not remove ${relativePath} (already missing or inaccessible).`);
    }
  }

  let restoredCount = 0;
  for (const entry of modifiedFiles) {
    if (!entry?.path) {
      continue;
    }
    const absolutePath = path.join(process.cwd(), entry.path);
    try {
      await writeFile(absolutePath, entry.previousContent ?? '', 'utf8');
      restoredCount += 1;
      console.log(`Restored ${entry.path}`);
    } catch {
      console.log(`Could not restore ${entry.path}. Please check manually.`);
    }
  }

  await clearLastRunLog();

  console.log(
    `\nCancelled last generation. ${removedCount} new file(s) removed, ${restoredCount} file(s) restored.`,
  );
}

async function main() {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => UNDO_FLAGS.has(arg))) {
      await undoLastRun();
      return;
    }

    console.log('DIAMOND – New code page generator\n');

    const locales = TARGET_LOCALES;
    console.log(`Pages will be created in both languages: ${locales.join(', ')}`);

    const categories = await existingCategories();
    if (!categories.length) {
      console.log('No existing categories detected, defaulting to scientific-computing/visualisation choices.');
    }
    const category = await askCategory();

    const codeTitle = await ask('Code name');
    if (!codeTitle) {
      throw new Error('Code name is required.');
    }
    const defaultSlug = slugify(codeTitle);
    if (!defaultSlug) {
      throw new Error('Unable to derive a slug from the code name.');
    }
    const slug = defaultSlug;
    const linkTitle = codeTitle;

    const highestWeight = await highestWeightInCategory(category, locales);
    const weight = highestWeight + 1 || 1;

    let officialWebsite = await ask('Official website URL (optional but recommended)');
    officialWebsite = ensureUrl(officialWebsite);
    let documentationUrl = await ask('Documentation URL (optional but recommended)');
    documentationUrl = ensureUrl(documentationUrl);

    const apptainerFilename = `${slug}.sif`;
    let registryFilename = await ask('Apptainer filename in container registry (without \'.sif\' extension)', slug);
    if (!registryFilename) {
      registryFilename = slug;
    }
    if (!registryFilename.toLowerCase().endsWith('.sif')) {
      registryFilename = `${registryFilename}.sif`;
    }
    const apptainerRegistryReference = `${DEFAULT_REGISTRY_PREFIX}/${registryFilename}:latest`;
    const apptainerCommand = `apptainer pull ${apptainerFilename} ${apptainerRegistryReference}`;

    const descriptions = {};
    for (const locale of locales) {
      const strings = LOCALE_STRINGS[locale];
      descriptions[locale] = await askMultiline(`[${strings.label}] Description/overview of the code`);
    }

    const baseData = {
      title: codeTitle,
      linkTitle,
      weight,
      category,
      slug,
      officialWebsite,
      documentationUrl,
      apptainerCommand,
      descriptions,
    };

    const changeLog = { createdFiles: [], modifiedFiles: [] };
    const generatedFiles = [];
    const localesWithFiles = new Set();

    for (const locale of locales) {
      const dir = path.join(process.cwd(), 'content', locale, 'codes', category);
      await mkdir(dir, { recursive: true });
      const filePath = path.join(dir, `${slug}.md`);
      const relativePath = path.relative(process.cwd(), filePath);
      let previousContent = '';
      const existsAlready = await fileExists(filePath);
      if (existsAlready) {
        const overwrite = await askYesNo(`File ${relativePath} exists. Overwrite?`, false);
        if (!overwrite) {
          console.log(`Skipping ${filePath}`);
          continue;
        }
        previousContent = await readFile(filePath, 'utf8');
      }
      const fileBody = buildPage(locale, baseData);
      await writeFile(filePath, fileBody.trim() + '\n', 'utf8');
      generatedFiles.push(relativePath);
      localesWithFiles.add(locale);
      if (existsAlready) {
        recordModification(changeLog, relativePath, previousContent);
      } else {
        recordCreation(changeLog, relativePath);
      }
    }

    if (!generatedFiles.length) {
      console.log('\nNo files were created.');
      return;
    }

    for (const locale of localesWithFiles) {
      await updateCodesTable(locale, baseData, changeLog);
      await updateApptainerSelects(locale, baseData, changeLog);
    }

    if (!changeLog.createdFiles.length && !changeLog.modifiedFiles.length) {
      console.log('\nNo changes were recorded.');
      return;
    }

    await saveLastRunLog(changeLog);

    console.log('\nGenerated files:');
    generatedFiles.forEach((file) => console.log(`- ${file}`));
    if (changeLog.modifiedFiles.length) {
      console.log('\nUpdated files:');
      changeLog.modifiedFiles.forEach((entry) => console.log(`- ${entry.path}`));
    }
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exitCode = 1;
});
