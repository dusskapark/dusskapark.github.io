const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../jekyll-backup/_projects');
const outputDir = path.join(__dirname, '../content/projects');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper function to convert Liquid includes to MDX components
function convertToMDX(content) {
  let mdx = content;

  // Remove Jekyll options
  mdx = mdx.replace(/\{::options parse_block_html="(true|false)" \/\}/g, '');

  // Convert gallery includes
  mdx = mdx.replace(
    /\{% include post-components\/gallery\.html\s*([\s\S]*?)\s*%\}/g,
    (match, params) => {
      const props = {};

      // Extract parameters
      params.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && trimmed.includes('=')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').trim();
          const cleanKey = key.trim().replace(/-/g, '_');

          if (cleanKey === 'columns') {
            props.columns = value;
          } else if (cleanKey === 'full_width') {
            props.fullWidth = value === 'true';
          } else if (cleanKey === 'images') {
            const images = value.replace(/^["']|["']$/g, '');
            if (images.includes(',')) {
              const imageArray = images.split(',').map(img => `"${img.trim()}"`).join(', ');
              props.images = `{[${imageArray}]}`;
            } else {
              props.images = `"${images}"`;
            }
          } else if (cleanKey === 'caption') {
            props.caption = value.replace(/^["']|["']$/g, '');
          }
        }
      });

      const propsString = Object.entries(props)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return `${key}={${value}}`;
          } else if (key === 'images' && value.startsWith('{')) {
            return `${key}=${value}`;
          } else if (key === 'columns') {
            return `${key}={${value}}`;
          } else {
            return `${key}="${value}"`;
          }
        })
        .join('\n  ');

      return `<Gallery\n  ${propsString}\n/>`;
    }
  );

  // Convert quote includes
  mdx = mdx.replace(
    /\{% include post-components\/quote\.html\s*([\s\S]*?)\s*%\}/g,
    (match, params) => {
      const props = {};

      params.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && trimmed.includes('=')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').trim();
          const cleanKey = key.trim().replace(/-/g, '_');

          if (cleanKey === 'full_width') {
            props.fullWidth = value === 'true';
          } else if (cleanKey === 'background_color') {
            props.backgroundColor = value.replace(/^["']|["']$/g, '');
          } else if (cleanKey === 'font_color') {
            props.fontColor = value.replace(/^["']|["']$/g, '');
          } else if (cleanKey === 'images') {
            props.images = value.replace(/^["']|["']$/g, '');
          } else if (cleanKey === 'text') {
            props.text = value.replace(/^["']|["']$/g, '');
          } else if (cleanKey === 'caption') {
            props.caption = value.replace(/^["']|["']$/g, '');
          }
        }
      });

      const propsString = Object.entries(props)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return `${key}={${value}}`;
          } else if (key === 'text') {
            return `${key}="${value.replace(/"/g, '&quot;')}"`;
          } else {
            return `${key}="${value}"`;
          }
        })
        .join('\n  ');

      return `<Quote\n  ${propsString}\n/>`;
    }
  );

  // Convert video includes
  mdx = mdx.replace(
    /\{% include post-components\/video\.html\s*([\s\S]*?)\s*%\}/g,
    (match, params) => {
      const props = {};

      params.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && trimmed.includes('=')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').trim();
          const cleanKey = key.trim().replace(/-/g, '_');

          if (cleanKey === 'url') {
            props.url = value.replace(/^["']|["']$/g, '');
          } else if (cleanKey === 'full_width') {
            props.fullWidth = value === 'true';
          } else if (cleanKey === 'caption') {
            props.caption = value.replace(/^["']|["']$/g, '');
          }
        }
      });

      const propsString = Object.entries(props)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return `${key}={${value}}`;
          } else {
            return `${key}="${value}"`;
          }
        })
        .join('\n  ');

      return `<Video\n  ${propsString}\n/>`;
    }
  );

  // Fix image paths
  mdx = mdx.replace(/\.\.\//g, '/');

  return mdx;
}

// Process all markdown files
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md') && f !== 'test.md');

console.log(`Found ${files.length} project files to convert...`);

files.forEach(file => {
  const inputPath = path.join(projectsDir, file);
  const content = fs.readFileSync(inputPath, 'utf8');

  // Extract frontmatter and content
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    console.log(`Skipping ${file}: No frontmatter found`);
    return;
  }

  const [, frontmatter, body] = match;

  // Convert frontmatter
  let newFrontmatter = frontmatter;
  newFrontmatter = newFrontmatter.replace(/featured_image: "(.+?)"/g, 'featured_image: "/images/projects/$1"');
  newFrontmatter = newFrontmatter.replace(/gallery_images:/g, '# gallery_images:');
  newFrontmatter = newFrontmatter.replace(/visible:/g, '# visible:');

  // Convert body
  const mdxBody = convertToMDX(body);

  // Create output filename
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const outputPath = path.join(outputDir, `${slug}.mdx`);

  // Write MDX file
  const mdxContent = `---\n${newFrontmatter}\n---\n${mdxBody}`;
  fs.writeFileSync(outputPath, mdxContent, 'utf8');

  console.log(`✓ Converted ${file} → ${slug}.mdx`);
});

console.log(`\nConversion complete! ${files.length} files converted.`);
