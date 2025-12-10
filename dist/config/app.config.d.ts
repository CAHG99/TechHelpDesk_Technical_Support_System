export declare const EnvConfiguration: () => {
    environment: string;
    appPort: number;
    appContainerName: string | null;
    database: {
        type: string;
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        synchronize: boolean;
        autoLoadEntities: boolean;
    };
    jwt: {
        secret: string | undefined;
        signOptions: {
            expiresIn: string | undefined;
        };
        refreshSecret: string | undefined;
        refreshExpiresIn: string | undefined;
    };
};
