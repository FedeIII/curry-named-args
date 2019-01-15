const isRequiredParamPassed = (params, [paramName, paramType]) =>
  paramType !== ParamTypes.isRequired || params.hasOwnProperty(paramName);

const areRequiredParamsPassed = (fn, params) =>
  Object.entries(fn.paramTypes).reduce(
    (areRequiredPresent, paramEntry) =>
      areRequiredPresent && isRequiredParamPassed(params, paramEntry),
    true
  );

export default function namedCurry(fn) {
  let params = {};

  function namedCurryFn(newParams) {
    params = { ...params, ...newParams };

    if (areRequiredParamsPassed(namedCurryFn, params)) {
      return fn(params);
    }

    return namedCurryFn;
  }

  Object.defineProperty(namedCurryFn, "name", {
    value: `namedCurry(${fn.name})`
  });

  return namedCurryFn;
}

export const ParamTypes = {
  isRequired: "ParamTypes_REQUIRED"
};
