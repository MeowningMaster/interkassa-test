import yup from "i/yup.ts";

const validateOptions = {
	abortEarly: false,
};

export const validate = async <T1, T2, T3>(data: T1, schema: yup.BaseSchema<T1, T2, T3>): T3 => {
	return await schema.validate(data, validateOptions);
};
