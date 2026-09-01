import { lazy, Suspense } from 'react';

// Lazy load the merch page for better initial load performance
const MerchPage = lazy(() => import('../../components/merch/MerchPage'));

const Merch = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                        <span className="text-cyan-400 text-sm font-orbitron tracking-wide">
                            Loading Merch...
                        </span>
                    </div>
                </div>
            }
        >
            <MerchPage />
        </Suspense>
    );
};

export default Merch;

