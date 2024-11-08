import MockAdapter from "axios-mock-adapter";
import { apiClient } from "../Client/apiClient";

export const mockAxiosAdapter = new MockAdapter(apiClient, {
    // delayResponse: 200,
});