import { configure as configureTestingLibraryDom } from '@testing-library/dom';
import '@testing-library/jest-dom/jest-globals';
import failOnConsole from 'jest-fail-on-console';
import fetchMock from 'jest-fetch-mock';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

fetchMock.enableMocks();
global.Request = global.Request || fetchMock.Request;
global.Response = global.Response || fetchMock.Response;
global.Headers = global.Headers || fetchMock.Headers;

configureTestingLibraryDom({
    testIdAttribute: 'data-cmp',
});

failOnConsole({
    shouldFailOnError: true,
    shouldFailOnLog: false,
    shouldFailOnWarn: false,
    allowMessage: (errorMsg) => {
        const allowList = [/Error: Not implemeted/, /Warning: Each child in a list should have a unique "key" prop./];
        return allowList.some((re) => re.test(errorMsg));
    },
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next/config', () => ({
    publicRuntimeConfig: {},
}));
