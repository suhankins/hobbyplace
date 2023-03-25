import { getDictionary } from '@/lib/get-dictionary';
import { i18n, Locale } from '@/lib/i18n-config';

const supportedErrorCodes = ['404', '500', '401'] as const;
type SupportedErrorCode = typeof supportedErrorCodes[number];

export default async function itemPage({
    params: { lang, errorCode },
}: {
    params: { lang: string; errorCode: string };
}) {
    const dictionary = await getDictionary(lang as Locale);
    const errorMessage = dictionary.error[errorCode as SupportedErrorCode];

    return (
        <>
            <h1 className="text-4xl font-bold">{dictionary.error.prefix}{errorCode}</h1>
            {errorMessage !== undefined && (
                <p className="text-xl">{errorMessage}</p>
            )}
        </>
    );
}

export async function generateStaticParams() {
    return i18n.locales.flatMap((locale) => {
        return supportedErrorCodes.map((code) => {
            return { lang: locale, errorCode: code };
        });
    });
}
