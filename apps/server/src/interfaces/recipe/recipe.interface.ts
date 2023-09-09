export interface RecipeInterface {
	id: number;
	title: string;
	description: string;
	cooking_time: number; // in minutes
	servings: number;
	equipment_needed: string; // an array in json stringified
	authors_notes: string | null;
	youtube_link: string | null;
	ingredients: string; // an array in json stringified
	spices: string | null; // an array in json stringified
}
