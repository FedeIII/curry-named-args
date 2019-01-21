const isRequiredParamPassed = (params, [paramName, paramType]) =>
  paramType !== ParamTypes.isRequired || params.hasOwnProperty(paramName);

const areRequiredParamsPassed = (fn, params) =>
  Object.entries(fn.paramTypes).reduce(
    (areRequiredPresent, paramEntry) =>
      areRequiredPresent && isRequiredParamPassed(params, paramEntry),
    true
  );

export default function curryNamed(fn) {
  let params = {};

  function curryNamedFn(newParams) {
    params = { ...params, ...newParams };

    if (areRequiredParamsPassed(curryNamedFn, params)) {
      return fn(params);
    }

    return curryNamedFn;
  }

  Object.defineProperty(curryNamedFn, "name", {
    value: `curryNamed(${fn.name})`
  });

  return curryNamedFn;
}

export const ParamTypes = {
  isRequired: "ParamTypes_REQUIRED"
};
