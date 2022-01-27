import yup from "i/yup.ts";

const validateOptions = {
  abortEarly: false,
};

export const validate = <T1, T2, T3>(
  data: T1,
  schema: yup.BaseSchema<T1, T2, T3>,
): Promise<T3> => {
  return schema.validate(data, validateOptions);
};
