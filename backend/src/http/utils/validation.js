export function configureValidation(req, res, next) {
  /**
   *
   * @param {import('@vinejs/vine').VineValidator} validator
   * @returns
   */
  req.validate = async function (validator) {
    const data = await validator.validate(req.body);
    return data;
  };

  next();
}
