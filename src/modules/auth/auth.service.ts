import fetch from "cross-fetch";
import { config } from "dotenv";
import jwkToPem from "jwk-to-pem";
import { logger } from "../../services/logging.service";
import { RequestBody, Result, Tokens } from "./auth.type";

config();

export const getKeycloakPublicKey = async () => {
    try {
        if (process.env.TWJ_PUBLIC_KEY) return;
        const URL = `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`;
        const params = { method: "GET" };
        const response = await fetch(URL, params);
        const body = await response.json();
        const { keys } = body;
        process.env.TWJ_PUBLIC_KEY = jwkToPem(keys[0]);
        logger.info("Generated public_key success ");
    } catch (error) {
        logger.error(`${error.message}`);
    }
};

export const findUserWithKeyCloak = async (username: string, password: string): Promise<Result<Tokens>> => {
    try {
        const requestBody = {
            grant_type: process.env.KEYCLOAK_GRANT_TYPE,
            username: username,
            password: password,
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        };
        return await _getResponseBodyFromKeyCloak(requestBody);
    } catch (error) {
        logger.error(`${error.message}`);
    }
};


export const refreshTokenService = async (refresh_token: string): Promise<Result<Tokens>> => {
    const requestBody: RequestBody = {
        grant_type: process.env.KEYCLOAK_GRANT_TYPE_REFRESH,
        refresh_token: refresh_token,
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    };
    return await _getResponseBodyFromKeyCloak(requestBody);
};


const _getResponseBodyFromKeyCloak = async (requestBody: RequestBody): Promise<Result<Tokens>> => {
    const URL = `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    const response = await fetch(URL, {
        method: "POST",
        body: new URLSearchParams(requestBody),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const responseBody = await response.json();
    if (!responseBody.error) {
        return {
            error: null,
            data: {
                access_token: responseBody.access_token,
                refresh_token: responseBody.refresh_token,
            },
        };
    }
    return { error: responseBody.error_description, data: null };
};
