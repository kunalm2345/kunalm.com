import fs from 'fs';
import path from 'path';

export async function load() {
	const filePath = path.resolve('static/journal.json');
	const rawData = fs.readFileSync(filePath, 'utf-8');
	const data = JSON.parse(rawData);

	// Extract the last 10 entries
	const last10Entries = data.entries.reverse().slice(-10);
	return {
		entries: last10Entries
	};
}
