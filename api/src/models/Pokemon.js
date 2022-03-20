const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'pokemon',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				// type: DataTypes.INTEGER,
				// autoIncrement: true,
				// primaryKey: true,
				// get() {
				// 	const rawValue = this.getDataValue('id');
				// 	return 'DB' + rawValue;
				// },
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				isUnique: true,
			},
			attack: { type: DataTypes.INTEGER, defaultValue: null },
			hp: { type: DataTypes.INTEGER, defaultValue: null },
			defense: { type: DataTypes.INTEGER, defaultValue: null },
			speed: { type: DataTypes.INTEGER, defaultValue: null },
			height: { type: DataTypes.INTEGER, defaultValue: null },
			weight: { type: DataTypes.INTEGER, defaultValue: null },
			createdDb: { type: DataTypes.BOOLEAN, defaultValue: true },
			imgDesktop: { type: DataTypes.STRING, defaultValue: null },
			imgMobile: { type: DataTypes.STRING, defaultValue: null },
		},
		{ logging: false, timestamps: false }
	);
};
