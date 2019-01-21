const getParamTypes = (originalFn, curryNamedFn) =>
  originalFn.paramTypes || curryNamedFn.paramTypes;

const isRequiredParamPassed = (params, [paramName, paramType]) =>
  paramType !== ParamTypes.isRequired || params.hasOwnProperty(paramName);

const areRequiredParamsPassed = (params, paramTypes) =>
  Object.entries(paramTypes).reduce(
    (areRequiredPresent, paramEntry) =>
      areRequiredPresent && isRequiredParamPassed(params, paramEntry),
    true,
  );

export default function curryNamed(originalFn) {
  let params = {};

  function curryNamedFn(newParams) {
    params = { ...params, ...newParams };
    const paramTypes = getParamTypes(originalFn, curryNamedFn);

    if (areRequiredParamsPassed(params, paramTypes)) {
      return originalFn(params);
    }

    return curryNamedFn;
  }

  Object.defineProperty(curryNamedFn, 'name', {
    value: `curryNamed(${originalFn.name})`,
  });

  return curryNamedFn;
}

export const ParamTypes = {
  isRequired: 'ParamTypes_REQUIRED',
};
