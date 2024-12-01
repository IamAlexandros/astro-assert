import assert from 'assert'

class AstroAssertError extends Error {
	code: number;

	constructor(message: string, code: number) {
		super(message);
		this.name = "AstroAssertError";
		this.code = code;
		
		// Maintain proper stack trace (for V8 engines)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AstroAssertError);
		}
	}
}

export function astroApiAssert(condition: Parameters<typeof assert>[0], message?: string, code: number = 400)
: asserts condition {
	try {
		assert(condition);
	} catch (error) {
		throw new AstroAssertError(message || 'Something went wrong', code);
	}
}

export function AssertAPIRoute(fn: () => Promise<any>) {
	return fn().catch((error) => {
		if (error instanceof AstroAssertError) {
			return new Response(error.message, { status: error.code });
		} else {
			if (process.env.NODE_ENV === 'development') console.error('astro-assert', error); // Log the error for debugging
			return new Response('Internal Server Error', { status: 500 });
		}
	});
}