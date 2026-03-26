import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-4xl font-bold mb-4">ilokesto</h1>
      <p className="mb-4">
        React state management and utility components.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href={`/${resolvedParams.lang}/state`} className="font-medium underline">
          @ilokesto/state
        </Link>
        <Link href={`/${resolvedParams.lang}/store`} className="font-medium underline">
          @ilokesto/store
        </Link>
        <Link href={`/${resolvedParams.lang}/utilinent`} className="font-medium underline">
          @ilokesto/utilinent
        </Link>
      </div>
    </div>
  );
}
