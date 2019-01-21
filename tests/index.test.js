import curryNamed, { ParamTypes } from '../src';

describe('curryNamed', () => {
  let fn;
  const originalFn = jest.fn();

  beforeEach(() => {
    originalFn.mockClear();
    fn = curryNamed(originalFn);
  });

  it('gets its name from the original function', () => {
    expect(fn.name).toEqual(`curryNamed(${originalFn.name})`);
  });

  it('executes function with 2 params passed at once', () => {
    originalFn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    fn({ a: 1, b: 2 });

    expect(originalFn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it('executes function with 2 params passed at two different points', () => {
    originalFn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    fn({ a: 1 })({ b: 2 });

    expect(originalFn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it('executes function with the required params specified in the curried function', () => {
    fn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    fn({ a: 1 })({ b: 2 });

    expect(originalFn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it('executes function when all required params are passed', () => {
    originalFn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    const fn2 = fn({ a: 1 });

    expect(originalFn).not.toHaveBeenCalled();

    const fn3 = fn2({ c: 3 });

    expect(originalFn).not.toHaveBeenCalled();

    fn3({ b: 2 });

    expect(originalFn).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
  });

  it('executes function when 3 params are passed at two different points (1 + 2)', () => {
    originalFn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
      c: ParamTypes.isRequired,
    };

    fn({ a: 1 })({ b: 2, c: 3 });

    expect(originalFn).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
  });

  it('executes function when 3 params are passed at two different points (2 + 1)', () => {
    originalFn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
      c: ParamTypes.isRequired,
    };

    fn({ a: 1, b: 2 })({ c: 3 });

    expect(originalFn).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
  });
});
