import { ChangeEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import slugify from 'slugify';

const HomePage: React.FC = () => {

  const [identifier, setIdentifier] = useState<string>('');

  const onChangeIdentifier = (e: ChangeEvent<HTMLInputElement>) => {
    const value = slugify(e.target.value, {
      trim: false,
      strict: true,
      lower: true,
    });

    setIdentifier(value);
  }

  return (
    <main className="container-app min-h-screen flex items-center justify-center">
      <section className="space-y-14">
        <h1 className="text-4xl font-semibold">Fetch my ghost block</h1>
        <div className="border-b-2 border-gray-900 flex items-center justify-center px-3 gap-3">
          <FiSearch className="text-gray-400"/>
          <input
            type="text"
            placeholder="Search for ghosts"
            className="w-full py-2 bg-transparent text-center outline-none text-lg"
            value={identifier}
            onChange={onChangeIdentifier}
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;