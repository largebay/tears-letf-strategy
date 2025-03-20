import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { FREDObservationData } from './src/types';
import { checkTriggers } from './src/tears_letf_strategy';

dotenv.config();

const FRED_API_KEY = process.env.FRED_API_KEY as string;

async function main() {
  try {
    // fetch data from St. Louis FRED API
    const data: FREDObservationData = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=BAMLH0A0HYM2&api_key=${FRED_API_KEY}&file_type=json`
    ).then(res => res.json() as Promise<FREDObservationData>);
    return checkTriggers(data);
  } catch (error) {
    console.error(error);
  }
}

const action = await main();

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tear's LETF Strategy</title>
  </head>
  <body>
    <h1>${action}</h1>
    <p>Last updated: ${new Date().toLocaleString()}</p>
  </body>
</html>
`;

const docsPath = path.dirname('docs/index.html');

if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath, { recursive: true });
}

fs.writeFileSync('docs/index.html', html);

console.log(`Generated docs/index.html with output: ${action}`);
