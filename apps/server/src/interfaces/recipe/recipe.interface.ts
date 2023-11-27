export interface RecipeInterface {
	id?: number;
	user_id: number;
	title: string;
	description: string;
	cooking_time: number | null; // in minutes
	steps?: string | null; // an array in json stringified
	servings?: number | null;
	equipment_needed?: string | null; // an array in json stringified
	authors_notes?: string | null;
	youtube_link?: string | null;
	ingredients?: string | null; // an array in json stringified
	spices?: string | null; // an array in json stringified
	end_date?: Date | null;
}
