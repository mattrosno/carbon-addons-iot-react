// eslint-disable-next-line import/extensions
import testApiData from './uiresources.fixture.js';

export const defaultFetchApi = async (method, url, body, headers, testResponse) =>
  testResponse ||
  fetch(url, {
    method,
    credentials: 'include',
    headers: headers || {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resJson) => {
      // Don't return any data if an error happened (401, 404, 409, etc)
      if (resJson.error || resJson.exception) {
        return null;
      }
      return resJson;
    });

const getUiResourcesData = async ({
  baseApiUrl,
  lang = 'en',
  surveyId = null,
  appId = null,
  workspaceId = null,
  useCache = false,
  fetchApi = defaultFetchApi,
  isTest = false,
}) => {
  const api = (method, path, body, headers) =>
    fetchApi(
      method,
      `${baseApiUrl}${path}`,
      body,
      headers,
      isTest ? testApiData[path.split('?')[0]] : null
    );

  const langParam = `&lang=${lang}`;
  const surveyIdParam = surveyId ? `&surveyId=${surveyId}` : '';
  const appIdParam = appId ? `&appId=${appId}` : '';
  const workspaceIdParam = workspaceId ? `&workspaceId=${workspaceId}` : '';
  const cacheParam = useCache ? `&cache=${true}` : '';
  return api(
    'GET',
    `/uiresources?id=masthead${langParam}${surveyIdParam}${appIdParam}${workspaceIdParam}${cacheParam}`
  );
};

export default getUiResourcesData;
