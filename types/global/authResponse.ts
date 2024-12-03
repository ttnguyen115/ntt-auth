export interface ILoginResponse {
    error?: string;
    success?: boolean;
    message?: string;
    twoFactor?: boolean;
}

export interface IRegisterResponse {
    error?: string;
    success: boolean;
    message?: string;
}

export interface IVerificationResponse {
    error?: string;
    success: boolean;
    message?: string;
}

export interface IResetResponse {
    error?: string;
    success: boolean;
    message?: string;
}

export interface INewPasswordResponse {
    error?: string;
    success: boolean;
    message?: string;
}

export interface ISettingsResponse {
    error?: string;
    success?: boolean;
    message?: string;
}
