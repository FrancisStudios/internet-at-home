export type UserData = {
    _id: number
    username: string,
    password: string,
    nickname: string,
    prefix: string,
    language: string,
    privileges: string | string[],
    GPF: string,
    time_preference: string | UserTimePreferences,
    theme_preference: string | UserThemePreferences,
}


export enum UserTimePreferences {
    COMMON_TIME="common_time",
    AFTCL="after_cleone",
    ERSI_TIME="ersi_time",
    NORD_TIME="nord_time",
    SZ_TIME="sz_time",
}

export enum UserThemePreferences {
    DARK='theme_dark',
    LIGHT='theme_light'
}