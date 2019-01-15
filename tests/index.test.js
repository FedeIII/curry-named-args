import namedPartial, { ParamTypes } from '../src';

describe('namedPartial', () => {
  let fn;
  const testFn = jest.fn();

  beforeEach(() => {
    testFn.mockClear();
    fn = namedPartial(testFn);
  });

  it('gets its name from the original function', () => {
    expect(fn.name).toEqual(`namedPartial(${testFn.name})`);
  });

  it('executes function with 2 params passed at once', () => {
    fn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    fn({ a: 1, b: 2 });

    expect(testFn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it('executes function with 2 params passed at two different points', () => {
    fn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    fn({ a: 1 })({ b: 2 });

    expect(testFn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it('executes function when all required params are passed', () => {
    fn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
    };

    const fn2 = fn({ a: 1 });

    expect(testFn).not.toHaveBeenCalled();

    const fn3 = fn2({ c: 3 });

    expect(testFn).not.toHaveBeenCalled();

    fn3({ b: 2 });

    expect(testFn).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
  });

  it('executes function when 3 params are passed at two different points (1 + 2)', () => {
    fn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
      c: ParamTypes.isRequired,
    };

    fn({ a: 1 })({ b: 2, c: 3 });

    expect(testFn).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
  });

  it('executes function when 3 params are passed at two different points (2 + 1)', () => {
    fn.paramTypes = {
      a: ParamTypes.isRequired,
      b: ParamTypes.isRequired,
      c: ParamTypes.isRequired,
    };

    fn({ a: 1, b: 2 })({ c: 3 });

    expect(testFn).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
  });
});
