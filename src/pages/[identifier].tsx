import Head from 'next/head';
import { Note } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { FiLink } from 'react-icons/fi';

const EditorPage: React.FC<EditorPageProps> = ({ note }) => {
  return (
    <main className="container-app">
      <Head>
        <title>{note.identifier}</title>
        <meta name="description" content={note.identifier} />
        <meta name="keywords" content={note.identifier} />
      </Head>
      
      <header className="w-full py-8">
        <button className="group flex items-center gap-2">
          <p className="text-base font-medium">{note.identifier}</p>
          <FiLink className="text-gray-500 group-hover:text-white"/>
        </button>
      </header>

      <section>
        <textarea className="w-full min-h-full bg-transparent outline-none">
          {note.body}
        </textarea>
      </section>
    </main>
  );
}

interface EditorPageProps {
  note: Note
}

export const getServerSideProps: GetServerSideProps<EditorPageProps> = async (context) => {
  try {
    const { identifier } = context.query;
    const response = await fetch('http://localhost:3000/api/note/' + identifier);
    const result = await response.json();

    if (result.error) return {
      notFound: true
    }

    return {
      props: {
        note: result.data.note
      }
    }

  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default EditorPage;