import { readFileSync, writeFileSync } from 'fs';
import { RackServerUpdater } from './solution';
import { CollateUpdatedServers } from './collator';
import { join } from 'path';

const rack = JSON.parse(readFileSync('./mockdata/_randomMatrixGenerator_1000_1000.json', 'utf8'));
const initalUpdatedServers = new CollateUpdatedServers(rack).getUpdatedServers();
const rackInfo = new RackServerUpdater(rack, initalUpdatedServers).compute();
writeFileSync(join(process.cwd(), 'result.json'), JSON.stringify(rackInfo.matrix), 'utf8');

