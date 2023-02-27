import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { RegisterForm } from "./form";

export default async function App({
    params: { lang },
}: {
    params: { lang: string };
}) {
    const dictionary = await getDictionary(lang as Locale);
    
    return (
        <div className="card w-96 bg-base-200">
            <div className="card-body">
                <h2 className="card-title">{dictionary.auth.register_text}</h2>
                <RegisterForm dictionary={dictionary.auth} />
            </div>
        </div>
    );
}
