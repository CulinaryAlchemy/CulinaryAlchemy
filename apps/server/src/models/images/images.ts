import { DataTypes, Model } from 'sequelize';
import { ImageInterface } from '../../interfaces/image/image.interface';
import { sequelize } from '../../database/database.connection';

class Image extends Model<ImageInterface> implements ImageInterface {
	id!: number;
	owner_id!: number;
	default_url!: string;
	blur_url!: string;
}
Image.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		default_url: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true,
			},
			allowNull: false,
		},
		blur_url: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true,
			},
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Images',
	}
);
export { Image };
