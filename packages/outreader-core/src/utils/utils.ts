/**
 * @description check a object if all keys has a value
 */
export function checkObjectKeysIfAllExtracted<T>(obj: T): boolean {
  let allExtracted = true;
  Object.keys(obj).forEach((key: keyof T | string) => {
    if (key === 'allExtracted' || allExtracted === false) {
      return;
    }
    allExtracted = Boolean(obj[key as keyof T]);
  });

  return allExtracted;
}

/**
 * @description applyMixins, https://www.typescriptlang.org/docs/handbook/mixins.html
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!,
      );
    });
  });
}
