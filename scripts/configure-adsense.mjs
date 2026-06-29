import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const clientPattern = /^ca-pub-\d+$/;
const slotPattern = /^\d+$/;
const outDir = path.resolve('public');

const slotFlags = {
  '--home-top': 'homeTop',
  '--tool-top': 'toolTop',
  '--article-inline': 'articleInline',
  '--article-bottom': 'articleBottom',
  '--side-left': 'sideLeft',
  '--side-right': 'sideRight',
};

function readArgs(argv) {
  const result = {
    client: '',
    autoAds: true,
    slots: {
      homeTop: '',
      toolTop: '',
      articleInline: '',
      articleBottom: '',
      sideLeft: '',
      sideRight: '',
    },
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--client') {
      result.client = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--manual-only') {
      result.autoAds = false;
    } else if (arg in slotFlags) {
      result.slots[slotFlags[arg]] = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--help') {
      result.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return result;
}

function usage() {
  return `Usage:
  node scripts/configure-adsense.mjs --client ca-pub-0000000000000000
  node scripts/configure-adsense.mjs --client ca-pub-0000000000000000 --tool-top 1234567890 --article-inline 2345678901 --side-left 3456789012 --side-right 4567890123

Options:
  --manual-only            Do not enable AdSense Auto ads.
  --home-top <slot>        Home page top ad unit.
  --tool-top <slot>        Tool detail page ad unit.
  --article-inline <slot>  Guide article inline ad unit.
  --article-bottom <slot>  Guide index/bottom ad unit.
  --side-left <slot>       Wide desktop left rail ad unit.
  --side-right <slot>      Wide desktop right rail ad unit.`;
}

function validate({ client, slots }) {
  if (!clientPattern.test(client)) {
    throw new Error('AdSense client must look like ca-pub-0000000000000000');
  }

  for (const [name, value] of Object.entries(slots)) {
    if (value !== '' && !slotPattern.test(value)) {
      throw new Error(`${name} slot must contain digits only.`);
    }
  }
}

async function main() {
  const args = readArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  validate(args);

  const config = {
    adsense: {
      enabled: true,
      client: args.client,
      autoAds: {
        enabled: args.autoAds,
      },
      slots: args.slots,
    },
    placeholder: {
      label: '광고',
      title: 'Google AdSense 광고 영역',
      description: 'AdSense 승인 후 실제 광고가 표시됩니다.',
      sideTitle: 'AdSense 광고',
      sideDescription: '승인 후 표시됩니다.',
    },
  };

  await writeFile(path.join(outDir, 'ads-config.json'), `${JSON.stringify(config, null, 2)}\n`);
  await writeFile(path.join(outDir, 'ads.txt'), `google.com, ${args.client.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);

  console.log('Updated public/ads-config.json and public/ads.txt');
}

main().catch((error) => {
  console.error(error.message);
  console.error(usage());
  process.exitCode = 1;
});
