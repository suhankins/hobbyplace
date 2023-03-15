import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/lib/i18n-config';
import { Form } from './Form';

export default async function App({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-4xl font-bold">{dictionary.creation_form.create_collection}</h1>
            <Form dictionary={dictionary.creation_form} imageUploaderDictionary={dictionary.image_uploader} />
        </div>
    );
}
