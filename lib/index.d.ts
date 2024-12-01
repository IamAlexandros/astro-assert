import assert from 'assert';
export declare function astroApiAssert(condition: Parameters<typeof assert>[0], message?: string, code?: number): asserts condition;
export declare function AssertAPIRoute(fn: () => Promise<any>): Promise<any>;
