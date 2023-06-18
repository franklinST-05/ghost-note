import { Note } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import { FiLink } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

const EditorPage: React.FC<EditorPageProps> = ({ note }) => {

  const [body, setBody] = useState<string>(note.body ?? '');

  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  const shareLink = async () => {
    try {
      await navigator.share({
        title: note.identifier,
        url: window.location.href,
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast('Copied to clipboard');
    }
  }

  return (
    <main className="container-app">
      <Head>
        <title>{note.identifier}</title>
        <meta name="description" content={note.identifier} />
        <meta name="keywords" content={note.identifier} />
      </Head>

      <header className="w-full py-8">
        <div>
          <button
            onClick={shareLink}
            className="group flex items-center gap-2"
          >
            <p className="text-base font-medium">{note.identifier}</p>
            <FiLink className="text-gray-500 group-hover:text-white" />
          </button>
        </div>
      </header>

      <section>
        <textarea
          value={body}
          onChange={onChangeBody}
          className="w-full min-h-full bg-transparent outline-none"
        />
      </section>

      <ToastContainer theme="dark"/>
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