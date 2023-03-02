import { Form } from './Form';

export default function NewCollection() {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-4xl font-bold">Create a new collection</h1>
            <Form />
        </div>
    );
}
