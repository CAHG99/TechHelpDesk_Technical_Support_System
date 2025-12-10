import { ConfigService } from "@nestjs/config";
declare const RefreshStrategy_base: new (...args: any) => any;
export declare class RefreshStrategy extends RefreshStrategy_base {
    constructor(config: ConfigService);
    validate(payload: any): any;
}
export {};
