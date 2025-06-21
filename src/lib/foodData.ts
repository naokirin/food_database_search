import type { Food } from './types.js';

export async function loadFoodData(): Promise<Food[]> {
	const response = await fetch('./food_database.csv');
	const csvText = await response.text();

	const lines = csvText.split('\n');
	const foods: Food[] = [];

	for (let i = 3; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;

		const columns = line.split(',');
		if (columns.length < 5) continue;

		const name = columns[0];
		const energy = parseFloat(columns[1]) || 0;
		const protein = parseFloat(columns[2]) || 0;
		const fat = parseFloat(columns[3]) || 0;
		const carbohydrate = parseFloat(columns[4]) || 0;

		if (name) {
			foods.push({
				name,
				energy,
				protein,
				fat,
				carbohydrate
			});
		}
	}

	return foods;
}

export function searchFoods(foods: Food[], query: string): Food[] {
	if (!query.trim()) return [];

	const searchTerm = query.toLowerCase();
	return foods.filter(food =>
		food.name.toLowerCase().includes(searchTerm)
	);
}