import { getDictionary } from '@/lib/get-dictionary';
import { i18n, Locale } from '@/lib/i18n-config';
import { RegisterForm } from './form';

export default async function App({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <div className="card w-96 bg-base-200">
            <div className="card-body">
                <h2 className="card-title">{dictionary.auth.register_text}</h2>
                <RegisterForm dictionary={dictionary.auth} />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => {
        return { lang: locale };
    });
}
