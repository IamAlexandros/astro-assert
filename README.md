# `astro-assert` - Proper Assertions for [Astro](https://github.com/withastro/astro) Endpoints

`astro-assert` provides an easy and effective way to assert conditions within your Astro API routes, ensuring that your endpoints handle errors gracefully and return the correct HTTP responses. This package streamlines error handling and validation, allowing you to focus on building your Astro project with confidence.

## Installation (Choose your package manager)
```bash
npm install astro-assert
```
```bash
bun install astro-assert
```
```bash
pnpm install astro-assert
```
```bash
yarn add astro-assert
```

## Usage

### Example: Basic API Route

#### Without `astro-assert`:
```typescript
export const GET: APIRoute = ({ params, request }) => {
  return new Response(JSON.stringify({
      message: "This was a GET!"
    })
  )
}
```
#### With `astro-assert`:
```typescript
import { AssertAPIRoute, astroApiAssert } from 'astro-assert';

export const GET: APIRoute = async ({ request, params }) => AssertAPIRoute(async () => {
    let aCoolParam = params.a_cool_param;

    // Default Response("Something went wrong", 400)
    astroApiAssert(aCoolParam);

    // Or provide a custom error message and status code
    astroApiAssert(aCoolParam, "aCoolParam not found", 404);

    return new Response(JSON.stringify({
        message: "This was a GET!"
    });
});
```

## API

### `AssertAPIRoute(callback: Function)`

Wrap your API route logic within this function to ensure that assertions are checked before proceeding. If any assertion fails, an appropriate response is automatically returned.

### `astroApiAssert(value: any, message: string = "Something went wrong", statusCode: number = 400)`

Asserts that the given value is truthy. If not, it throws a response with the provided message and status code.

#### Parameters:
- `value` (`any`): The value to assert.
- `message` (`string`): The error message to return if the assertion fails (default: "Something went wrong").
- `statusCode` (`number`): The HTTP status code to return if the assertion fails (default: 400).

## Why Use `astro-assert`?

- **Simplified Error Handling**: Easily manage assertions and error responses in your Astro API routes.
- **Customizable Responses**: Control the error message and status code, making it adaptable to various use cases.
- **Streamlined Code**: Keep your API logic clean and focused by reducing boilerplate error handling code.

## Contributing

Feel free to open issues and pull requests to help improve the package. Contributions are always welcome!

## License

MIT License. See the [LICENSE](LICENSE) file for more information.
