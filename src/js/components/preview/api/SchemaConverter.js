const traverseObject = (object) => {

	const output = {};

	if (object.hasOwnProperty('properties')) {
		Object.keys(object.properties).forEach((key) => {
			const property = object.properties[key];
			const type = property.type;
			if (type == "object") {
				output[key] = traverseObject(property);
			}
			else if (type == "array") {
				output[key] = traverseArray(property);
			}
			else {
				output[key] = property;
			}
		});
	}
	else {
		output.unparsed = {
			note: "Could not parse Swagger Schema",
			original: object
		};


	}

	return output;
}
const traverseArray = (array) => {
	const output = [];

	
	if (Array.isArray(array.items)) {
		array.items.forEach((item) => {
			output.push(traverseObject(item));
		});
	}
	else {
		output.push(traverseObject(array.items));
	}

	return output;
}

const handleItem = (item) => {
	let output = {};
	if (item.type == "array") {
		output = [];
		output.push(traverseObject(item.items));
	}
	else {

	}
}

export const convertSchema = (schema) => {
	let output;
	if (schema.type == "array") {
		output = traverseArray(schema);
	}
	else {
		output = traverseObject(schema);
	}

	return output;

}