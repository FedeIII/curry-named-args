const isRequiredParamPassed = (params, [paramName, paramType]) =>
  paramType !== ParamTypes.isRequired || params.hasOwnProperty(paramName);

const areRequiredParamsPassed = (fn, params) =>
  Object.entries(fn.paramTypes).reduce(
    (areRequiredPresent, paramEntry) =>
      areRequiredPresent && isRequiredParamPassed(params, paramEntry),
    true
  );

export default function namedPartial(fn) {
  let params = {};

  function namedPartialFn(newParams) {
    params = { ...params, ...newParams };

    if (areRequiredParamsPassed(namedPartialFn, params)) {
      return fn(params);
    }

    return namedPartialFn;
  }

  Object.defineProperty(namedPartialFn, "name", {
    value: `namedPartial(${fn.name})`
  });

  return namedPartialFn;
}

export const ParamTypes = {
  isRequired: "ParamTypes_REQUIRED"
};
