
const fs = require('fs').promises;
const path = require('path');
const jp = require('jsonpath');
async function getWithoutToken(url, options = {}) {
    const {
        maxRetries = 3,
        retryInterval = 2000,
        timeout = 60000,
        validateResponse = response => response && typeof response === 'object',
        headers: customHeaders = {}
    } = options;

    let retryCount = 0;
    let lastError;

    while (retryCount <= maxRetries) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...customHeaders
                },
                signal: controller.signal
            };

            const response = await fetch(url, fetchOptions);
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
            }

            const responseJson = await response.json();

            if (!validateResponse(responseJson)) {
                throw new Error('Invalid response format from public API');
            }

            // Lưu response để debug
            const timestamp = Date.now();
            const outputFilePath = `reports/api_response_get_public_${timestamp}.json`;
            await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
            await fs.writeFile(outputFilePath, JSON.stringify(responseJson, null, 2), 'utf-8');
            console.log(`[GET PUBLIC] Response saved → ${outputFilePath}`);

            return responseJson;

        } catch (error) {
            clearTimeout(timeoutId);
            lastError = error;
            retryCount++;

            const isTimeout = error.name === 'AbortError';
            const errorType = isTimeout ? 'TIMEOUT' : 'ERROR';

            console.warn(
                `[GET PUBLIC] Attempt ${retryCount}/${maxRetries} failed [${errorType}]: ${error.message}`
            );

            if (retryCount > maxRetries) {
                console.error(`[GET PUBLIC] LAST retry: ${error.message}`);
                throw lastError;
            }

            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }

    throw lastError;
}


function getRepoNameWithMostWatchers(repos) {
    if (!Array.isArray(repos) || repos.length === 0) {
        throw new Error('Invalid or empty response data');
    }

    const maxRepo = repos.reduce((max, current) =>
        current.watchers_count > max.watchers_count ? current : max
    );

    return maxRepo.full_name; // hoặc maxRepo.name
}

function getValuesFromJson(jsonData, pathExpression) {
    try {
        const result = jp.query(jsonData, pathExpression);

        if (!Array.isArray(result) || result.length === 0) {
            const errorMessage = `No values found for JSONPath expression: ${pathExpression}`;
            console.warn(errorMessage);
            return [];
        }

        console.log(`Values for ${pathExpression}:`, result);
        return result;

    } catch (error) {
        const errorMessage = `Error querying JSONPath expression "${pathExpression}": ${error.message}`;
        console.error(errorMessage);
        return [];
    }
}




function getValueFromJson(jsonData, pathExpression) {
    try {
        const result = jp.query(jsonData, pathExpression);
        if (result.length === 0) {
            const errorMessage = `No value found for JSONPath expression: ${pathExpression}`;
            console.warn(errorMessage);

            return 0;
        }
        if (result.length > 1) {
            console.warn(`Multiple values found for JSONPath expression: ${pathExpression}. Returning the first value.`);
        }
        console.log(`Value for ${pathExpression}:`, result[0]);

        return result[0];
    } catch (error) {
        const errorMessage = `Error querying JSON field "${pathExpression}": ${error.message}`;
        console.error(errorMessage);

        return 0;
    }
}





module.exports = {
    getValuesFromJson,
    getValueFromJson,
    getWithoutToken,
    getRepoNameWithMostWatchers
};