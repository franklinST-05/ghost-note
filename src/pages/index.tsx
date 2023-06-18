import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import slugify from 'slugify';

const HomePage: React.FC = () => {

  const router = useRouter();
  const [identifier, setIdentifier] = useState<string>('');

  const onChangeIdentifier = (e: ChangeEvent<HTMLInputElement>) => {
    const value = slugify(e.target.value, {
      trim: false,
      strict: true,
      lower: true,
    });

    setIdentifier(value);
  }

  const onKeyEnterIdentifier: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      try {
        await axios.post('/api/note', { identifier });
        router.push(identifier);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 409) {
          router.push(identifier);
        }
      }
    }
  }

  return (
    <main className="container-app min-h-screen flex items-center justify-center">
      <section className="w-full space-y-14 max-w-lg text-center">
        <h1 className="text-4xl font-semibold">Fetch my ghost block</h1>
        <div className="border-b-2 border-gray-900 flex items-center justify-center px-8 gap-3">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for ghosts"
            className="w-full py-3 bg-transparent text-center outline-none text-lg"
            value={identifier}
            onChange={onChangeIdentifier}
            onKeyDown={onKeyEnterIdentifier}
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;