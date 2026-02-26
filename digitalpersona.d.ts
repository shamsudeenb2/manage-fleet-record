// src/types/digitalpersona.d.ts
declare module '@digitalpersona/fingerprint' {
    export class FingerprintReader {
        on(event: string, callback: (data: any) => void): void;
        startAcquisition(format: number): Promise<void>;
        stopAcquisition(): Promise<void>;
    }
    export enum SampleFormat {
        Raw = 1,
        Intermediate = 2,
        Compressed = 3,
        PngImage = 4
    }
}
