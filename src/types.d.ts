declare class Util {
    readonly reg: {
        phone: RegExp;
        bankCard: RegExp;
        name: RegExp;
        number: RegExp;
    }
    readonly role: {
        // merchant 商户类型
        readonly merchant: number;
        // 是否是商户类型
        readonly isMerchant: boolean;
        // 子商户(商户下的商户)
        readonly isSubMerchant: boolean;
        // 集团商户
        readonly isGroup: boolean;
        // 官方商户
        readonly isOfficial: boolean;
        // 官方商户 2
        readonly isOfficialTwo: boolean;
        // 官方商户 2  (新)
        readonly isOfficialTwonew: boolean;
        // 非商户
        readonly isNotShangHu: boolean;
        // 总代
        readonly isZd: boolean;
        // 总代(银商类型)
        readonly isZdYingShang: boolean;
        // 开代
        readonly isKd: boolean;
        // 开代admin
        readonly isKdSuper: boolean;
        // 开代admin与普通开代 (银商)
        readonly isKdsYingShangKefu: boolean;
        // 开代(银商类型)
        readonly isKdYingShangKefu: boolean;
        // 客服组长
        readonly isLeader: boolean;
        // 客服
        readonly isYs: boolean;
        // xb1客服
        readonly isXB1Kf: boolean;
        // 官方客服(银商类型)
        readonly isOfys: boolean;
        // 客服(银商类型)
        readonly isKefuYingShang: boolean;
        // 分口
        readonly isFk: boolean;
        // 小分口
        readonly isXfk: boolean;
        // 审核admin 
        readonly isCs: boolean;
        // 普通审核
        readonly isSh: boolean;
        // 审核Kpi
        readonly isShKpi: boolean;
        // 官方类型
        readonly isOfficial: boolean;
        // 自招类型
        readonly isZiZhao: boolean;
        // 自招总代
        readonly isTZd: boolean;
        // 自招开代
        readonly isTKd: boolean;
        // 自招超级审核
        readonly isTCs: boolean;
        // 自招普通审核
        readonly isTSh: boolean;
        // 自招审核Kpi
        readonly isTShKpi: boolean;
        // 自招审核admin
        readonly isZHshAdmin: boolean;
        // 自招质检管理员
        readonly isTZj: boolean;
        [key: string]: unknown;
    };
    downloadBlobFile: (response: any) => void;
    removeEmpty(values: Record<string, any>): void;
    times(values: Record<string, any>, key: string[]): Record<string, any>;
    isExe(): boolean;
    getURLValue(key: string): string | undefined | boolean;
}
declare var util: Util & typeof globalThis;
declare const moment: typeof import('dayjs') & typeof globalThis;
declare const dayjs: typeof import('dayjs') & typeof globalThis;
