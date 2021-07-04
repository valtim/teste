export class GuidUtil {

    public static NewGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0,
                // tslint:disable-next-line:no-bitwise
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static NewBlankGuid(): string {
        return '00000000-0000-0000-0000-000000000000'
    }
}